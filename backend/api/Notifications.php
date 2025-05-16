<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['loginID'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing loginID']);
    exit();
}

$loginID = $input['loginID'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "library";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

$currentDate = '2025-05-20';

$stmt = $conn->prepare("SELECT BorrowerID FROM borrower WHERE LoginID = ?");
$stmt->bind_param("s", $loginID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Borrower not found for given loginID']);
    $conn->close();
    exit();
}

$row = $result->fetch_assoc();
$borrowerID = $row['BorrowerID'];

$query = "
    SELECT 
        t.BookID,
        t.DueDate,
        DATEDIFF(?, t.DueDate) AS daysOverdue
    FROM transaction t
    WHERE 
        t.BorrowerID = ? AND
        t.TransactionType = 'Borrow Book' AND
        t.Status = 'Borrowed' AND
        t.returnDate IS NULL AND
        t.DueDate < ?
";

$stmt2 = $conn->prepare($query);
$stmt2->bind_param('sss', $currentDate, $borrowerID, $currentDate);
$stmt2->execute();
$result2 = $stmt2->get_result();

$notifications = [];

while ($row = $result2->fetch_assoc()) {
    $bookID = $row['BookID'];
    $dueDate = $row['DueDate'];
    $daysOverdue = $row['daysOverdue'];

    if ($daysOverdue == 0) {
        $dateLabel = "Today";
        $message = "Your borrowed book [$bookID] is overdue. Please return it as soon as possible.";
    } elseif ($daysOverdue == 1) {
        $dateLabel = "Yesterday";
        $message = "Please return your borrowed book [$bookID] today.";
    } else {
        $dateLabel = date('F j, Y', strtotime($dueDate));
        $message = "Your borrowed book [$bookID] was due on $dueDate. Please return it as soon as possible.";
    }

    $notifications[] = [
        'message' => $message,
        'status' => $dateLabel
    ];
}

echo json_encode($notifications);

$conn->close();
?>

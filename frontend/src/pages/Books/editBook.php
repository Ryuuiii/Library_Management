<?php
// Set headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php'; 

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required data']);
    exit();
}

$bookID = $_GET['id'];
$title = $input['title'] ?? null;
$author = $input['author'] ?? null;
$publishedYear = $input['publishedYear'] ?? null;
$subject = $input['subject'] ?? null;
$programID = $input['programID'] ?? null;
$yearLevel = $input['yearLevel'] ?? null;
$availableCopies = $input['availableCopies'] ?? null;

$query = "UPDATE books 
          SET BookTitle = ?, Author = ?, PublishedYear = ?, Subject = ?, YearLevel = ?, AvailableCopies = ? 
          WHERE BookID = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("sssssss", $title, $author, $publishedYear, $subject, $yearLevel, $availableCopies, $bookID);

if (!$stmt->execute()) {
    error_log("Failed to update books table: " . $stmt->error);
    echo json_encode(['error' => 'Failed to update book: ' . $stmt->error]);
    http_response_code(500);
    exit();
} else {
    error_log("Books table updated successfully for bookID: $bookID");
}

$stmt->close();

$queryCheck = "SELECT * FROM book_program WHERE bookID = ? AND programID = ?";
$stmtCheck = $conn->prepare($queryCheck);
$stmtCheck->bind_param("ss", $bookID, $programID);
$stmtCheck->execute();
$resultCheck = $stmtCheck->get_result();

if ($resultCheck->num_rows > 0) {
    error_log("Duplicate entry for bookID: $bookID and programID: $programID");
} else {
    $queryProgram = "UPDATE book_program SET programID = ? WHERE bookID = ?";
    $stmtProgram = $conn->prepare($queryProgram);
    $stmtProgram->bind_param("ss", $programID, $bookID);

    if (!$stmtProgram->execute()) {
        error_log("Failed to update book_program table: " . $stmtProgram->error); // Log the error
        echo json_encode(['error' => 'Failed to update book_program table: ' . $stmtProgram->error]);
        http_response_code(500);
        exit();
    } else {
        error_log("Book_program table updated successfully for bookID: $bookID and programID: $programID");
    }

    $stmtProgram->close();
}

$stmtCheck->close();

echo json_encode(['message' => 'Book updated successfully']);
$conn->close();
?>
<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

$input = json_decode(file_get_contents('php://input'), true);

// Debugging: Log the incoming data
error_log("Incoming Data: " . json_encode($input));
error_log("Transaction ID: " . $_GET['id']);

// Validate required fields
if (
    empty($input['transactionID']) ||
    empty($input['bookID']) ||
    empty($input['borrowerID']) ||
    empty($input['transactionType']) ||
    empty($input['status']) ||
    empty($input['borrowDate']) ||
    empty($input['dueDate'])
) {
    echo json_encode(['error' => 'Missing required data']);
    exit;
}
error_log("Transaction ID: " . $input['transactionID']);
$transactionID = $input['transactionID'];
$bookID = $input['bookID'];
$borrowerID = $input['borrowerID'];
$transactionType = $input['transactionType'];
$status = $input['status'];
$borrowDate = $input['borrowDate'];
$dueDate = $input['dueDate'];
$returnDate = $input['returnDate'] ?? null;

// Update query
$query = "UPDATE transaction 
          SET BorrowerID = ?, BookID = ?, TransactionType = ?, Status = ?, BorrowDate = ?, DueDate = ?, returnDate = ? 
          WHERE TransactionID = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Prepare failed: ' . $conn->error]);
    exit();
}

$stmt->bind_param("ssssssss", $borrowerID, $bookID, $transactionType, $status, $borrowDate, $dueDate, $returnDate, $transactionID);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Transaction updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update transaction: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
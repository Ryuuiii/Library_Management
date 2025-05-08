<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['bookID'], $input['borrowerID'], $input['status'], $input['dueDate'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required data']);
    exit();
}

$bookID = $input['bookID'];
$borrowerID = $input['borrowerID'];
$status = $input['status'];
$dueDate = $input['dueDate'];

$query = "INSERT INTO transactions (bookID, borrowerID, status, dueDate) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssss", $bookID, $borrowerID, $status, $dueDate);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Transaction added successfully']);
} else {
    echo json_encode(['error' => 'Failed to add transaction: ' . $stmt->error]);
    http_response_code(500);
}

$stmt->close();
$conn->close();
?>
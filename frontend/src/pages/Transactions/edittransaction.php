<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($_GET['id']) || !$input || !isset($input['status'], $input['dueDate'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required data']);
    exit();
}

$transactionID = $_GET['id'];
$status = $input['status'];
$dueDate = $input['dueDate'];

$query = "UPDATE transactions SET status = ?, dueDate = ? WHERE transactionID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssi", $status, $dueDate, $transactionID);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Transaction updated successfully']);
} else {
    echo json_encode(['error' => 'Failed to update transaction: ' . $stmt->error]);
    http_response_code(500);
}

$stmt->close();
$conn->close();
?>
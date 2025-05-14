<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing transaction ID']);
    exit();
}

$transactionID = $_GET['id'];

$query = "DELETE FROM transaction WHERE transactionID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $transactionID);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Transaction deleted successfully']);
} else {
    echo json_encode(['error' => 'Failed to delete transaction: ' . $stmt->error]);
    http_response_code(500);
}

$stmt->close();
$conn->close();
?>
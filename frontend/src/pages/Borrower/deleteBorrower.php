<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing borrower ID']);
    exit();
}

$borrowerID = $_GET['id'];

$query = "DELETE FROM borrower WHERE borrowerID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $borrowerID);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Borrower deleted successfully']);
} else {
    echo json_encode(['error' => 'Failed to delete borrower: ' . $stmt->error]);
    http_response_code(500);
}

$stmt->close();
$conn->close();
?>
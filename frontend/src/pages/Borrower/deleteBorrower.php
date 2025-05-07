<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}

// Get borrower ID
$borrowerID = $_GET['id'];

// Delete borrower
$query = "DELETE FROM borrowers WHERE BorrowerID = '$borrowerID'";

if ($conn->query($query)) {
    echo json_encode(['message' => 'Borrower deleted successfully']);
} else {
    echo json_encode(['error' => 'Failed to delete borrower: ' . $conn->error]);
}
?>
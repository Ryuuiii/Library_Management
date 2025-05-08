<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $bookId = $_GET['id'] ?? null;

    if (!$bookId) {
        echo json_encode(['error' => 'Book ID is required']);
        exit();
    }

    $query = "DELETE FROM books WHERE BookID = '$bookId'";

    if ($conn->query($query)) {
        echo json_encode(['message' => 'Book deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete book: ' . $conn->error]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
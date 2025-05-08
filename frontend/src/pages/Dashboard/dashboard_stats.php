<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}

$totalBooksQuery = "SELECT COUNT(*) AS total FROM books";
$totalBooksResult = $conn->query($totalBooksQuery);
$totalBooks = $totalBooksResult->fetch_assoc()['total'] ?? 0;

$availableBooksQuery = "SELECT SUM(AvailableCopies) AS available FROM books";
$availableBooksResult = $conn->query($availableBooksQuery);
$availableBooks = $availableBooksResult->fetch_assoc()['available'] ?? 0

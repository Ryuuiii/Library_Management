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

try {
    // Total books
    $totalStmt = $conn->query("SELECT SUM(AvailableCopies) AS total FROM books");
$totalBooks = (int) ($totalStmt->fetch_assoc()['total'] ?? 0);

// Count how many are currently borrowed
$transactionStmt = $conn->query("
    SELECT 
        COUNT(CASE WHEN Status = 'Borrowed' THEN 1 END) AS borrowed,
        COUNT(CASE WHEN Status = 'Overdue' THEN 1 END) AS overdue
    FROM transaction
");
$row = $transactionStmt->fetch_assoc();

$borrowed = (int) ($row['borrowed'] ?? 0);
$overdue = (int) ($row['overdue'] ?? 0);
$available = max(0, $totalBooks - $borrowed); // subtract borrowed copies from total copies

echo json_encode([
    'total' => $totalBooks,
    'borrowed' => $borrowed,
    'available' => $available,
    'overdue' => $overdue
]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch dashboard stats', 'details' => $e->getMessage()]);
}
?>

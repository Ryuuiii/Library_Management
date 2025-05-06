<?php
require_once 'db.php'; // Adjust this path based on your structure

header('Content-Type: application/json');

// Get Total Books
$totalQuery = "SELECT COUNT(*) as total FROM books";
$borrowedQuery = "SELECT COUNT(*) as borrowed FROM books WHERE Status = 'Borrowed'";
$availableQuery = "SELECT COUNT(*) as available FROM books WHERE Status = 'Available'";
$overdueQuery = "SELECT COUNT(*) as overdue FROM books WHERE Status = 'Overdue'";

$result = [
    'total' => 0,
    'borrowed' => 0,
    'available' => 0,
    'overdue' => 0
];

try {
    $total = $conn->query($totalQuery)->fetch_assoc();
    $borrowed = $conn->query($borrowedQuery)->fetch_assoc();
    $available = $conn->query($availableQuery)->fetch_assoc();
    $overdue = $conn->query($overdueQuery)->fetch_assoc();

    $result['total'] = $total['total'];
    $result['borrowed'] = $borrowed['borrowed'];
    $result['available'] = $available['available'];
    $result['overdue'] = $overdue['overdue'];

    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to fetch book statistics']);
}
?>

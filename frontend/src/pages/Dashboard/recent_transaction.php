<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'db.php';

$mode = $_GET['mode'] ?? 'recent';

error_log("Mode: " . $mode);

if ($mode === 'recent') {
    $query = "
        SELECT 
            TransactionID, BorrowerID, BookID, TransactionType, BorrowDate, DueDate, returnDate, Status
        FROM transaction
        ORDER BY BorrowDate DESC
        LIMIT 5;
    ";
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid mode']);
    exit();
}

$result = $conn->query($query);

if (!$result) {
    error_log("SQL Error: " . $conn->error);
    http_response_code(500);
    echo json_encode(['error' => 'Database query failed']);
    exit();
}

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode(['transactions' => $transactions]);
?>

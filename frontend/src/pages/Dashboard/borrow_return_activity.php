<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'db.php';

$filter = $_GET['filter'] ?? '7days';

// Debugging: Log the filter value
error_log("Filter: " . $filter);

$query = "";
if ($filter === '7days') {
    $query = "
        SELECT 
            DATE(BorrowDate) AS date, 
            COUNT(CASE WHEN TransactionType = 'Borrow Book' THEN 1 END) AS Borrowed,
            COUNT(CASE WHEN TransactionType = 'Return Book' THEN 1 END) AS Returned
        FROM transaction
        WHERE BorrowDate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
           OR returnDate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY DATE(BorrowDate)
        ORDER BY DATE(BorrowDate) ASC;
    ";
} elseif ($filter === '30days') {
    $query = "
        SELECT 
            WEEK(BorrowDate) AS week, 
            COUNT(CASE WHEN TransactionType = 'Borrow Book' THEN 1 END) AS Borrowed,
            COUNT(CASE WHEN TransactionType = 'Return Book' THEN 1 END) AS Returned
        FROM transaction
        WHERE BorrowDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
           OR returnDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY WEEK(BorrowDate)
        ORDER BY WEEK(BorrowDate) ASC;
    ";
} elseif ($filter === '3months') {
    $query = "
        SELECT 
            MONTH(BorrowDate) AS month, 
            COUNT(CASE WHEN TransactionType = 'Borrow Book' THEN 1 END) AS Borrowed,
            COUNT(CASE WHEN TransactionType = 'Return Book' THEN 1 END) AS Returned
        FROM transaction
        WHERE BorrowDate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
           OR returnDate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
        GROUP BY MONTH(BorrowDate)
        ORDER BY MONTH(BorrowDate) ASC;
    ";
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid filter']);
    exit();
}

$result = $conn->query($query);

if (!$result) {
    error_log("SQL Error: " . $conn->error);
    http_response_code(500);
    echo json_encode(['error' => 'Database query failed']);
    exit();
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>

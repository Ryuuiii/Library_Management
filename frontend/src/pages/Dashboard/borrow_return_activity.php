<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db.php';

$filter = $_GET['filter'] ?? '7days';
error_log("Filter: " . $filter);

if ($filter === '7days') {
    $activity_query = "
        SELECT  
            activity_date,
            SUM(CASE WHEN TransactionType = 'Borrow Book' THEN 1 ELSE 0 END) AS Borrowed,
            SUM(CASE WHEN TransactionType = 'Return Book' THEN 1 ELSE 0 END) AS Returned
        FROM (
            SELECT DATE(BorrowDate) AS activity_date, TransactionType
            FROM transaction
            WHERE BorrowDate >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)

            UNION ALL

            SELECT DATE(ReturnDate) AS activity_date, TransactionType
            FROM transaction
            WHERE ReturnDate >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        ) AS activity
        GROUP BY activity_date
        ORDER BY activity_date ASC;
    ";

    $result = $conn->query($activity_query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(['error' => 'Database query failed']);
        exit;
    }

    $finalData = [];
    while ($row = $result->fetch_assoc()) {
        $dayName = date('l', strtotime($row['activity_date'])); // Get day name (e.g., Monday)
        $finalData[] = [
            'name' => $dayName,
            'Borrowed' => (int)$row['Borrowed'],
            'Returned' => (int)$row['Returned']
        ];
    }

    echo json_encode($finalData);
    exit;
}

if ($filter === '30days') {
    $query = "
        SELECT 
            WEEK(BorrowDate) AS week, 
            COUNT(CASE WHEN TransactionType = 'Borrow Book' THEN 1 END) AS Borrowed,
            COUNT(CASE WHEN TransactionType = 'Return Book' THEN 1 END) AS Returned
        FROM transaction
        WHERE BorrowDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
           OR ReturnDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
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
           OR ReturnDate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
        GROUP BY MONTH(BorrowDate)
        ORDER BY MONTH(BorrowDate) ASC;
    ";
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid filter']);
    exit;
}

$result = $conn->query($query);
if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Database query failed']);
    exit;
}

$data = [];
while ($row = $result->fetch_assoc()) {
    if ($filter === '30days') {
        $data[] = [
            'name' => 'Week ' . $row['week'],
            'Borrowed' => (int)$row['Borrowed'],
            'Returned' => (int)$row['Returned']
        ];
    } elseif ($filter === '3months') {
        $monthName = date("F", mktime(0, 0, 0, $row['month'], 1));
        $data[] = [
            'name' => $monthName,
            'Borrowed' => (int)$row['Borrowed'],
            'Returned' => (int)$row['Returned']
        ];
    }
}



echo json_encode($data);
?>

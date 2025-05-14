<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'db.php';

$search = $_GET['search'] ?? '';
$status = $_GET['status'] ?? 'all';
$page = $_GET['page'] ?? 1;
$rowsPerPage = 10;
$offset = ($page - 1) * $rowsPerPage;

// Build the query for fetching transactions
$query = "SELECT * FROM transaction WHERE 1=1";
$params = [];
$types = "";

if (!empty($search)) {
    $query .= " AND (BorrowerID LIKE ? OR BookID LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $types .= "ss";
}

if ($status !== 'all') {
    $query .= " AND Status = ?";
    $params[] = $status;
    $types .= "s";
}

$query .= " LIMIT ? OFFSET ?";
$params[] = $rowsPerPage;
$params[] = $offset;
$types .= "ii";

$stmt = $conn->prepare($query);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

// Query to count total rows for pagination
$countQuery = "SELECT COUNT(*) as total FROM transaction WHERE 1=1";
$countParams = [];
$countTypes = "";

if (!empty($search)) {
    $countQuery .= " AND (BorrowerID LIKE ? OR BookID LIKE ?)";
    $countParams[] = "%$search%";
    $countParams[] = "%$search%";
    $countTypes .= "ss";
}

if ($status !== 'all') {
    $countQuery .= " AND Status = ?";
    $countParams[] = $status;
    $countTypes .= "s";
}

$countStmt = $conn->prepare($countQuery);
if (!empty($countTypes)) {
    $countStmt->bind_param($countTypes, ...$countParams);
}
$countStmt->execute();
$countResult = $countStmt->get_result();
$totalRows = $countResult->fetch_assoc()['total'];
$totalPages = ceil($totalRows / $rowsPerPage);

// Debugging: Log the query and result
error_log("Query: $query");
error_log("Transactions: " . json_encode($transactions));
error_log("Total Rows: $totalRows");
error_log("Total Pages: $totalPages");

echo json_encode([
    'transactions' => $transactions,
    'totalPages' => $totalPages,
]);

$stmt->close();
$countStmt->close();
$conn->close();
?>
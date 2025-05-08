<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'db.php';

$search = $_GET['search'] ?? '';
$status = $_GET['status'] ?? 'all';
$page = $_GET['page'] ?? 1;
$rowsPerPage = 10;
$offset = ($page - 1) * $rowsPerPage;

// Build the query
$query = "SELECT * FROM transactions WHERE 1=1";
$params = [];
$types = "";

if (!empty($search)) {
    $query .= " AND (bookTitle LIKE ? OR borrowerName LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $types .= "ss";
}

if ($status !== 'all') {
    $query .= " AND status = ?";
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

// Get total rows for pagination
$totalQuery = "SELECT COUNT(*) as total FROM transactions WHERE 1=1";
if (!empty($search)) {
    $totalQuery .= " AND (bookTitle LIKE ? OR borrowerName LIKE ?)";
}
if ($status !== 'all') {
    $totalQuery .= " AND status = ?";
}

$totalStmt = $conn->prepare($totalQuery);
$totalStmt->bind_param($types, ...$params);
$totalStmt->execute();
$totalResult = $totalStmt->get_result();
$totalRows = $totalResult->fetch_assoc()['total'];

echo json_encode([
    'transactions' => $transactions,
    'totalPages' => ceil($totalRows / $rowsPerPage),
]);

$stmt->close();
$conn->close();
?>
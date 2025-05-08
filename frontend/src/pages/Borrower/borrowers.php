<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true'); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$searchQuery = $_GET['search'] ?? '';
$type = $_GET['type'] ?? 'all';
$yearLevel = $_GET['yearLevel'] ?? 'all';
$page = $_GET['page'] ?? 1;
$rowsPerPage = 10;
$offset = ($page - 1) * $rowsPerPage;

$query = "
    SELECT 
        borrower.BorrowerID, 
        borrower.Name,
        borrower.EmailAddress,
        borrower.YearLevel, 
        borrower.ProgramID, 
        borrower.BorrowerTypeID
    FROM borrower
    WHERE 1=1
";

if (!empty($searchQuery)) {
    $query .= " AND (borrower.Name LIKE '%$searchQuery%' OR borrower.BorrowerID LIKE '%$searchQuery%')";
}

if ($type !== 'all') {
    $query .= " AND borrower.BorrowerTypeID = '$type'";
}

if ($yearLevel !== 'all') {
    $query .= " AND borrower.YearLevel = '$yearLevel'";
}

$query .= " LIMIT $rowsPerPage OFFSET $offset";

$result = $conn->query($query);
if (!$result) {
    echo json_encode(['error' => 'Failed to fetch borrowers: ' . $conn->error]);
    exit();
}

$borrowers = [];
while ($row = $result->fetch_assoc()) {
    $borrowers[] = $row;
}

$totalQuery = "
    SELECT COUNT(*) AS total
    FROM borrower
    WHERE 1=1
";
if (!empty($searchQuery)) {
    $totalQuery .= " AND (borrower.Name LIKE '%$searchQuery%' OR borrower.BorrowerID LIKE '%$searchQuery%')";
}
if ($type !== 'all') {
    $totalQuery .= " AND borrower.BorrowerTypeID = '$type'";
}
if ($yearLevel !== 'all') {
    $totalQuery .= " AND borrower.YearLevel = '$yearLevel'";
}

$totalResult = $conn->query($totalQuery);
$totalCount = $totalResult->fetch_assoc()['total'] ?? 0;
$totalPages = ceil($totalCount / $rowsPerPage);

echo json_encode([
    'borrowers' => $borrowers,
    'totalPages' => $totalPages,
]);
?>
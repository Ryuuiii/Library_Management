<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}

// Get query parameters
$searchQuery = $_GET['search'] ?? '';
$type = $_GET['type'] ?? 'all';
$yearLevel = $_GET['yearLevel'] ?? 'all';
$page = $_GET['page'] ?? 1;
$rowsPerPage = 10;
$offset = ($page - 1) * $rowsPerPage;

// Base query
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

// Add search filter
if (!empty($searchQuery)) {
    $query .= " AND (borrower.Name LIKE '%$searchQuery%' OR borrower.BorrowerID LIKE '%$searchQuery%')";
}

// Add type filter
if ($type !== 'all') {
    $query .= " AND borrower.BorrowerTypeID = '$type'";
}

// Add year level filter
if ($yearLevel !== 'all') {
    $query .= " AND borrower.YearLevel = '$yearLevel'";
}

// Add pagination
$query .= " LIMIT $rowsPerPage OFFSET $offset";

// Execute query
$result = $conn->query($query);
if (!$result) {
    echo json_encode(['error' => 'Failed to fetch borrowers: ' . $conn->error]);
    exit();
}

// Fetch borrowers
$borrowers = [];
while ($row = $result->fetch_assoc()) {
    $borrowers[] = $row;
}

// Get total count for pagination
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

// Return response
echo json_encode([
    'borrowers' => $borrowers,
    'totalPages' => $totalPages,
]);
?>
<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$searchQuery = $_GET['search'] ?? '';
$program = $_GET['program'] ?? 'all';
$yearLevel = $_GET['yearLevel'] ?? 'all';
$currentPage = $_GET['page'] ?? 1;
$rowsPerPage = 10; 

$offset = ($currentPage - 1) * $rowsPerPage;

$query = "
    SELECT 
        books.BookID, 
        books.BookTitle, 
        books.Author, 
        books.PublishedYear, 
        books.Subject, 
        books.YearLevel, 
        books.AvailableCopies, 
        GROUP_CONCAT(DISTINCT program.ProgramID) AS ProgramIDs, 
        GROUP_CONCAT(DISTINCT program.ProgramName) AS ProgramNames
    FROM program
    LEFT JOIN book_program ON program.ProgramID = book_program.ProgramID
    LEFT JOIN books ON book_program.BookID = books.BookID
    WHERE 1=1
";

if (!empty($searchQuery)) {
    $query .= " AND (books.BookTitle LIKE '%$searchQuery%' OR books.Author LIKE '%$searchQuery%' OR books.Subject LIKE '%$searchQuery%')";
}

if ($program !== 'all') {
    $query .= " AND program.ProgramID = '$program'";
}

if ($yearLevel !== 'all') {
    $query .= " AND books.YearLevel LIKE '%$yearLevel%'";
}

$query .= " GROUP BY books.BookID";
$query .= " LIMIT $rowsPerPage OFFSET $offset";

$totalQuery = "
    SELECT COUNT(DISTINCT books.BookID) as total
    FROM program
    LEFT JOIN book_program ON program.ProgramID = book_program.ProgramID
    LEFT JOIN books ON book_program.BookID = books.BookID
    WHERE 1=1
";

if (!empty($searchQuery)) {
    $totalQuery .= " AND (books.BookTitle LIKE '%$searchQuery%' OR books.Author LIKE '%$searchQuery%' OR books.Subject LIKE '%$searchQuery%')";
}

if ($program !== 'all') {
    $totalQuery .= " AND program.ProgramID = '$program'";
}

if ($yearLevel !== 'all') {
    $totalQuery .= " AND books.YearLevel LIKE '%$yearLevel%'";
}

error_log("Total Count Query: " . $totalQuery);

$totalResult = $conn->query($totalQuery);

if (!$totalResult) {
    error_log("SQL Error in Total Count Query: " . $conn->error);
    echo json_encode(['error' => 'SQL Error in Total Count Query: ' . $conn->error]);
    exit();
}

$totalBooks = $totalResult->fetch_assoc()['total'];

error_log("SQL Query: " . $query);

$result = $conn->query($query);

if (!$result) {
    error_log("SQL Error: " . $conn->error);
}

$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

error_log("Fetched Books: " . json_encode($books));

echo json_encode([
    "books" => $books,
    "totalPages" => ceil($totalBooks / $rowsPerPage),
]);
?>
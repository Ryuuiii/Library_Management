<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database credentials
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'library';

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
$yearLevel = isset($_GET['yearLevel']) ? $conn->real_escape_string($_GET['yearLevel']) : 'all';
$program = isset($_GET['program']) ? $conn->real_escape_string($_GET['program']) : 'all';
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

$limit = 10;
$offset = ($page - 1) * $limit;

$sql = "
    SELECT DISTINCT 
        b.BookID,
        b.BookTitle AS Title,
        b.Author,
        b.PublishedYear,
        b.YearLevel,
        b.Subject,
        bp.ProgramID,
        b.AvailableCopies
    FROM books b
    LEFT JOIN book_program bp ON b.BookID = bp.BookID
    WHERE (
        b.BookID LIKE '%$search%' OR 
        b.BookTitle LIKE '%$search%' OR 
        b.Author LIKE '%$search%' OR 
        b.Subject LIKE '%$search%' OR 
        b.YearLevel LIKE '%$search%' OR 
        bp.ProgramID LIKE '%$search%' OR 
        CAST(b.PublishedYear AS CHAR) LIKE '%$search%'
    )
    AND (
        '$yearLevel' = 'all' OR TRIM(b.YearLevel) LIKE '%$yearLevel%'
    )
    AND (
        '$program' = 'all' OR TRIM(bp.ProgramID) LIKE '%$program%'
    )
    LIMIT $limit OFFSET $offset
";

$result = $conn->query($sql);

$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

$countSql = "
    SELECT COUNT(DISTINCT b.BookID) AS total
    FROM books b
    LEFT JOIN book_program bp ON b.BookID = bp.BookID
    WHERE (
        b.BookID LIKE '%$search%' OR 
        b.BookTitle LIKE '%$search%' OR 
        b.Author LIKE '%$search%' OR 
        b.Subject LIKE '%$search%' OR 
        b.YearLevel LIKE '%$search%' OR 
        bp.ProgramID LIKE '%$search%' OR 
        CAST(b.PublishedYear AS CHAR) LIKE '%$search%'
    )
    AND (
        '$yearLevel' = 'all' OR TRIM(b.YearLevel) LIKE '%$yearLevel%'
    )
    AND (
        '$program' = 'all' OR TRIM(bp.ProgramID) LIKE '%$program%'
    )
";
$totalResult = $conn->query($countSql);
$totalRow = $totalResult->fetch_assoc();
$totalPages = ceil($totalRow['total'] / $limit);

$conn->close();

echo json_encode(['books' => $books, 'totalPages' => $totalPages]);
?>

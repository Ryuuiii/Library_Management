<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");


$host = 'localhost';      
$username = 'root';       
$password = '';         
$dbname = 'libsync';      


$conn = new mysqli($host, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$search = isset($_GET['search']) ? $_GET['search'] : '';         
$yearLevel = isset($_GET['yearLevel']) ? $_GET['yearLevel'] : 'all'; 
$program = isset($_GET['program']) ? $_GET['program'] : 'all';      
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;           
$limit = 10;  
$offset = ($page - 1) * $limit; 


$sql = "SELECT DISTINCT
            BookID,
            Title,
            Author,
            PublishedYear,
            YearLevel,
            Subject,
            ProgramID,
            AvailableCopies
        FROM books
        WHERE
            (BookID LIKE '%$search%' OR Title LIKE '%$search%' OR Author LIKE '%$search%' OR Subject LIKE '%$search%' OR YearLevel LIKE '%$search%' OR ProgramID LIKE '%$search%' OR CAST(PublishedYear AS CHAR) LIKE '%$search%')
        AND
            (
                '$yearLevel' = 'all' OR TRIM(YearLevel) LIKE '%$yearLevel%'
            )
        AND
            (
                '$program' = 'all' OR TRIM(ProgramID) LIKE '%$program%'
            )
        LIMIT $limit OFFSET $offset";

// Execute the query
$result = $conn->query($sql);


$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}


$totalResult = $conn->query("SELECT COUNT(*) AS total FROM books WHERE (BookID LIKE '%$search%' OR Title LIKE '%$search%' OR Author LIKE '%$search%' OR Subject LIKE '%$search%' OR YearLevel LIKE '%$search%' OR ProgramID LIKE '%$search%' OR CAST(PublishedYear AS CHAR) LIKE '%$search%')
    AND ('$yearLevel' = 'all' OR TRIM(YearLevel) LIKE '%$yearLevel%')
    AND ('$program' = 'all' OR TRIM(ProgramID) LIKE '%$program%')");
$totalRow = $totalResult->fetch_assoc();
$totalPages = ceil($totalRow['total'] / $limit);


$conn->close();


echo json_encode(['books' => $books, 'totalPages' => $totalPages]);
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection setup
$host = 'localhost';      // Your database host
$username = 'root';       // Your database username
$password = '';           // Your database password
$dbname = 'libsync';      // Your database name

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get query parameters from the request
$search = isset($_GET['search']) ? $_GET['search'] : '';         // Search term (title, author, subject, etc.)
$yearLevel = isset($_GET['yearLevel']) ? $_GET['yearLevel'] : 'all'; // Year level (1st, 2nd, etc.)
$program = isset($_GET['program']) ? $_GET['program'] : 'all';      // Program (CS01, IT01, EMC01)
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;            // Current page
$limit = 10;  // Items per page
$offset = ($page - 1) * $limit;  // Pagination offset

// Prepare SQL query with search, year level, and program filters
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

// Prepare the results
$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

// Get the total number of pages for pagination
$totalResult = $conn->query("SELECT COUNT(*) AS total FROM books WHERE (BookID LIKE '%$search%' OR Title LIKE '%$search%' OR Author LIKE '%$search%' OR Subject LIKE '%$search%' OR YearLevel LIKE '%$search%' OR ProgramID LIKE '%$search%' OR CAST(PublishedYear AS CHAR) LIKE '%$search%')
    AND ('$yearLevel' = 'all' OR TRIM(YearLevel) LIKE '%$yearLevel%')
    AND ('$program' = 'all' OR TRIM(ProgramID) LIKE '%$program%')");
$totalRow = $totalResult->fetch_assoc();
$totalPages = ceil($totalRow['total'] / $limit);

// Close the database connection
$conn->close();

// Return the results as JSON
echo json_encode(['books' => $books, 'totalPages' => $totalPages]);
?>

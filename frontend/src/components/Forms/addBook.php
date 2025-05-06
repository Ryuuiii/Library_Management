<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type'); 
header('Access-Control-Allow-Credentials: true'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); 
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

$bookID = $input['bookID'];
$title = $input['title'];
$author = $input['author'];
$publishedYear = $input['publishedYear'];
$subject = $input['subject'];
$programID = $input['programID'];
$yearLevel = $input['yearLevel'];
$availableCopies = $input['availableCopies'];

$query = "INSERT INTO books (BookID, BookTitle, Author, PublishedYear, Subject, YearLevel, AvailableCopies) 
          VALUES ('$bookID', '$title', '$author', '$publishedYear', '$subject', '$yearLevel', '$availableCopies')";

if ($conn->query($query)) {
    $programQuery = "INSERT INTO book_program (BookID, ProgramID) VALUES ('$bookID', '$programID')";
    if ($conn->query($programQuery)) {
        echo json_encode(['message' => 'Book added successfully']);
    } else {
        error_log("Error inserting into book_program: " . $conn->error);
        echo json_encode(['error' => 'Failed to add book to program: ' . $conn->error]);
    }
} else {
    error_log("Error inserting into books: " . $conn->error);
    echo json_encode(['error' => 'Failed to add book: ' . $conn->error]);
}
?>
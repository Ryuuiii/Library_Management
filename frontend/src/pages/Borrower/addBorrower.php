<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}

// Get input data
$input = json_decode(file_get_contents('php://input'), true);

$borrowerID = $input['borrowerID'];
$emailAddress = $input['emailAddress'];
$fullName = $input['fullName'];
$borrowerTypeID = $input['borrowerTypeID'];
$programName = $input['programName'];
$yearLevel = $input['yearLevel'];

// Insert borrower
$query = "
    INSERT INTO borrowers (BorrowerID, EmailAddress, FullName, BorrowerTypeID, ProgramName, YearLevel)
    VALUES ('$borrowerID', '$emailAddress', '$fullName', '$borrowerTypeID', '$programName', '$yearLevel')
";

if ($conn->query($query)) {
    echo json_encode(['message' => 'Borrower added successfully']);
} else {
    echo json_encode(['error' => 'Failed to add borrower: ' . $conn->error]);
}
?>
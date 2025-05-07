<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
    exit();
}

// Get input data
$input = json_decode(file_get_contents('php://input'), true);

$borrowerID = $_GET['id'];
$emailAddress = $input['emailAddress'];
$fullName = $input['fullName'];
$borrowerTypeID = $input['borrowerTypeID'];
$programName = $input['programName'];
$yearLevel = $input['yearLevel'];

// Update borrower
$query = "
    UPDATE borrowers
    SET 
        EmailAddress = '$emailAddress',
        FullName = '$fullName',
        BorrowerTypeID = '$borrowerTypeID',
        ProgramName = '$programName',
        YearLevel = '$yearLevel'
    WHERE BorrowerID = '$borrowerID'
";

if ($conn->query($query)) {
    echo json_encode(['message' => 'Borrower updated successfully']);
} else {
    echo json_encode(['error' => 'Failed to update borrower: ' . $conn->error]);
}
?>
<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

$input = json_decode(file_get_contents('php://input'), true);

if (
    !$input ||
    !isset(
        $input['borrowerID'],
        $input['emailAddress'],
        $input['Name'],
        $input['borrowerTypeID'],
        $input['programID'],
        $input['yearLevel']
    )
) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required data']);
    exit();
}

$borrowerID = $input['borrowerID'];
$emailAddress = $input['emailAddress'];
$Name = $input['Name'];
$borrowerTypeID = $input['borrowerTypeID'];
$programID = $input['programID'];
$yearLevel = $input['yearLevel'];

$queryCheck = "SELECT * FROM borrower WHERE borrowerID = ?";
$stmtCheck = $conn->prepare($queryCheck);
$stmtCheck->bind_param("s", $borrowerID);
$stmtCheck->execute();
$resultCheck = $stmtCheck->get_result();

if ($resultCheck->num_rows > 0) {
    http_response_code(409); // 👈 Set this first!
    echo json_encode(['error' => 'Borrower ID already exists']);
    $stmtCheck->close();
    $conn->close();
    exit();
}

$stmtCheck->close();

$query = "INSERT INTO borrower (borrowerID, emailAddress, Name, borrowerTypeID, programID, yearLevel) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssssss", $borrowerID, $emailAddress, $Name, $borrowerTypeID, $programID, $yearLevel);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Borrower added successfully']);
} else {
    echo json_encode(['error' => 'Failed to add borrower: ' . $stmt->error]);
    http_response_code(500);
}

$stmt->close();
$conn->close();
?>
<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($_GET['id']) || !$input || !isset($input['emailAddress'], $input['Name'], $input['borrowerTypeID'], $input['programID'], $input['yearLevel'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required data']);
    exit();
}

$borrowerID = $_GET['id'];
$emailAddress = $input['emailAddress'];
$Name = $input['Name'];
$borrowerTypeID = $input['borrowerTypeID'];
$programID = $input['programID'];
$yearLevel = $input['yearLevel'];

$query = "UPDATE borrower SET EmailAddress = ?, Name = ?, BorrowerTypeID = ?, ProgramID = ?, YearLevel = ? WHERE BorrowerID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssssss", $emailAddress, $Name, $borrowerTypeID, $programID, $yearLevel, $borrowerID);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Borrower updated successfully']);
} else {
    echo json_encode(['error' => 'Failed to update borrower: ' . $stmt->error]);
    http_response_code(500);
}

$stmt->close();
$conn->close();
?>
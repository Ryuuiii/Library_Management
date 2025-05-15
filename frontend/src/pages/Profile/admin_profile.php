<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if (!isset($_SESSION['userID'])) {
    echo json_encode(['error' => 'Not authenticated']);
    exit();
}

$conn = new mysqli("localhost", "root", "", "library");

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$userID = $_SESSION['userID'];  // Should be 'A001' based on login

// Adjust the query to match LoginID instead of AdminID
$sql = "SELECT AdminID AS id, Name AS name, Role AS role, LoginID FROM administrator WHERE LoginID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userID);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        'id' => $row['id'],
        'name' => $row['name'],
        'role' => $row['role'],
        'loginID' => $row['LoginID'],  // rename key here for React
    ]);
} else {
    echo json_encode(['error' => 'Admin not found']);
}


$conn->close();
?>

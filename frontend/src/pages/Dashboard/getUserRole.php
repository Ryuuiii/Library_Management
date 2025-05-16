<?php
session_start(); 
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if (!isset($_SESSION['userID'])) {
    error_log("Session userID is not set");
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit();
}

$userID = $_SESSION['userID'];
error_log("Session userID: " . $userID);

$conn = new mysqli("localhost", "root", "", "library");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

$sql = "SELECT role FROM authentication WHERE loginID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    echo json_encode(["role" => $user['role']]);
} else {
    http_response_code(404);
    echo json_encode(["error" => "User not found"]);
}

$stmt->close();
$conn->close();
?>
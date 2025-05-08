<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'libsync';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$oldPassword = $data['oldPassword'] ?? '';
$newPassword = $data['newPassword'] ?? '';
$confirmPassword = $data['confirmPassword'] ?? '';
$username = 'default_user';

$response = [
    'error' => '',
    'success' => ''
];

if (empty($oldPassword) || empty($newPassword) || empty($confirmPassword)) {
    $response['error'] = 'All fields are required.';
    echo json_encode($response);
    exit();
}

if ($newPassword !== $confirmPassword) {
    $response['error'] = 'New passwords do not match.';
    echo json_encode($response);
    exit();
}

// Step 1: Fetch current password
$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    $response['error'] = 'User not found.';
    echo json_encode($response);
    exit();
}

$row = $result->fetch_assoc();
$storedPassword = $row['password'];

// Step 2: Verify old password
if (!password_verify($oldPassword, $storedPassword)) {
    $response['error'] = 'Incorrect old password.';
    echo json_encode($response);
    exit();
}

// Step 3: Hash and update new password
$hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
$updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
$updateStmt->bind_param("ss", $hashedNewPassword, $username);

if ($updateStmt->execute()) {
    $response['success'] = 'Password updated successfully.';
} else {
    $response['error'] = 'Failed to update password: ' . $updateStmt->error;
}

$conn->close();

echo json_encode($response);
?>
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db.php';

session_start(); // If you use sessions for authentication

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$adminId = $data['id'] ?? '';
$currentPassword = $data['currentPassword'] ?? '';
$newPassword = $data['newPassword'] ?? '';

if (!$adminId || !$currentPassword || !$newPassword) {
    echo json_encode(['error' => 'Missing required fields.']);
    exit;
}

// Fetch current password hash from DB
$stmt = $conn->prepare("
    SELECT a.password 
    FROM authentication a 
    INNER JOIN administrator ad ON a.LoginID = ad.LoginID 
    WHERE a.LoginID = ?
");
$stmt->bind_param("s", $adminId);
$stmt->execute();
$stmt->bind_result($hashedPassword);
if ($stmt->fetch()) {
    if (!password_verify($currentPassword, $hashedPassword)) {
        echo json_encode(['error' => 'Current password is incorrect.']);
        exit;
    }
} else {
    echo json_encode(['error' => 'Admin not found.']);
    exit;
}
$stmt->close();

// Update to new password
$newHashed = password_hash($newPassword, PASSWORD_DEFAULT);
$update = $conn->prepare("UPDATE authentication SET password = ? WHERE LoginID = ?");
$update->bind_param("ss", $newHashed, $adminId);
if ($update->execute()) {
    echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
} else {
    echo json_encode(['error' => 'Failed to update password.']);
}
$update->close();
$conn->close();
?>
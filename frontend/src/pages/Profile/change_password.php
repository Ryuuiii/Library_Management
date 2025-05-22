<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

session_start();

$data = json_decode(file_get_contents("php://input"), true);

$loginID = $data['loginID'] ?? '';
$currentPassword = $data['currentPassword'] ?? '';
$newPassword = $data['newPassword'] ?? '';

if (!$loginID || !$currentPassword || !$newPassword) {
    echo json_encode(['error' => 'Missing required fields.']);
    exit;
}

$stmt = $conn->prepare("
    SELECT a.password 
    FROM authentication a 
    INNER JOIN administrator ad ON a.LoginID = ad.LoginID 
    WHERE a.LoginID = ?
");
$stmt->bind_param("s", $loginID);
$stmt->execute();
$stmt->bind_result($storedHash);

if ($stmt->fetch()) {
    $stmt->close();

    $currentPasswordHash = hash('sha256', $currentPassword);
    if ($currentPasswordHash !== $storedHash) {
        echo json_encode(['error' => 'Current password is incorrect.']);
        exit;
    }

    $newPasswordHash = hash('sha256', $newPassword);

    $update = $conn->prepare("UPDATE authentication SET password = ? WHERE LoginID = ?");
    $update->bind_param("ss", $newPasswordHash, $loginID);

    if ($update->execute()) {
        echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
    } else {
        echo json_encode(['error' => 'Failed to update password.']);
    }

    $update->close();
    $conn->close();

} else {
    echo json_encode(['error' => 'Admin not found.']);
    exit;
}
?>

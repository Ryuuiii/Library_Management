<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';  // Make sure

if (!isset($_SESSION['userID'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

$loginID = $_SESSION['userID'];

$data = json_decode(file_get_contents("php://input"), true);

$currentPassword = $data['currentPassword'] ?? '';
$newPassword = $data['newPassword'] ?? '';

if (!$currentPassword || !$newPassword) {
    echo json_encode(['error' => 'Missing required fields.']);
    exit();
}

$sql = "
    SELECT a.password 
    FROM authentication a 
    INNER JOIN borrower b ON a.LoginID = b.LoginID 
    WHERE a.LoginID = ?
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['error' => 'Database error: failed to prepare statement']);
    exit();
}

$stmt->bind_param("s", $loginID);
$stmt->execute();
$stmt->bind_result($storedHash);

if ($stmt->fetch()) {
    error_log("Stored password hash for user $loginID: $storedHash");

    $stmt->close();

    $currentPasswordHash = hash('sha256', $currentPassword);

    if ($currentPasswordHash !== $storedHash) {
        echo json_encode(['error' => 'Current password is incorrect.']);
        exit();
    }

    $newPasswordHash = hash('sha256', $newPassword);

    $update = $conn->prepare("UPDATE authentication SET password = ? WHERE LoginID = ?");
    if (!$update) {
        echo json_encode(['error' => 'Database error: failed to prepare update statement']);
        exit();
    }

    $update->bind_param("ss", $newPasswordHash, $loginID);

    if ($update->execute()) {
        echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
    } else {
        echo json_encode(['error' => 'Failed to update password.']);
    }

    $update->close();
    $conn->close();

} else {
    echo json_encode(['error' => 'Borrower not found.']);
    exit();
}
?>

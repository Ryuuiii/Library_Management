<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$adminID = $data['adminID'];
$adminName = $data['name'];
$adminRole = $data['role'];
$loginRole = "admin";

function generateRandomPassword($length = 8) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return substr(str_shuffle($chars), 0, $length);
}

$defaultPassword = generateRandomPassword();
$hashedPassword = password_hash($defaultPassword, PASSWORD_BCRYPT);

$loginID = "";
$tries = 0;
do {
    $tries++;
    $result = $conn->query("SELECT LoginID FROM authentication ORDER BY LoginID DESC LIMIT 1");
    if ($result && $row = $result->fetch_assoc()) {
        $lastLoginID = $row['LoginID']; // e.g., L005
        $num = intval(substr($lastLoginID, 1)) + 1;
        $loginID = "A" . str_pad($num, 3, "0", STR_PAD_LEFT); // e.g., L006
    } else {
        $loginID = "A000";
    }

    $checkStmt = $conn->prepare("SELECT LoginID FROM authentication WHERE LoginID = ?");
    $checkStmt->bind_param("s", $loginID);
    $checkStmt->execute();
    $checkStmt->store_result();
} while ($checkStmt->num_rows > 0 && $tries < 10);

$conn->begin_transaction();

try {
    $stmt1 = $conn->prepare("INSERT INTO authentication (LoginID, Password, role) VALUES (?, ?, ?)");
    $stmt1->bind_param("sss", $loginID, $hashedPassword, $loginRole);
    $stmt1->execute();

    $stmt2 = $conn->prepare("INSERT INTO administrator (AdminID, LoginID, Name, Role) VALUES (?, ?, ?, ?)");
    $stmt2->bind_param("ssss", $adminID, $loginID, $adminName, $adminRole);
    $stmt2->execute();

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Admin created successfully!",
        "loginID" => $loginID,
        "defaultPassword" => $defaultPassword
    ]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

$conn->close();
?>

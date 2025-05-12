<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


require_once 'db.php';

// Get data from JSON request
$data = json_decode(file_get_contents("php://input"), true);
$adminID = $data['adminID'];
$adminName = $data['name'];
$adminRole = $data['role'];
$loginRole = "admin";

// Generate random password
function generateRandomPassword($length = 8) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return substr(str_shuffle($chars), 0, $length);
}

$defaultPassword = generateRandomPassword();
$hashedPassword = password_hash($defaultPassword, PASSWORD_BCRYPT);

// Generate next LoginID (like L001, L002...)
$result = $conn->query("SELECT LoginID FROM authentication ORDER BY LoginID DESC LIMIT 1");
if ($result && $row = $result->fetch_assoc()) {
    $lastLoginID = $row['LoginID']; // e.g., L005
    $num = intval(substr($lastLoginID, 1)) + 1;
    $loginID = "L" . str_pad($num, 3, "0", STR_PAD_LEFT); // e.g., L006
} else {
    $loginID = "L001";
}

$conn->begin_transaction();

try {
    // Insert into login table
    $stmt1 = $conn->prepare("INSERT INTO authentication (LoginID, Password, role) VALUES (?, ?, ?)");
    $stmt1->bind_param("sss", $loginID, $hashedPassword, $loginRole);
    $stmt1->execute();

    // Insert into admin table
    $stmt2 = $conn->prepare("INSERT INTO administrator (AdminID, LoginID, Name, Role) VALUES (?, ?, ?, ?)");
    $stmt2->bind_param("ssss", $adminID, $loginID, $adminName, $adminRole);
    $stmt2->execute();

    $conn->commit();

    // Return LoginID and default password
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

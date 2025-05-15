<?php
session_start();

// Show errors (for dev)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    exit(0);
}

// Set headers
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

// Get JSON input
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['loginID']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing loginID or password"]);
    exit();
}

$loginID = $input['loginID'];
$password = $input['password'];

// Hash password with sha256
$passwordHash = hash('sha256', $password);

// Connect to DB
$conn = new mysqli("localhost", "root", "", "library");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Prepare and execute SQL with SHA256 hash check
$sql = "SELECT loginID, role FROM authentication WHERE loginID = ? AND password = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare SQL statement"]);
    exit();
}

$stmt->bind_param("ss", $loginID, $passwordHash);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    $_SESSION['userID'] = $user['loginID'];

    echo json_encode([
        "message" => "Login successful",
        "loginID" => $user['loginID'],
        "role" => $user['role']
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Invalid ID or password"]);
}

$stmt->close();
$conn->close();
?>

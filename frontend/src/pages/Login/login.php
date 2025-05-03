<?php
// Show PHP errors during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Only POST requests are allowed"]);
    exit();
}

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

// Get and parse input
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['loginID']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing loginID or password"]);
    exit();
}

$loginID = $input['loginID'];
$password = hash('sha256', $input['password']);

// Connect to DB
$conn = new mysqli("localhost", "root", "", "library");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Validate credentials
$sql = "SELECT * FROM authentication WHERE loginID = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $loginID, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    if (!isset($user['role'])) {
        echo json_encode(["error" => "Unknown role"]);
        exit();
    }

    echo json_encode([
        "message" => "Login successful",
        "loginID" => $user['loginID'],
        "role" => $user['role']
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Invalid ID or password"]);
}

$conn->close();
?>

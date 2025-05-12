<?php
session_start(); // Start the session

// Show PHP errors during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    exit(0);
}

// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Get and parse input
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['loginID']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing loginID or password"]);
    exit();
}

$loginID = $input['loginID'];
$password = hash('sha256', $input['password']);

// Connect to the database
$conn = new mysqli("localhost", "root", "", "library");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Validate credentials
$sql = "SELECT loginID, role FROM authentication WHERE loginID = ? AND password = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare SQL statement"]);
    exit();
}

$stmt->bind_param("ss", $loginID, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (!isset($user['role'])) {
        http_response_code(500);
        echo json_encode(["error" => "Unknown role"]);
        exit();
    }

    // Store the loginID in the session after successful validation
    $_SESSION['userID'] = $user['loginID']; // Make sure to set userID
    error_log("Session userID set: " . $_SESSION['userID']); // Log session ID for debugging

    echo json_encode([
        "message" => "Login successful",
        "loginID" => $user['loginID'],
        "role" => $user['role']
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Invalid ID or password"]);
}

// Close the database connection
$stmt->close();
$conn->close();
?>

<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // for local dev, adjust in production
header("Access-Control-Allow-Headers: Content-Type");

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['loginID']) || !isset($input['password'])) {
    echo json_encode(['error' => 'Missing loginID or password']);
    exit;
}

$loginID = $input['loginID'];
$password = $input['password'];

// 🔐 Hash if your DB stores it hashed (skip hashing if not)
$password = hash('sha256', $password); // or remove this line if your DB stores plain text

$conn = new mysqli("localhost", "root", "", "library");

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Update to match your column names: LoginID and Password
$sql = "SELECT * FROM authentication WHERE LoginID = ? AND Password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $loginID, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    $role = $user['role'] ?? 'borrower'; // or 'admin' — add 'role' column if not yet
    echo json_encode(['message' => 'Login successful', 'role' => $role]);
} else {
    echo json_encode(['error' => 'Invalid ID or password']);
}

$conn->close();
?>

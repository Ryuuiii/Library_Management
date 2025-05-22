<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'library';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_SESSION['LoginID'])) {
        http_response_code(401);
        echo json_encode(["error" => "User not logged in"]);
        exit();
    }

    $loginID = $_SESSION['LoginID'];

    $stmt = $conn->prepare("SELECT BorrowerID, Name, EmailAddress, YearLevel, ProgramID, BorrowerTypeID FROM borrower WHERE LoginID = ?");
    $stmt->bind_param("s", $loginID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode([
            "BorrowerID" => $row['BorrowerID'],
            "name" => $row['Name'],
            "email" => $row['EmailAddress'],
            "yearLevel" => $row['YearLevel'],
            "programID" => $row['ProgramID'],
            "borrowerTypeID" => $row['BorrowerTypeID']
        ]);
    } else {
        echo json_encode(["error" => "Borrower not found"]);
    }

    $stmt->close();
    $conn->close();
    exit();
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
exit();
?>

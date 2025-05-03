<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "library";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    error_log("Database connection error: " . $conn->connect_error);
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}
?>
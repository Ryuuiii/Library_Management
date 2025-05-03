<?php
$host = "localhost";
$user = "root";
$password = ""; 
$database = "library";

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        "error" => "Connection failed: " . $conn->connect_error
    ]));
}
?>

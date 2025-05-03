<?php
$host = "localhost";
$user = "root";
$password = ""; // Change if your MySQL password is set
$database = "library_physical_model_data";

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        "error" => "Connection failed: " . $conn->connect_error
    ]));
}
?>

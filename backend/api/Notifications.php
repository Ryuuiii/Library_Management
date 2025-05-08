<?php
// DB connection
$servername = "localhost";  // Your database server
$username = "root";         // Your database username
$password = "";             // Your database password
$dbname = "libsync";        // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Allow all origins
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');


// Get today's date
$currentDate = date('Y-m-d');

// Query to fetch overdue books that have not been returned
$query = "
    SELECT 
        b.BookID, 
        b.BorrowerID, 
        b.DueDate, 
        b.ReturnDate,
        DATEDIFF('$currentDate', b.DueDate) AS daysOverdue
    FROM 
        borrowrecords b
    WHERE 
        b.DueDate < '$currentDate' AND 
        b.ReturnDate IS NULL
";

$result = mysqli_query($conn, $query);

if ($result) {
    $notifications = [];

    // Check each row
    while ($row = mysqli_fetch_assoc($result)) {
        $bookID = $row['BookID'];
        $borrowerID = $row['BorrowerID'];
        $dueDate = $row['DueDate'];
        $daysOverdue = $row['daysOverdue'];

        // Format notification message based on days overdue
        if ($daysOverdue == 0) {
            // If overdue is 0 days (today)
            $dateLabel = "Today";
            $message = "Your borrowed book [$bookID] is overdue. Please return it as soon as possible.";
        } elseif ($daysOverdue == 1) {
            // If overdue is 1 day (yesterday)
            $dateLabel = "Yesterday";
            $message = "Please return your borrowed book [$bookID] today.";
        } else {
            // If overdue is more than 1 day
            $dateLabel = date('F j, Y', strtotime($currentDate));
            $message = "Your borrowed book [$bookID] was due on $dueDate. Please return it as soon as possible.";
        }

        // Add notification to the array
        $notifications[] = [
            'message' => $message,
            'status' => "$dateLabel"
        ];
    }

    echo json_encode($notifications);
} else {
    echo json_encode(['error' => 'Failed to fetch data from the database.']);
}

// Close the database connection
$conn->close();
?>

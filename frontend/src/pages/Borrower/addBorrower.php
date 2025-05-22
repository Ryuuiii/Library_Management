<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';              

$input = json_decode(file_get_contents('php://input'), true);

if (
    !$input ||
    !isset(
        $input['borrowerID'],
        $input['emailAddress'],
        $input['Name'],
        $input['borrowerTypeID'],
        $input['programID'],
        $input['yearLevel']
    )
) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required data']);
    exit();
}

$borrowerID     = trim($input['borrowerID']);
$emailAddress   = trim($input['emailAddress']);
$Name           = trim($input['Name']);
$borrowerTypeID = trim($input['borrowerTypeID']);
$programID      = trim($input['programID']);
$yearLevel      = trim($input['yearLevel']);

$loginID = $borrowerID;            

$nameParts     = preg_split('/\s+/', $Name);
$lastName      = strtoupper(end($nameParts));
$rawPassword   = "LIB-" . $lastName;
$hashedPassword = hash('sha256', $rawPassword);

$stmt = $conn->prepare("SELECT 1 FROM borrower WHERE borrowerID = ?");
$stmt->bind_param("s", $borrowerID);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['error' => 'Borrower ID already exists']);
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

$conn->begin_transaction();

try {
    /* borrower */
    $stmt1 = $conn->prepare(
        "INSERT INTO borrower
         (borrowerID, EmailAddress, Name, BorrowerTypeID, ProgramID, YearLevel, LoginID)
         VALUES (?,?,?,?,?,?,?)"
    );
    $stmt1->bind_param(
        "sssssss",
        $borrowerID, $emailAddress, $Name,
        $borrowerTypeID, $programID, $yearLevel,
        $loginID
    );
    $stmt1->execute();

    /* authentication */
    $role   = 'borrower';            
    $stmt2 = $conn->prepare(
        "INSERT INTO authentication
         (LoginID, Password, role)
         VALUES (?,?,?)"
    );
    $stmt2->bind_param("sss", $loginID, $hashedPassword, $role);
    $stmt2->execute();

    $conn->commit();

    echo json_encode([
        'message'        => 'Borrower added successfully',
        'loginID'        => $loginID,
        'defaultPassword'=> $rawPassword      
    ]);

} catch (mysqli_sql_exception $e) {
    $conn->rollback();   
    http_response_code(500);
    echo json_encode(['error' => 'Database error: '.$e->getMessage()]);
}

$stmt1?->close();
$stmt2?->close();
$conn->close();
?>

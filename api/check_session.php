<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

session_start(); // Start or resume a session

// Check if the user email is set in the session
if(isset($_SESSION['user_email'])) {
    // Session is valid, return the user's profile information or any other necessary data
    $userEmail = $_SESSION['user_email'];
    
    // Fetch user data based on email (this is just an example)
    // Fetch user details from the database or any other source and return the data
    // Here you should retrieve and return relevant user information
    // Replace this example with actual data retrieval based on your system's structure
    $userData = [
        'email' => $userEmail,
      
    ];
    
    // Respond with the user profile or any necessary data
    echo json_encode([
        'result' => 'valid',
        'profile' => $userData // Sending user profile or relevant data back to React
    ]);
} else {
    // Session is not valid or doesn't exist
    echo json_encode([
        'result' => 'invalid'
    ]);
}
?>
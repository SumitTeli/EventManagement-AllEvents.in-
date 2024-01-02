<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn = mysqli_connect("localhost", "root", "", "eventmanage");
if ($db_conn === false) {
  die("ERROR: Could Not Connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  $email = $data['email']; // Assuming you receive email and other necessary details from the front end
  $googleId = $data['google_id']; // Google ID received after authentication
 
  $userName = $data['user_name']; // User name received after authentication

  // Check if the user already exists based on Google ID
  $checkUserQuery = "SELECT * FROM `users` WHERE `google_id` = '$googleId'";
  $userResult = mysqli_query($db_conn, $checkUserQuery);

  if (mysqli_num_rows($userResult) > 0) {
    echo json_encode(["result" => "User already exists"]); // Return user exists message
    return;
  } else {
    // Insert new user into the users table
    $insertUserQuery = "INSERT INTO `users` (`email`, `google_id`, `user_name`, `created_at`) VALUES ('$email', '$googleId', '$userName', NOW())";
    if (mysqli_query($db_conn, $insertUserQuery)) {
      echo json_encode(["result" => "User inserted successfully"]); // Return success message
      return;
    } else {
      echo json_encode(["result" => "Error inserting user"]); // Return error message if insertion fails
      return;
    }
  }
} else {
  echo json_encode(["result" => "Invalid request"]); // Return message for invalid request method
  return;
}
?>
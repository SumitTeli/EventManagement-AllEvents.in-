<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
session_start();

$db_conn = mysqli_connect("localhost", "root", "", "eventmanage");
if ($db_conn === false) {
    die("ERROR: Could Not Connect" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {
  if (isset($_GET['username']) && isset($_GET['password'])) {
    $username = $_GET['username'];
    $password = $_GET['password'];

    // Protect against SQL injection
    $username = mysqli_real_escape_string($db_conn, $username);
    $password = mysqli_real_escape_string($db_conn, $password);

    $sql = "SELECT * FROM admin WHERE username='$username' AND password='$password'";
    $result = $db_conn->query($sql);

    if ($result === false) {
      echo json_encode(["error" => "Query execution error"]);
      return;
    } else {
      if ($result->num_rows > 0) {
        // Valid credentials, set up session
        $_SESSION['username'] = $username;
        echo json_encode(["result" => "Login successful"]);
        return;
      } else {
        // Invalid credentials
        echo json_encode(["error" => "Invalid username or password"]);
        return;
      }
    }
  } else {
    echo json_encode(["error" => "Username and password not provided"]);
    return;
  }
}

$db_conn->close();
?>
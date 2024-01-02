<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
// include_once('/login.php');
$db_conn = mysqli_connect("localhost", "root", "", "eventmanage");
if ($db_conn === false) {
    die("ERROR: Could Not Connect" . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
  $categoryData = $_POST; // Get category data

  // Extract category details from the form data
  $categoryName = $categoryData['categoryName'];
  $categoryDescription = $categoryData['categoryDescription'];

  // Insert category into the database
  $result = mysqli_query($db_conn, "INSERT INTO category (category_name, description) 
              VALUES ('$categoryName', '$categoryDescription')");



  if ($result) {
      echo json_encode(["success" => "Category Added Successfully"]);
      return;
  } else {
      echo json_encode(["error" => "Failed to add category. Please check the data!"]);
      return;
  }
}

?>
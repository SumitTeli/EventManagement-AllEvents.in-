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

if ($method === "GET") {
  $allCategories = mysqli_query($db_conn, "SELECT * FROM `category`");
  if (mysqli_num_rows($allCategories) > 0) {
    while ($row = mysqli_fetch_array($allCategories)) {
      $json_array["categories"][] = array(
        "id" => $row['category_id'],
        "name" => $row['category_name']
      );
    }
    echo json_encode($json_array["categories"]);
    return;
  } else {
    echo json_encode(["result" => "No categories found"]);
    return;
  }
}
?>
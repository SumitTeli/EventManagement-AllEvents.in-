<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


// Establish database connection
$db_conn = mysqli_connect("localhost", "root", "", "eventmanage");
if ($db_conn === false) {
    die("ERROR: Could Not Connect" . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    // Fetch category details from the database
    $result = mysqli_query($db_conn, "SELECT * FROM category");

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $categories = array();

            // Fetch data into an array
            while ($row = mysqli_fetch_assoc($result)) {
                $categories[] = $row;
            }

            // Return categories as JSON response
            echo json_encode($categories);
        } else {
            echo json_encode(["error" => "No categories found"]);
        }
    } else {
        echo json_encode(["error" => "Query execution error: " . mysqli_error($db_conn)]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
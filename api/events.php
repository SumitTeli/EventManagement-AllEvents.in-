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
    $allEvents = mysqli_query($db_conn, "SELECT e.*, c.category_name 
                                         FROM events e 
                                         LEFT JOIN category c ON e.category_id = c.category_id");
    if (mysqli_num_rows($allEvents) > 0) {
        $eventsArray = [];
        while ($row = mysqli_fetch_assoc($allEvents)) {
            $eventsArray[] = array(
                "event_id" => $row['event_id'],
                "user_id" => $row['user_id'],
                "event_name" => $row['event_name'],
                "start_time" => $row['start_time'],
                "end_time" => $row['end_time'],
                "description" => $row['description'],
                "banner_image_url" => $row['banner_image_url'],
                "created_at" => $row['created_at'],
                "category_id" => $row['category_id'],
                "category_name" => $row['category_name'], // Include category name
                "state" => $row['state'],
                "city" => $row['city'],
                "zip_code" => $row['zip_code']
                // Add more fields as needed
            );
        }
        echo json_encode($eventsArray);
    } else {
        echo json_encode(["result" => "No events found"]);
    }
}
?>
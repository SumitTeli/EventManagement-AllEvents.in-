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

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $allUsers = mysqli_query($db_conn, "SELECT * FROM users");
    if (mysqli_num_rows($allUsers) > 0) {
        while ($row = mysqli_fetch_array($allUsers)) {
            $jsonArray["userdata"][] = array(
                "id" => $row['user_id'],
                "username" => $row['user_name'],
                "email" => $row['email'],
                "id" => $row['user_id']
            );
        }
        echo json_encode($jsonArray["userdata"]);
        return;
    } else {
        echo json_encode(["result" => "Please check the data"]);
        return;
    }
} elseif ($_SERVER['REQUEST_METHOD'] === "POST") {
    $eventData = $_POST; // Get form data

    $googleId = $eventData['google_id']; // Retrieve the Google ID from the form data

    // Fetch user ID based on the provided Google ID
    $query1 = "SELECT user_id FROM users WHERE google_id = '$googleId'";
    $result1 = mysqli_query($db_conn, $query1);

    if ($result1 && mysqli_num_rows($result1) > 0) {
        $row = mysqli_fetch_assoc($result1);
        $userId = $row['user_id'];

        $eventName = $eventData['eventName'];
        $description = $eventData['description'];
        $startDate = $eventData['startDate'];
        $endDate = $eventData['endDate'];
        $state = $eventData['state'];
        $city = $eventData['city'];
        $zipCode = $eventData['zipCode'];
        $category = $eventData['category'];

        // Handle image upload
        if (isset($_FILES['bannerImage'])) {
            $targetDirectory = "images/"; // Directory to store uploaded images
            $targetFileName = basename($_FILES["bannerImage"]["name"]);
            $targetFile = $targetDirectory . $targetFileName;
        
            if (move_uploaded_file($_FILES["bannerImage"]["tmp_name"], $targetFile)) {
                // File uploaded successfully, generate the image location for the database
                $imagePath = 'http://localhost/reactcurdphp/api/images/'.$targetFileName;
        
        
                // Insert data into the database using the fetched user ID
                $result = mysqli_query($db_conn, "INSERT INTO events 
                    (user_id, event_name, start_time, end_time, description,  banner_image_url, created_at, category_id, state, city, zip_code) 
                    VALUES ('$userId','$eventName', '$startDate','$endDate', '$description','$imagePath', NOW(),'$category','$state', '$city', '$zipCode')");

                if ($result) {
                    echo json_encode(["success" => "Event Added Successfully"]);
                    return;
                } else {
                    echo json_encode(["error" => "Failed to add event. Please check the data!"]);
                    return;
                }
            } else {
                echo json_encode(["error" => "Failed to upload the image"]);
                return;
            }
        } else {
            echo json_encode(["error" => "No image uploaded"]);
            return;
        }
    } else {
        echo json_encode(["error" => "User not found"]);
        return;
    }
}


?>
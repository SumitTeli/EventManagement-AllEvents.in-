<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_FILES['bannerImage'])) {
    $targetDirectory = "images/"; // Directory to store uploaded images
    $targetFile = $targetDirectory . basename($_FILES["bannerImage"]["name"]);

    if (move_uploaded_file($_FILES["bannerImage"]["tmp_name"], $targetFile)) {
        // Image uploaded successfully
        echo json_encode(["success" => "Image uploaded successfully"]);
    } else {
        echo json_encode(["error" => "Failed to upload image"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
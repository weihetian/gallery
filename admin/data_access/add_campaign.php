<?php
$servername = "52.23.43.247";
$username = "stak";
$password = "stakstudios";
$database = "gallery";
// Create connection
$conn = mysqli_connect($servername, $username, $password,$database,"3306");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$name = $_POST['name'];
$description = $_POST['description'];

$query = "INSERT INTO campaign(campaign_name,campaign_description) VALUES('$name','$description')";

if (mysqli_query($conn, $query)) {
    echo "succeed";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);



?>

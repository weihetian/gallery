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

$id = $_POST['id'];

$query = "DELETE FROM picture WHERE id = '$id'";

if (mysqli_query($conn, $query)) {
    echo "succeed";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);



?>

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
//echo "Connected successfully";

$user = $_POST['user'];
$password = $_POST['password'];

$user = "admin";

$sql = "SELECT * FROM admin WHERE user = '$user' LIMIT 1";


$result = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_array($result)) {
  $hash =  $row['password'];
  if (password_verify($password, $hash)) {
      echo 'succeed';
  } else {
      echo 'Invalid password.';
  }


}

 ?>

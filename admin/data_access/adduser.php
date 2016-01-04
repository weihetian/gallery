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
echo "Connected successfully";


$user = "admin";

$password = "carvertise12";


$options = [
    'cost' => 11,
];

$password_hashed =  password_hash($password, PASSWORD_BCRYPT,$options);

echo $password_hashed."<br>";

$hash = '$2y$11$M0uySoqIgaatfTLp3gwjY.S055BXFLHcZu5XfV.HAod2URIcvyDlO';

if (password_verify($password, $hash)) {
    echo 'Password is valid!';
} else {
    echo 'Invalid password.';
}


// $query = "INSERT INTO admin(user,password) VALUES('$user','$password_hashed')";
//
// if (mysqli_query($conn, $query)) {
//     echo "Record updated successfully";
// } else {
//     echo "Error updating record: " . mysqli_error($conn);
// }

mysqli_close($conn);


?>

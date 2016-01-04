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

$ds          = DIRECTORY_SEPARATOR;  //1

$storeFolder = '../uploads';   //2

$campaign_id=$_POST['campaign_id'];

if (!empty($_FILES)) {

    $tempFile = $_FILES['file']['tmp_name'];          //3

    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4

    $targetFile =  $targetPath. $_FILES['file']['name'];  //5


    $fakepath = "http://localhost:8888/carvertise/gallery/admin/uploads/".$_FILES['file']['name'];


    move_uploaded_file($tempFile,$targetFile); //6

    $query = "INSERT INTO picture (campaign_id,url) VALUES ('$campaign_id','$fakepath')";
    if (mysqli_query($conn, $query)) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }

}


mysqli_close($conn);

?>

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

$query = "SELECT * FROM campaign ORDER BY id DESC";

$campaign_result = array();

$result = mysqli_query($conn,$query);
while($row = mysqli_fetch_array($result)){
  $camapgin_id=$row['id'];
  $campaign_name = $row['campaign_name'];
  $campaign_description = $row['campaign_description'];


  $imagequery = "SELECT * FROM picture WHERE campaign_id = '$camapgin_id' ";

  $image_array = array();
  $imageresult = mysqli_query($conn,$imagequery);
  while($imagerow = mysqli_fetch_array($imageresult)){
    $image_id=$imagerow['id'];
    $image_url = $imagerow['url'];
    $image_description = $imagerow['picture_description'];
    
    $image_array[] = array("id"=>$image_id,"url"=>$image_url,"description"=>$image_description);
  }

  $campaign_result[] = array("id"=>$camapgin_id,"name"=>$campaign_name,"description"=>$campaign_description,"images"=>$image_array);



}

echo json_encode($campaign_result);
mysqli_close($conn);


 ?>

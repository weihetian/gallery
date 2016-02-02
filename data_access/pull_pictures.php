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

$offset=$_GET['offset'];

$query = "SELECT * FROM picture ORDER BY id DESC LIMIT $offset,20 ";

$image_array =array();

$imageresult = mysqli_query($conn,$query);
while($row = mysqli_fetch_array($imageresult)){
  $image_id=$row['id'];
  $image_url = $row['url'];
  if($row['picture_description']==null){
      $image_description="";
  }else{
  $image_description = $row['picture_description'];
}

  $image_array[] = array("id"=>$image_id,"url"=>$image_url,"description"=>$image_description);
}


echo json_encode($image_array);
mysqli_close($conn);



?>

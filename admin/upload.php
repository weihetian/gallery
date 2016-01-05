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

$dir = 'uploads';

 // create new directory with 744 permissions if it does not exist yet
 // owner will be the user/group the PHP script is run under
 if ( !file_exists($dir) ) {
     $oldmask = umask(0);  // helpful when used in linux server
     mkdir ($dir, 0744);
 }

$ds          = DIRECTORY_SEPARATOR;  //1

$storeFolder = 'uploads';   //2

$campaign_id=$_POST['campaign_id'];

if (!empty($_FILES)) {

    $tempFile = $_FILES['file']['tmp_name'];          //3

    error_log ($tempFile, 3, 'pic_bug.txt');
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
    error_log ("-------", 3, 'pic_bug.txt');
    $targetFile =  $targetPath. $_FILES['file']['name'];  //5
    error_log ($targetFile, 3, 'pic_bug.txt');

    $img = resize_image($tempFile, 800, 800);

    $fakepath = "http://localhost:8888/carvertise/gallery/admin/uploads/".$_FILES['file']['name'];

    $carvertisepath = "http://52.23.43.247/gallery/admin/uploads/".$_FILES['file']['name'];

    if (!imagejpeg($img,'uploads/'.$_FILES['file']['name'])) {
		error_log ("imagejpeg", 3, 'pic_bug.txt');
		echo "Failed to save the cropped image file";
		}


    //move_uploaded_file($img,$targetFile); //6

    $query = "INSERT INTO picture (campaign_id,url) VALUES ('$campaign_id','$carvertisepath')";
    if (mysqli_query($conn, $query)) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }

}


function resize_image($file, $w, $h, $crop=FALSE) {
    list($width, $height) = getimagesize($file);
    $r = $width / $height;
    if ($crop) {
        if ($width > $height) {
            $width = ceil($width-($width*abs($r-$w/$h)));
        } else {
            $height = ceil($height-($height*abs($r-$w/$h)));
        }
        $newwidth = $w;
        $newheight = $h;
    } else {
        if ($w/$h > $r) {
            $newwidth = $h*$r;
            $newheight = $h;
        } else {
            $newheight = $w/$r;
            $newwidth = $w;
        }
    }
    $src = imagecreatefromjpeg($file);
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    return $dst;
}

mysqli_close($conn);

?>

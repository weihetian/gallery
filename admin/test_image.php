<?php
ini_set('display_errors', '1');
//$im = imagecreatefromjpeg("uploads/RS8787-VS-0005.jpg");
$filename ="uploads/RS8787-VS-0005.jpg";
header("Content-type: image/jpeg");
//echo "good";
//if ($filename) {
  // do other stuff...
  // Output the result

resize_image($filename,800,800);
//  imagejpeg($new_image);
 //echo "good";
//}


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
    imagejpeg($dst);
  //  return $dst;
}

?>

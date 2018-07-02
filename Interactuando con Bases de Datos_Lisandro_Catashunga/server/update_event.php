<?php
	require_once('dbConnect.php');

  $id = $_POST["id"];

  $fechai = $_POST["start_date"];
  $horai =$_POST["start_hour"];
  $fechaf = $_POST["end_date"];
  $horaf = $_POST["end_hour"];



    $sql = "UPDATE `evento` SET `id` = $id , `fechai` = '$fechai', `horai` = '$horai', `fechaf` = '$fechaf', `horaf` = '$horaf'";

	//getting result
      if(mysqli_query($con,$sql)){ //ejecuta

      echo json_encode(array("msg" => "OK"));
     }
     else{
      echo json_encode(array("msg" => "error"));
     }

	mysqli_close($con);
?>

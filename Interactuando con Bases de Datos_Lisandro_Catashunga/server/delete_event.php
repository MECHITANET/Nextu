<?php
	require_once('dbConnect.php');

  $id = $_POST["id"];


    $sql = "DELETE FROM `evento` WHERE id = $id";

	//getting result
      if(mysqli_query($con,$sql)){ //ejecuta

      echo json_encode(array("msg" => "OK"));
     }
     else{
      echo json_encode(array("msg" => "error"));
     }

	mysqli_close($con);
?>

<?php
	require_once('dbConnect.php');

  $titulo = $_POST["titulo"];
  $fechai = $_POST["start_date"];
  $horai =$_POST["start_hour"];
  $fechaf = $_POST["end_date"];
  $horaf = $_POST["end_hour"];
  $full =$_POST["allDay"];


    $sql = "INSERT INTO `evento` (`id`, `title`, `fechai`, `horai`, `fechaf`, `horaf`) VALUES (NULL, '$titulo', '$fechai', '$horai', '$fechaf', '$horaf')";

	//getting result
      if(mysqli_query($con,$sql)){ //ejecuta

      echo json_encode(array("msg" => "OK"));
     }
     else{
      echo json_encode(array("msg" => "error"));
     }

	mysqli_close($con);
?>

<?php
session_start();

	//Para loguearme necesto el usario y password

$usuario = $_POST['username'];
$clave = md5($_POST['password']);


	//Importing
	require_once('dbConnect.php');

	//Creating sql query with where clause to get an specific employee
	//$sql = "SELECT * FROM users WHERE id=$id";

    $sql = "SELECT * FROM usuario WHERE email = '$usuario' and clave = '$clave' ";

	//getting result
      $r = mysqli_query($con,$sql); //ejecuta

      $row_cnt = mysqli_num_rows($r);  //obtenemos el numero de resultados de busqueda

    $result = array(); // nos servira para convertir la info en JSON

  if($row_cnt == 1){
        //pushing result to an array
	   	$row = mysqli_fetch_array($r);
	   	$_SESSION['loggedin'] = true;
  		$_SESSION['username'] = $row['email'];
  		$_SESSION['start'] = time();
  		$_SESSION['expire'] = $_SESSION['start'] + (30 * 60);

      echo json_encode(array("msg" => "OK"));
     }
     else{
      echo json_encode(array("msg" => "error"));
     }



	mysqli_close($con);
?>

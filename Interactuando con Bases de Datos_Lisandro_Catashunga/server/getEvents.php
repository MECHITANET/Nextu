<?php
	//Importing Database Script
	require_once('dbConnect.php');
	//variables GET o POST
	//$idtiposervicio = $_GET['idtiposervicio'];


	mysqli_set_charset($con,"utf8");

	$sql = "SELECT id, title, CONCAT(fechai, ' ', horai) As start, CONCAT(fechaf, ' ', horaf) As end FROM `evento`";

	//getting result
	$result = mysqli_query($con,$sql);

	//creating a blank array
	$jsondata = array();

  //  $row_cnt = mysqli_num_rows($r);  //obtenemos el numero de resultados de busqueda

if(mysqli_num_rows($result) > 0){
	$jsondata["success"] = true;
	$jsondata["msg"] = 'OK';
	$jsondata["data"]["eventos"] = array();

	//while($row = $result->fetch_object()){
    while ( $row = mysqli_fetch_object($result)) {
		$jsondata["data"]["eventos"][] = $row;
	}
}
else{
	$jsondata["success"] = false;
	$jsondata["data"] = array('message' => 'No se encontró ningún resultado.' );
	$jsondata["msg"] = "No se han encontrado registros";
}

        header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);
	//Displaying the array in json format
//echo json_encode(array('jsondata'=>$jsondata), JSON_UNESCAPED_UNICODE);

	mysqli_close($con);
 ?>

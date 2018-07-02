<?php
	require_once('dbConnect.php');

  $clave1 = md5('usuario1');
  $clave2 = md5('usuario2');
  $clave3 = md5('usuario3');

    $sql = "INSERT INTO `usuario` (`id`, `email`, `clave`, `nombre`, `fecha_nacimiento`) VALUES (NULL, 'user1@gmail.com', '$clave1', 'lisandro catashunga', '2018-06-26 00:00:00'), (NULL, 'user2@gmail.com', '$clave2', 'walter macedo', '2018-06-26 00:00:00'), (NULL, 'user3@gmail.com', '$clave3', 'walter macedo', '2018-06-26 00:00:00')";

	//getting result
      $r = mysqli_query($con,$sql); //ejecuta

	mysqli_close($con);
?>

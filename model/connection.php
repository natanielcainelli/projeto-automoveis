<?php 

/* Fabrica a conexão */

function connectionFactory() {

	$servername = "localhost";
	$database = "automoveis";
	$username = "root";
	$password = "asdf000";

	$conn = mysqli_connect($servername, $username, $password, $database);
	if (!$conn) {
	    die("Conexão falhou: " . mysqli_connect_error());
	}

	return $conn;

}

/* Encerra a conexão */

function connectionKill($conn) {

	mysqli_close($conn);

}

?>
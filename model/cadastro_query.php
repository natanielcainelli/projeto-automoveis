<?php 

require_once '/var/www/html/projeto-automoveis/model/connection.php';

function verificaLogin($data) {

	$conn = connectionFactory();

	$senhaHash = hash('sha256', $data['senha']);
	
	$sql = "SELECT id,login,senha,email,nome FROM cadastro WHERE login = '" . $data['login'] . "' and senha = '" . $senhaHash . "'";

	error_log($sql);

	$result = $conn->query($sql);
	
	$row = $result->fetch_assoc();

	session_start();
	
	$_SESSION['usuario'] = $row;

	connectionKill($conn);

    if (is_null($row)) {
    	return ['erro' => true, 'msg' => 'Usuario ou senha invalido'];
    }

	return ['erro' => false];

}

function getUser(){

	session_start();

	$nome = $_SESSION['usuario']['nome'];

	return $nome;
}

function cadastraUser($data){

	$conn = connectionFactory();

	$senhaHash = hash('sha256',$data['senha']);


	$sql = "INSERT INTO cadastro (login, senha, email, nome) VALUES ('{$data['login']}', '".$senhaHash."', '{$data['email']}', '{$data['nome']}');";

	error_log($sql);

	$result = $conn->query($sql);

	connectionKill($conn);

	return $result;

}

 ?>
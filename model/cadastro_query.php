<?php 

require_once '/var/www/html/projeto-automoveis/model/connection.php';

function verificaLogin($cadastro) {

	$conn = connectionFactory();

	$senhaHash = hash('sha256', $cadastro->getSenha());
	
	$sql = "SELECT id,login,senha,email,nome FROM cadastro WHERE login = '" . $cadastro->getLogin() . "' and senha = '" . $senhaHash . "'";

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

function cadastraUser($cadastro){

	$conn = connectionFactory();

	$senhaHash = hash('sha256',$cadastro->getSenha());


	$sql = "INSERT INTO cadastro (login, senha, email, nome) VALUES ('".$cadastro->getLogin()."', '".$senhaHash."', '".$cadastro->getEmail()."', '".$cadastro->getNome()."');";

	error_log($sql);

	$result = $conn->query($sql);

	connectionKill($conn);

	return $result;

}

 ?>
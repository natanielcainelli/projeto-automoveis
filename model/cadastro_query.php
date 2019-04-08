<?php 

/* Chama a classe connection para abrir e fechas as conexões */

require_once '/var/www/html/projeto-automoveis/model/connection.php';

/* Verifica se o login é valido (usa a função hash para criptografar a senha e tornar a aplicação mais segura) */

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

/* Cadastra um usuário novo e criptografa a senha com o SHA256(SHA-2) */

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
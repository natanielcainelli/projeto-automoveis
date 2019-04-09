<?php 

/* Chama a classe connection para abrir e fechas as conexões */

require_once '/var/www/html/projeto-automoveis/model/connection.php';

/* Verifica se o login é valido (usa a função hash para criptografar a senha e tornar a aplicação mais segura) */

function verificaLogin($cadastro) {

	$conn = connectionFactory();

	$senhaHash = hash('sha256', $cadastro->getSenha());
	
	$sql = "SELECT id,senha,email,nome FROM cadastro WHERE email = '" . $cadastro->getEmail() . "' and senha = '" . $senhaHash . "'";

	error_log($sql);

	$result = $conn->query($sql);
	
	$row = $result->fetch_assoc();

	session_start();
	
	$_SESSION['usuario'] = $row;

	connectionKill($conn);

    if (is_null($row)) {
    	return ['erro' => true, 'msg' => 'Email ou senha invalido'];
    }

	return ['erro' => false];

}

function verificaCadastro($cadastro) {

	$conn = connectionFactory();
	
	$sql = "SELECT id,senha,email,nome FROM cadastro WHERE email = '". $cadastro->getEmail(). "' ";

	error_log($sql);

	$result = $conn->query($sql);
	

	if($result->num_rows == 0){
		
		connectionKill($conn);
		return [];

	} else{
		
		while($row = $result->fetch_assoc()) {
	    	$response[] = $row; 
	    }
		
		connectionKill($conn);
		return $response;
	}
	
}

/* Cadastra um usuário novo e criptografa a senha com o SHA256(SHA-2) */

function cadastraUser($cadastro){

	$conn = connectionFactory();

	$senhaHash = hash('sha256',$cadastro->getSenha());

	$sql = "INSERT INTO cadastro (senha, email, nome) VALUES ('".$senhaHash."', '".$cadastro->getEmail()."', '".$cadastro->getNome()."');";

	error_log($sql);

	$result = $conn->query($sql);

	connectionKill($conn);

	return $result;

}

?>
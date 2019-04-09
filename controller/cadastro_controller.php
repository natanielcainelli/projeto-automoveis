<?php 

require_once('../api/router.php');
require_once('../api/index.php');

/* Chamadas de classes que executam querys */

require_once '/var/www/html/projeto-automoveis/model/connection.php';
require_once '/var/www/html/projeto-automoveis/model/cadastro_query.php';
require_once '/var/www/html/projeto-automoveis/model/basic/basic.php';

/* Chamadas de classes que instanciam objetos */

require_once '/var/www/html/projeto-automoveis/persistence/cadastro.php';

class CadastroController {

	function verificaLogin($params) {

		$cadastro = new Cadastro();

		$cadastro->setEmail($params['data']['email']);
		$cadastro->setSenha($params['data']['senha']);

		$erro = verificaLogin($cadastro);

		return $erro;
	}

	function getUsuario() {
		session_start();
		
		$nome = $_SESSION['usuario']['nome'];

		return $nome;
	}

	function cadastraUsuario($params) {
		$cadastro = new Cadastro();

		$cadastro->setSenha($params['data']['senha']);
		$cadastro->setEmail($params['data']['email']);
		$cadastro->setNome($params['data']['nome']);

		return cadastraUser($cadastro);
		
	}
	
	function verificaCadastro($params) {

		$cadastro = new Cadastro();

		$cadastro->setEmail($params['data']['email']);

		return verificaCadastro($cadastro);
	}

	function verificarEmail($endereço) { 

		$er='#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#';

		 if(preg_match($er,$endereço)) {

		 	return true;

		 }else {

		 	return false;

		 }  
	}

}
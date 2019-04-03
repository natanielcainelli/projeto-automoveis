<?php 

require_once '/var/www/html/projeto-automoveis/model/connection.php';
require_once '/var/www/html/projeto-automoveis/model/cadastro_query.php';
require_once '/var/www/html/projeto-automoveis/model/veiculo_query.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';
$login = isset($_GET['action']) ? $_GET['action'] : '';
$data = isset($_POST['data']) ? $_POST['data'] : '';
$listar = isset($_GET['action']) ? $_GET['action'] : '';
$excluir = isset($_GET['action']) ? $_GET['action'] : '';

if($action == 'alterar'){
	echo json_encode(alteraDados($data));
}if($action == 'novo'){
	echo json_encode(insereDados($data));
}if($excluir == 'excluir'){
	echo json_encode(removeDados($_GET));
}if($action == 'geradadosadicionais'){
	echo json_encode(listarAdicionais($data));
}if($listar == 'listarultimoid'){
	echo json_encode(listarID($_GET, $_GET['filtro']));
}if($listar == 'listareditar'){
	echo json_encode(listarEditar($_GET));
}if($listar == 'listar') {
	echo json_encode(listar($_GET));
}
// /* Verificar login */
// header('Location: login.php');
if($action == 'verificalogin') {
	/* Instaciar model Login e enviar email e senha */
	echo json_encode(verificaLogin($data));
}if($login == 'getusuario'){
	echo json_encode(getUser($_GET));
}if($action == 'cadastrausuario'){
	echo json_encode(cadastraUser($data));
}

 ?>
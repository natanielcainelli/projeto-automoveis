<?php 

require_once '/var/www/html/projeto-automoveis/model/connection.php';
require_once '/var/www/html/projeto-automoveis/model/cadastro_query.php';
require_once '/var/www/html/projeto-automoveis/model/veiculo_query.php';
require_once '/var/www/html/projeto-automoveis/model/basic/basic.php';

require_once '/var/www/html/projeto-automoveis/persistence/veiculo.php';
require_once '/var/www/html/projeto-automoveis/persistence/veiculo_adicional.php';
require_once '/var/www/html/projeto-automoveis/persistence/cadastro.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';
$login = isset($_GET['action']) ? $_GET['action'] : '';
$data = isset($_POST['data']) ? $_POST['data'] : '';
$listar = isset($_GET['action']) ? $_GET['action'] : '';
$excluir = isset($_GET['action']) ? $_GET['action'] : '';

if($action == 'alterar'){

	$veiculo = new Veiculo();

	$veiculo->setId($data['id']);
	$veiculo->setDescricao($data['descricao']);
	$veiculo->setPlaca($data['placa']);
	$veiculo->setRenavam($data['renavam']);
	$veiculo->setAnoModelo($data['anomodelo']);
	$veiculo->setAnoFabrica($data['anofabrica']);
	$veiculo->setCor($data['cor']);
	$veiculo->setKm($data['km']);
	$veiculo->setMarca($data['marca']);
	$veiculo->setPreco($data['preco']);
	$veiculo->setPrecoFipe($data['precofipe']);

	echo json_encode(alteraDados($veiculo,$data));

}if($action == 'novo'){

	$veiculo = new Veiculo();

	$veiculo->setDescricao($data['descricao']);
	$veiculo->setPlaca($data['placa']);
	$veiculo->setRenavam($data['renavam']);
	$veiculo->setAnoModelo($data['anomodelo']);
	$veiculo->setAnoFabrica($data['anofabrica']);
	$veiculo->setCor($data['cor']);
	$veiculo->setKm($data['km']);
	$veiculo->setMarca($data['marca']);
	$veiculo->setPreco($data['preco']);
	$veiculo->setPrecoFipe($data['precofipe']);


	echo json_encode(insereDados($veiculo,$data['adicionais']));

}if($excluir == 'excluir'){

	$veiculo = new Veiculo();

	$veiculo->setId($_GET);

	echo json_encode(removeDados($veiculo));

}if($action == 'geradadosadicionais'){

	$veiculo = new Veiculo();

	$veiculo->setId($data['id']);

	echo json_encode(listarAdicionais($veiculo));

}if($listar == 'listarultimoid'){

	echo json_encode(listarID($_GET, $_GET['filtro']));

}if($listar == 'listareditar'){

	echo json_encode(listarEditar($_GET));

}if($listar == 'listar') {

	echo json_encode(listar($_GET));

}if($action == 'verificalogin') {

	$cadastro = new Cadastro();

	$cadastro->setLogin($data['login']);
	$cadastro->setSenha($data['senha']);
	echo json_encode(verificaLogin($cadastro));

}if($login == 'getusuario'){

	echo json_encode(getUser($_GET));

}if($action == 'cadastrausuario'){

	$cadastro = new Cadastro();

	$cadastro->setLogin($data['login']);
	$cadastro->setSenha($data['senha']);
	$cadastro->setEmail($data['email']);
	$cadastro->setNome($data['nome']);

	echo json_encode(cadastraUser($cadastro));

}

 ?>
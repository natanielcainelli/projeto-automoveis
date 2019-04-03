<?php 

require_once '/var/www/html/projeto-automoveis/model/connection.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';
$excluir = isset($_GET['action']) ? $_GET['action'] : '';
$data = isset($_POST['data']) ? $_POST['data'] : '';

if($action == 'alterar'){
	echo json_encode(alteraDados($data));
}if($action == 'novo'){
	echo json_encode(insereDados($data));
}if($excluir == 'excluir'){
	echo json_encode(removeDados($_GET));
}

function insereDados($veiculo) {

	$conn = connectionFactory();

	$erros = validarCampos($veiculo);
	if (! empty($erros)) {
		return ['erro' => true, 'mensagens' => $erros];
	}

	session_start();

	$id = $_SESSION['usuario']['id'];

	$veiculo = validaDados($veiculo);

	$sql = "INSERT INTO veiculo (descricao, placa, renavam, anomodelo, anofabrica, cor, km, marca, preco, precofipe, id_usuario) VALUES ('{$veiculo['descricao']}','{$veiculo['placa']}',{$veiculo['renavam']},{$veiculo['anomodelo']},{$veiculo['anofabrica']},'{$veiculo['cor']}',{$veiculo['km']},'{$veiculo['marca']}',{$veiculo['preco']},{$veiculo['precofipe']}, ".$id.");";

	error_log($sql);

	$result = $conn->query($sql);

	insereAdicionais($conn->insert_id, $veiculo['adicionais']);

	connectionKill($conn);

	return $veiculo;

}

function insereAdicionais($idVeiculo, $adicionais) {

	foreach ($adicionais as $adicional) {

		$conn = connectionFactory();
		$sql = "INSERT INTO veiculo_adicionais (adicionais, veiculo_id) VALUES ($adicional, $idVeiculo)";
		error_log($sql);
		$result = $conn->query($sql);
	}
}
	
function removeDados($id) {

	$conn = connectionFactory();

	foreach ($id as $values) {
		
		if($values > 0 ){
			$sql = "DELETE FROM veiculo  WHERE (id = $values); DELETE FROM veiculo_adicionais WHERE (veiculo_id = $values);";
			error_log($sql);
			$result = $conn->multi_query($sql);
		}				
	}
	
	connectionKill($conn);

	return $id;

}

function removeAdicionais($idVeiculo) {

	$conn = connectionFactory();

	$sql = "DELETE FROM veiculo_adicionais WHERE (veiculo_id = $idVeiculo);";

	error_log($sql);

	$result = $conn->query($sql);
			
	connectionKill($conn);

	return $veiculos;

}

function alteraDados($veiculos) {

	$conn = connectionFactory();

	session_start();

	$id = $_SESSION['usuario']['id'];

	$sql = "UPDATE veiculo SET descricao = '{$veiculos['descricao']}' ,placa = '{$veiculos['placa']}' ,renavam = {$veiculos['renavam']} ,anomodelo = {$veiculos['anomodelo']} ,anofabrica = {$veiculos['anofabrica']} ,cor = '{$veiculos['cor']}' ,km = {$veiculos['km']} ,marca = '{$veiculos['marca']}' ,preco = {$veiculos['preco']}, precofipe = {$veiculos['precofipe']}, id_usuario = ".$id." WHERE id = {$veiculos['id']};";
	error_log($sql);

	$result = $conn->multi_query($sql);

	alteraAdicionais($veiculos,$veiculos['adicionais']);
			
	connectionKill($conn);

	return $veiculos;

}

function alteraAdicionais($veiculos,$adicionais) {

	removeAdicionais($veiculos['veiculo_id']);

	insereAdicionais($veiculos['id'],$adicionais);

}

?>
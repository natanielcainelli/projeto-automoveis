<?php 

require_once '/var/www/html/projeto-automoveis/model/connection.php';

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

function validarCampos($campos) {

	$erros = [];

	if($campos['descricao'] == "") {
		$erros['descricao'] = 'Descricao vazia';
	}
	if($campos['placa'] == "" || strlen($campos['placa']) != 7) {
		$erros['placa'] = 'Placa vazia';
	}
	if($campos['renavam'] == "" || strlen($campos['renavam']) != 9) {
		$erros['renavam'] = 'Renavam vazio';
	}
	if($campos['cor'] == "" ) {
		$erros['cor'] = 'Cor vazio';
	}
	if($campos['km'] == "" || $campos['km'] < 0) {
		$erros['km'] = 'Km vazio';
	}
	if($campos['preco'] == ""|| $campos['preco'] < 1) {
		$erros['preco'] = 'Preço vazio';
	}
	if($campos['precofipe'] == ""|| $campos['precofipe'] < 1) {
		$erros['precofipe'] = 'Preço FIPE vazio';
	}

	return $erros;

}


function validaDados($veiculo) {
	
	$veiculo['descricao'] = filter_var($veiculo['descricao'],FILTER_SANITIZE_STRING);
	$veiculo['placa'] = filter_var($veiculo['placa'],FILTER_SANITIZE_STRING);
	$veiculo['renavam'] = filter_var($veiculo['renavam'],FILTER_SANITIZE_STRING);
	$veiculo['cor'] = filter_var($veiculo['cor'],FILTER_SANITIZE_STRING);
	$veiculo['km'] = filter_var($veiculo['km'],FILTER_SANITIZE_NUMBER_INT);
	$veiculo['preco'] = filter_var($veiculo['preco'],FILTER_SANITIZE_NUMBER_FLOAT);
	$veiculo['precofipe'] = filter_var($veiculo['precofipe'],FILTER_SANITIZE_NUMBER_FLOAT);

	return $veiculo;

}

?>
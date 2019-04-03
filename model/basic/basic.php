<?php 

require_once '/var/www/html/projeto-automoveis/model/connection.php';

function insereDados($veiculo,$adicionais) {

	$conn = connectionFactory();

	$erros = validarCampos($veiculo);
	if (! empty($erros)) {
		return ['erro' => true, 'mensagens' => $erros];
	}

	session_start();

	$id = $_SESSION['usuario']['id'];

	validaDados($veiculo);

	$sql = "INSERT INTO veiculo (descricao, placa, renavam, anomodelo, anofabrica, cor, km, marca, preco, precofipe, id_usuario) VALUES ('". $veiculo->getDescricao() ."','". $veiculo->getPlaca() ."', '". $veiculo->getRenavam() ."' , ". $veiculo->getAnoModelo() .", ". $veiculo->getAnoFabrica() ." , '". $veiculo->getCor() ."', ". $veiculo->getKm() .",'". $veiculo->getMarca() ."', ". $veiculo->getPreco() ." , ". $veiculo->getPrecoFipe() .", ".$id.");";

	error_log($sql);

	$result = $conn->query($sql);

	insereAdicionais($conn->insert_id, $adicionais);

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
	
function removeDados($veiculo) {

	$conn = connectionFactory();

	foreach ($veiculo->getId() as $values) {
		
		if($values > 0 ){
			$sql = "DELETE FROM veiculo  WHERE (id = $values); DELETE FROM veiculo_adicionais WHERE (veiculo_id = $values);";
			error_log($sql);
			$result = $conn->multi_query($sql);
		}				
	}
	
	connectionKill($conn);

	return $veiculo;

}

function removeAdicionais($idVeiculo) {

	$conn = connectionFactory();

	$sql = "DELETE FROM veiculo_adicionais WHERE (veiculo_id = $idVeiculo);";

	error_log($sql);

	$result = $conn->query($sql);
			
	connectionKill($conn);

	return $veiculos;

}

function alteraDados($veiculo,$veiculos) {

	$conn = connectionFactory();

	session_start();

	$id = $_SESSION['usuario']['id'];

	$sql = "UPDATE veiculo SET descricao = '". $veiculo->getDescricao() ."' ,placa = '". $veiculo->getPlaca() ."' ,renavam = '". $veiculo->getRenavam() ."' ,anomodelo = ". $veiculo->getAnoModelo() ." ,anofabrica = ". $veiculo->getAnoFabrica() ." ,cor = '". $veiculo->getCor() ."' ,km = ". $veiculo->getKm() ." ,marca = '". $veiculo->getMarca() ."' ,preco = ". $veiculo->getPreco() ." , precofipe = ". $veiculo->getPrecoFipe() ." , id_usuario = ".$id." WHERE id = ". $veiculo->getId() .";";
	error_log($sql);

	$result = $conn->multi_query($sql);

	alteraAdicionais($veiculo->getId() ,$veiculos['adicionais']);
			
	connectionKill($conn);

	return $veiculos;

}

function alteraAdicionais($veiculo,$adicionais) {

	removeAdicionais($veiculo);

	insereAdicionais($veiculo,$adicionais);

}

function validarCampos($campos) {

	$erros = [];

	if($campos->getDescricao() == "") {
		$erros['descricao'] = 'Descricao vazia';
	}
	if($campos->getPlaca() == "" || strlen($campos->getPlaca()) != 7) {
		$erros['placa'] = 'Placa vazia';
	}
	if($campos->getRenavam() == "" || strlen($campos->getRenavam()) != 9) {
		$erros['renavam'] = 'Renavam vazio';
	}
	if($campos->getCor() == "" ) {
		$erros['cor'] = 'Cor vazio';
	}
	if($campos->getKm() == "" || $campos->getKm() < 0) {
		$erros['km'] = 'Km vazio';
	}
	if($campos->getPreco() == ""|| $campos->getPreco() < 1) {
		$erros['preco'] = 'Preço vazio';
	}
	if($campos->getPrecoFipe()== ""|| $campos->getPrecoFipe() < 1) {
		$erros['precofipe'] = 'Preço FIPE vazio';
	}

	return $erros;

}


function validaDados($veiculo) {
	
	$veiculo->setDescricao(filter_var($veiculo->getDescricao(),FILTER_SANITIZE_STRING));
	$veiculo->setPlaca(filter_var($veiculo->getPlaca(),FILTER_SANITIZE_STRING));
	$veiculo->setRenavam(filter_var($veiculo->getRenavam(),FILTER_SANITIZE_STRING)); 
	$veiculo->setCor(filter_var($veiculo->getCor(),FILTER_SANITIZE_STRING));
	$veiculo->setKm(filter_var($veiculo->getKm(),FILTER_SANITIZE_NUMBER_INT));
	$veiculo->setPreco(filter_var($veiculo->getPreco(),FILTER_SANITIZE_NUMBER_FLOAT));
	$veiculo->setPrecoFipe(filter_var($veiculo->getPrecoFipe(),FILTER_SANITIZE_NUMBER_FLOAT));

}

?>
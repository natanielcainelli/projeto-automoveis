<?php 

/* Chama a classe connection para poder abrir e fechar as conexões */

require_once '/var/www/html/projeto-automoveis/model/connection.php';

/* Insere um novo veículo e os seus adicionais */

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

/* Insere os adicionais de um veículo, é chamada no método insereDados */

function insereAdicionais($idVeiculo, $adicionais) {

	foreach ($adicionais as $adicional) {

		$conn = connectionFactory();
		$sql = "INSERT INTO veiculo_adicionais (adicionais, veiculo_id) VALUES ($adicional, $idVeiculo)";
		error_log($sql);
		$result = $conn->query($sql);
	}
}
	
/* Remove um ou varios veículos e seus adicionais */

function removeDados($ids) {

	$conn = connectionFactory();


	//implementar uma validação de delete com base no idUsuario para evitar uma falha de segurança que é a possibilidade de alterar um veículo que não pertence
	//ao idUsuario, sendo manipulavel por javascript

	$idsSql = implode("','", $ids);

	$sql = "DELETE FROM veiculo  WHERE id in ('" . $idsSql . "')";
	error_log($sql);
	$result = $conn->query($sql);

	$sql = "DELETE FROM veiculo_adicionais WHERE veiculo_id in ('" . $idsSql . "')";
	error_log($sql);
	$result = $conn->query($sql);

	
	connectionKill($conn);

	return $veiculo;

}

/* Remove os adicionais do veículo, é chamada no método removeDados()  */

function removeAdicionais($idVeiculo) {

	$conn = connectionFactory();

	$sql = "DELETE FROM veiculo_adicionais WHERE (veiculo_id = $idVeiculo);";

	error_log($sql);

	$result = $conn->query($sql);
			
	connectionKill($conn);

	return $idVeiculo;

}

/* Altera um veículo e os seus adicionais */

function alteraDados($veiculo,$veiculos) {

	$conn = connectionFactory();

	session_start();

	$id = $_SESSION['usuario']['id'];

	$sql = "UPDATE veiculo SET descricao = '". $veiculo->getDescricao() ."' ,placa = '". $veiculo->getPlaca() ."' ,renavam = '". $veiculo->getRenavam() ."' ,anomodelo = ". $veiculo->getAnoModelo() ." ,anofabrica = ". $veiculo->getAnoFabrica() ." ,cor = '". $veiculo->getCor() ."' ,km = ". $veiculo->getKm() ." ,marca = '". $veiculo->getMarca() ."' ,preco = ". $veiculo->getPreco() ." , precofipe = ". $veiculo->getPrecoFipe() ." , id_usuario = ".$id." WHERE id = ". $veiculo->getId() .";";
	error_log($sql);

	$result = $conn->multi_query($sql);

	alteraAdicionais($veiculo->getId() ,$veiculos['data']['adicionais']);
			
	connectionKill($conn);

	return $veiculos;

}

/* Remove todos os adicionais do veículo e após adiciona novamente para evitar duplicações no banco, é chamado em alteraDados()  */

function alteraAdicionais($veiculo,$adicionais) {

	removeAdicionais($veiculo);

	insereAdicionais($veiculo,$adicionais);

}

/* Valida se os campos cumprem os requisitos necessários */

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

/* Usa a função sanitize para limpar possíveis ameaças nos campos do veículo, evitando injeções de SQL maliciosas */

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
<?php 

$action = isset($_POST['action']) ? $_POST['action'] : '';
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
	echo json_encode(listarID());
}else if($listar == 'listar') {
	echo json_encode(listar($_GET));
}


function connectionFactory(){

	$servername = "localhost";
	$database = "automoveis";
	$username = "root";
	$password = "asdf000";

	$conn = mysqli_connect($servername, $username, $password, $database);
	if (!$conn) {
	    die("Conexão falhou: " . mysqli_connect_error());
	}

	return $conn;

}

function connectionKill($conn){

	mysqli_close($conn);

}

function insereDados($veiculo){

	$conn = connectionFactory();

	$erros = validarCampos($veiculo);
	if (! empty($erros)) {
		return ['erro' => true, 'mensagens' => $erros];
	}

	$veiculo = validaDados($veiculo);

	$sql = "INSERT INTO veiculo (descricao, placa, renavam, anomodelo, anofabrica, cor, km, marca, preco, precofipe) VALUES ('{$veiculo['descricao']}','{$veiculo['placa']}',{$veiculo['renavam']},{$veiculo['anomodelo']},{$veiculo['anofabrica']},'{$veiculo['cor']}',{$veiculo['km']},'{$veiculo['marca']}',{$veiculo['preco']},{$veiculo['precofipe']});";

	error_log($sql);

	$result = $conn->query($sql);

	insereAdicionais($conn->insert_id, $veiculo['adicionais']);

	connectionKill($conn);

	return $veiculo;

}

function validaDados($veiculo){
	
	$veiculo['descricao'] = filter_var($veiculo['descricao'],FILTER_SANITIZE_STRING);
	$veiculo['placa'] = filter_var($veiculo['placa'],FILTER_SANITIZE_STRING);
	$veiculo['renavam'] = filter_var($veiculo['renavam'],FILTER_SANITIZE_STRING);
	$veiculo['cor'] = filter_var($veiculo['cor'],FILTER_SANITIZE_STRING);
	$veiculo['km'] = filter_var($veiculo['km'],FILTER_SANITIZE_NUMBER_INT);
	$veiculo['preco'] = filter_var($veiculo['preco'],FILTER_SANITIZE_NUMBER_FLOAT);
	$veiculo['precofipe'] = filter_var($veiculo['precofipe'],FILTER_SANITIZE_NUMBER_FLOAT);

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
	
function removeDados($id){

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

function removeAdicionais($idVeiculo){

	$conn = connectionFactory();

	$sql = "DELETE FROM veiculo_adicionais WHERE (veiculo_id = $idVeiculo);";

	error_log($sql);

	$result = $conn->query($sql);
			
	connectionKill($conn);

	return $veiculos;

}

function alteraDados($veiculos){

	$conn = connectionFactory();

	$sql = "UPDATE veiculo SET descricao = '{$veiculos['descricao']}' ,placa = '{$veiculos['placa']}' ,renavam = {$veiculos['renavam']} ,anomodelo = {$veiculos['anomodelo']} ,anofabrica = {$veiculos['anofabrica']} ,cor = '{$veiculos['cor']}' ,km = {$veiculos['km']} ,marca = '{$veiculos['marca']}' ,preco = {$veiculos['preco']}, precofipe = {$veiculos['precofipe']} WHERE id = {$veiculos['id']};";
	error_log($sql);

	$result = $conn->multi_query($sql);

	alteraAdicionais($veiculos,$veiculos['adicionais']);
			
	connectionKill($conn);

	return $veiculos;

}

function alteraAdicionais($veiculos,$adicionais){

	removeAdicionais($veiculos['veiculo_id']);

	insereAdicionais($veiculos['id'],$adicionais);

}

function listar($filtros){

	$inicio = ($filtros['pagina'] -1)*10;

	$conn = connectionFactory();

	$sql = "SELECT id,descricao, placa, renavam, anomodelo, anofabrica, cor, km , marca, preco, precofipe FROM veiculo ";

	if(isset($filtros['descricao']) && $filtros['descricao'] != '' &&$filtros['marca'] == ''){

		$sql.= " WHERE descricao = '{$filtros['descricao']}' ";
	}
	if(isset($filtros['marca']) && $filtros['marca'] != '' && $filtros['descricao'] == ''){

		$sql.= " WHERE marca = '{$filtros['marca']}' ";
	}
	if (isset($filtros['descricao']) && $filtros['descricao'] != '' && isset($filtros['marca']) && $filtros['marca'] != ''){

		$sql.= " WHERE descricao = '{$filtros['descricao']}' and marca = '{$filtros['marca']}' "; 
	}

	$sql.= " LIMIT $inicio ,10";

	$result = $conn->query($sql);
	    
    $response = [];

    while($row = $result->fetch_assoc()) {
    	$response[] = $row; 
    }
	
	connectionKill($conn);

	return $response;
}

function listarID(){

	$conn = connectionFactory();

	$sql = "SELECT id,descricao, placa, renavam, anomodelo, anofabrica, cor, km , marca, preco, precofipe FROM veiculo ";

	$result = $conn->query($sql);
	    
    $response = [];

    while($row = $result->fetch_assoc()) {
    	$response[] = $row; 
    }
	
	connectionKill($conn);

	return $response;

}

function listarAdicionais($veiculos){


	$conn = connectionFactory();

	$sql = "SELECT id,adicionais,veiculo_id FROM veiculo_adicionais WHERE veiculo_id = {$veiculos['id']}";

	$result = $conn->query($sql);
	    
    $response = [];

    while($row = $result->fetch_assoc()) {
    	$response[] = $row; 
    }

	connectionKill($conn);

	return $response;

}

function validarCampos($campos){

	$erros = [];

	if($campos['descricao'] == ""){
		$erros['descricao'] = 'Descricao vazia';
		$camposInvalidos++;
	}
	if($campos['placa'] == "" || strlen($campos['placa']) != 7){
		$erros['placa'] = 'Placa vazia';
		$camposInvalidos++;
	}
	if($campos['renavam'] == "" || strlen($campos['renavam']) != 9){
		$erros['renavam'] = 'Renavam vazio';
		$camposInvalidos++;
	}
	if($campos['cor'] == "" ){
		$erros['cor'] = 'Cor vazia';
		$camposInvalidos++;
	}
	if($campos['km'] == "" || $campos['km'] < 0){
		$erros['km'] = 'Km vazia';
		$camposInvalidos++;
	}
	if($campos['preco'] == ""|| $campos['preco'] < 1){
		$erros['preco'] = 'Preço vazia';
		$camposInvalidos++;
	}
	if($campos['precofipe'] == ""|| $campos['precofipe'] < 1){
		$erros['precofipe'] = 'Preço FIPE vazia';
		$camposInvalidos++;
	}

	return $erros;

}

?>
<?php 

$action = isset($_POST['action']) ? $_POST['action'] : '';
$data = isset($_POST['data']) ? $_POST['data'] : '';
$listar = isset($_GET['action']) ? $_GET['action'] : '';
$excluir = isset($_GET['action']) ? $_GET['action'] : '';
$login = isset($_GET['action']) ? $_GET['action'] : '';


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
}if($login == 'verificalogin'){
	echo json_encode(verificalogin($_GET));
}else if($listar == 'listar') {
	echo json_encode(listar($_GET));
}

function connectionFactory() {

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

function connectionKill($conn) {

	mysqli_close($conn);

}

function insereDados($veiculo) {

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

	$sql = "UPDATE veiculo SET descricao = '{$veiculos['descricao']}' ,placa = '{$veiculos['placa']}' ,renavam = {$veiculos['renavam']} ,anomodelo = {$veiculos['anomodelo']} ,anofabrica = {$veiculos['anofabrica']} ,cor = '{$veiculos['cor']}' ,km = {$veiculos['km']} ,marca = '{$veiculos['marca']}' ,preco = {$veiculos['preco']}, precofipe = {$veiculos['precofipe']} WHERE id = {$veiculos['id']};";
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

function listar($filtros) {

	$inicio = ($filtros['pagina'] -1)*10;

	$conn = connectionFactory();

	$sql = "SELECT id,descricao, placa, renavam, anomodelo, anofabrica, cor, km , marca, preco, precofipe FROM veiculo ";

	if(isset($filtros['descricao']) && $filtros['descricao'] != '' &&$filtros['marca'] == '') {

		$sql.= " WHERE descricao = '{$filtros['descricao']}' ";
	}
	if(isset($filtros['marca']) && $filtros['marca'] != '' && $filtros['descricao'] == '') {

		$sql.= " WHERE marca = '{$filtros['marca']}' ";
	}
	if (isset($filtros['descricao']) && $filtros['descricao'] != '' && isset($filtros['marca']) && $filtros['marca'] != '') {

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
 
function listarEditar($filtros) {

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

function listarID($filtro) {

	$conn = connectionFactory();

	$sql = "SELECT DISTINCT descricao, placa, renavam, anomodelo, anofabrica, cor, km , marca, preco, precofipe FROM veiculo ";

	$adicionais = "";

	$teste_adicionais = 2;

	$count = 0;


	if(!empty($filtro['data'])) {
		foreach ($filtro['data'] as $adicional) {
			if($adicionais == ""){
				$adicionais.= $adicional;
			}else{
				$adicionais.= " , ".$adicional;
			}
			$count++;
		}
	}
	
	if($count == 1) {
		$teste_adicionais = 1;
	}
	if($adicionais != '') {
	
		$sql.="WHERE (select count(*) from veiculo_adicionais va WHERE adicionais in (".$adicionais.") and veiculo.id = va.veiculo_id) = ".$teste_adicionais;

	}	
	if($adicionais == '' && ($filtro['marca'] != '' || $filtro['ano'] != '')) { 
	
		$sql.=" WHERE ";

	} 
	
 	if($filtro['marca'] != '') {
		if($adicionais != '') {
			$sql.=" AND ";
		}
		
		$sql.=" veiculo.marca = '".$filtro['marca']."'";

	}
	if($filtro['ano'] != '') {

		if($adicionais != '' || $filtro['marca'] != '') {
			$sql.=" AND ";
		}

		$sql.=" veiculo.anomodelo = ".$filtro['ano'];

	}
	if($filtro['filtro'] == 'marca') {

		$sql.= " ORDER BY marca " ;

	}
	if($filtro['filtro'] == 'ano') {

		$sql.= " ORDER BY anomodelo " ;

	}

	error_log($sql);
	

	$result = $conn->query($sql);
	    
    $response = [];

    while($row = $result->fetch_assoc()) {
    	$response[] = $row; 
    }
	
	connectionKill($conn);

	return $response;

}

function listarAdicionais($veiculos) {


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

function verificaLogin($login, $senha) {
	$conn = connectionFactory();
	
	$senhaHash = sha256($senha . '+251n');
	
	$sql = "SELECT login,senha,permissao,email FROM cadastro where login = '" . $login . "' and senha = '" . $senhaHash . "'";

	$result = $conn->query($sql);
	
	$row = $result->fetch_assoc();

	session_start();
	
	$_SESSION['usuario'] = $row;

	// error_log($_SESSION);
	    
	connectionKill($conn);

    if (is_null($row)) {
    	return ['erro' => true, 'msg' => 'Usuario ou senha invalido'];
    }

	return ['erro' => false];

}

?>
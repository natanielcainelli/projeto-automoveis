<?php 

require_once '/var/www/html/projeto-automoveis/model/connection.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';
$listar = isset($_GET['action']) ? $_GET['action'] : '';
$data = isset($_POST['data']) ? $_POST['data'] : '';

if($action == 'geradadosadicionais'){
	echo json_encode(listarAdicionais($data));
}if($listar == 'listarultimoid'){
	echo json_encode(listarID($_GET, $_GET['filtro']));
}if($listar == 'listareditar'){
	echo json_encode(listarEditar($_GET));
}if($listar == 'listar') {
	echo json_encode(listar($_GET));
}

function listar($filtros) {

	$inicio = ($filtros['pagina'] -1)*10;

	$conn = connectionFactory();

	session_start();

	$id = $_SESSION['usuario']['id'];

	$sql = "SELECT id,descricao, placa, renavam, anomodelo, anofabrica, cor, km , marca, preco, precofipe FROM veiculo ";

	if(isset($filtros['descricao']) && $filtros['descricao'] != '' &&$filtros['marca'] == '') {

		$sql.= " WHERE descricao = '{$filtros['descricao']}' and id_usuario =".$id;
	}
	if(isset($filtros['marca']) && $filtros['marca'] != '' && $filtros['descricao'] == '') {

		$sql.= " WHERE marca = '{$filtros['marca']}' and id_usuario =".$id;
	}
	if (isset($filtros['descricao']) && $filtros['descricao'] != '' && isset($filtros['marca']) && $filtros['marca'] != '') {

		$sql.= " WHERE descricao = '{$filtros['descricao']}' and marca = '{$filtros['marca']}' and id_usuario =".$id; 
	} else if( $filtros['descricao'] == '' && $filtros['marca'] == ''){

		$sql.=" WHERE id_usuario =".$id." ";
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

	session_start();

	$id = $_SESSION['usuario']['id'];

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
	
		$sql.="WHERE (select count(*) from veiculo_adicionais va WHERE adicionais in (".$adicionais.") and veiculo.id = va.veiculo_id) = ".$teste_adicionais." and id_usuario = ".$id;

	}	
	if($adicionais == '' && ($filtro['marca'] != '' || $filtro['ano'] != '')) { 
	
		$sql.=" WHERE ";

	} 
	
 	if($filtro['marca'] != '') {
		if($adicionais != '') {
			$sql.=" AND ";
		}
		
		$sql.=" veiculo.marca = '".$filtro['marca']."' and id_usuario = ".$id;

	}
	if($filtro['ano'] != '') {

		if($adicionais != '' || $filtro['marca'] != '') {
			$sql.=" AND ";
		}

		$sql.=" veiculo.anomodelo = ".$filtro['ano']."and id_usuario = ".$id;


	}
	if($adicionais == '' && $filtro['marca'] == '' && $filtro['ano'] == ''){

		$sql.=" WHERE id_usuario = ".$id." ";

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




?>
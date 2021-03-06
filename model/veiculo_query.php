<?php 

/* Chamada de classe de conexão  */

require_once '/var/www/html/projeto-automoveis/model/connection.php';

/* Lista os automoveis na tela inicial (paginação de 10 veículos por pagina) */

function listar($filtros) {

	$inicio = ($filtros['pagina'] -1)*10;

	$conn = connectionFactory();

	session_start();

	$id = $_SESSION['usuario']['id'];

	$sql = "SELECT id,descricao, placa, renavam, anomodelo, anofabrica, cor, km , marca, preco, precofipe FROM veiculo WHERE id_usuario =".$id;

	if(isset($filtros['descricao']) && $filtros['descricao'] != '' &&$filtros['marca'] == '') {
		$sql.= " and descricao like '%{$filtros['descricao']}%' ";
	}	
	if(isset($filtros['marca']) && $filtros['marca'] != '' && $filtros['descricao'] == '') {

		$sql.= " and marca like '%{$filtros['marca']}%' ";
	}
	if (isset($filtros['descricao']) && $filtros['descricao'] != '' && isset($filtros['marca']) && $filtros['marca'] != '') {

		$sql.= " and descricao like '%{$filtros['descricao']}%' and marca like '%{$filtros['marca']}%' "; 
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

/* busca todas as informações do veículo para ser editado */

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

/* Lista relatório */

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

		$sql.=" veiculo.anomodelo = ".$filtro['ano']." and id_usuario = ".$id;


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

/* Busca os adicionais dos veículos */

function listarAdicionais($veiculo) {


	$conn = connectionFactory();

	$sql = "SELECT id,adicionais,veiculo_id FROM veiculo_adicionais WHERE veiculo_id = ". $veiculo->getId() ." ";

	$result = $conn->query($sql);
	    
    $response = [];

    while($row = $result->fetch_assoc()) {
    	$response[] = $row; 
    }

	connectionKill($conn);

	return $response;

}



?>
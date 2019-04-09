<?php 

require_once('../api/router.php');
require_once('../api/index.php');

/* Chamadas de classes que executam querys */

require_once '/var/www/html/projeto-automoveis/model/connection.php';
require_once '/var/www/html/projeto-automoveis/model/veiculo_query.php';
require_once '/var/www/html/projeto-automoveis/model/basic/basic.php';

/* Chamadas de classes que instanciam objetos */

require_once '/var/www/html/projeto-automoveis/persistence/veiculo.php';
require_once '/var/www/html/projeto-automoveis/persistence/veiculo_adicional.php';

class VeiculoController {

	function listarVeiculo($params) {

		return listar($params);

	}

	function alterar($params) {
		
		$veiculo = new Veiculo();

		$veiculo->setId($params['data']['id']);
		$veiculo->setDescricao($params['data']['descricao']);
		$veiculo->setPlaca($params['data']['placa']);
		$veiculo->setRenavam($params['data']['renavam']);
		$veiculo->setAnoModelo($params['data']['anomodelo']);
		$veiculo->setAnoFabrica($params['data']['anofabrica']);
		$veiculo->setCor($params['data']['cor']);
		$veiculo->setKm($params['data']['km']);
		$veiculo->setMarca($params['data']['marca']);
		$veiculo->setPreco($params['data']['preco']);
		$veiculo->setPrecoFipe($params['data']['precofipe']);

		return alteraDados($veiculo,$params);
		
	}

	function excluir($data) {
		
		$veiculo = new Veiculo();

		$veiculo->setId($data['data']);

		return removeDados($veiculo);
	}

	function novo($params) {

		$veiculo = new Veiculo();

		$veiculo->setDescricao($params['data']['descricao']);
		$veiculo->setPlaca($params['data']['placa']);
		$veiculo->setRenavam($params['data']['renavam']);
		$veiculo->setAnoModelo($params['data']['anomodelo']);
		$veiculo->setAnoFabrica($params['data']['anofabrica']);
		$veiculo->setCor($params['data']['cor']);
		$veiculo->setKm($params['data']['km']);
		$veiculo->setMarca($params['data']['marca']);
		$veiculo->setPreco($params['data']['preco']);
		$veiculo->setPrecoFipe($params['data']['precofipe']);

		return insereDados($veiculo,$params['data']['adicionais']);

	}

	function geraDadosAdicionais($params) {

		$veiculo = new Veiculo();

		$veiculo->setId($params['data']['id']);

		return listarAdicionais($veiculo);

	}

	function listarUltimoId($data,$filtro) {

		return listarID($data, $filtro);

	}

	function listarEditar($filtro) {

		return listarEditar($filtro);

	}

	function validaCampos($data) {

		if($data['descricao'] == ""){
			return $erro = ['error' => 'Por favor insira uma descricao válida']; 
		}
		if($data['placa'] == "" || strlen($data['placa']) < 8 || strlen($data['placa']) > 8 ){
			return $erro = ['error' => 'Por favor insira uma placa válida']; 
		}
		if($data['renavam'] == "" || strlen($data['renavam']) < 10 || strlen($data['renavam']) > 10 ){
			return $erro = ['error' => 'Por favor insira um renavam válido']; 
		}
		if($data['cor'] == ""){
			return $erro = ['error' => 'Por favor insira uma cor válida']; 
		}
		if($data['km'] == ""){
			return $erro = ['error' => 'Por favor insira uma km válida']; 
		}
		if($data['preco'] == "" || $data['preco'] <= 0){
			return $erro = ['error' => 'Por favor insira um preço válido']; 
		}
		if($data['precofipe'] == ""){
			return $erro = ['error' => 'Por favor insira um preço da tabela fipe válido']; 
		}
	}
}
	
?>
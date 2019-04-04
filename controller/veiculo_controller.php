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

		$veiculo->setId($data);

		return removeDados($veiculo);
	}

	function novo($params) {
		var_dump($params['data']);

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

	function listarUltimoid($data,$filtro) {

		return listarID($data, $filtro);

	}

	function listarEditar($filtro) {

		return listarEditar($filtro);

	}
}
	

 ?>
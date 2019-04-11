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

		
		$erros = $this->validaCampos($veiculo);

		if(!empty($erros)){
			return array('erros' => $erros);
		}

		return alteraDados($veiculo,$params);
		
	}

	function excluir($data) {

		return removeDados($data['data']);
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

		$erros = $this->validaCampos($veiculo);

		if(!empty($erros)){
			return array('erros' => $erros);
		} else {

		return insereDados($veiculo,$params['data']['adicionais']);

		}

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

	function validaCampos($veiculo) {


		if(empty($veiculo->getDescricao())){
			$erro['descricao'] = " O campo Descrição não pode ser nulo ";
		}
		if(empty($veiculo->getPlaca())){
			$erro['placa'] = " O campo Placa não pode ser nulo "; 
		}
		if(strlen($veiculo->getPlaca()) != 7){
			$erro['placa'] = " O tamanho do campo Placa deve conter 7 caracteres "; 
		}
		if(empty($veiculo->getRenavam())){
			$erro['renavam'] = " O campo Renavam não pode ser nulo "; 
		}
		if(strlen($veiculo->getRenavam()) != 9){
			$erro['renavam'] = " O tamanho do campo Renavam deve conter 9 caracteres "; 
		}
		if(empty($veiculo->getCor())){
			$erro['cor'] = " O campo Cor não pode ser nulo ";  
		}
		if(empty($veiculo->getKm())){
			$erro['km'] = " O campo Km não pode ser nulo ";  
		}
		if(empty($veiculo->getPreco())){
			$erro['preco'] = " O campo Preço não pode estar vazio "; 
		}
		if($veiculo->getPreco() < 1){
			$erro['preco'] = " O campo Preço não pode ser menor ou igual a 0 "; 
		}
		if(empty($veiculo->getPrecoFipe())){
			$erro['precofipe'] = " O campo preço da Tabela FIPE não pode ser nulo "; 
		}
		if($veiculo->getPrecoFipe() < 1){
			$erro['precofipe'] = " O campo preço da Tabela FIPE não pode ser menor ou igual a 0 "; 
		}

		return $erro;
	}
}
	
?>
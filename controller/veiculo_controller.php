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

		$erro = "";

		error_log(print_r($veiculo, true));

		if(empty($veiculo->getDescricao())){
			$erro .= "- O campo descrição não pode ser nulo "; 
		}
		if(empty($veiculo->getPlaca())){
			$erro .= "- O campo placa não pode ser nulo "; 
		}
		if(strlen($veiculo->getPlaca()) != 7){
			$erro .= "- O tamanho do campo placa está incorreto "; 
		}
		if(empty($veiculo->getRenavam())){
			$erro .= "- O campo renavam não pode ser nulo "; 
		}
		if(strlen($veiculo->getRenavam()) != 9){
			$erro .= "- O tamanho do campo renavam deve conter 9 caracteres "; 
		}
		if(empty($veiculo->getCor())){
			$erro .= "- O campo cor não pode ser nulo ";  
		}
		if(empty($veiculo->getKm())){
			$erro .= "- O campo km não pode ser nulo ";  
		}
		if(empty($veiculo->getPreco())){
			$erro .= "- O campo preço não pode estar vazio "; 
		}
		if($veiculo->getPreco() < 1){
			$erro .=  "- O campo preço não pode ser menor ou igual a 0 "; 
		}
		if(empty($veiculo->getPrecoFipe())){
			$erro .= "- O campo preço da tabela fipe não pode ser nulo "; 
		}
		if($veiculo->getPrecoFipe() < 1){
			$erro .= "- O campo preço da tabela fipe não pode ser menor ou igual a 0 "; 
		}

		return $erro;
	}
}
	
?>
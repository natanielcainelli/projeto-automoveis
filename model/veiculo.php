<?php 

 class Veiculo {

 	private $id;
 	private $descricao;
 	private $placa;
 	private $renavam;
 	private $anomodelo;
 	private $anofabrica;
 	private $cor;
 	private $km;
 	private $marca;
 	private $preco;
 	private $precofipe;

 	public function Veiculo($id, $descricao, $placa, $renavam, $anomodelo, $anofabrica, $cor, $km, $marca, $preco, $precofipe) {
	    $this->setId($id);
	    $this->setDescricao($descricao);
	    $this->setPlaca($placa);
	    $this->setRenavam($renavam);
	    $this->setAnoModelo($anomodelo);
	    $this->setAnoFabrica($anofabrica);
	    $this->setCor($cor);
	    $this->setKm($km);
	    $this->setMarca($marca);
	    $this->setPreco($preco);
	    $this->setPrecoFipe($precofipe);
	}

 	function setId($id) {
		$this->id = $id;
	}

	function getId() {
		return $this->id;
	}

	function setDescricao($setDescricao) {
		$this->descricao = $descricao;
	}

	function getDescricao() {
		return $this->descricao;
	}

	function setPlaca($placa) {
		$this->placa = $placa;
	}

	function getPlaca() {
		return $this->placa;
	}

	function setRenavam($renavam) {
		$this->renavam = $renavam;
	}

	function getRenavam() {
		return $this->renavam;
	}
	function setAnoModelo($anomodelo) {
		$this->anomodelo = $anomodelo;
	}

	function getAnoModelo() {
		return $this->anomodelo;
	}
	function setAnoFabrica($anofabrica) {
		$this->anofabrica = $anofabrica;
	}

	function getAnoFabrica() {
		return $this->anofabrica;
	}

	function setCor($cor) {
		$this->cor = $cor;
	}

	function getCor() {
		return $this->cor;
	}

	function setKm($km) {
		$this->km = $km;
	}

	function getKm() {
		return $this->km;
	}

	function setMarca($marca) {
		$this->marca = $marca;
	}

	function getMarca() {
		return $this->marca;
	}

	function setPreco($preco) {
		$this->preco = $preco;
	}

	function getPreco() {
		return $this->preco;
	}

	function setPrecoFipe($precofipe) {
		$this->precofipe = $precofipe;
	}

	function getPrecoFipe() {
		return $this->precofipe;
	}

 }

?>
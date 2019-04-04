<?php 

	class VeiculoAdicional {

		private $id;
		private $adicionais;
		private $veiculo_id;

		function setId($id) {
			$this->id = $id;
		}

		function getId() {
			return $this->id;
		}

		function setAdicionais($adicionais) {
			$this->adicionais = $adicionais;
		}

		function getAdicionais() {
			return $this->adicionais;
		}

		function setVeiculoId($veiculo_id) {
			$this->veiculo_id = $veiculo_id;
		}

		function getVeiculoId() {
			return $this->veiculo_id;
		}

	}

?>
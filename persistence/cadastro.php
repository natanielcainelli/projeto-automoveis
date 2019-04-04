<?php 

	class Cadastro {

		private $id;
		private $login;
		private $senha;
		private $email;
		private $nome;

		function setId($id) {
			$this->id = intval($id);
		}

		function getId() {
			return $this->id;
		}

		function setLogin($login) {
			$this->login = $login;
		}

		function getLogin() {
			return $this->login;
		}

		function setSenha($senha) {
			$this->senha = $senha;
		}

		function getSenha() {
			return $this->senha;
		}

		function setEmail($email) {
			$this->email = $email;
		}

		function getEmail() {
			return $this->email;
		}

		function setNome($nome) {
			$this->nome = $nome;
		}

		function getNome() {
			return $this->nome;
		}
	}

?>
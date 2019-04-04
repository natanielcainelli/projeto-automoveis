<?php

require_once('router.php');

require_once('../controller/veiculo_controller.php');
require_once('../controller/cadastro_controller.php');

//IMPLEMENTAR UM SISTEMA DE MIDDLEWARE PARA CONTROLAR O ACESSO DO USUARIO

// interface Middleware {
// 	abstract function run();
// }

// class AuthMiddleware implements Middleware
// {	
// 	static function run() {
// 		if (! isset($_SESSION['usuario'])) {
// 			echo json_encode(['error' => 'Unautorized']);
// 			exit();
// 		}
// 	}
// }

// Router::register('listarVeiculo', 'VeiculoController', 'listar', ['AuthMiddleware']);

Router::register('listarVeiculo', 'VeiculoController', 'listarVeiculo');
Router::register('alterarVeiculo', 'VeiculoController', 'alterar');
Router::register('novoVeiculo', 'VeiculoController', 'novo');
Router::register('excluirVeiculo', 'VeiculoController', 'excluir');
Router::register('geraAdicionaisVeiculo', 'VeiculoController', 'geraDadosAdicionais');
Router::register('listarUltimoIdVeiculo', 'VeiculoController', 'listarUltimoId');
Router::register('listarEditarVeiculo', 'VeiculoController', 'listarEditar');

Router::register('verificaLogin', 'CadastroController', 'verificaLogin');
Router::register('getUsuario', 'CadastroController', 'getUsuario');
Router::register('cadastraUsuario', 'CadastroController', 'cadastraUsuario');

Router::call($_REQUEST['action'], $_REQUEST);
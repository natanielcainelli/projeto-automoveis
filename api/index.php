<?php

require_once('router.php');
require_once('middleware.php');
require_once('../controller/veiculo_controller.php');
require_once('../controller/cadastro_controller.php');


Router::register('listarVeiculo', 'VeiculoController', 'listarVeiculo', ['AuthMiddleware']);
Router::register('alterarVeiculo', 'VeiculoController', 'alterar', ['AuthMiddleware']);
Router::register('novoVeiculo', 'VeiculoController', 'novo', ['AuthMiddleware']);
Router::register('excluirVeiculo', 'VeiculoController', 'excluir', ['AuthMiddleware']);
Router::register('geraAdicionaisVeiculo', 'VeiculoController', 'geraDadosAdicionais', ['AuthMiddleware']);
Router::register('listarUltimoIdVeiculo', 'VeiculoController', 'listarUltimoId', ['AuthMiddleware']);
Router::register('listarEditarVeiculo', 'VeiculoController', 'listarEditar', ['AuthMiddleware']);

Router::register('verificaLogin', 'CadastroController', 'verificaLogin');
Router::register('getUsuario', 'CadastroController', 'getUsuario', ['AuthMiddleware']);
Router::register('cadastraUsuario', 'CadastroController', 'cadastraUsuario');

Router::call($_REQUEST['action'], $_REQUEST);
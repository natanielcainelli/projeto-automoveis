<?php

require_once('router.php');
require_once('middleware.php');
require_once('../controller/veiculo_controller.php');
require_once('../controller/cadastro_controller.php');


Router::register('listarVeiculo', 'VeiculoController', 'listarVeiculo', ['AuthMiddleware']);
Router::register('alterarVeiculo', 'VeiculoController', 'alterar');
Router::register('novoVeiculo', 'VeiculoController', 'novo');
Router::register('excluirVeiculo', 'VeiculoController', 'excluir');
Router::register('geraAdicionaisVeiculo', 'VeiculoController', 'geraDadosAdicionais');
Router::register('listarUltimoIdVeiculo', 'VeiculoController', 'listarUltimoId');
Router::register('listarEditarVeiculo', 'VeiculoController', 'listarEditar');

Router::register('verificaLogin', 'CadastroController', 'verificaLogin');
Router::register('getUsuario', 'CadastroController', 'getUsuario', ['AuthMiddleware']);
Router::register('cadastraUsuario', 'CadastroController', 'cadastraUsuario');

Router::call($_REQUEST['action'], $_REQUEST);
<?php 

require_once('../api/router.php');
require_once('../api/index.php');

/* Chamadas de classes que executam querys */

require_once '/var/www/html/projeto-automoveis/model/connection.php';
require_once '/var/www/html/projeto-automoveis/model/cadastro_query.php';
require_once '/var/www/html/projeto-automoveis/model/veiculo_query.php';
require_once '/var/www/html/projeto-automoveis/model/basic/basic.php';

/* Chamadas de classes que instanciam objetos */

require_once '/var/www/html/projeto-automoveis/controller/veiculo_controller.php';
require_once '/var/www/html/projeto-automoveis/persistence/veiculo.php';
require_once '/var/www/html/projeto-automoveis/persistence/veiculo_adicional.php';
require_once '/var/www/html/projeto-automoveis/persistence/cadastro.php';

/* Aqui recebe as instruções do ajax */

$action = isset($_POST['action']) ? $_POST['action'] : '';
$login = isset($_GET['action']) ? $_GET['action'] : '';
$data = isset($_POST['data']) ? $_POST['data'] : '';
$listar = isset($_GET['action']) ? $_GET['action'] : '';
$excluir = isset($_GET['action']) ? $_GET['action'] : '';

/* Instância dos controladores */

$veiculoController = new VeiculoController();
$cadastroController = new CadastroController();

/* Método para editar um veiculo  */
if($action == 'alterar'){

	echo json_encode($veiculoController->alterar($data));

/* Método para inserir novo veículo  */

}if($action == 'novo'){

	echo json_encode($veiculoController->novo($data));

/* Método para remover veículos (permite exclusão múltipla) */

}if($excluir == 'excluir'){

	echo json_encode($veiculoController->excluir($data));

/* Método para buscar os adicionais de um veículo */

}if($action == 'geradadosadicionais'){

	echo json_encode($veiculoController->geraDadosAdicionais($data));

/* Método para buscar lista de veículos */

}if($listar == 'listarultimoid'){

	echo json_encode($veiculoController->listarUltimoId($_GET, $_GET['filtro']));

/* Lista todos veículos */

}if($listar == 'listareditar'){

	echo json_encode($veiculoController->listarEditar($_GET));

/* Lista 10 veículos por pagina */

}if($listar == 'listar') {

	echo json_encode($veiculoController->listar($_GET));

/* valida se o login e senha do usuario são validos */

}if($action == 'verificalogin') {

	echo json_encode($cadastroController->verificaLogin($data));

/* pega o usuário ativo na $_SESSION */

}if($login == 'getusuario'){

	echo json_encode($cadastroController->getUsuario());

/* Cadastra novo usuário */

}if($action == 'cadastrausuario'){

	echo json_encode($cadastroController->cadastraUsuario($data));

}


?>
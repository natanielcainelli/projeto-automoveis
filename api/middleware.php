<?php 

interface Middleware {
	abstract function run();
}

class AuthMiddleware implements Middleware {	
	static function run() {
		if (! isset($_SESSION['usuario'])) {
			echo json_encode(['error' => 'Unautorized']);
			exit();
		}
	}
}

?>	
<?php 

// interface Middleware {
// 	abstract public function run();
// }

class AuthMiddleware {	
	static function run() {

		session_start();
		if (! isset($_SESSION['usuario'])) {
			return ['error' => true , 'redirect' => 'http://localhost/projeto-automoveis/view/main.html']; 
		} else {
			return ['error' => false];
		}
	}
}
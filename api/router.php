<?php

class Router {
	static public $routes = [];

	static function register($route, $class, $method, $middlewares = []) {
		self::$routes[$route] = ['class' => $class, 'method' => $method, 'middlewares' => $middlewares];
	}

	static function call($route, $params) {
		if ($route = self::$routes[$route]) {
			header('Content-Type: application/json');
			if (! empty($route['middlewares'])) {
				foreach ($route['middlewares'] as $middleware) {
					$middwareResponse = call_user_func([$middleware, 'run']);
					if ($middwareResponse['error']) {
						echo json_encode($middwareResponse);
						return;
					}
				}
			}

			$controller = new $route['class'];

			$response = call_user_func(array($controller, $route['method']), $params);
			
			echo json_encode($response);

		}		
	}
}
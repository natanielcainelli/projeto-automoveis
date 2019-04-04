<?php

class Router
{
	static private $routes = [];

	static function register($route, $class, $method, $middlewares = []) {
		self::$routes[$route] = ['class' => $class, 'method' => $method, 'middlewares' => $middlewares];
	}

	static function call($route, $params) {

		if ($route = self::$routes[$route]) {
			if (! empty($route['middlewares'])) {
				foreach ($route['middlewares'] as $middleware) {
					call_user_func([$middleware, 'run']);
				}
			}
			$controller = new $route['class'];

			$response = call_user_func(array($controller, $route['method']), $params);
			
			header('Content-Type: application/json');
			echo json_encode($response);
		}
	}
}
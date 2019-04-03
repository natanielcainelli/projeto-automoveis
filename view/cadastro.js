

function verificarLogin() {

	var data ={

		login: $('#loginusr').val(), 
		senha: $('#passwordusr').val()

	};

	$.ajax({
		url: 'http://localhost/projeto-automoveis/controller/controller.php',
		type: 'POST',
		dataType: 'json',
		data: {data: data, 'action': 'verificalogin'},
		async: false,
		success: function(result) {
			login = result;
		},
		error: function(error) {}
	});


	if(login.erro == false){		
		window.location.href="menuprincipal.html";
	} else{
		alert('Login ou usuário invalidos, por favor tente novamente');
	}

	
}

function getUsuario() {

	$.ajax({
		url: 'http://localhost/projeto-automoveis/controller/controller.php',
		type: 'GET',
		dataType: 'json',
		data: {'action': 'getusuario'},
		async: false,
		success: function(result) {
			login = result;
			
		},
		error: function(error) {}
	});


	return login;
}

function cadastrarUsuario() {

    var	data = {

    	login: $('#newloginusr').val(),
    	senha: $('#newpasswordusr').val(),
    	email: $('#newemailusr').val(),
    	nome: $('#newnomeusr').val()

    };

	$.ajax({
		url: 'http://localhost/projeto-automoveis/controller/controller.php',
		type: 'POST',
		dataType: 'json',
		data: {data: data, 'action': 'cadastrausuario'},
		async: false,
		success: function(result) {
			login = result;
		},
		error: function(error) {}
	});

}
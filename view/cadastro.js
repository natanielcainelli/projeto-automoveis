function verificarLogin() {

	var data ={

		login: $('#loginusr').val(), 
		senha: $('#passwordusr').val()

	};
	$.ajax({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		dataType: 'json',
		data: {data: data, 'action': 'verificaLogin'},
		success: function(result) {

			console.log(result);

			login = result;
			if(login.erro == false){		
				window.location.href="menuprincipal.html";
			} else{
				alert('Login ou usuário invalidos, por favor tente novamente');
			}

		},
		error: function(error) {}
	});
}

function getUsuario() {

	$.ajax({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'GET',
		dataType: 'json',
		data: {'action': 'getUsuario'},
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
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		dataType: 'json',
		data: {data: data, 'action': 'cadastraUsuario'},
		async: false,
		success: function(result) {
			login = result;
		},
		error: function(error) {}
	});
	
}



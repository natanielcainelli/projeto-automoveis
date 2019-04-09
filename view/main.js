window.onload = function() {
	vincularEventos();
}
function vincularEventos() {

	$('#buttonlogin').on('click', function() {
			
		verificarLogin();
		var usuario = getUsuario();
		$('#nomeusuario').text(usuario);
		$('#passwordusr').val("");

	});

	$('#buttoncadastrar').on('click', function() {
			
		$('#logintela').hide();
		$('#usrcadastro').show();

	});

	$('#newbuttoncadastrar').on('click', function() {
		// var email = $('#newemailusr').val();
		// var erro = isEmail(email);
		// if(erro = false) {
		cadastrarUsuario();
		$('#usrcadastro').hide();
		$('#logintela').show();	
	    $('#newloginusr').val("");
    	$('#newpasswordusr').val("");
    	$('#newemailusr').val("");
    	$('#newnomeusr').val("");
		// }else { 
		// 	$('#newemailusr').val("");
		// 	alert('Por favor digite um e-mail valido');
		// }
	});

	$('#newbuttoncancelar').on('click', function() {
	
		$('#usrcadastro').hide();
		$('#logintela').show();

	});

	$('#loginusr').keypress(function(e) {
    	if(e.keyCode==13){
    		$('#buttonlogin').click();

  		}
    });

    $('#passwordusr').keypress(function(e) {
    	if(e.keyCode==13){
    		$('#buttonlogin').click();
    		$('#passwordusr').val("");
  		}
    });

}

function isEmail(email) {
    var ex = /\S+@\S+\.\S+/;
    var erro = ex.test(email);
    return erro;
}

function verificarLogin() {

	var data ={

		login: $('#loginusr').val(), 
		senha: $('#passwordusr').val()

	};

	requisicao({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		data: {data: data, 'action': 'verificaLogin'},
		fnSuccess: function(result) {
			login = result;
			if(login.erro == false){		
				window.location.href="menuprincipal.html";
			} else{
				alert('Login ou usuário invalidos, por favor tente novamente');
			}
		}
	});
}

function requisicao(params) {
	$.ajax({
		url: params.url,
		type: params.type,
		dataType: 'json',
		data: params.data,
		success: function(result) {

			if (result['redirect']) {
				window.location.href = result['redirect'];
			}
			params.fnSuccess(result);
		},
		error: function(error) {
			alert('Erro na requisicao');
		}
	});
}

function getUsuario() {
	requisicao({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'GET',
		data: {'action': 'getUsuario'},
		fnSuccess: function(result) {
			login = result;
			$('#nomeusuario').text(login);
		}
	});
}

function cadastrarUsuario() {

    var	data = {

    	login: $('#newloginusr').val(),
    	senha: $('#newpasswordusr').val(),
    	email: $('#newemailusr').val(),
    	nome: $('#newnomeusr').val()

    };

    requisicao({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		data: {data: data, 'action': 'cadastraUsuario'},
		fnSuccess: function(result) {
			login = result;
		}
	});
	
}
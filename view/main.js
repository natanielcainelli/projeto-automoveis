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
		var email = $('#newemailusr').val();
		var valid = isEmail(email);
		if(valid == true) {
			cadastrarUsuario();
			$('#usrcadastro').hide();
			$('#logintela').show();	
	    	$('#newemailusr').val("");
	    	$('#newpasswordusr').val("");
	    	$('#newnomeusr').val("");
		}else { 
			$('#newemailusr').val("");
			alert('Por favor digite um e-mail valido');
		}
	});

	$('#newbuttoncancelar').on('click', function() {
	
		$('#usrcadastro').hide();
		$('#logintela').show();

	});

	$('#emailusr').keypress(function(e) {
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
	er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/; 
	if(!er.exec(email)) {
		return false;
	}else {
		return true;
	}
}

function verificarLogin() {

	var data ={

		email: $('#emailusr').val(), 
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
				alert('Email ou usuário invalidos, por favor tente novamente');
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

function verificaCadastro(dados) {

	var cadastro = [];
	var data = {

    	email: $('#newemailusr').val()

	}

	$.ajax({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		dataType: 'json',
		data: {data: data, 'action': 'verificaCadastro'},
		async: false,
		success: function(result) {
			cadastro = result;
		},
		error: function(error) {}
	});

	return cadastro;

}
function cadastrarUsuario() {

    var	data = {

    	senha: $('#newpasswordusr').val(),
    	email: $('#newemailusr').val(),
    	nome: $('#newnomeusr').val()

    };

    var cadastro =[];

    cadastro = verificaCadastro(data);

    if(cadastro.length === 0){
    	requisicao({
			url: 'http://localhost/projeto-automoveis/api/',
			type: 'POST',
			data: {data: data, 'action': 'cadastraUsuario'},
			fnSuccess: function(result) {
				login = result;
			}
		});
    }else {
    	alert('O email escolhido ja está em uso, por favor digite outro');
    }
    
	
}
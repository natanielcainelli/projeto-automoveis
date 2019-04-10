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

	var erro = [];

	var data ={

		email: email

	};

	requisicao({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		data: {data: data, 'action': 'verificarEmail'},
		fnSuccess: function(result) {
			erro = result;
			return erro;
		}
	});

	return erro;

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
				window.location.href="veiculos.html";
			} else{
				alert('Email ou usuário invalidos, por favor tente novamente');
			}
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
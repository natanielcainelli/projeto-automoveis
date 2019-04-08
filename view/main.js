window.onload = function() {
	pagina = 1;

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
		var erro = isEmail(email);
		if(erro = false) {
			cadastrarUsuario();
			$('#usrcadastro').hide();
			$('#logintela').show();	
		    $('#newloginusr').val("");
	    	$('#newpasswordusr').val("");
	    	$('#newemailusr').val("");
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
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
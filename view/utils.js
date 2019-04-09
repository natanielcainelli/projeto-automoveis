/*Nesta classe somente funções para montar tabelas e objetos */

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


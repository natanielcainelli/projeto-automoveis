window.onload = function() {
	$('#relatoriodados').hide();
	vincularEventos();
}
function vincularEventos() {

	$('#gerarrelatorio').on('click', function() {
			var filtro = "";
			var adicionais= [];
			listarRelatorio(filtro,adicionais);
			$('#relatoriodados').show();
			$('#botaogerar').hide();
			$('#menubuscarelatorio').hide();
			$('#filtradogeral').show();

	});

	$('#gerarrelatoriopormarca').on('click', function() {
			var filtro = "marca";
			var adicionais= [];
			listarRelatorioMarca(filtro,adicionais);
			$('#relatoriodados').show();
			$('#botaogerar').hide();
			$('#menubuscarelatorio').hide();
			$('#filtradopormarca').show();
	});

	$('#gerarrelatorioporano').on('click', function() {
			var filtro = "ano";
			var adicionais= [];
			listarRelatorioAno(filtro,adicionais);
			$('#relatoriodados').show();
			$('#botaogerar').hide();
			$('#menubuscarelatorio').hide();
			$('#filtradoporano').show();
	});

	$('#filtrobutton').on('click', function() {
		var filtro = "";
		var adicionais =[]; 
		
		$('#form_adicionais_relatorio input:checked').each(function() {
			adicionais.push($(this).val());
		});

		$('#filtradobuscar').show();

		montaCabecalho(adicionais);

		listarRelatorio(filtro,adicionais);

		$('#menubuscarelatorio').hide();
		$('#botaogerar').hide();
		$('#relatoriodados').show();
		
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
function montaCabecalho(adicionais) {

	adicionais.forEach(function(adicional) {

		if(adicional == 1){
			$('#filtradoar').show();
		}if(adicional == 2){
			$('#filtradoairbag').show();
		}if(adicional == 3){
			$('#filtradocd').show();
		}if(adicional == 4){
			$('#filtradodirecao').show();
		}if(adicional == 5){
			$('#filtradovidro').show();
		}if(adicional == 6){
			$('#filtradotrava').show();
		}if(adicional == 7){
			$('#filtradocambio').show();
		}if(adicional == 8){
			$('#filtradorodas').show();
		}if(adicional == 9){
			$('#filtradoalarme').show();
		}
	});

	if($('#buscarapidaano').val() != ''){
		$('#filtradoano').show();
	}
	if($('#buscarapidamarca').val() != ''){
		$('#filtradomarca').show();
	}
}
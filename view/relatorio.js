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
function listarRelatorio(filtro, data) {

	requisicao({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'GET',
		data: {data: data, 'action': 'listarUltimoIdVeiculo', filtro: filtro, marca: $('#buscarapidamarcarelatorio').val(), ano: $('#buscarapidaano').val()},
		fnSuccess: function(result) {
			veiculos = result;
			montarTabelaRelatorio();
		}
	});
}
function listarRelatorioAno(filtro, data) {

	requisicao({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'GET',
		data: {data: data, 'action': 'listarUltimoIdVeiculo', filtro: filtro, marca: $('#buscarapidamarcarelatorio').val(), ano: $('#buscarapidaano').val()},
		fnSuccess: function(result) {
			veiculos = result;
			montarTabelaRelatorioAno();
		}
	});
}
function listarRelatorioMarca(filtro, data) {

	requisicao({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'GET',
		data: {data: data, 'action': 'listarUltimoIdVeiculo', filtro: filtro, marca: $('#buscarapidamarcarelatorio').val(), ano: $('#buscarapidaano').val()},
		fnSuccess: function(result) {
			veiculos = result;
			montarTabelaRelatorioMarca();
		}
	});
}
function montarTabelaRelatorio() {

	var table = document.querySelector('table tbody')
	var tableHtml = ''
	
	$('table tbody').html('')
	veiculos.forEach(function(veiculo) {
		if (!$.isEmptyObject(veiculo)) {
				
			 $('table tbody').append(
				$('<tr>').append(
					$('<td>', {text: veiculo.descricao.toUpperCase()}),
					$('<td>', {text: veiculo.placa}).mask("AAA-0000"),
					$('<td>', {text: veiculo.renavam}).mask("00000000-0"),
					$('<td>', {text: veiculo.anomodelo}),
					$('<td>', {text: veiculo.anofabrica}),
					$('<td>', {text: veiculo.cor}),
					$('<td>', {text: veiculo.km}),
					$('<td>', {text: veiculo.marca.toUpperCase()}),
					$('<td>', {text: veiculo.preco}).mask('R$ #########'),
					$('<td>', {text: veiculo.precofipe}).mask('R$ #########'),
					$('<td>').append(
					)
				)
			)
		}
	})	
}

function montarTabelaRelatorioAno() {

	var table = document.querySelector('table tbody')
	var tableHtml = ''
	
	var ano = '';

	$('table tbody').html('')
	veiculos.forEach(function(veiculo) {
		if (!$.isEmptyObject(veiculo)) {
			$('#relatoriodados table tr th:nth-child(5)').hide();

			if (veiculo.anofabrica != ano) {
				ano = veiculo.anofabrica;

				$('table tbody').append(
					$('<tr class="anolabel">').append(
						$('<th>', {text: ano, colspan: '100%'})
					)
				);

			}

			$('table tbody').append(
			 	
				$('<tr>').append(
					$('<td>', {text: veiculo.descricao.toUpperCase()}),
					$('<td>', {text: veiculo.placa}).mask("AAA-0000"),
					$('<td>', {text: veiculo.renavam}).mask("00000000-0"),
					$('<td>', {text: veiculo.anomodelo}),
					// $('<td>', {text: veiculo.anofabrica}),
					$('<td>', {text: veiculo.cor}),
					$('<td>', {text: veiculo.km}),
					$('<td>', {text: veiculo.marca.toUpperCase()}),
					$('<td>', {text: veiculo.preco}).mask('R$ #########'),
					$('<td>', {text: veiculo.precofipe}).mask('R$ #########'),
					$('<td>').append(
					)
				)
			)
		}
	})	
}

function montarTabelaRelatorioMarca() {

	var table = document.querySelector('table tbody')
	var tableHtml = ''
	
	var marca = '';

	$('table tbody').html('')
	veiculos.forEach(function(veiculo) {
		if (!$.isEmptyObject(veiculo)) {
			$('#relatoriodados table tr th:nth-child(8)').hide();

			if (veiculo.marca != marca) {
				marca = veiculo.marca;

				$('table tbody').append(
					$('<tr class="anolabel">').append(
						$('<th>', {text: marca.toUpperCase(), colspan: '100%'})
					)
				);

			}

			$('table tbody').append(
				$('<tr>').append(
					$('<td>', {text: veiculo.descricao.toUpperCase()}),
					$('<td>', {text: veiculo.placa}).mask("AAA-0000"),
					$('<td>', {text: veiculo.renavam}).mask("00000000-0"),
					$('<td>', {text: veiculo.anomodelo}),
					$('<td>', {text: veiculo.anofabrica}),
					$('<td>', {text: veiculo.cor}),
					$('<td>', {text: veiculo.km}),
					// $('<td>', {text: veiculo.marca.toUpperCase()}),
					$('<td>', {text: veiculo.preco}).mask('R$ #########'),
					$('<td>', {text: veiculo.precofipe}).mask('R$ #########'),
					$('<td>').append(
					)
				)
			)
		}
	})	
}



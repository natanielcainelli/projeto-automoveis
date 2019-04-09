
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

function montarObjeto(){

	var id = parseInt($('#idAutomovel').val());
	var adicionais = [];

	$('#form_adicionais input:checked').each(function() {
		adicionais.push($(this).val());
	});

	var data = {
		id: id,
		descricao: $("#descricao").val(),
		placa: $("#placa").unmask().val(),
		renavam: $("#renavam").unmask().val(),
		anomodelo: $("#anomodelo").val(),
		anofabrica: $("#anofabricacao").val(),
		cor: $("#cor").val(),
		km: $("#km").val(),
		marca: $("#marca").val(),
		preco: $("#preco").unmask().val(),
		precofipe: $("#precofipe").unmask().val(),
		veiculo_id: id,
		adicionais: adicionais
	};

	return data;

}

function recebeParametros (tipo, data) {

	if(tipo == 'alterar') {

		requisicao({
			url: 'http://localhost/projeto-automoveis/api/',
			type: 'POST',
			data: {data: data, 'action': 'alterarVeiculo'},
			fnSuccess: function(result) {
				veiculos = result;
			}
		});

	}
	if(tipo == 'novo') {

		requisicao({
			url: 'http://localhost/projeto-automoveis/api/',
			type: 'POST',
			data: {data: data, 'action': 'novoVeiculo'},
			fnSuccess: function(result) {
				if (result['erro'].arr.length != 0) {
					$('#campo_erros_texto')+= result['erro'];
				}
				veiculos = result;
			}
		});	
	}
}

function montaObjetoEditar(id) {

	veiculo = [];

	$.ajax({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'GET',
		dataType: 'json',
		data: {'action': 'listarEditarVeiculo'},
		async: false,
		success: function(result) {
			veiculo = result;
		},
		error: function(error) {}
	});

	veiculo.forEach(function(carro) {
		if(carro.id == id) {

		  	$('#idAutomovel').val(id);
			$('#menuprincipal').hide();
			$('#alterar-tela').show();
			$('#descricao').val(carro.descricao);
			$('#placa').val(carro.placa).mask("AAA-0000");
			$('#renavam').val(carro.renavam).mask("00000000-0");
			$('#anomodelo').val(carro.anomodelo);
			$('#anofabricacao').val(carro.anofabrica);
			$('#cor').val(carro.cor);
			$('#km').val(carro.km);
			$('#marca').val(carro.marca.toLowerCase());
			$('#preco').val(carro.preco).mask('R$ #########');
			$('#precofipe').val(carro.precofipe).mask('R$ #########');

		}
	});
	validaCampos();

	var data = {

		id: id

	};	

	var veiculos = [];
	$.ajax({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		dataType: 'json',
		data: {'data': data ,'action': 'geraAdicionaisVeiculo'},
		async: false,
		success: function(result) {	
			veiculos = result;
		},
		error: function(error) {
		}
	});

	$.each(veiculos, function(key, value) {

		$("input[value="+ value.adicionais +"]").prop('checked', true);

	});

}

function montaObjetoExcluir() {

	var ids = [];
	$('input[type=checkbox]:checked').each(function(key, value) {
		ids.push($(this).attr('id'));
	})

	$.ajax({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		dataType: 'json',
		data: {'data': ids, 'action': 'excluirVeiculo'},

		success: function(result) {
			veiculos = result;
			listar();
		},
		error: function(error) {}
	});	

	if(ids > 0) {
		alert('Veiculos excluídos com sucesso');
	}

	$('input[type=checkbox]').each(function(key, value) {
		
		if ($(this).is(':checked')) {
			var id = $(this).attr('id');
			$('#idAutomovel').val(id);
		}
		
		$.ajax({
			url: 'http://localhost/projeto-automoveis/api/?id='+ id,
			type: 'GET',
			dataType: 'json',
			data: {'action': 'excluirVeiculo'},

			success: function(result) {
				veiculos = result;
				listar();
			},
			error: function(error) {}
		});	
		
	});
	listar();
}

function obterUltimoIndice() {
	var veiculos = [];
	$.ajax({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'GET',
		dataType: 'json',
		data: {'action': 'listarUltimoIdVeiculo'},
		async: false,
		success: function(result) {
			veiculos = result;
		},
		error: function(error) {}
	});

	var indice = veiculos[veiculos.length -1];

	return indice;
}

function listar() {

	requisicao({
		url: 'http://localhost/projeto-automoveis/api/?pagina='+ pagina+'&marca='+ $('#buscarapidamarca').val()+ '&descricao='+ $('#buscarapidadescricao').val(),
		type: 'GET',
		data: {'action': 'listarVeiculo'},
		fnSuccess: function(result) {
			veiculos = result;
			montarTabela();
		}
	});
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

function montarTabela() {
	
	var table = document.querySelector('table tbody')
	var tableHtml = ''
	
	$('table tbody').html('')
	veiculos.forEach(function(veiculo) {
		if (!$.isEmptyObject(veiculo)) {
			 $('table tbody').append(
				$('<tr>').append(
					$('<td>', {text: veiculo.descricao.toUpperCase()}),
					$('<td>', {text: veiculo.placa}).mask("AAA-0000"),
					$('<td>', {text: veiculo.marca.toUpperCase()}),
					$('<td>').append(
						$('<input>', {type: 'checkbox', id: veiculo.id})
					)
				).click(function(e) {
					if ($(e.target).attr('type') != 'checkbox') {
						editar(veiculo);
					}
				})
			)
		}
	})	
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

function editar(veiculo) {

	routie('editar/' +veiculo.id);

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
window.onload = function() {
	pagina = 1;
	var usuario = getUsuario();
	$('#nomeusuario').text(usuario);
	vincularEventos();

}

/* Aqui ocorrem os eventos de ação de botões e campos de input */ 

function vincularEventos() {

	routie('', function() {
		$('#relatoriodados').hide();
		$('#alterar-tela').hide();
		$('#menuprincipal').show();

		listar();
	});

	routie('cadastro', function() {
		$('#menuprincipal').hide();
		$('#alterar-tela').show();	
		$('#alterar_menu').hide();
		$('#novo_menu').show();
		$('#menubusca').hide();
		$('#placa').mask("AAA-0000");
		$('#renavam').mask("00000000-0");
		$('#preco').mask('R$ #########');
		$('#precofipe').mask('R$ #########');
		validaCampos();
	});

	routie('editar/?:id', function(id) {
		$('#alterar_menu').show();
		$('#novo_menu').hide();
		$('#menubusca').hide();
		montaObjetoEditar(id);
	});

	$('#botaobuscardescricao, #botaobuscarmarca').on('click', function() {
		
		listar();

	});	

	$('#cadastrarnovo').on('click', function() {

		routie('cadastro');

	});

	$('#excluirveiculoid').on('click', function() {

		montaObjetoExcluir();
	});

	$('#buscarapidadescricao').keypress(function(e) {
    	if(e.keyCode==13){
    		$('#botaobuscardescricao').click();
    		$('#buscarapidadescricao').val("");
  		}
    });

	$('#buscarapidamarca').keypress(function(e) {
    	if(e.keyCode==13){
      		$('#botaobuscardescricao').click();
      		$('#buscarapidamarca').val("");
    	}
    });

    $('#buscarapidamarcarelatorio').keypress(function(e) {
    	if(e.keyCode==13){
      		$('#filtrobutton').click();
      		$('#buscarapidamarcarelatorio').val("");
    	}
    });

    $('#buscarapidaano').keypress(function(e) {
    	if(e.keyCode==13){
      		$('#filtrobutton').click();
      		$('#buscarapidaano').val("");
    	}
    });

	$('#confirmaalteracaotelaprincipal').on('click', function() {
		
		var erro = validaCampos();
		var tipo = 'alterar';

		if(erro == true){

			var erro = validaCampos();
			alert('Por favor preencha todos os campos para continuar');

		}
		if(erro == false){

			var data = montarObjeto();
			recebeParametros(tipo, data);
			
			alert('Veiculo modificado com sucesso');
			window.location.href="veiculos.html";
		}
	});
	
	$('#page1, #page2, #page3').on('click', function() {
		pagina = parseInt($(this).text());
		listar();

	});

	$('#pageant').on('click', function() {

		if(pagina>1){
			pagina=pagina-1;
			listar();
		}

	});

	$('#pagenext').on('click', function() {

		if(pagina<3){
			pagina=pagina+1;
			listar();
		}

	});

	$('#confirmanovotelaprincipal').on('click', function() {
		
		var i = 0;
		var erro = validaCampos();
		var tipo = 'novo';

		if(erro != "") {
			
			alert(erro);

		}else {
			var data = montarObjeto();
			recebeParametros(tipo, data);	
			alert('Veiculo cadastrado com sucesso');
			window.location.href="veiculos.html";
			listar();
		}
	});
}

function validaCampos() {
	var erros = "";
	data = {

		descricao: $("#descricao").val(),
		placa: $("#placa").unmask().val(),
		renavam: $("#renavam").unmask().val(),
		cor: $("#cor").val(),
		km: $("#km").val(),
		preco: $("#preco").unmask().val(),
		precofipe: $("#precofipe").unmask().val()

	}

	requisicao({
		url: 'http://localhost/projeto-automoveis/api/',
		type: 'POST',
		data: {data: data, 'action': 'validaCampos'},
		fnSuccess: function(result) {
			erros = result;
			return erros;
		}
	});
	return erros;
}

function editar(veiculo) {

	routie('editar/' +veiculo.id);

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


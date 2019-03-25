window.onload = function() {

	pagina = 1;	
	listar();
	$('#relatoriodados').hide();
	vincularEventos();
}

function vincularEventos() {
	
	routie('cadastro', function() {

		$('#menuprincipal').hide();
		$('#novo-tela').show();	

	});

	routie('editar/?:id', function(id){
		veiculo = [];
		$.ajax({
			url: 'http://localhost/projeto-automoveis/server/teste_banco.php',
			type: 'GET',
			dataType: 'json',
			data: {'action': 'listarultimoid'},
			async: false,
			success: function(result) {
				veiculo = result;
			},
			error: function(error) {}
		});
		
		console.table(veiculo);

		$('#idAutomovel').val(id);
		$('#menuprincipal').hide();
		$('#alterar-tela').show();

		$('#alterar-descricao').val(veiculo[id-1].descricao);
		$('#alterar-placa').val(veiculo[id-1].placa).mask("AAA-0000");
		$('#alterar-renavam').val(veiculo[id-1].renavam).mask("00000000-0");
		$('#alterar-anomodelo').val(veiculo[id-1].anomodelo);
		$('#alterar-anofabricacao').val(veiculo[id-1].anofabrica);
		$('#alterar-cor').val(veiculo[id-1].cor);
		$('#alterar-km').val(veiculo[id-1].km);
		$('#alterar-marca').val(veiculo[id-1].marca.toLowerCase());
		$('#alterar-preco').val(veiculo[id-1].preco).mask('R$ #########');
		$('#alterar-precofipe').val(veiculo[id-1].precofipe).mask('R$ #########');

		var value = "alterar";
		validaCampos(value);

		var data ={

			id: id

		};	

		var veiculos = [];
		$.ajax({
			url: 'http://localhost/projeto-automoveis/server/teste_banco.php',
			type: 'POST',
			dataType: 'json',
			data: {'data': data ,'action': 'geradadosadicionais'},
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

	});

	$('#botaobuscardescricao').on('click', function() {
		
			listar();
	});

	$('#botaobuscarmarca').on('click', function() {
		
			listar();
	});

	$('#cadastrarnovo').on('click', function() {

		$('#menuprincipal').hide();
		$('#novo-tela').show();	

		$('#novo-placa').mask("AAA-0000");
		$('#novo-renavam').mask("00000000-0");
		$('#novo-preco').mask('R$ #########');
		$('#novo-precofipe').mask('R$ #########');

		var value = "novo";
		validaCampos(value);

	});

	$('#excluirveiculoid').on('click', function() {

		var ids = [];
		$('input[type=checkbox]:checked').each(function(key, value) {
			ids.push($(this).attr('id'));
		})

		$.ajax({
			url: 'http://localhost/projeto-automoveis/server/teste_banco.php',
			type: 'POST',
			dataType: 'json',
			data: {'data': ids, 'action': 'excluir'},

			success: function(result) {
				veiculos = result;

				listar();
			},
			error: function(error) {}
		});	

		if(ids > 0){
			alert('Veiculos excluídos com sucesso');
		}

		$('input[type=checkbox]').each(function(key, value) {
			
			if ($(this).is(':checked')) {
				var id = $(this).attr('id');
				$('#idAutomovel').val(id);
			}
			
			$.ajax({
				url: 'http://localhost/projeto-automoveis/server/teste_banco.php?id='+ id,
				type: 'GET',
				dataType: 'json',
				data: {'action': 'excluir'},

				success: function(result) {
					veiculos = result;

					listar();
				},
				error: function(error) {}
			});	
			
		});
		listar();
		
	});

	$('#confirmaalteracaotelaprincipal').on('click', function() {
		var id = parseInt($('#idAutomovel').val());
		var adicionais = [];
		var i = 0;

	
		var value = "alterar";
		var erro = validaCampos(value);


		if(erro == true){

			var erro = validaCampos(value);
			alert('Por favor preencha todos os campos para continuar')

		}
		if(erro == false){

			for (var j = 1; j < 10; j++) {
				if($("input[value="+ j +"]").is(':checked')){
					adicionais[i] = j ; 
					i++;
				}
			}

			var data = {
				id: id,
				descricao: $("#alterar-descricao").val(),
				placa: $("#alterar-placa").unmask().val(),
				renavam: $("#alterar-renavam").unmask().val(),
				anomodelo: $("#alterar-anomodelo").val(),
				anofabrica: $("#alterar-anofabricacao").val(),
				cor: $("#alterar-cor").val(),
				km: $("#alterar-km").val(),
				marca: $("#alterar-marca").val(),
				preco: $("#alterar-preco").unmask().val(),
				precofipe: $("#alterar-precofipe").unmask().val(),

				veiculo_id: id,
				adicionais: adicionais

			};

			$.ajax({
				url: 'http://localhost/projeto-automoveis/server/teste_banco.php',
				type: 'POST',
				dataType: 'json',
				data: {'data': data, 'action': 'alterar'},

				success: function(result) {
					veiculos = result;
				},
				error: function(error) {}
			});			


			$('#alterar-tela').hide();	
			$('#menuprincipal').show();
			listar();
			alert('Veiculo modificado com sucesso');
		}
	});
	

	$('#page1').on('click', function() {

		pagina=1;
		listar();

	});
	$('#page2').on('click', function() {

		pagina=2;
		listar();

	});
	$('#page3').on('click', function() {

		pagina=3;
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
	$('#gerarrelatorio').on('click', function() {

			listarRelatorio();
			$('#relatoriodados').show();
			$('#botaogerar').hide();

	});
	$('#pageall').on('click', function() {

			listar();

	});

	$('#confirmanovotelaprincipal').on('click', function() {
		
		var id = parseInt($('#idAutomovel').val());
		var adicionais = [];
		var ultimoid = obterUltimoIndice();
		var idatual = parseInt(ultimoid.id) + 1;
		var i = 0;


		var value = "novo";
		var erro = validaCampos(value);


		if(erro == true){

			var erro = validaCampos(value);
			alert('Por favor preencha todos os campos para continuar')

		}

		if(erro == false){

			for (var j = 11; j < 20; j++) {
				if($("input[value="+ j +"]").is(':checked')){
					adicionais[i] = (j - 10); 
					i++;
				}
			}

			var data = {

				descricao: $("#novo-descricao").val() == "" ? "" : $("#novo-descricao").val(),
				placa: $("#novo-placa").unmask().val() == "" ? "" : $("#novo-placa").unmask().val(),
				renavam: $("#novo-renavam").unmask().val() == "" ? 0 : $("#novo-renavam").unmask().val(),
				anomodelo: $("#novo-anomodelo").val() == "" ? 0 : $("#novo-anomodelo").val(),
				anofabrica: $("#novo-anofabricacao").val()== "" ? 0 : $("#novo-anofabricacao").val(),
				cor: $("#novo-cor").val() == "" ? "" : $("#novo-cor").val(),
				km: $("#novo-km").val() == "" ? 0 : $("#novo-km").val(),
				marca: $("#novo-marca").val() == "" ? "" : $("#novo-marca").val(),
				preco: $("#novo-preco").unmask().val() == "" ? 0 : $("#novo-preco").unmask().val(),
				precofipe: $("#novo-precofipe").unmask().val() == "" ? 0 : $("#novo-precofipe").unmask().val(),

				veiculo_id: idatual,
				adicionais: adicionais
				
			};

			$.ajax({
				url: 'http://localhost/projeto-automoveis/server/teste_banco.php',
				type: 'POST',
				dataType: 'json',
				data: {'data': data, 'action': 'novo'},

				success: function(result) {
					veiculos = result;

				},
				error: function(error) {

				}
			});			
			alert('Veiculo cadastrado com sucesso');
			window.location.href="menuprincipal.html"

			listar();
		}
	});
}

function validaCampos($value){

	
	$('#'+ $value +'-descricao').on("blur", function(){
		if($(this).val() == ""){
			alert('Digite uma descricao para o veiculo');
		}
	});
	$('#'+ $value +'-placa').on("blur", function(){
		if(	$(this).val() == "" || $(this).val().length < 8 || $(this).val().length > 8 ){
			alert('Digite uma placa para o veiculo');
		}
	});
	$('#'+ $value +'-renavam').on("blur", function(){
		if(	$(this).val() == "" || $(this).val().length < 10 || $(this).val().length > 10 ){
			alert('Digite um renavam para o veiculo');
		}
	});
	$('#'+ $value +'-cor').on("blur", function(){
		if(	$(this).val() == "" ){
			alert('Digite uma cor para o veiculo');
		}
	});
	$('#'+ $value +'-km').on("blur", function(){
		if(	$(this).val() == "" || $(this).val() < 0 ){
			alert('Digite uma kilometragem para o veiculo');
		}
	});
	$('#'+ $value +'-preco').on("blur", function(){
		if(	$(this).val() == "" || $(this).val() <= 0 ){
			alert('Digite um preço para o veiculo');
		}
	});
	$('#'+ $value +'-precofipe').on("blur", function(){
		if(	$(this).val() == "" || $(this).val() <= 0 ){
			alert('Digite um preço da tabela fipe para o veiculo');
		}
	});

	var erro = validaFormulario($value);

	return erro;
}

function validaFormulario($value){

	var erro = false;

	if($('#'+ $value +'-descricao') == ""){
		erro = true;
	}if($('#'+ $value +'-placa') == "" || $('#'+ $value +'-placa').val().length < 8 || $('#'+ $value +'-placa').val().length > 8 ){
		erro = true;
	}if($('#'+ $value +'-renavam') == "" || $('#'+ $value +'-renavam').val().length < 10 || $('#'+ $value +'-renavam').val().length > 10){
		erro = true;
	}if($('#'+ $value +'-cor') == ""){
		erro = true;
	}if($('#'+ $value +'-km') == ""){
		erro = true;
	}if($('#'+ $value +'-preco') == "" || $('#'+ $value +'-preco').val() <= 0){
		erro = true;
	}if($('#'+ $value +'-precofipe') == "" || $('#'+ $value +'-precofipe').val() <= 0){
		erro = true;
	}

	return erro;

}

function obterUltimoIndice() {
	var veiculos = [];
	$.ajax({
		url: 'http://localhost/projeto-automoveis/server/teste_banco.php',
		type: 'GET',
		dataType: 'json',
		data: {'action': 'listarultimoid'},
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
	
	$.ajax({
		url: 'http://localhost/projeto-automoveis/server/teste_banco.php?pagina='+ pagina+'&marca='+ $('#buscarapidamarca').val()+ '&descricao='+ $('#buscarapidadescricao').val(),
		type: 'GET',
		dataType: 'json',
		data: {'action': 'listar'},
		success: function(result) {
			veiculos = result;
			montarTabela();
		},
		error: function(error) {}
	});
}

function listarRelatorio() {
	
	$.ajax({
		url: 'http://localhost/projeto-automoveis/server/teste_banco.php',
		type: 'GET',
		dataType: 'json',
		data: {'action': 'listarultimoid'},
		success: function(result) {
			veiculos = result;
			montarTabelaRelatorio();
		},
		error: function(error) {}
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

function editar(veiculo) {

	$('#idAutomovel').val(veiculo.id);
	$('#menuprincipal').hide();
	$('#alterar-tela').show();

	$('#alterar-descricao').val(veiculo.descricao);
	$('#alterar-placa').val(veiculo.placa).mask("AAA-0000");
	$('#alterar-renavam').val(veiculo.renavam).mask("00000000-0");
	$('#alterar-anomodelo').val(veiculo.anomodelo);
	$('#alterar-anofabricacao').val(veiculo.anofabrica);
	$('#alterar-cor').val(veiculo.cor);
	$('#alterar-km').val(veiculo.km);
	$('#alterar-marca').val(veiculo.marca.toLowerCase());
	$('#alterar-preco').val(veiculo.preco).mask('R$ #########');
	$('#alterar-precofipe').val(veiculo.precofipe).mask('R$ #########');

	var value = "alterar";
	validaCampos(value);

	var data ={

		id: veiculo.id

	};	

	var veiculos = [];
	$.ajax({
		url: 'http://localhost/projeto-automoveis/server/teste_banco.php',
		type: 'POST',
		dataType: 'json',
		data: {'data': data ,'action': 'geradadosadicionais'},
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


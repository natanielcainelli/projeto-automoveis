window.onload = function() {
	pagina = 1;
	$('#relatoriodados').hide();
	vincularEventos();
}

function vincularEventos() {

	routie('', function() {
		$('#alterar-tela').hide();
		$('#menuprincipal').show();
		listar();
	});

	routie('cadastro', function() {

		$('#menuprincipal').hide();
		$('#alterar-tela').show();	

	});

	routie('editar/?:id', function(id){
		$('#alterar_menu').show();
		$('#novo_menu').hide();
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

		$('#idAutomovel').val(id);
		$('#menuprincipal').hide();
		$('#alterar-tela').show();

		$('#descricao').val(veiculo[id-1].descricao);
		$('#placa').val(veiculo[id-1].placa).mask("AAA-0000");
		$('#renavam').val(veiculo[id-1].renavam).mask("00000000-0");
		$('#anomodelo').val(veiculo[id-1].anomodelo);
		$('#anofabricacao').val(veiculo[id-1].anofabrica);
		$('#cor').val(veiculo[id-1].cor);
		$('#km').val(veiculo[id-1].km);
		$('#marca').val(veiculo[id-1].marca.toLowerCase());
		$('#preco').val(veiculo[id-1].preco).mask('R$ #########');
		$('#precofipe').val(veiculo[id-1].precofipe).mask('R$ #########');

		validaCampos();

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

	$('#botaobuscardescricao, #botaobuscarmarca').on('click', function() {
		
			listar();
	});

	$('#cadastrarnovo').on('click', function() {

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
		$('#menubusca').show();
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
	$('#gerarrelatorio').on('click', function() {

			listarRelatorio();
			$('#relatoriodados').show();
			$('#botaogerar').hide();

	});

	$('#confirmanovotelaprincipal').on('click', function() {
		
		var id = parseInt($('#idAutomovel').val());
		var adicionais = [];
		var ultimoid = obterUltimoIndice();
		var idatual = parseInt(ultimoid.id) + 1;
		var i = 0;

		var erro = validaCampos();


		if(erro == true){

			var erro = validaCampos();
			alert('Por favor preencha todos os campos para continuar')

		}

		if(erro == false){

			for (var j = 1; j < 10; j++) {
				if($("input[value="+ j +"]").is(':checked')){
					adicionais[i] = j; 
					i++;
				}
			}

			var data = {

				descricao: $("#descricao").val() == "" ? "" : $("#descricao").val(),
				placa: $("#placa").unmask().val() == "" ? "" : $("#placa").unmask().val(),
				renavam: $("#renavam").unmask().val() == "" ? 0 : $("#renavam").unmask().val(),
				anomodelo: $("#anomodelo").val() == "" ? 0 : $("#anomodelo").val(),
				anofabrica: $("#anofabricacao").val()== "" ? 0 : $("#anofabricacao").val(),
				cor: $("#cor").val() == "" ? "" : $("#cor").val(),
				km: $("#km").val() == "" ? 0 : $("#km").val(),
				marca: $("#marca").val() == "" ? "" : $("#marca").val(),
				preco: $("#preco").unmask().val() == "" ? 0 : $("#preco").unmask().val(),
				precofipe: $("#precofipe").unmask().val() == "" ? 0 : $("#precofipe").unmask().val(),

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
		$('#menubusca').show();
	});
}

function validaCampos(){

	
	$('#descricao').on("blur", function(){
		if($(this).val() == ""){
			alert('Digite uma descricao para o veiculo');
		}
	});
	$('#placa').on("blur", function(){
		if(	$(this).val() == "" || $(this).val().length < 8 || $(this).val().length > 8 ){
			alert('Digite uma placa para o veiculo');
		}
	});
	$('#renavam').on("blur", function(){
		if(	$(this).val() == "" || $(this).val().length < 10 || $(this).val().length > 10 ){
			alert('Digite um renavam para o veiculo');
		}
	});
	$('#cor').on("blur", function(){
		if(	$(this).val() == "" ){
			alert('Digite uma cor para o veiculo');
		}
	});
	$('#km').on("blur", function(){
		if(	$(this).val() == "" || $(this).val() < 0 ){
			alert('Digite uma kilometragem para o veiculo');
		}
	});
	$('#preco').on("blur", function(){
		if(	$(this).val() == "" || $(this).val() <= 0 ){
			alert('Digite um preço para o veiculo');
		}
	});
	$('#precofipe').on("blur", function(){
		if(	$(this).val() == "" || $(this).val() <= 0 ){
			alert('Digite um preço da tabela fipe para o veiculo');
		}
	});

	var erro = validaFormulario();

	return erro;
}

function validaFormulario(){

	var erro = false;

	if($('#descricao') == ""){
		erro = true;
	}if($('#placa') == "" || $('#placa').val().length < 8 || $('#placa').val().length > 8 ){
		erro = true;
	}if($('#renavam') == "" || $('#renavam').val().length < 10 || $('#renavam').val().length > 10){
		erro = true;
	}if($('#cor') == ""){
		erro = true;
	}if($('#km') == ""){
		erro = true;
	}if($('#preco') == "" || $('#preco').val() <= 0){
		erro = true;
	}if($('#precofipe') == "" || $('#precofipe').val() <= 0){
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


	routie('editar/' +veiculo.id);

}
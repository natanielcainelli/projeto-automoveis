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
			window.location.href="menuprincipal.html";
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

		if(erro == true) {
			var erro = validaCampos();
			alert('Por favor preencha todos os campos para continuar');

		}

		if(erro == false) {
			var data = montarObjeto();
			recebeParametros(tipo, data);	
			alert('Veiculo cadastrado com sucesso');
			window.location.href="menuprincipal.html";
			listar();
		}
	});
}

function validaCampos() {

	var qtd_erros = 0;

	$('#descricao').on("blur", function() {
		if($(this).val() == "") {
			$("#erros_form").show();
			$("#erros_form_descricao").show();
			$(this).attr('class', "campo_erro");
			qtd_erros++;
		}if($(this).val() != "") {
			$("#erros_form_descricao").hide();
			$(this).attr('class', "campo");
			qtd_erros--;
			if(qtd_erros == 0) {
				$("#erros_form").hide();
			}
		}
	});

	$('#placa').on("blur", function() {
		if(	$(this).val() == "" || $(this).val().length < 8 || $(this).val().length > 8) {
			$("#erros_form").show();
			$("#erros_form_placa").show();
			$(this).attr('class', "campo_erro");
			qtd_erros++;
		}if($(this).val() != "") {
			$("#erros_form_placa").hide();
			$(this).attr('class', "campo");
			qtd_erros--;
			if(qtd_erros == 0) {
				$("#erros_form").hide();
			}
		}
	});

	$('#renavam').on("blur", function() {
		if(	$(this).val() == "" || $(this).val().length < 10 || $(this).val().length > 10) {
			$("#erros_form").show();
			$("#erros_form_renavam").show();
			$(this).attr('class', "campo_erro");
			qtd_erros++;
		}if($(this).val() != "") {
			$("#erros_form_renavam").hide();
			$(this).attr('class', "campo");
			qtd_erros--;
			if(qtd_erros == 0) {
				$("#erros_form").hide();
			}
		}
	});

	$('#cor').on("blur", function() {
		if(	$(this).val() == "") {
			$("#erros_form").show();
			$("#erros_form_cor").show();
			$(this).attr('class', "campo_erro");
			qtd_erros++;
		}if($(this).val() != "") {
			$("#erros_form_cor").hide();
			$(this).attr('class', "campo");
			qtd_erros--;
			if(qtd_erros == 0) {
				$("#erros_form").hide();
			}
		}
	});

	$('#km').on("blur", function() {
		if(	$(this).val() == "" || $(this).val() < 0) {
			$("#erros_form").show();
			$("#erros_form_km").show();
			$(this).attr('class', "campo_erro");
			qtd_erros++;
		}if($(this).val() != "") {
			$("#erros_form_km").hide();
			$(this).attr('class', "campo");
			qtd_erros--;
			if(qtd_erros == 0) {
				$("#erros_form").hide();
			}
		}
	});

	$('#preco').on("blur", function() {
		if(	$(this).val() == "" || $(this).val() <= 0) {
			$("#erros_form").show();
			$("#erros_form_preco").show();
			$(this).attr('class', "campo_erro");
			qtd_erros++;
		}if($(this).val() != "") {
			$("#erros_form_preco").hide();
			$(this).attr('class', "campo");
			qtd_erros--;
			if(qtd_erros == 0) {
				$("#erros_form").hide();
			}
		}
	});

	$('#precofipe').on("blur", function() {
		if(	$(this).val() == "" || $(this).val() <= 0) {
			$("#erros_form").show();
			$("#erros_form_precofipe").show();
			$(this).attr('class', "campo_erro");
			qtd_erros++;
		}if($(this).val() != "") {
			$("#erros_form_precofipe").hide();
			$(this).attr('class', "campo");
			qtd_erros--;
			if(qtd_erros == 0) {
				$("#erros_form").hide();
			}
		}
	});

	var erro = validaFormulario();
	return erro;
}

function validaFormulario() {

	var erro = false;

	if($('#descricao') == "") {
		erro = true;
	}if($('#placa') == "" || $('#placa').val().length < 8 || $('#placa').val().length > 8 ) {
		erro = true;
	}if($('#renavam') == "" || $('#renavam').val().length < 10 || $('#renavam').val().length > 10) {
		erro = true;
	}if($('#cor') == "") {
		erro = true;
	}if($('#km') == "") {
		erro = true;
	}if($('#preco') == "" || $('#preco').val() <= 0) { 
		erro = true;
	}if($('#precofipe') == "" || $('#precofipe').val() <= 0) {
		erro = true;
	}

	return erro;

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
function editar(veiculo) {

	routie('editar/' +veiculo.id);

}

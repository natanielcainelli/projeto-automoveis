window.onload = function() {
	pagina = 1;
	var usuario = getUsuario();
	$('#nomeusuario').text(usuario);
	
	vincularEventos();
}

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

	$('#cadastrarnovo').on('click', function() {

		routie('cadastro');

	});

	$('#excluirveiculoid').on('click', function() {

		montaObjetoExcluir();
	});

	$('#buscarapidadescricao').keypress(function(e) {
    	if(e.keyCode==13){
    		$('#botaobuscardescricao').click();
  		}
    });

	$('#buscarapidamarca').keypress(function(e) {
    	if(e.keyCode==13){
      		$('#botaobuscardescricao').click();
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
			listarRelatorio(filtro,adicionais);
			$('#relatoriodados').show();
			$('#botaogerar').hide();
			$('#menubuscarelatorio').hide();
			$('#filtradopormarca').show();
	});

	$('#gerarrelatorioporano').on('click', function() {
			var filtro = "ano";
			var adicionais= [];
			listarRelatorio(filtro,adicionais);
			$('#relatoriodados').show();
			$('#botaogerar').hide();
			$('#menubuscarelatorio').hide();
			$('#filtradoporano').show();
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

	$('#buttonlogin').on('click', function() {
			
		verificarLogin();

	});

	$('#buttoncadastrar').on('click', function() {
			
		$('#logintela').hide();
		$('#usrcadastro').show();

	});

	$('#newbuttoncadastrar').on('click', function() {
			
		cadastrarUsuario();
		$('#usrcadastro').hide();
		$('#logintela').show();	
	    $('#newloginusr').val("");
    	$('#newpasswordusr').val("");
    	$('#newemailusr').val("");
    	$('#newnomeusr').val("");

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
  		}
    });
}


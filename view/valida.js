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
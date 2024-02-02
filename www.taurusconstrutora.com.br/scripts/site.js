$(function(){

	//funcao resize
	_width = $('body').width();

	//menu sanduiche
	$('.sanduiche').click(function(){
		$('html').addClass('sanduiche-aberto');
	});
	$('.desktop .fechar').click(function(){
		$('html').removeClass('sanduiche-aberto');
	});

	//abre submenu para dispositivos sem :hover
	$('.desktop a, .sanduiche').click(function(){
		$(this).toggleClass('active');
	}).mouseenter(function(){
		$(this).addClass('hover');
	}).mouseleave(function(){
		$(this).removeClass('hover');
	});

	// voltar ao topo
	$('#voltar-ao-topo').click(function(){ 
    	$('html, body').animate({ scrollTop : 0 },'slow');
		return false;
	});

	// carousel emrpeendimentos
	$('.carousel-empreendimentos').owlCarousel({
		loop : false,
		margin : 0,
		autoWidth : false,
		nav : true,
		dots : false,
		autoplay : false,
		autoplayTimeout : 3500,
		autoplayHoverPause : true,
		responsive : {
			0 : { items : 1 },
			380 : { items : 2, margin : 14, slideBy : 2 },
			748 : { items : 3, margin : 14, slideBy : 3 }
		}
	});

	// carousel depoimentos
	$('#depoimentos .carousel-depoimentos').owlCarousel({
		loop : false,
		margin : 0,
		autoWidth : false,
		nav : false,
		dots : true,
		autoplay : false,
		autoplayTimeout : 3500,
		autoplayHoverPause : true,
		responsive : {
			0 : { items : 1 },
			640 : { items : 2, margin : 14, slideBy : 2 },
			940 : { items : 3, margin : 14, slideBy : 3 }
		}
	});

	if(page == 'empreendimento-detalhe'){

		// carousel empreendimento galeria e carousel edificio galeria
		$('#galeria-empreendimento .carousel-galeria, #galeria-edificio .carousel-galeria').owlCarousel({
			loop : true,
			margin : 0,
			autoWidth : false,
			nav : true,
			dots : false,
			autoplay : false,
			autoplayTimeout : 3500,
			autoplayHoverPause : true,
			responsive : {
				0 : { items : 1 },
				380 : { items : 2, margin : 14, slideBy : 2 },
				640 : { items : 3, margin : 14, slideBy : 3 }
			}
		});

		// carousel plantas
		$('#plantas .carousel-plantas').owlCarousel({
			loop : false,
			margin : 0,
			autoWidth : false,
			nav : true,
			dots : false,
			autoplay : false,
			autoplayTimeout : 3500,
			autoplayHoverPause : true,
			responsive : {
				0 : { items : 1 },
			}
		});

		// --- carousel obras galeria
		var $gal_estagio = $('#galeria-obras .carousel-galeria-obras').owlCarousel({
			loop : true,
			margin : 0,
			autoWidth : false,
			nav : true,
			dots : false,
			autoplay : false,
			autoplayTimeout : 3500,
			autoplayHoverPause : true,
			responsive : {
				0 : { items : 2, margin : 20, slideBy : 2 },
				580 : { items : 3, margin : 20, slideBy : 3 },
				748 : { items : 4, margin : 20, slideBy : 4 },
				940 : { items : 5, margin : 20, slideBy : 5 }
			}
		});

		// -- galeria estagio - filtro pro ano e mês
		var $idempreendimento = $('.carousel-galeria-obras').data('idempreendimento'),
			$ano_ativo = $('.carousel-galeria-obras').data('ano'),
			$mes_ativo = $('.carousel-galeria-obras').data('mes');

		populaImagens($mes_ativo,$idempreendimento); //carregamento da página

		$('#galeria-obras .periodo .ano a').click(function(evt){
			evt.preventDefault();
			var $this = $(this),
				$ano = $this.data('ano');

			//ano ativo
			$('#galeria-obras .periodo .ano a').removeClass('ativo');
			$this.addClass('ativo');

			$ano_ativo = $('#galeria-obras .periodo .ano a.ativo').data('ano');

			//mes ativo
			populaMeses($ano_ativo,$idempreendimento);

			$('#galeria-obras .periodo .mes a').removeClass('ativo');
			$('#galeria-obras .periodo .mes a:last-child').addClass('ativo');

			$mes_ativo = $('#galeria-obras .periodo .mes a.ativo').data('mes');

			populaImagens($mes_ativo,$idempreendimento);
		});
		$(document).on('click','#galeria-obras .periodo .mes a',function(evt){
			evt.preventDefault();
			var $this = $(this),
				$mes = $this.data('mes');

			$('#galeria-obras .periodo .mes a').removeClass('ativo');
			$this.addClass('ativo');

			$mes_ativo = $('#galeria-obras .periodo .mes a.ativo').data('mes');

			populaImagens($mes_ativo,$idempreendimento);
		});

		function populaMeses($ano_ativo,$idempreendimento){

			var $url = http + 'ajax/empreendimento-estagio-meses/',
				$data = { ano : $ano_ativo, idempreendimento : $idempreendimento },
				$meses = $('#galeria-obras .periodo .mes');
			
			$.ajax({ url:$url, data:$data, type:'POST', cache:false, async:false, success:function(response){
				$meses.html(response);
			}});
		}
		function populaImagens($mes_ativo,$idempreendimento){

			var $url = http + 'ajax/empreendimento-estagio-imagens/',
				$data = { ano : $ano_ativo, mes : $mes_ativo, idempreendimento : $idempreendimento },
				$imagens = $('#galeria-obras .carousel-galeria-obras');

			$.ajax({ url:$url, data:$data, type:'POST', cache:false, async:false, dataType:'json', success:function(response){

				var $quantidade = response.quantidade,
					$imgs = response.imgs;

				$imagens.html($imgs);

				if($quantidade >= 5){

					$imagens.removeClass('flexivel');

					setTimeout(function(){

						$imagens.trigger('destroy.owl.carousel');
						$imagens.owlCarousel({
							loop : true,
							margin : 0,
							autoWidth : false,
							nav : true,
							dots : false,
							autoplay : false,
							autoplayTimeout : 3500,
							autoplayHoverPause : true,
							responsive : {
								0 : { items : 2, margin : 20, slideBy : 2 },
								580 : { items : 3, margin : 20, slideBy : 3 },
								748 : { items : 4, margin : 20, slideBy : 4 },
								940 : { items : 5, margin : 20, slideBy : 5 }
							}
						});

					},50);

				} else {
					$imagens.addClass('flexivel');
				}
			}});
		}
	}
	
	// mascara
	var SPMaskBehavior = function(val){
		return val.replace(/\D/g,'').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
	spOptions = {
		onKeyPress : function(val,e,field,options){
			field.mask(SPMaskBehavior.apply({},arguments),options);
		}
	};
	$('#telefone-contato, #telefone-assistencia').mask(SPMaskBehavior,spOptions);

	// formularios
	$('#formulario-newsletter').on('submit',function(evt){
		evt.preventDefault();
		var $this = $(this);
			$this.find('.input-erro, .erro').removeClass('input-erro erro');
	    	$this.find('.retorno').remove();

		var $retornox = $('.retornox');

		var email_newsletter = $this.find('[name="email-newsletter"]');
		if(email_newsletter.val() == ''){
			erro_campo(email_newsletter,'Por favor informe seu e-mail!');
			return false;
		}
		else if(verificaEmail(email_newsletter.val())){
			erro_campo(email_newsletter,'Por favor forneça um e-mail válido!');
			return false;
		}

		if($('#concordo-newsletter').is(':checked') == false){
			erro_campo($('.concordo.newsletter'),'Você precisa concordar com a Política de Privacidade e os Termos de Uso!');
			return false;
		}

		$('#newsletter .formulario form').addClass('loading');

		// --- //

		var $data = $this.serialize();
		$.ajax({ url:http +'ajax/newsletter/', type:'POST', data:$data, cache:false, success:function(response){
			if(response == 'ok'){
				
				$retornox.html('E-mail cadastrado com sucesso. Aguarde nossas novidades! :)').removeClass('fundo-erro').addClass('fundo-sucesso');
				
				$('#formulario-newsletter')[0].reset();
				$('#newsletter .formulario form').removeClass('loading');
				atualizaCaptcha();
			}
			else if(response == 'cadastrado'){
				$retornox.html('O e-mail informado já está cadastrado!').removeClass('fundo-sucesso').addClass('fundo-erro');
				$('#newsletter .formulario form').removeClass('loading');
			}
			else {
				$retornox.html('Ocorreu um erro ao cadastrar seu e-mail, nos informe para que possamos corrigir o problema.').removeClass('fundo-sucesso').addClass('fundo-erro');
			}
		}});
	});

	$('#formulario-contato').on('submit',function(evt){
		evt.preventDefault();
		var $this = $(this);
			$this.find('.input-erro, .erro').removeClass('input-erro erro');
    		$this.find('.retorno').remove();

		var $retornox = $this.find('.retornox');		

    	var destinatario_contato = $this.find('[name="destinatario-contato"]');
		if(destinatario_contato.val() == ''){
			erro_campo(destinatario_contato,'Por favor selecione o destinatário!');
			return false;
		}

		var nome_contato = $this.find('[name="nome-contato"]');
		if(nome_contato.val() == ''){
			erro_campo(nome_contato,'Por favor informe seu nome!');
			return false;
		}
		else if(/[$#@"%*\(\)\\\/\{\}\[\]\^\!<>;:\?\|]+/g.test(nome_contato.val())){
			erro_campo(nome_contato,'Por favor não utilize simbolos inválidos em seu nome!');
			return false;
		}

		var email_contato = $this.find('[name="email-contato"]');
		if(email_contato.val() == ''){
			erro_campo(email_contato,'Por favor informe seu e-mail!');
			return false;
		}
		else if(verificaEmail(email_contato.val())){
			erro_campo(email_contato,'Por favor forneça um e-mail válido!');
			return false;
		}

		var telefone_contato = $this.find('[name="telefone-contato"]');
		if(telefone_contato.val() == ''){
			erro_campo(telefone_contato,'Por favor informe seu telefone!');
			return false;
		}

		var assunto_contato = $this.find('[name="assunto-contato"]');
		if(assunto_contato.val() == ''){
			erro_campo(assunto_contato,'Por favor informe o assunto do contato!');
			return false;
		}

		var mensagem_contato = $this.find('[name="mensagem-contato"]');
		if(mensagem_contato.val() == ''){
			erro_campo(mensagem_contato,'Por favor informe sua mensagem!');
			return false;
		}

		if($('#concordo-contato:checked').length == 0){
			erro_campo($('.concordo.contato'),'Você precisa concordar com a Política de Privacidade e os Termos de Uso!');
			return false;
		}

		// --- valida captcha
		var validate = false;
		$.ajax({ url : http + 'ajax/valida-post/', async:false, type:'post', data:{ 'validate' : $this.find('input.captcha').val() }, success:function(json){
			validate = json.status;
		}});
		if(!validate){
			$retornox.removeClass('fundo-sucesso').addClass('fundo-erro').html('xxx Ocorreu um erro ao enviar sua mensagem. Por favor atualize a página e tente novamente!');
			return false;
		}

		$('#formulario-contato').addClass('loading');

		var data = $this.serialize();
		$.ajax({ url : http + 'ajax/contato/', type:'POST', data:data, cache:false, success:function(response){

			if(response == 'ok'){

				$retornox.html('Mensagem enviada com sucesso. Em breve entraremos em contato!').removeClass('fundo-erro').addClass('fundo-sucesso');
				
				$this.get(0).reset();
				$('#formulario-contato').removeClass('loading');

				atualizaCaptcha();
			}
			else if(response == 'captcha-invalido'){
				$retornox.html('Não foi possível enviar sua mensagem, por favor atualize a página e tente novamente!').removeClass('fundo-sucesso').addClass('fundo-erro');
			}
			else {
				$retornox.html('Ocorreu um erro ao enviar sua mensagem. Atualize a página e tente novamente!').removeClass('fundo-sucesso').addClass('fundo-erro');
			}
		}});
	});

	$('#formulario-assistencia').on('submit',function(evt){
		evt.preventDefault();
		var $this = $(this);
			$this.find('.input-erro, .erro').removeClass('input-erro erro');
	    	$this.find('.retorno').remove();

	    var $retornox = $this.find('.retornox');		

		var nome_assistencia = $this.find('[name="nome-assistencia"]');
		if(nome_assistencia.val() == ''){
			erro_campo(nome_assistencia,'Por favor informe seu nome!');
			return false;
		}
		else if(/[$#@"%*\(\)\\\/\{\}\[\]\^\!<>;:\?\|]+/g.test(nome_assistencia.val())){
			erro_campo(nome_assistencia,'Por favor não utilize simbolos inválidos em seu nome!');
			return false;
		}

		var telefone_assistencia = $this.find('[name="telefone-assistencia"]');
		if(telefone_assistencia.val() == ''){
			erro_campo(telefone_assistencia,'Por favor informe seu telefone!');
			return false;
		}

		var email_assistencia = $this.find('[name="email-assistencia"]');
		if(email_assistencia.val() == ''){
			erro_campo(email_assistencia,'Por favor informe seu e-mail!');
			return false;
		}
		else if(verificaEmail(email_assistencia.val())){
			erro_campo(email_assistencia,'Por favor forneça um e-mail válido!');
			return false;
		}

		var empreendimento_assistencia = $this.find('[name="empreendimento-assistencia"]');
		if(empreendimento_assistencia.val() == ''){
			erro_campo(empreendimento_assistencia,'Por favor informe qual é o empreendimento!');
			return false;
		}

		var mensagem_assistencia = $this.find('[name="mensagem-assistencia"]');
		if(mensagem_assistencia.val() == ''){
			erro_campo(mensagem_assistencia,'Por favor informe qual é o seu problema/solicitação!');
			return false;
		}

		var apartamento_assistencia = $this.find('[name="apartamento-assistencia"]');
		if(apartamento_assistencia.val() == ''){
			erro_campo(apartamento_assistencia,'Por favor informe qual é o apartamento!');
			return false;
		}

		var horario_disponivel_assistencia = $this.find('[name="horario-disponivel-assistencia"]');
		if(horario_disponivel_assistencia.val() == ''){
			erro_campo(horario_disponivel_assistencia,'Por favor informe qual é o horário disponível!');
			return false;
		}

		if($('#concordo-assistencia:checked').length == 0){
			erro_campo($('.concordo.assistencia'),'Você precisa concordar com a Política de Privacidade e os Termos de Uso!');
			return false;
		}

		// --- valida captcha
		var validate = false;
		$.ajax({ url : http + 'ajax/valida-post/', async:false, type:'post', data:{ 'validate' : $this.find('input.captcha').val() }, success:function(json){
			validate = json.status;
		}});
		if(!validate){
			$retornox.removeClass('fundo-sucesso').addClass('fundo-erro').html('Ocorreu um erro ao enviar sua mensagem. Por favor atualize a página e tente novamente!');
			return false;
		}

		$('#formulario-assistencia').addClass('loading');

		var data = $this.serialize();
		$.ajax({ url : http + 'ajax/assistencia-tecnica/', type:'POST', data:data, cache:false, success:function(response){
			if(response == 'ok'){

				$retornox.html('Mensagem de assistência técnica enviada com sucesso. Em breve entraremos em contato!');
				
				$this.get(0).reset();
				$('#formulario-assistencia').removeClass('loading');

				atualizaCaptcha();
			}
			else if(response == 'captcha-invalido'){
				$retornox.html('Não foi possível enviar sua mensagem, por favor atualize a página e tente novamente!');
			}
			else {
				$retornox.html('Ocorreu um erro ao enviar sua mensagem. Atualize a página e tente novamente!');
			}
		}});
	});

	$('#formulario-acesso').on('submit',function(){
		var _this = $(this);
		_this.find('.input-erro, .erro').removeClass('input-erro erro');
    	_this.find('.retorno').remove();

		var login_acesso = _this.find('[name="login-acesso"]');
		if (login_acesso.val() == ''){
			erro_campo(login_acesso,'Por favor informe seu login!');
			return false;

		} else if (/[$#@"%*\(\)\\\/\{\}\[\]\^\!<>;:\?\|]+/g.test(login_acesso.val())){
			erro_campo(login_acesso,'Por favor não utilize simbolos inválidos em seu login!');
			return false;
		}

		var senha_acesso = _this.find('[name="senha-acesso"]');
		if (senha_acesso.val() == ''){
			erro_campo(senha_acesso,'Por favor informe sua senha!');
			return false;
		}

		var subject = $('#subject');
		var captcha = $('#captcha');
 	
 		return false;
	});

	/*
	// mostrar/esconder senha
	var input = document.querySelector('.senha input[type="password"]');
	var img = document.querySelector('.senha .esconde-mostra');
	img.addEventListener('click', function () {
		input.type = input.type == 'text' ? 'password' : 'text';
	});
	*/

	if(page == 'acesso-do-cliente'){

		// mostrar/esconder senha
		var input = document.querySelector('.senha input[type="password"]');
		var img = document.querySelector('.senha .esconde-mostra');
		img.addEventListener('click', function () {
			input.type = input.type == 'text' ? 'password' : 'text';
		});
	}

	// aviso de privacidade
	if (localStorage.privacidade_taurus != undefined && localStorage.privacidade_taurus == "true"){
		$('#aviso-privacidade').remove();
	}
	$('.botao-privacidade').click(function(){
		localStorage.privacidade_taurus = "true";
		$('#aviso-privacidade').remove();
	});

});

// efeito menu reduzido
$(window).scroll(function(){

	if ($(window).scrollTop()>0&& _width>940) {
		$('header').addClass('topo-reduzido');
	} else {
		$('header').removeClass('topo-reduzido');
	}
});

// resize functions
$(window).load(function(){
	_width = $('body').width();
	resize_functions();
	setTimeout('resize_functions();',100);
});

$(window).resize(function(){
	_width = $('body').width();
	clearInterval(timer_resize);
	timer_resize = setTimeout('resize_functions();',100);
});

// funcao disparada ao redimensionar a tela
function resize_functions() {

	//ajusta altura da div
	if (_width >= 940){
		$('#atendimento .conteudo > div').adjustHeight('height', 'auto');
	}

}

// ajusta altura da div
jQuery.fn.extend({
	adjustHeight: function(){
	var element = $(this);
	element.css('min-height','0');
	var finalHeight = 0;
	$.each(element,function(i,compare){
		if($(compare).outerHeight() > finalHeight){
			finalHeight = $(compare).outerHeight();
		}
	});
	$.each(element,function(i,change){
		$(change).css('min-height',finalHeight);
	});
	return $(this);
	}
});

function atualizaCaptcha(){
	$.ajax({ url:http +'ajax/atualiza-captcha/', cache:false, async:false, success:function($response){
		if($response != ''){
			$('input.captcha').val($response);
		}
	}});
}
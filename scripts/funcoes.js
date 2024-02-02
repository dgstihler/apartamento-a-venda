function updateAllMessageForms(){
	for(instance in CKEDITOR.instances){
		CKEDITOR.instances[instance].updateElement();
	}
}
function countJson(obj){
	var prop,
		propCount = 0;

	for(prop in obj) propCount++;
	return propCount;
}
function validaMail(email){
	var exclude = /[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
	var check = /@[\w\-]+\./;
	var checkend = /\.[a-zA-Z]{2,3}$/;
	if(((email.search(exclude) != -1) || (email.search(check)) == -1) || (email.search(checkend) == -1)){
		return false;
	} else {
		return true;
	}
}
function removeArray(valor,arr){
	var inn	= $.inArray(valor,arr);
	if(inn > -1) arr.splice(inn,1);
	return arr.join(';');
}
function corrigeNome(texto){
	texto = tiraAcento(texto);
	texto = texto.replaceAll(/ /,'-');
	texto = texto.replaceAll(/[^a-zA-Z0-9_\-]/i,'');

	while(texto.search(/__/) > 0){
		texto = texto.replaceAll(/__/,'-');
	}
	return texto.toLowerCase();
}
function tiraAcento(string){

	string = string.toLowerCase();
	var ascii = new Array();

	ascii['a'] = [224,225,226,227,228,229,230];
	ascii['e'] = [232,233,234,235];
	ascii['i'] = [236,237,238,239];
	ascii['o'] = [240,242,243,244,245,246,248];
	ascii['u'] = [249,250,251,252];

	ascii['b'] = [223];
    ascii['c'] = [231];
    ascii['d'] = [208];
    ascii['n'] = [241];
    ascii['s'] = [36];
    ascii['y'] = [253, 255];

	for(key in ascii){
		acentos = '';
		for(codigo in ascii[key]){
			string = string.replaceAll(String.fromCharCode(ascii[key][codigo]),key);
		}
	}
	return string;
}
String.prototype.replaceAll = function(token,newtoken){
	var str = this;
	if(typeof (token) == "object"){
        while(str.search(token) != -1){
            str = str.replace(token, newtoken);
        }
    } else {
		while(str.indexOf(token) != -1){
			str = str.replace(token, newtoken);
		}
	}
	return str;
}
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g,"");
}
/*--------------------------------------------------------------------------------
-- Função: isEmpty
-- Objetivo: Verifica se um elemento está vazio.
-- Entrada: Campo, label (Opcional - Nome descritivo para um elemento)
--------------------------------------------------------------------------------*/
function isEmpty(Campo) {
	if(Trim(Campo) == ''){
		return true;
	}
	return false;
}

/*--------------------------------------------------------------------------------
-- Função: isCNPJ
-- Objetivo: Verifica se um CNPJ é válido.
-- Entrada: Campo (elemento CNPJ)
-- Retorno: true ou false
--------------------------------------------------------------------------------*/
function isCNPJ(Campo){
	//Verifica se o Campo não está vazio.
	if(isEmpty(Campo)){
		return false;
	}
	
	var StrCNPJ		= Trim(Campo);
	var vaCharCNPJ	= false;
	var DataPat		= /^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})/;
	var DataPat2	= /^(\d{14})/;
	
	var matchArray   = StrCNPJ.match(DataPat);
	var matchArray2  = StrCNPJ.match(DataPat2);
	
	if(matchArray == null && matchArray2 == null){
		return false;
	} 
	else if(matchArray != null){
		StrCNPJ = matchArray[1] + matchArray[2] + matchArray[3] + matchArray[4] + matchArray[5] ;
	}
	else if(matchArray2 != null){
		StrCNPJ = matchArray2[1];
	}

	var Ref_String="1234567890";
	for(Count=0; Count < StrCNPJ.length; Count++){
		TempChar= StrCNPJ.substring (Count, Count+1);
		if(Ref_String.indexOf (TempChar, 0)==-1){
			return false;
		}
	}

	var varFirstChr = StrCNPJ.charAt(0);
	var vlMult,vlControle,s1, s2 = "";
	var i,j,vlDgito,vlSoma = 0;
	for(var i=0; i<=13; i++ ){
		var c = StrCNPJ.charAt(i);
        if(!(c >= "0") && (c <= "9")){
			return false;
		}
        if(c != varFirstChr){
			vaCharCNPJ = true;
		}
	}
	if(!vaCharCNPJ){
		return false;
	}

	s1 = StrCNPJ.substring(0,12);
	s2 = StrCNPJ.substring(12,15);
	vlMult = "543298765432";
	vlControle = "";
	for ( j=1; j<3; j++ ) {
		vlSoma = 0;
		for( i=0; i<12; i++){
			vlSoma += eval(s1.charAt(i))* eval(vlMult.charAt(i));
		}
		if(j == 2){
			vlSoma += (2 * vlDgito);
		}
		vlDgito = ((vlSoma*10) % 11);
		if(vlDgito == 10){
			vlDgito = 0;
		}
		vlControle = vlControle + vlDgito;
		vlMult = "654329876543";
	}
	if(vlControle != s2){
		return false; 
	} else {
		return true; 
	}      
}
function validaCPF(cpf){
	var filtro = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/i;
	if(!filtro.test(cpf)) return false;
	cpf = remove(cpf, ".");
	cpf = remove(cpf, "-");
	
	if(cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999"){
		return false;
	}
	
	soma = 0;
	for(i = 0; i < 9; i++)
		soma += parseInt(cpf.charAt(i)) * (10 - i);
	resto = 11 - (soma % 11);
	if(resto == 10 || resto == 11) resto = 0;
	if(resto != parseInt(cpf.charAt(9))){
		return false;
	}
	soma = 0;
	for(i = 0; i < 10; i ++)
	 	soma += parseInt(cpf.charAt(i)) * (11 - i);
	resto = 11 - (soma % 11);
	if(resto == 10 || resto == 11)
	 	resto = 0;
	if(resto != parseInt(cpf.charAt(10))){
	 	return false;
	}
	return true;
}
function remove(str,sub){
	i = str.indexOf(sub);
	r = "";
	if(i == -1) return str;
	r += str.substring(0,i) + remove(str.substring(i + sub.length),sub);
	return r;
}

/*--------------------------------------------------------------------------------
-- Função: isChar
-- Objetivo: Uma string pode conter somente caracteres de A-Z e de 0-9
-- Entrada: Campo
-- Retorno: true ou false
--------------------------------------------------------------------------------*/
function isChar(Campo){
	if(isEmpty(Campo) == false){
		var str = Trim(Campo);
		
		//retorna false se os caracteres não forem a-z, A-Z, ou um espaço.
		for(var i = 0; i < str.length; i++){
			var ch = str.substring(i, i + 1);
			if((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch) && (ch < "0" || "9" < ch)){
				return false;
			}
		}
		return true;
	}
}

/*--------------------------------------------------------------------------------
-- Função: Trim
-- Objetivo: Verifica se a string está vazia ou tem espaços a direita ou a esquerda
-- Entrada: str (uma string)
-- Retorno: true ou false
--------------------------------------------------------------------------------*/
function Trim(str){
	return RTrim(LTrim(str));
}
function RTrim(str){
	var whitespace = new String(" \t\n\r");
	var s = new String(str);
	if(whitespace.indexOf(s.charAt(s.length-1)) != -1){
		var i = s.length - 1;
		while(i >= 0 && whitespace.indexOf(s.charAt(i)) != -1){
			i--;
            s = s.substring(0, i+1);
		}
    }
    return s;
}
function LTrim(str){
	var whitespace = new String(" \t\n\r");
	var s = new String(str);
	if(whitespace.indexOf(s.charAt(0)) != -1){
		var j=0, i=s.length;
		while(j < i && whitespace.indexOf(s.charAt(j)) != -1){
			j++;
			s = s.substring(j, i);
		}
	}
	return s;
}


//strip_tags
function strip_tags(input,allowed){
	// http://phpjs.org/function/strip_tags/
	
	// example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
	// returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
	// example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
	// returns 2: '<p>Kevin van Zonneveld</p>'
	// example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
	// returns 3: "<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>"
	// example 4: strip_tags('1 < 5 5 > 1');
	// returns 4: '1 < 5 5 > 1'
	// example 5: strip_tags('1 <br/> 1');
	// returns 5: '1  1'
	// example 6: strip_tags('1 <br/> 1', '<br>');
	// returns 6: '1 <br/> 1'
	// example 7: strip_tags('1 <br/> 1', '<br><br/>');
	// returns 7: '1 <br/> 1'

	allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
		commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		return input.replace(commentsAndPhpTags,'').replace(tags,function($0,$1){
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	});
}

function ancora(valor){
	$('html,body').animate({ scrollTop:valor },1000);
}
/*
function erro_campo(campo,msg) {
	if (campo.siblings('.retorno').length==0) campo.after('<div class="retorno" />');
	campo.siblings('.retorno').show().html(msg);
	campo.closest('form').find('.campo-enviar .retorno, .enviar-formulario .retorno').html(msg);
	campo.addClass('input-erro erro').focus();
}
*/
function erro_campo(campo,msg) {
	if(campo.siblings('.retorno').length == 0){
		campo.after('<div class="retorno" />');
	}

	campo.siblings('.retorno').show().html(msg);
	campo.closest('form').find('.campo-enviar .retorno, .enviar-formulario .retorno').html(msg);
	campo.addClass('input-erro erro').focus();
}

function verificaEmail(e){var t=" /:,;~#";var n=e;if(n.indexOf("@",0)<=0||n.indexOf(".",0)==-1){return true}var r;for(i=0;i<t.length;i++){r=t.charAt(i);if(n.indexOf(r,0)!=-1){return true}}}
      //Rellena el campo nombre empresa/particular en el caso de que
// sea particulcar
//
var Rellema_Nombre_Particular = function() {
  if ($('#particular').is(':checked')){
   // if ($('#inputDemandante').val() === 'p') {
        var text = $('#nombre').val() + ' ' + $('#apellido').val();
        $('#iEmpresaNombre').val(text);
    	}
};
// llamadas a la función para cambiar el texto en Empresa/Nombre
$('#nombre').on('change', Rellema_Nombre_Particular);
$('#apellido').on('change', Rellema_Nombre_Particular);

         $('#email').focusout(function() {

           		$('#Usuario').val($('#email').val());
    		});


       $('#opcionradio').change(function() {
        if ($('#empresa').is(':checked')) {
            $('#cnif').html('CIF');
            $('#EmpresaNombre').html('Empresa');
            $('#icnif').prop('placeholder', 'CIF');
            $('#iEmpresaNombre').prop('placeholder', 'Empresa');
            $('#iEmpresaNombre').val("");
        } else {
            $('#cnif').html('NIF');
            $('#EmpresaNombre').html('Nombre');
           $('#icnif').prop('placeholder', 'NIF');
           $('#iEmpresaNombre').prop('placeholder', 'Nombre');

        }
    });  

        $("#formulario").validate({
            onkeyup: false,
            onfocusout: false,
            onclick: false,
            rules: {
                //------------------------------------------
                // PRIMER BLOQUE : INFORMACION DE CONTACTO
                //------------------------------------------
                nombre: {
                    required: true,
                    minlength: 2
                },   
                apellido: {
                    required: true,
                    minlength: 4
                },
                telefono: {
                	required:true,
                	digits:true
                },             
                email: {
                    required: true,
                    email: true,
                    remote: "http://luisalvarez.infenlaces.com/dwec/formulario/php/validar_email_db.php"
                
                },
                semail:{   
                    equalTo: "#email",
                    email: true
                },
                //---------------------------
                // FINAL DEL PRIMER BLOQUE 
                //---------------------------
                //------------------------------------------
                // SEGUNDO BLOQUE : DATOS DE FACTURACIÓN
                //------------------------------------------
                EmpresaNombre:{
                    required:true
                },
                
                icnif: {
                        required: true,
                        /* 
                        http://jsfiddle.net/mvandiest/hJGsU/ 
                        */
                        cifES: {
                            depends: function() {
                                'use strict';
                                return $('#empresa').is(':checked');
                            }
                        },
                        nifES: {
                            depends: function() {
                                'use strict';
                                return $('#particular').is(':checked')
                            }
                       }
                    },
                    
                direccion:{ 
                    required:true
                },
                codigo_postal: {
                    required: true,
                    digits: true
                },
                localidad:{
                    required:true
                },
                provincia:{
                    required:true
                },
                pais:{
                    required:true
                },
                iban: {
            		required: true,
            		iban: true
        		},
        		iEmpresaNombre:{   
        		   required:true,
        			 minlength: 4
       			},
                //---------------------------
                // FINAL DEL SEGUNDO BLOQUE 
                //---------------------------
                //------------------------------------------
                // TERCER BLOQUE : DATOS DE ACCESO
                //------------------------------------------


             },


             messages: {

        nombre: {
            required: 'Debe escribir su nombre',
            lettersonly: 'Escribir sólo letras'
        },
        apellido: {
            required: 'Debe escribir su apellido',
            lettersonly: 'Escribir sólo letras'
        },
        telefono: {
            required: 'Debe escribir su teléfono',
            digits: 'Escribir sólo números',
 
        },
        email: {
            required: 'Debe escribir su email',
            email: 'Escribir un email válido',
            remote: 'Usuario dado de alta'
        },
        semail: {
        	required: 'Debe escribir su email',
            equalTo: 'Los dos emails deben de ser iguales'
        },
        icnif: {
            required: 'Debe escribir un identificador fiscal',
            nifES: 'Debe escribir un nif válido',
            cifES: 'Debe escribir un cif válido',
        },
        iEmpresaNombre: {
            required: 'Escribir el nombre'
        },
        direccion: {
            required: 'Escribir la dirección'
        },
        codigo_postal: {
            required: 'Escribir el código postal',
            digits: 'Escribir sólo números',
        },
        localidad: {
            required: 'Debe escribir la localidad'
        },
        provincia: {
            required: 'Debe escribir la provincia'
        },
        pais: {
            required: 'Escribir el país'
        },
        iban: {
            required: 'Escribir su IBAN',
            iban: 'El IBAN debe ser válido',
        },

     
        usuario: {
            required: 'Debe escribir su nombre de usuario',
            minlength: jQuery.validator.format('El tamaño debe ser mínimo {0} caracteres'),
            remote: 'Ese usuario ya existe'
        },
        contras: {
            required: 'Escribir la contraseña',
            complex: 'La contraseña debe ser compleja'
        },
        scontras: {
        	required: 'Escribir la contraseña',
            equalTo: 'Los dos campos de contraseña deben coincidir'
        }
    }


        });
  $('#codigo_postal').change(function() {

        var cp = $('#codigo_postal').val();
        var digitos = cp.length;
        var ceros = "";
        for (var i = 1; i <= (5 - digitos); i++) {
            ceros = '0' + ceros;
        };
        var resultado = ceros + cp;
        $('#codigo_postal').val(resultado);
        buscarMunicipio($(this).val());


    });
   
jQuery.validator.addMethod('nif', function(value, element) {
	if(/^([0-9]{8})*[a-zA-Z]+$/.test(value)){
		var numero = value.substr(0,value.length-1);
		var let = value.substr(value.length-1,1);
		numero = numero % 23;
		var letra='TRWAGMYFPDXBNJZSQVHLCKET';
		letra=letra.substring(numero,numero+1);
		if (letra==let)
		return true;
		return false;
	}
}, 'Introduce un NIF válido.');






/**
 * IBAN is the international bank account number.
 * It has a country - specific format, that is checked here too
 */
$.validator.addMethod("iban", function(value, element) {
	// some quick simple tests to prevent needless work
	if (this.optional(element)) {
		return true;
	}

	// remove spaces and to upper case
	var iban = value.replace(/ /g, "").toUpperCase(),
		ibancheckdigits = "",
		leadingZeroes = true,
		cRest = "",
		cOperator = "",
		countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

	if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
		return false;
	}

	// check the country code and find the country specific format
	countrycode = iban.substring(0, 2);
	bbancountrypatterns = {
		"AL": "\\d{8}[\\dA-Z]{16}",
		"AD": "\\d{8}[\\dA-Z]{12}",
		"AT": "\\d{16}",
		"AZ": "[\\dA-Z]{4}\\d{20}",
		"BE": "\\d{12}",
		"BH": "[A-Z]{4}[\\dA-Z]{14}",
		"BA": "\\d{16}",
		"BR": "\\d{23}[A-Z][\\dA-Z]",
		"BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
		"CR": "\\d{17}",
		"HR": "\\d{17}",
		"CY": "\\d{8}[\\dA-Z]{16}",
		"CZ": "\\d{20}",
		"DK": "\\d{14}",
		"DO": "[A-Z]{4}\\d{20}",
		"EE": "\\d{16}",
		"FO": "\\d{14}",
		"FI": "\\d{14}",
		"FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
		"GE": "[\\dA-Z]{2}\\d{16}",
		"DE": "\\d{18}",
		"GI": "[A-Z]{4}[\\dA-Z]{15}",
		"GR": "\\d{7}[\\dA-Z]{16}",
		"GL": "\\d{14}",
		"GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
		"HU": "\\d{24}",
		"IS": "\\d{22}",
		"IE": "[\\dA-Z]{4}\\d{14}",
		"IL": "\\d{19}",
		"IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
		"KZ": "\\d{3}[\\dA-Z]{13}",
		"KW": "[A-Z]{4}[\\dA-Z]{22}",
		"LV": "[A-Z]{4}[\\dA-Z]{13}",
		"LB": "\\d{4}[\\dA-Z]{20}",
		"LI": "\\d{5}[\\dA-Z]{12}",
		"LT": "\\d{16}",
		"LU": "\\d{3}[\\dA-Z]{13}",
		"MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
		"MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
		"MR": "\\d{23}",
		"MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
		"MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
		"MD": "[\\dA-Z]{2}\\d{18}",
		"ME": "\\d{18}",
		"NL": "[A-Z]{4}\\d{10}",
		"NO": "\\d{11}",
		"PK": "[\\dA-Z]{4}\\d{16}",
		"PS": "[\\dA-Z]{4}\\d{21}",
		"PL": "\\d{24}",
		"PT": "\\d{21}",
		"RO": "[A-Z]{4}[\\dA-Z]{16}",
		"SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
		"SA": "\\d{2}[\\dA-Z]{18}",
		"RS": "\\d{18}",
		"SK": "\\d{20}",
		"SI": "\\d{15}",
		"ES": "\\d{20}",
		"SE": "\\d{20}",
		"CH": "\\d{5}[\\dA-Z]{12}",
		"TN": "\\d{20}",
		"TR": "\\d{5}[\\dA-Z]{17}",
		"AE": "\\d{3}\\d{16}",
		"GB": "[A-Z]{4}\\d{14}",
		"VG": "[\\dA-Z]{4}\\d{16}"
	};

	bbanpattern = bbancountrypatterns[countrycode];
	// As new countries will start using IBAN in the
	// future, we only check if the countrycode is known.
	// This prevents false negatives, while almost all
	// false positives introduced by this, will be caught
	// by the checksum validation below anyway.
	// Strict checking should return FALSE for unknown
	// countries.
	if (typeof bbanpattern !== "undefined") {
		ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
		if (!(ibanregexp.test(iban))) {
			return false; // invalid country specific format
		}
	}

	// now check the checksum, first convert to digits
	ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
	for (i = 0; i < ibancheck.length; i++) {
		charAt = ibancheck.charAt(i);
		if (charAt !== "0") {
			leadingZeroes = false;
		}
		if (!leadingZeroes) {
			ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
		}
	}

	// calculate the result of: ibancheckdigits % 97
	for (p = 0; p < ibancheckdigits.length; p++) {
		cChar = ibancheckdigits.charAt(p);
		cOperator = "" + cRest + "" + cChar;
		cRest = cOperator % 97;
	}
	return cRest === 1;
}, "Introducir un IBAN valido");

var buscarMunicipio = function(cp) {

    $.ajax({
        'type': 'POST',
        'url': 'http://luisalvarez.infenlaces.com/dwec/php/buscar_municipio_db.php',
        'data': {
            inputCp: cp
        },
        'dataType': 'json'
    }).done(function(data) {
        //console.log('AJAX ejecutado correctamente');
        if (data === null) {
            console.log('no se encuentra el cp');
            $('#provincia').val('');
            $('#localidad').val('');
            $('#pais').val('');
        } else {
            console.log(data[0]);
            $('#provincia').val(data[0].provincia);
            $('#provincia-error').text('');
            $('#localidad').val(data[0].municipio);
            $('#localidad-error').text('');
            $('#pais').val('España');
            $('#pais-error').text('');
        }
    }).fail(function(err) {
        console.log('AJAX no se ha ejecutado correctamente: ' + err);
    });
};



        $(function () {
            $("#txtPassword").complexify({}, function (valid, complexity) {
                $("#progressbar" ).progressbar({
                  value: complexity
                });
            });
        });


/*
 * Código de identificación fiscal ( CIF ) is the tax identification code for Spanish legal entities
 * Further rules can be found in Spanish on http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
 */
$.validator.addMethod( "cifES", function( value ) {
    "use strict";

    var num = [],
        controlDigit, sum, i, count, tmp, secondDigit;

    value = value.toUpperCase();

    // Quick format test
    if ( !value.match( "((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)" ) ) {
        return false;
    }

    for ( i = 0; i < 9; i++ ) {
        num[ i ] = parseInt( value.charAt( i ), 10 );
    }

    // Algorithm for checking CIF codes
    sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
    for ( count = 1; count < 8; count += 2 ) {
        tmp = ( 2 * num[ count ] ).toString();
        secondDigit = tmp.charAt( 1 );

        sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === "" ? 0 : parseInt( secondDigit, 10 ) );
    }

    /* The first (position 1) is a letter following the following criteria:
     *  A. Corporations
     *  B. LLCs
     *  C. General partnerships
     *  D. Companies limited partnerships
     *  E. Communities of goods
     *  F. Cooperative Societies
     *  G. Associations
     *  H. Communities of homeowners in horizontal property regime
     *  J. Civil Societies
     *  K. Old format
     *  L. Old format
     *  M. Old format
     *  N. Nonresident entities
     *  P. Local authorities
     *  Q. Autonomous bodies, state or not, and the like, and congregations and religious institutions
     *  R. Congregations and religious institutions (since 2008 ORDER EHA/451/2008)
     *  S. Organs of State Administration and regions
     *  V. Agrarian Transformation
     *  W. Permanent establishments of non-resident in Spain
     */
    if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
        sum += "";
        controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
        value += controlDigit;
        return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
    }

    return false;

}, "Please specify a valid CIF number." );


/*
 * The Número de Identificación Fiscal ( NIF ) is the way tax identification used in Spain for individuals
 */
$.validator.addMethod( "nifES", function( value ) {
    "use strict";

    value = value.toUpperCase();

    // Basic format test
    if ( !value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ) {
        return false;
    }

    // Test NIF
    if ( /^[0-9]{8}[A-Z]{1}$/.test( value ) ) {
        return ( "TRWAGMYFPDXBNJZSQVHLCKE".charAt( value.substring( 8, 0 ) % 23 ) === value.charAt( 8 ) );
    }
    // Test specials NIF (starts with K, L or M)
    if ( /^[KLM]{1}/.test( value ) ) {
        return ( value[ 8 ] === String.fromCharCode( 64 ) );
    }

    return false;

}, "Please specify a valid NIF number." );
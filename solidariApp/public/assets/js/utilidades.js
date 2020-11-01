function limpiarValidaciones(inp,error){
    if(inp){
        inp.removeClass('is-invalid is-valid');

        if(error){
            error.fadeOut();
        }else{
            inp.nextSibling.fadeOut();
        }
    }
}
function limpiarCamposRegistro(){
    $('#formularioRegistroDatos')[0].reset();
    $('#formRegistroGoogle')[0].reset();
    // Error Login
    $("#errorLogin").hide();
    // Email
    $('#emailUsuario').removeClass('is-invalid is-valid');
    $('#errorCorreo').fadeOut();
    // Pass
    $('#claveUsuario').removeClass('is-invalid is-valid');
    $('.errorPass').fadeOut();
    // Nombre organizacion
    $('#nombreOrganizacion').removeClass('is-invalid is-valid');
    $('.errorNombreOrg').fadeOut();
    // Nombre colaborador
    $('#nombreColaborador').removeClass('is-invalid is-valid');
    $('.errorNombre').fadeOut();
    // Apellido colaborador
    $('#apellidoColaborador').removeClass('is-invalid is-valid');
    $('.errorApellido').fadeOut();
    // Codigo de area
    $('#codArea').removeClass('is-invalid is-valid');
    $('.errorCodArea').fadeOut();
    // Numero de telefono
    $('#numeroTelefono').removeClass('is-invalid is-valid');
    $('.errorNroTelefono').fadeOut();
    // Calle
    $('#calle').removeClass('is-invalid is-valid');
    $('.errorCalle').fadeOut();
    // Nro
    $('#numero').removeClass('is-invalid is-valid');
    $('.errorNro').fadeOut();
    // Localidad
    $('#selectLocalidad').removeClass('is-invalid is-valid');
    $('.errorLocalidad').fadeOut();
    // Provincia
    $('#selectProvincia').removeClass('is-invalid is-valid');
    $('.errorProvincia').fadeOut();
    // Tipo de organizacion
    $('#selectTipoOrganizacion').removeClass('is-invalid is-valid');
    $('.errorTipoOrg').fadeOut();
}

function mostrarComo ( tipoUsuario ){
    signOut();
    let exclusivoOrg = $('.exclusivoOrg');
    let exclusivoCol = $('.exclusivoCol');
    if( tipoUsuario === 'colaborador' ){
        exclusivoOrg.hide();
        exclusivoCol.show();
    }
    else if( tipoUsuario === 'organizacion' ){
        exclusivoCol.hide();
        exclusivoOrg.show();
    }
    $("#modoRegistro").val( tipoUsuario );
    $("#tituloModalLogin").html("Registrarse como " + tipoUsuario);
    $("#errorLogin").hide();
    $("#btnLogin").attr("disabled", false);
    $("#btnLogin").html("Crear cuenta");
    limpiarCamposRegistro();
}

function listarTiposOrganizaciones()
{
    axios.get('/listarTipoOrganizaciones')
      .then((response)=>{
        let tiposOrganizaciones = response.data.tipoOrganizaciones;
        $.each(tiposOrganizaciones, function (indexInArray, tipoOrganizacion) {
            $("#selectTipoOrganizacion").append("<option value = '" + tipoOrganizacion.idTipoOrganizacion + "'>" + tipoOrganizacion.nombreTipoOrganizacion +"</option");
        });

      });
}

function listarProvincias(defaultSelected)
{
    axios.get('/listarProvincias')
      .then((response)=>{
        let provincias = response.data.provincias;
        $.each(provincias, function (indexInArray, provincia) {
            $("#selectProvincia").append("<option value = '" + provincia.idProvincia + "'>" + provincia.nombreProvincia +"</option");

        });
        $("#selectProvincia").val(defaultSelected);
      });
}

function listarLocalidades(idProvincia,defaultSelected)
{
    axios.get('/listarLocalidades/' + idProvincia)
      .then((response)=>{
        let localidades = response.data.localidades;
        $.each(localidades, function (indexInArray, localidad) {
            $("#selectLocalidad").append("<option value = '" + localidad.idLocalidad + "'>" + localidad.nombreLocalidad +"</option");
        });
        $("#selectLocalidad").val(defaultSelected);

      });
}

function limpiarValidaciones(inp,error){
    if(inp){
        inp.removeClass('is-invalid is-valid');

        if(error){
            error.fadeOut();
        }else{
            inp.nextSibling.fadeOut();
        }
    }
}

function bloquearBoton(boton)
{
    idBoton = boton.attr('id');
    textoBoton = boton.html();
    boton.html("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...<p class = 'd-none' id = 'texto-"+idBoton+"'>"+textoBoton+"</p>");
    boton.attr("disabled",true);
}

function desbloquearBoton(boton){
    idBoton = boton.attr('id');
    textoBoton = $("#texto-"+idBoton).html();
    boton.html(textoBoton);
    boton.attr("disabled",false);
}

function limpiarCamposRegistro(){
    limpiarCamposLogin();
    $('#formularioRegistroDatos')[0].reset();
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
    limpiarDomicilio();
    // Tipo de organizacion
    $('#selectTipoOrganizacion').removeClass('is-invalid is-valid');
    $('.errorTipoOrg').fadeOut();
}

function limpiarCamposLogin(){
    $('#formRegistroGoogle')[0].reset();
    // Error Login
    $("#errorLogin").hide();
    // Email
    $('#emailUsuario').removeClass('is-invalid is-valid');
    $('#errorCorreo').fadeOut();
    // Pass
    $('#claveUsuario').removeClass('is-invalid is-valid');
    $('.errorPass').fadeOut();
}

function limpiarDomicilio(){
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
    fetch("/listarTipoOrganizaciones")
    .then(response => response.json())
    .then(data => {
        let tiposOrganizaciones = data.tipoOrganizaciones;
        $.each(tiposOrganizaciones, function (indexInArray, tipoOrganizacion) {
            $("#selectTipoOrganizacion").append("<option value = '" + tipoOrganizacion.idTipoOrganizacion + "'>" + tipoOrganizacion.nombreTipoOrganizacion +"</option");
        });

      });
}

function listarProvincias(defaultSelected)
{
    fetch("/listarProvincias")
    .then(response => response.json())
    .then(data => {
        let provincias = data.provincias;
        $.each(provincias, function (indexInArray, provincia) {
            $("#selectProvincia").append("<option value = '" + provincia.idProvincia + "'>" + provincia.nombreProvincia +"</option");

        });
        $("#selectProvincia").val(defaultSelected);
      });
}

function listarLocalidades(idProvincia,defaultSelected)
{
    fetch("/listarLocalidades/"+idProvincia)
    .then(response => response.json())
    .then(data => {
        let localidades = data.localidades;
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


//OBTENGO LAS COORDENADAS DESDE LA API
async function obtenerCoordenadas(calle, nro, localidad, provincia){
    if(provincia == 'Buenos Aires-GBA' || provincia == 'Capital Federal'){
        provincia = 'Buenos Aires';
    }
    console.log( calle, nro, localidad, provincia );
    // let url = `https://nominatim.openstreetmap.org/search?q=${calle}+${nro},+${localidad},+${provincia}&format=json&polygon_geojson=1&addressdetails=1`;
    let url = `https://nominatim.openstreetmap.org/search.php?street=${calle}+${nro}&city=${localidad}&state=${provincia}&country=argentina&polygon_geojson=1&dedupe=0&format=jsonv2`;

    let respuesta = await fetch( url );
    let data = await respuesta.json();
    let coordenadas = {
      lat: 0,
      lon: 0
    }

    if( data.length > 0){
        coordenadas.lat = data[0].lat;
        coordenadas.lon = data[0].lon;
    }
    // console.log( lat + lon );
    console.log( coordenadas );
    return coordenadas;
  }


  function agregarPaginacionUsuarios(){
    $('#navUsuarios').html('');
    $('#listadoColaboraciones').after('<div id="navUsuarios"></div>');
    let usuario = $('.usuario').not('.d-none');
    let filasMostradas = 2;
    let filasTotales = usuario.length;
    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navUsuarios').append('<a href="javascript:void(0)" class="closeLink" rel="' + i + '">' + numPag + '</a> ');
    }
    $( usuario ).hide();
    $( usuario ).slice(0, filasMostradas).show();
    $('#navUsuarios a:first').addClass('active');
    $('#navUsuarios a').bind('click', function(){
        $('#navUsuarios a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( usuario ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

function listarTiposOrganizaciones()
{
    return axios.get('/listarTipoOrganizaciones')
        .then((response)=>{
            let tiposOrganizaciones = response.data.tipoOrganizaciones;
            $.each(tiposOrganizaciones, function (indexInArray, tipoOrganizacion) {
                $("#selectTipoOrganizacion").append("<option value = '" + tipoOrganizacion.idTipoOrganizacion + "'>" + tipoOrganizacion.nombreTipoOrganizacion +"</option");
            });
        });
}

//BUSCAR UNA NECESIDAD POR EL FILTRO DEL CAMPO TEXTO
function buscarNecesidadPorTexto( ){
    let filtroBusqueda = $('#campoBuscarPorTexto').val();
    if( filtroBusqueda !== ''){
        fetch( "/buscarOrganizaciones/" + filtroBusqueda )
            .then(response => response.json())
            .then(data => {
                let organizaciones = data.organizaciones;
                llenarOrganizaciones( organizaciones );
            })
    }
}

//BUSCAR UNA NECESIDAD POR EL FILTRO DE CATEGORIA
function filtrarPorCategoria( e ){
    let target = e.target; // where was the click?
    let filtroBusqueda = target.title;
    if( filtroBusqueda === ''){
        filtroBusqueda = target.parentElement.title
    }
    $('#filtrosCategoria button').attr('disabled', true);
    fetch( "/buscarOrganizacionesPorCategoria/" + filtroBusqueda )
        .then(response => response.json())
        .then(data => {
            let organizaciones = data.organizaciones;
            llenarOrganizaciones( organizaciones );
            $('#filtrosCategoria button').attr('disabled', false);
        })
}

//BUSCAR UNA ORGANIZACION POR FILTRO DE UBICACION
function filtrarPorUbicacion(){
    let filtroBusqueda = $('#ubicacion').val();
    if( filtroBusqueda !== '' ){
        fetch( "/buscarOrganizacionesPorUbicacion/" + filtroBusqueda )
            .then(response => response.json())
            .then(data => {
                let organizaciones = data.organizaciones;
                llenarOrganizaciones( organizaciones );
            })
    }
    // console.log( filtroBusqueda );
}

//TRAER LAS INSIGNIAS DE UN USUARIO
function cargarInsignias( idUsuario ){
    fetch( "/getInsignias/" + idUsuario )
        .then(response => response.json())
        .then(data => {
            let insignias = data.insignias;
            llenarInsignias( insignias );
        })
}

function llenarInsignias( insignias ){
    // console.log( insignias );
    let divInsignias = $('.insignias');
    divInsignias.html('');
    insignias.forEach(insignia => {
        let icono = document.createElement('i');
        $(icono).addClass( insignia.icono );
        $(icono).attr('title', insignia.descripcionInsignia);
        // console.log( icono );
        divInsignias.append(icono);
    });
}

//TRAER LOS COMENTARIOS DE UN USUARIO
function cargarComentarios( idUsuario ){
    fetch( "/getCalificaciones/" + idUsuario )
        .then(response => response.json())
        .then(data => {
            let comentarios = data.calificaciones;
            llenarComentarios( comentarios );
        })
}

//TRAER LOS COMENTARIOS DE UNA ORGANIZACION
function cargarComentariosOrganizacion( idUsuario ){
    fetch( "/getCalificacionesOrganizacion/" + idUsuario )
        .then(response => response.json())
        .then(data => {
            let comentarios = data.calificaciones;
            llenarComentarios( comentarios );
        })
}

function llenarComentarios( comentarios ){
    // console.log( insignias );
    let divComentarios = $('.comentarios');
    divComentarios.html('');
    if( comentarios.length > 0 ){
        comentarios.forEach(comentario => {
            let coment = 
            `<div class="card comentario">
                <div class="card-body">
                    <h5 class="card-title d-flex justify-content-between"> <span class="fechaComentario">${comentario.fechaCalificacion}</span></h5>
                    <p class="card-text">${comentario.comentario}</p>
                </div>
            </div>`
            divComentarios.append( coment );
        });
        agregarPaginacionComentarios();
    }
    else{
        let coment = 
        `<div class="alert alert-secondary" role="alert">
            Aun no tiene comentarios.
        </div>`
        divComentarios.append( coment );
    }
}

function calcularPorcentaje( necesidad ){
    let porcentajeAvance;
    if( !necesidad.cantidadRecibida ) necesidad.cantidadRecibida = 0;
    if( necesidad.cantidadNecesidad != 0){
        porcentajeAvance = necesidad.cantidadRecibida / necesidad.cantidadNecesidad;
    }
    else{
        if( necesidad.cantidadRecibida>0){
            porcentajeAvance = 1;
        }
        else{
            porcentajeAvance = 0;
        }
    }

    if( porcentajeAvance > 1) porcentajeAvance = 1;
    porcentajeAvance = Math.trunc(porcentajeAvance * 100);
    return porcentajeAvance; 
}
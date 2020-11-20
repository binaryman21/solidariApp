

document.addEventListener('DOMContentLoaded', () => {

     //Obtengo la url para saber el id de organizacion
     var url = $(location).attr('href').split("/");
     //alert(url);
     if(url.length == 5 && url[4] != "" && !isNaN(url[4])){
        isLoggedIn();
        getColaborador(url[4],1);
        //  $("#editarMiPerfil").addClass("d-none");
        $('.soloColaborador').addClass('d-none');
        $('.soloVisitante').removeClass('d-none');
     }
     else if(url.length == 4 || (url.length == 5 && url[4] == "")){
        isLoggedIn(getColaborador);
        // $("#editarMiPerfil").removeClass("d-none");
        $('.soloVisitante').addClass('d-none');
        $('.soloColaborador').removeClass('d-none');
     }
     else{
         window.location = "/";
     }

    // listarColaboraciones();
    agregarPaginacionComentarios();
    // agregarPaginacionNecesidades();

    $("#editarMiPerfil").click(camposEditables);
    $("#guardarCambios").click(guardarCambios);
    $("#btnConfirmarDarmeDeBaja").click(bajaUsuario);
   /* $("#btnConfirmarFotoPerfil").click(updateFotoPerfil);*/

    //MODAL EDITAR DOMICILIO
    $("#selectProvincia").change(function(){

        let idProvincia = $("#selectProvincia").val();
        $("#selectLocalidad").html("");
        listarLocalidades(idProvincia,1);
    });

})

/*Dar de baja el usuario logeado*/
function bajaUsuario()
{
     axios.post("/bajaUsuario")
    .then((response)=>{
        if(response.data.resultado === 1 ){
           console.log(response.data.message);

        }else{
            /*Ocurrio un error*/
            alert("Ocurrio un error inesperado.");
            console.log(response.data.message);
        }
    });

}

/*Actualizar foto de perfil de usuario logeado*/
/*NOTA: se ejecuto esta accion sin js, directamente desde el submit del formulario ejecutando el backend.*/
/*
function updateFotoPerfil(urlFotoPerfil)
{
   
    archivo = $("#formControlFile1").val();
    console.log(archivo);

     axios.post("/updateFotoPerfil/"+"'"+urlFotoPerfil+"'")
    .then((response)=>{
        if(response.data.resultado === 1 ){
           console.log(response.data.message);

        }else{
           
            alert("Ocurrio un error inesperado.");
            console.log(response.data.message);
        }
    });

}
*/

/*Hace los campos editables al apretar boton "Editar"*/
function camposEditables() {
    /*Botones*/
    $("#guardarCambios").removeClass("d-none");
    $("#editarMiPerfil").addClass("disabled");
    $(".tacho").removeClass("d-none");
    $(".editarDom").removeClass("d-none");

    /*Campos editables*/
    $(".campoEditable").prop('disabled', false);
    $(".nuevoTelefono").removeClass("d-none");

    /*Mostrar botones de "Agregar*/
    $("#btnAgregarTelefono").removeClass("d-none");
    $("#btnAgregarDireccion").removeClass("d-none");
    $("#btnModificarImgPerfil").removeClass("d-none");
    $(".eliminar").removeClass("d-none");
}

/*Guarda los cambios realizados*/
function guardarCambios() {
    $("#guardarCambios").addClass("d-none");
    $(".tacho").addClass("d-none");
    $(".nuevoTelefono").addClass("d-none");
    $("#editarMiPerfil").removeClass("disabled");
    $("#btnAgregarTelefono").addClass("d-none");
    $("#btnAgregarDireccion").addClass("d-none");
    $(".campoEditable").prop('disabled', true);
    $("#btnModificarImgPerfil").addClass("d-none");
    $(".eliminar").addClass("d-none");
    $('#codArea').val('');
    limpiarValidaciones($('#codArea'), $('.errorCodArea'));
    $('#numeroTelefono').val('');
    limpiarValidaciones($('#numeroTelefono'), $('.errorNroTelefono'));
    $(".editarDom").addClass("d-none");
}

function getColaborador(idUsuario,vistaVisitante){

    listarColaboraciones( idUsuario );

    $("#btnAgregarTelefono").click(function()
    {
        agregarTelefono(idUsuario);
    });
    //getTelefonosUsuario(usuario.idUsuario);
    //getDomiciliosUsuario(usuario.idUsuario);
    cargarInsignias( idUsuario );
    
    axios.get("/getColaborador/"+idUsuario)
    .then((response)=>{
        var colaborador = response.data.colaborador;
        $("#nombreColaborador").html(colaborador.nombreColaborador + " " + colaborador.apellidoColaborador);
        $("#imgPerfilColaborador").attr("src",colaborador.urlFotoPerfilUsuario);
        $("#correo").html(colaborador.emailUsuario);
        $("#fechaAltaUsuario").html(colaborador.fechaAltaUsuario);
        $.each(response.data.domicilios, function (indexInArray, domicilio) {
            var piso = "Piso";
            var depto = "Depto";

            if(domicilio.piso == '') piso = '';
            if(domicilio.depto == '') depto = '';

            $("#listadoDomicilios").html("");
             $("#listadoDomicilios").append(`<div class="form-row" >
             <div class = "d-flex flex-row m-2  domicilio w-100 rounded p-1 justify-content-between">
             <div class = "d-flex flex-column m-2 " id ="domicilio` + domicilio.idDomicilio + `">
                <p class = "m-1 domicilioInfo1">` + domicilio.calle + ` ` + domicilio.numero + ` ` + piso + ` ` + domicilio.piso + ` ` + depto + ` ` + domicilio.depto + `</p>
                <p class = "m-1">` + domicilio.nombreLocalidad + `, ` + domicilio.nombreProvincia + `</p>
            </div>
            <a class="ml-2" id="btnEditarDomicilio` + domicilio.idDomicilio + `" data-toggle="modal" href="#modalEditarDomicilio"><i class="far fa-edit editarDom d-none"></i></a>
            </div>
         </div>`);

         $("#btnEditarDomicilio"+ domicilio.idDomicilio).click(function(){
                cargarDatosModalDomicilio(domicilio);
         });

        });
        $("#listadoTelefonos").html("");
        $.each(response.data.telefonos, function (indexInArray, telefono) {
            agregarTelefonoAlListado(telefono);
        });
    });
}

function cargarDatosModalDomicilio(domicilio){
    $("#calle").val(domicilio.calle);
    $("#numero").val(domicilio.numero);
    $("#piso").val(domicilio.piso);
    $("#depto").val(domicilio.depto);
    listarProvincias(domicilio.idProvincia);
    listarLocalidades(domicilio.idProvincia,domicilio.idLocalidad);

    $("#btnGuardarDomicilio").click(function(){
        if( validarDireccion() ){
            $("#btnGuardarDomicilio").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Un momento');
            actualizarDomicilio(domicilio);
            $("#modalEditarDomicilio").modal("toggle");
        }
    });
}

function actualizarDomicilio(domicilio)
{
    obtenerCoordenadas($("#calle").val(), $("#numero").val(), $("#selectLocalidad option:selected" ).text(), $("#selectProvincia option:selected" ).text())
    .then(data => {
        let coordenadas = {
            lat: data.lat,
            lon: data.lon
        }
        domicilio.calle = $("#calle").val(),
        domicilio.numero = $("#numero").val(),
        domicilio.piso = $("#piso").val(),
        domicilio.depto = $("#depto").val(),
        domicilio.idLocalidad = $("#selectLocalidad").val(),
        domicilio.idProvincia = $("#selectProvincia").val(),
        domicilio.nombreLocalidad = $("#selectLocalidad option:selected").text(),
        domicilio.nombreProvincia = $("#selectProvincia option:selected").text(),
        domicilio.latitud = coordenadas.lat,
        domicilio.longitud = coordenadas.lon

        axios.post("/actualizarDomicilio",domicilio)
        .then((response)=>{
            var piso = "Piso";
            var depto = "Depto";

            if(domicilio.piso == '') piso = '';
            if(domicilio.depto == '') depto = '';

            $("#btnGuardarDomicilio").html('Guardar');
            $("#domicilio" + domicilio.idDomicilio).html(`<p class = "m-1 domicilioInfo1">` + domicilio.calle + ` ` + domicilio.numero + ` ` + piso + ` ` + domicilio.piso + ` ` + depto + ` ` + domicilio.depto + `</p>
            <p class = "m-1">` + domicilio.nombreLocalidad + `, ` + domicilio.nombreProvincia + `</p>`);

            $("#btnEditarDomicilio"+ domicilio.idDomicilio).click(function(){
                cargarDatosModalDomicilio(domicilio);
            });
        });
        limpiarDomicilio();
    })
}

function agregarTelefonoAlListado(telefono)
{
    $("#listadoTelefonos").append(`<div class="form-row" id = "telefono${telefono.idTelefono}">
    <div class="col-3 col-mb-3 mb-3">
    <input type="text" class="form-control" id="codArea${telefono.idTelefono}" value="${telefono.codAreaTelefono}" disabled placeholder="Cod. Area" required>
    <span class="error text-danger errorCodArea${telefono.idTelefono}"> </span>
    </div>
    <div class="col-6 col-mb-6 mb-6">

    <input type="text" class="form-control" id="numeroTelefono${telefono.idTelefono}" value="${telefono.numeroTelefono}" disabled placeholder="Numero" required>
    <span class="error text-danger errorNroTelefono${telefono.idTelefono}"></span>
    </div>
    <div class="col-1 col-mb-1 mb-1">
    <a class="text-danger" id="btnEliminarTelefono${telefono.idTelefono}">

    <i class="fas fa-trash-alt tacho d-none"></i>
    </a>
    <a class="text-primary oculto" id="btnOkEliminarTelefono`+ telefono.idTelefono +`">

    <i class="far fa-check-circle"></i>
    </a>

    <a class="text-danger oculto" id="btnCancelEliminarTelefono`+ telefono.idTelefono +`">

    <i class="far fa-times-circle"></i>
    </a>

    </div>
    </div>`);


    $("#btnEliminarTelefono" + telefono.idTelefono).click(function(){
        $("#btnEliminarTelefono"+ telefono.idTelefono).hide();
        $("#btnOkEliminarTelefono"+ telefono.idTelefono).show();
        $("#btnCancelEliminarTelefono"+ telefono.idTelefono).show();
    });

    $("#btnCancelEliminarTelefono" + telefono.idTelefono).click(function(){
        $("#btnEliminarTelefono"+ telefono.idTelefono).show();
        $("#btnOkEliminarTelefono"+ telefono.idTelefono).hide();
        $("#btnCancelEliminarTelefono"+ telefono.idTelefono).hide();
    });
        $("#btnOkEliminarTelefono" + telefono.idTelefono).click(function(){
        $("#btnEliminarTelefono"+ telefono.idTelefono).show();
        $("#btnOkEliminarTelefono"+ telefono.idTelefono).hide();
        $("#btnCancelEliminarTelefono"+ telefono.idTelefono).hide();
        $("#btnEliminarTelefono"+ telefono.idTelefono).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

        eliminarTelefono(telefono.idTelefono);
    });
}

function eliminarTelefono(idTelefono)
{
    axios.post("/eliminarTelefono",{idTelefono:idTelefono})
    .then((response)=>{
        $("#telefono" + idTelefono).remove();
        alertify.error('Telefono eliminado');
    });
}

function agregarTelefono(idUsuario)
{
    if( validarTelefono('') ){
        $("#btnAgregarTelefono").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
        var telefono = {idTelefono:0,codAreaTelefono:$("#codArea").val(),numeroTelefono:$("#numeroTelefono").val(),esCelular:0,idUsuario:idUsuario}
        axios.post("/registrarTelefono",telefono)
        .then((response)=>{
            $("#btnAgregarTelefono").html('<i class="fas fa-plus-circle agregarNecesidad"></i>');
            telefono.idTelefono = response.data.idTelefono;
            agregarTelefonoAlListado(telefono);
            $('#codArea').val('');
            limpiarValidaciones($('#codArea'), $('.errorCodArea'));
            $('#numeroTelefono').val('');
            limpiarValidaciones($('#numeroTelefono'), $('.errorNroTelefono'));
            alertify.success('Telefono agregado');
            $('.tacho').removeClass('d-none');
        });
    }
}

function agregarPaginacionComentarios(){
    $('.comentarios').after('<div id="navComentarios"></div>');
    let comentario = document.querySelectorAll('.comentario')
    let filasMostradas = 2;
    let filasTotales = comentario.length;

    let numPaginas = filasTotales / filasMostradas;
    for (i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navComentarios').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $(comentario).hide();
    $(comentario).slice(0, filasMostradas).show();
    $('#navComentarios a:first').addClass('active');
    $('#navComentarios a').bind('click', function () {
        $('#navComentarios a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $(comentario).css('opacity', '0.0').hide().slice(primerItem, ultimoItem).
            css('display', 'block').animate({ opacity: 1 }, 300);
    });
}

function agregarPaginacionNecesidades() {
    $('.necesidades').after('<div id="navNecesidades"></div>');
    let necesidad = document.querySelectorAll('.necesidad')
    let filasMostradas = 4;
    let filasTotales = necesidad.length;

    let numPaginas = filasTotales / filasMostradas;
    for (i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navNecesidades').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $(necesidad).hide();
    $(necesidad).slice(0, filasMostradas).show();
    $('#navNecesidades a:first').addClass('active');
    $('#navNecesidades a').bind('click', function () {
        $('#navNecesidades a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $(necesidad).css('opacity', '0.0').hide().slice(primerItem, ultimoItem).
            css('display', 'block').animate({ opacity: 1 }, 300);
    });
}

// Cargar colaboraciones dinamicamente desde la BD
function listarColaboraciones ( idUsuario  ){
    // let idUsuario = $(location).attr('href').split("/")[4];
    // if( !idUsuario ){
    //     idUsuario = 
    // }
    fetch(`/getColaboracionesPorUsuario/${ idUsuario }`)
        .then(response => response.json())
        .then(data => {
        // console.log( response.data );
        let colaboraciones = data.colaboraciones;

        let divNecesidades = $('.necesidades');
        divNecesidades.html("");
        colaboraciones.forEach(colaboracion => {
            crearCardColaboracion( colaboracion );
        })
    agregarPaginacionNecesidades();
    })
}


// MOSTRAR LAS COLABORACIONES
function crearCardColaboracion( colaboracion )
{
    console.log( colaboracion );
    let cardColaboracion =
    `<div class="col-md-6" id="colaboracion${colaboracion.idColaboracion}">
        <div class="card necesidad ${colaboracion.nombreCategoria.toLowerCase()}">
            <div class="card-body">
                <p class="text-right">Colaboro el dia: ${colaboracion.fechaColaboracion}</p>
                <div class="row">
                    <div class="col-md-3">
                        <img class="rounded-circle imgNecesidad" src="${colaboracion.urlFotoPerfilUsuario}" alt="img usr">
                    </div>
                    <div class="col-md-9">
                        <p class="card-text h5">${colaboracion.nombreCategoria}</p>
                        <p class="mt-2">${colaboracion.descripcionNecesidad}</p>
                    </div>
                </div>
                <h5 class="card-title"><a href="/organizacion/${colaboracion.idUsuario}">${colaboracion.razonSocial}</a></h5>
            </div>
        </div>
    </div>`;

    $(".necesidades").append(cardColaboracion);
}
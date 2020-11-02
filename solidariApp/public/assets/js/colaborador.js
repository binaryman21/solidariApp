isLoggedIn(cargarDatosPerfil);

document.addEventListener('DOMContentLoaded', () => {
    agregarPaginacionComentarios();
    agregarPaginacionNecesidades();

    $("#editarMiPerfil").click(camposEditables);
    $("#guardarCambios").click(guardarCambios);

    //MODAL EDITAR DOMICILIO
    $("#selectProvincia").change(function(){

        let idProvincia = $("#selectProvincia").val();
        $("#selectLocalidad").html("");
        listarLocalidades(idProvincia,1);
    });
})

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


function cargarDatosPerfil(usuario)
{

    getColaborador(usuario.idUsuario);
    $("#btnAgregarTelefono").click(function()
    {
        agregarTelefono(usuario.idUsuario);
    });
    //getTelefonosUsuario(usuario.idUsuario);
    //getDomiciliosUsuario(usuario.idUsuario);
}

function getColaborador(idUsuario){
    axios.get("/getColaborador/"+idUsuario)
    .then((response)=>{
        var colaborador = response.data.colaborador;
        $("#nombreColaborador").html(colaborador.nombreColaborador + " " + colaborador.apellidoColaborador);
        $("#imgPerfilColaborador").attr("src",colaborador.urlFotoPerfilUsuario);
        $("#correo").html(colaborador.emailUsuario);
        $("#fechaAltaUsuario").html(colaborador.fechaAltaUsuario);
        $.each(response.data.domicilios, function (indexInArray, domicilio) {
            $("#listadoDomicilios").html("");
             $("#listadoDomicilios").append(`<div class="form-row" >
             <div class = "d-flex flex-row m-2  domicilio w-100 rounded p-1 justify-content-between">
             <div class = "d-flex flex-column m-2 " id ="domicilio` + domicilio.idDomicilio + `">
                <p class = "m-1 domicilioInfo1">` + domicilio.calle + ` ` + domicilio.numero + ` Piso ` + domicilio.piso + ` Depto ` + domicilio.depto + `</p>
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
            $("#btnGuardarDomicilio").html('Guardar');
            $("#domicilio" + domicilio.idDomicilio).html(`<p class = "m-1 domicilioInfo1">` + domicilio.calle + ` ` + domicilio.numero + ` Piso ` + domicilio.piso + ` Depto ` + domicilio.depto + `</p>
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
    });
}

function agregarTelefono(idUsuario)
{
    if( validarTelefono() ){
        $("#btnAgregarTelefono").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
        var telefono = {idTelefono:0,codAreaTelefono:$("#codArea").val(),numeroTelefono:$("#numeroTelefono").val(),esCelular:0,idUsuario:idUsuario}
        axios.post("/registrarTelefono",telefono)
        .then((response)=>{
            $("#btnAgregarTelefono").html('<i class="fas fa-plus-circle agregarNecesidad"></i>');
            telefono.idTelefono = response.data.idTelefono;
            agregarTelefonoAlListado(telefono);
        });
    }
}
/*
function getTelefonosUsuario(idUsuario){
    axios.get("/listarTelefonosUsuario/"+idUsuario)
    .then((response)=>{
        let telefonos = response.data.telefonos;
       $.each(telefonos, function (indexInArray, telefono) {
           $("#listadoTelefonos").html("");
            $("#listadoTelefonos").append("<input type='text' class='form-control' value=("+ telefono.codAreaTelefono +")" + telefono.numeroTelefono + " disabled required></input>");
       });
    });
}

function getDomiciliosUsuario(idUsuario){
    axios.get("/listarDomiciliosUsuario/"+idUsuario)
    .then((response)=>{
        let domicilios = response.data.domicilios;
       $.each(domicilios, function (indexInArray, domicilio) {
           $("#listadoDomicilios").html("");
            $("#listadoDomicilios").append("<input type='text' class='form-control' value="+ domicilio.calle + " " + domicilio.numero + ", " + domicilio.localidad + " disabled required></input>");
       });
    });
}
*/
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

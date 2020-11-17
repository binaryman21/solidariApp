

document.addEventListener('DOMContentLoaded', ()=>{

    //Obtengo la url para saber el id de organizacion
    var url = $(location).attr('href').split("/");
    //alert(url);
    if(url.length == 5 && url[4] != "" && !isNaN(url[4])){
        isLoggedIn();
        getOrganizacion(url[4],1);
        $("#btnSuscribirse").removeClass("d-none");
        $("#btnCalificar").removeClass("d-none");
    }
    else if(url.length == 4 || (url.length == 5 && url[4] == "")){
        isLoggedIn(getOrganizacion);
        $("#editarMiPerfil").removeClass("d-none");
    }
    else{
        window.location = "/";
    }

    listarCategorias();
    agregarPaginacionComentarios();
    $("#editarMiPerfil").click(camposEditables);
    $("#guardarCambios").click(guardarCambios);

    $("#btnEliminarNecesidad").click(function(event){

        event.preventDefault();

    });
    $("#slctCategoria").change(()=>{
        colorModal = $("#slctCategoria option:selected").text().toLowerCase();
        $("#modalEditarNecesidad .modal-content").removeClass($("#categoriaActual").val());
        $("#modalEditarNecesidad .modal-content").addClass(colorModal);
        $("#categoriaActual").val(colorModal);
    })

    $("#btnEditarDescripcion").click(function()
    {
        $("#btnEditarDescripcion").hide();
        $("#btnGuardarDescripcion").show();
        $("#descripcionOrganizacion").attr("contenteditable","true");
        $("#descripcionOrganizacion").focus();
    });

    $("#btnEditarDescripcion").click(function()
    {
        $("#btnEditarDescripcion").hide();
        $("#btnGuardarDescripcion").show();
        $("#descripcionOrganizacion").attr("contenteditable","true");
        $("#descripcionOrganizacion").focus();
    });

    agregarPaginacionNecesidades();

    //MODAL EDITAR DOMICILIO
    $("#selectProvincia").change(function(){
        let idProvincia = $("#selectProvincia").val();
        $("#selectLocalidad").html("");
        listarLocalidades(idProvincia,1);
    });

})

function getOrganizacion(idUsuario, vistaVisitante = 0){

    if(vistaVisitante == 0){
    $("#btnNuevaNecesidad").click(function(){
        limpiarValidaciones($("#inpFechaLimite"),  $("#errorFechaLimite") );
        limpiarValidaciones($("#slctCategoria"), $("#errorCategoria"));
        limpiarValidaciones($("#inpCantidad"), $("#errorCantidad"));
        limpiarValidaciones($("#txtDescripcion"), $("#errorDescripcion"));
        document.getElementById("formEditarNecesidad").reset();
        $("#modalEditarNecesidad .modal-content").removeClass($("#categoriaActual").val());
        $("#btnGuardarCambiosNecesidad").unbind( "click" );
        $("#btnGuardarCambiosNecesidad").click(function(e){
            e.preventDefault();
            if( validarNecesidad() ){
                bloquearBoton($("#btnGuardarCambiosNecesidad"));
                registrarNecesidad(idUsuario);
            }
        });
    });
    $("#btnGuardarDescripcion").click(function()
    {
        actualizarDescripcion(idUsuario);
    });
    $("#btnAgregarTelefono").click(function()
    {
        if( validarTelefono( '' ) ){
            agregarTelefono(idUsuario);
        }
    });
    }
    //CARGAR NECESIDADES
    cargarNecesidades( idUsuario, vistaVisitante );
    // console.log( idUsuario );
    fetch("/getOrganizacion/"+idUsuario)
    .then(response => response.json())
    .then(data => {
        let organizacion = data.organizacion;

        $("#nombreOrganizacion").html(organizacion.razonSocial);
        $("#tipoOrganizacion").html(organizacion.nombreTipoOrganizacion);
        $("#urlFotoPerfilOrganizacion").attr("src",organizacion.urlFotoPerfilUsuario);
        $("#emailOrganizacion").html(organizacion.emailUsuario);
        if(organizacion.descripcionOrganizacion == "")
        {
            organizacion.descripcionOrganizacion = "La organización no ha especificado ninguna descripción todavia";
        }
        $("#descripcionOrganizacion").html(organizacion.descripcionOrganizacion);
        $("#fechaAltaUsuario").html(organizacion.fechaAltaUsuario);
        $.each(data.domicilios, function (indexInArray, domicilio) {
            let piso = "Piso";
            let depto = "Depto";

            if(domicilio.piso == '') piso = '';
            if(domicilio.depto == '') depto = '';

            $("#listadoDomicilios").html("");
             $("#listadoDomicilios").append(`<div class="form-row" >
             <div class = "d-flex flex-row m-2  domicilio w-100 rounded p-1 justify-content-between">
             <div class = "d-flex flex-column m-2 " id ="domicilio${domicilio.idDomicilio}">
                <p class = "m-1 domicilioInfo1">${domicilio.calle} ${domicilio.numero}` +` `+ piso +` `+ `${domicilio.piso} `+` `+ depto +` `+` ${domicilio.depto}</p>
                <p class = "m-1">${domicilio.nombreLocalidad} ,  ${domicilio.nombreProvincia}</p>
            </div>
            <a class="ml-2" id="btnEditarDomicilio${domicilio.idDomicilio}" data-toggle="modal" href="#modalEditarDomicilio"><i class="far fa-edit editarDom d-none"></i></a>
            </div>
         </div>`);

         $("#btnEditarDomicilio"+ domicilio.idDomicilio).click(function(){
                cargarDatosModalDomicilio(domicilio);
         });

        });
        $("#listadoTelefonos").html("");
        $.each(data.telefonos, function (indexInArray, telefono) {
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
            axios
            .post("/actualizarDomicilio",domicilio)
            .then((response)=>{
                var piso = "Piso";
                var depto = "Depto";

                if(domicilio.piso == '') piso = '';
                if(domicilio.depto == '') depto = '';

                $("#btnGuardarDomicilio").html('Guardar');
                $("#domicilio" + domicilio.idDomicilio).html(`<p class = "m-1 domicilioInfo1">` + domicilio.calle + ` ` + domicilio.numero + ` ` + piso + ` ` + domicilio.piso + ` ` + depto + ` ` + domicilio.depto + `</p>
                <p class = "m-1">` + domicilio.nombreLocalidad + `, ` + domicilio.nombreProvincia + `</p>`);
                alertify.success('Domicilio modificado');
                $("#btnEditarDomicilio"+ domicilio.idDomicilio).click(function(){
                    cargarDatosModalDomicilio(domicilio);
                });
            });
            limpiarDomicilio();
        })
}

function agregarTelefonoAlListado(telefono)
{
    $("#listadoTelefonos").append(
    `<div class="form-row" id = "telefono${telefono.idTelefono}">
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
                <i class="fas fa-trash-alt tacho"></i>
            </a>
            <a class="text-primary oculto" id="btnOkEliminarTelefono${telefono.idTelefono}">
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

function actualizarDescripcion(idUsuario)
{
    $("#btnGuardarDescripcion").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Actualizando...');
    $("#descripcionOrganizacion").attr("contenteditable","false");
    axios.post("/actualizarDescripcion",{idUsuario:idUsuario,descripcionOrganizacion:$("#descripcionOrganizacion").html()})
    .then((response)=>{
        $("#btnEditarDescripcion").show();
        $("#btnGuardarDescripcion").html('<i class="far fa-save"></i>');
        $("#btnGuardarDescripcion").hide();
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
        });

}
/*Hace los campos editables al apretar boton "Editar"*/
function camposEditables() {
    /*Botones*/
    $("#guardarCambios").removeClass("d-none");
    $(".tacho").removeClass("d-none");
    $("#editarMiPerfil").addClass("disabled");
    $(".editarDom").removeClass("d-none");
    $('#btnEditarDescripcion i').removeClass('d-none');

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
    $('#btnEditarDescripcion i').addClass('d-none');
}


function agregarPaginacionComentarios(){
    $('.comentarios').after('<div id="navComentarios"></div>');
    let comentario = document.querySelectorAll('.comentario')
    let filasMostradas = 2;
    let filasTotales = comentario.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navComentarios').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $( comentario ).hide();
    $( comentario ).slice(0, filasMostradas).show();
    $('#navComentarios a:first').addClass('active');
    $('#navComentarios a').bind('click', function(){
        $('#navComentarios a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( comentario ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

function agregarPaginacionNecesidades(){
    $('#navNecesidades').remove();

    $('.necesidades').after('<div id="navNecesidades"></div>');
    let necesidad = document.querySelectorAll('.necesidad')
    let filasMostradas = 4;
    let filasTotales = necesidad.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navNecesidades').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $( necesidad ).hide();
    $( necesidad ).slice(0, filasMostradas).show();
    $('#navNecesidades a:first').addClass('active');
    $('#navNecesidades a').bind('click', function(){
        $('#navNecesidades a').removeClass('active');
        $(this).addClass('active');

        let pagActual = $(this).attr('rel');

        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( necesidad ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

function mostrarModalEditarNecesidad(necesidad){
    limpiarValidaciones($("#inpFechaLimite"),  $("#errorFechaLimite") );
    limpiarValidaciones($("#slctCategoria"), $("#errorCategoria"));
    let fecha = necesidad.fechaLimiteNecesidad;
    fecha = fecha.split(" ");
    $("#slctCategoria").val(necesidad.idCategoria);
    $("#txtDescripcion").val(necesidad.descripcionNecesidad);
    $("#inpCantidad").val(necesidad.cantidadNecesidad);
    $("#inpFechaLimite").val(fecha[0]);
    $("#modalEditarNecesidad .modal-content").removeClass($("#categoriaActual").val());
    let categoriaActual = $("#slctCategoria option:selected").text().toLowerCase();
    $("#modalEditarNecesidad .modal-content").addClass(categoriaActual);

    // cambiar color del modalEditarNecesidad en función de la categoria.

    $("#categoriaActual").val(categoriaActual);

       //click cerrar el modal
    $("#btnCerrarModal").click(()=>{

        document.getElementById("formEditarNecesidad").reset();

    })
    //Click Guardar necesidad editada
    $("#btnGuardarCambiosNecesidad").unbind( "click" );
    $("#btnGuardarCambiosNecesidad").click((e)=>{

        e.preventDefault();
        if(necesidad.idNecesidad != 0){
            if(validarNecesidad()) {
                console.log(necesidad);
                bloquearBoton($("#btnGuardarCambiosNecesidad"));
                updateNecesidad(necesidad);
            }
        }

    })

 // //Click Cancelar eliminar necesidad
    // $("#btnCancelarEliminarNecesidad").click(()=>{
    //     $("#modalBajaNecesidad").modal("toggle");
    // })
    $("#btnConfirmarEliminarNecesidad").unbind("click");
    $("#btnConfirmarEliminarNecesidad").click((e)=>{
        bloquearBoton($("#btnConfirmarEliminarNecesidad"));
        bajaNecesidad(necesidad.idNecesidad);
    })


}


// Cargar necesidades dinamicamente desde la BD
function cargarNecesidades ( idUsuario, vistaVisitante){
    fetch(`/listarNecesidades/${ idUsuario }`)
        .then(response => response.json())
        .then(data => {
        // console.log( response.data );
        let necesidades = data.necesidades;

        let divNecesidades = $('.necesidades');
        divNecesidades.html("");
        necesidades.forEach(necesidad => {

            // console.log( necesidad );
            if(necesidad.fechaBajaNecesidad == null){
                divNecesidades.append(`<div class="col-md-6" id="necesidad${necesidad.idNecesidad}"></div>`);
                if( vistaVisitante != 0){
                    crearCardNecesidad(necesidad,idUsuario);
                }
                else{
                    crearCardNecesidad(necesidad,vistaVisitante);
                }
            }

        })
    agregarPaginacionNecesidades();
    })
}

function crearCardNecesidad(necesidad,vistaVisitante)
{
    // console.log( vistaVisitante );
    var btnEditarNecesidad = "";
    if(vistaVisitante == 0){
        btnEditarNecesidad = `<p class="editarNecesidad">
        <a data-toggle="modal" href="#modalEditarNecesidad" id="editar${necesidad.idNecesidad}"><i class="far fa-edit"></i></a>
        </p>`;
    }
    console.log( necesidad );

    $("#necesidad" + necesidad.idNecesidad).html("");
    let cantColaboraciones = necesidad.colaboraciones_count;
    if( cantColaboraciones === undefined ){
        cantColaboraciones = 0;
    }
        let cardNecesidad =   `<div class="card necesidad ${necesidad.nombreCategoria.toLowerCase()}">
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <p class="font-weight-bold">${necesidad.nombreCategoria}</p>
                    <p>${necesidad.descripcionNecesidad}</p>
                    <p>Cantidad: ${necesidad.cantidadNecesidad}</p>
                    <p>Fecha limite: ${ new Date(necesidad.fechaLimiteNecesidad).toLocaleDateString('es-AR') }</p>
                </div>
                <div class="col-md-6 text-right d-flex flex-column justify-content-between">
                `+ btnEditarNecesidad + `
                    <div class="fb-share-button" data-href='https://solidariapp.com.ar/organizacion/${vistaVisitante}/necesidad/${necesidad.idNecesidad}' data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Compartir</a></div>
                    <p class="ayudasRecibidas">
                        <a href="#" data-toggle="modal" data-target="#modalDetalleNecesidad" id = "btnDetalleNecesidad`+ necesidad.idNecesidad + `" ><span class="nroAyudas">`+ cantColaboraciones + `</span><i class="fas fa-user-friends"></i></a>
                    </p>
                    <p class="estado">
                        <i class="fas fa-spinner"></i>
                    </p>
                </div>
            </div>
        </div>
    </div>`;

    $("#necesidad" + necesidad.idNecesidad).append(cardNecesidad);

    if(vistaVisitante == 0){
        $("#editar" + necesidad.idNecesidad).unbind("click");
        //evento click del btn editar necesidad
        $("#editar" + necesidad.idNecesidad).click(()=>{
            console.log("idNecesidad " + necesidad.idNecesidad);
            mostrarModalEditarNecesidad(necesidad);
        });

        $("#btnDetalleNecesidad"+ necesidad.idNecesidad).click(()=>{
            cargarDatosModalDetalleNecesidad(necesidad, "organizacion");
        });
    }
    else
    {
        $("#btnDetalleNecesidad"+ necesidad.idNecesidad).click(()=>{
            cargarDatosModalDetalleNecesidad(necesidad);
        });
    }
}

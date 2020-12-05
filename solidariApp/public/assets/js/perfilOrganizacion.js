document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({
        funcionSuccess: getOrganizacion,
        RedirectIfNot: true
    });
    listarCategorias();

    $("#slctCategoria").change(() => {
        colorModal = $("#slctCategoria option:selected").text().toLowerCase();
        $("#modalEditarNecesidad .modal-content").removeClass($("#categoriaActual").val());
        $("#modalEditarNecesidad .modal-content").addClass(colorModal);
        $("#categoriaActual").val(colorModal);
    })

    $("#btnEliminarNecesidad").click(function (e) {
        e.preventDefault();
    });
})

function getOrganizacion(idUsuario) {

    axios.get("/getOrganizacion/" + idUsuario)
        .then((response) => {

            let organizacion = response.data.organizacion;
            let contacto = {

                correo: organizacion.emailUsuario,
                telefonos: response.data.telefonos,
                domicilios: response.data.domicilios
            };

            cargarDatosPerfil(organizacion);
            agregarModalContacto(contacto);
            cargarNecesidades(idUsuario);
            cargarInsignias(idUsuario);
            cargarComentariosOrganizacion(idUsuario);
        });
}

function cargarDatosPerfil(organizacion) {

    $("#nombreOrganizacion").html(organizacion.razonSocial);
    $("#tipoOrganizacion").html(organizacion.nombreTipoOrganizacion);
    $("#urlFotoPerfilOrganizacion").attr("src", organizacion.urlFotoPerfilUsuario);
    $("#cover").attr("src", organizacion.urlFotoPortadaUsuario);
    if (organizacion.descripcionOrganizacion == "") {
        organizacion.descripcionOrganizacion = "La organización no ha especificado ninguna descripción todavia";
    }

    $("#descripcionOrganizacion").html(organizacion.descripcionOrganizacion);
    $("#fechaAltaUsuario").html(`Usuario desde el ${moment(organizacion.fechaAltaUsuario, "YYYY-MM-DD HH:mm:ss").format('LL')}`);
}

function cargarNecesidades(idUsuario) {

    fetch(`/listarNecesidades/${idUsuario}`)
        .then(response => response.json())
        .then(data => {

            let necesidades = data.necesidades;
            let divNecesidadesEnProgreso = $('#necesidadesEnProceso');
            let divNecesidadesCumplidas = $('#necesidadesCumplidas');
            let divNecesidadesEliminadas = $('#necesidadesEliminadas');
            divNecesidadesEnProgreso.html('');
            divNecesidadesCumplidas.html('');
            divNecesidadesEliminadas.html('');


            if (necesidades != null && necesidades.length > 0) {

                necesidades.forEach(need => {

                    let porcentajeAvance = calcularPorcentaje(need);

                    let cardNeed =
                        `<div class="card need ${need.nombreCategoria.toLowerCase()} ${need.descripcionEstado.replace(/\s+/g, "")}" id="necesidad${need.idNecesidad}"></div>`;

                    // console.log(need.estadoNecesidad);
                    switch (need.estadoNecesidad) {

                        case 1:
                            divNecesidadesEnProgreso.append(cardNeed);
                            break;
                        case 2:
                            divNecesidadesCumplidas.append(cardNeed);
                            break;
                        case 3:
                            divNecesidadesEliminadas.append(cardNeed);
                            break;
                    }

                    crearCardNecesidad(need, 0);
                })
            }

            agregarPaginacionNecesidades();
            $("#btnNuevaNecesidad").click(function () {

                limpiarValidaciones($("#inpFechaLimite"), $("#errorFechaLimite"));
                limpiarValidaciones($("#slctCategoria"), $("#errorCategoria"));
                limpiarValidaciones($("#inpCantidad"), $("#errorCantidad"));
                limpiarValidaciones($("#txtDescripcion"), $("#errorDescripcion"));

                document.getElementById("formEditarNecesidad").reset();
                $("#modalEditarNecesidad .modal-content").removeClass($("#categoriaActual").val());
                $("#btnGuardarCambiosNecesidad").unbind("click");
                $("#btnGuardarCambiosNecesidad").click(function (e) {
                    e.preventDefault();
                    if (validarNecesidad()) {
                        bloquearBoton($("#btnGuardarCambiosNecesidad"));
                        registrarNecesidad(idUsuario);
                    }
                });
            });
        })
}

function agregarPaginacionNecesidades() {

    paginarTabNecesidad({
        containerType: 'EnProceso',
        ListType: 'enproceso'
    });
    paginarTabNecesidad({
        containerType: 'Cumplidas',
        ListType: 'cumplida'
    });
    paginarTabNecesidad({
        containerType: 'Eliminadas',
        ListType: 'eliminada'
    });
}

function agregarPaginacionComentarios() {

    //llamo a la funcion para paginar cada seccion pasandole el nombre del contenedor y la clase de los elementos que contiene
    paginarTabCalificacion({
        containerType: 'trato-1',
        ListType: 'trato-1'
    }); //negativas
    paginarTabCalificacion({
        containerType: 'trato-2',
        ListType: 'trato-2'
    }); //regulares
    paginarTabCalificacion({
        containerType: 'trato-3',
        ListType: 'trato-3'
    }); //positivas
}

function paginarTabNecesidad({
    containerType = '',
    ListType = ''
} = {}) {

    $(`#navNecesidades${containerType}`).remove();
    let $necesidadesContainer = $(`#necesidades${containerType}`);
    let necesidades = document.querySelectorAll(`.need.${ListType}`);
    let filasTotales = necesidades.length;
    let filasParaMostrar = 4;

    if (filasTotales > filasParaMostrar) {

        $necesidadesContainer.append(`<div id=navNecesidades${containerType}></div>`);
        let $nav = $(`#navNecesidades${containerType}`);


        let numPaginas = filasTotales / filasParaMostrar;

        for (i = 0; i < numPaginas; i++) {

            let numPag = i + 1;
            let pagRel = `<a href="javascript:void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
            $nav.append(pagRel);
        }

        $(necesidades).hide();
        $(necesidades).slice(0, filasParaMostrar).show();

        $nav.find('a').bind('click', function () {

            $nav.find('a').removeClass('active');
            $(this).addClass('active');

            let pagActual = $(this).attr('rel');

            let primerItem = pagActual * filasParaMostrar;
            let ultimoItem = primerItem + filasParaMostrar;
            $(necesidades).css('opacity', '0.0').hide().slice(primerItem, ultimoItem).
            css('display', 'block').animate({
                opacity: 1
            }, 300);
        });
    } else if (!filasTotales) {

        let tabType = document.querySelector(`a.nav-link[href="#necesidades${containerType}"]`).textContent.toLowerCase();
        $necesidadesContainer.html('');
        let emptyStateOfNeed =
            `<img src="/assets/img/SinNecesidades${containerType}.svg">
         <p class="text-center my-5">No hay necesidades ${tabType}</p>`
        $necesidadesContainer.append(emptyStateOfNeed);
    }

}

function paginarTabCalificacion({
    containerType = "",
    ListType = ""
} = {}) {

    $(`#navCalificaciones${containerType}`).remove();
    let $calificacionContainer = $(`#${containerType}`);
    let calificaciones = document.querySelectorAll(`.${ListType}`);
    let filasTotales = calificaciones.length;
    let filasParaMostrar = 4;

    if (filasTotales > filasParaMostrar) {

        $calificacionContainer.append(`<div id=navCalificaciones${containerType}></div>`);
        let $nav = $(`#navCalificaciones${containerType}`);

        let numPaginas = filasTotales / filasParaMostrar;

        for (i = 0; i < numPaginas; i++) {

            let numPag = i + 1;
            let pagRel = `<a href="javascript:void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
            $nav.append(pagRel);
        }

        $(calificaciones).hide();
        $(calificaciones).slice(0, filasParaMostrar).show();

        $nav.find('a').bind('click', function () {

            $nav.find('a').removeClass('active');
            $(this).addClass('active');

            let pagActual = $(this).attr('rel');

            let primerItem = pagActual * filasParaMostrar;
            let ultimoItem = primerItem + filasParaMostrar;
            $(calificaciones).css('opacity', '0.0').hide().slice(primerItem, ultimoItem).
            css('display', 'block').animate({
                opacity: 1
            }, 300);
        });
    } else if (!filasTotales) {

        let tabType = document.querySelector(`a.nav-link[href="#${containerType}"]`).textContent.toLowerCase();
        let emptyState =
            `<img src="/assets/img/SinComentarios.svg">
         <p class="text-center my-5">No hay calificaciones ${tabType}</p>`
        $calificacionContainer.html('');
        $calificacionContainer.append(emptyState);
    }
}

function agregarModalContacto(contacto) {

    $("#correo").html(contacto.correo);

    var $listaDomicilios = $('#listadoDomicilios');
    if (contacto.domicilios && contacto.domicilios.length) {

        var $domiciliosFragment = $(document.createDocumentFragment());
        $.each(contacto.domicilios, function (indexInArray, domicilio) {

            var piso = (domicilio.piso != '') ? `, Piso ${domicilio.piso}` : '';
            var depto = (domicilio.depto != '') ? `, Depto ${domicilio.depto}` : '';

            $domiciliosFragment.append(`
                <li class="list-group-item px-0 py-1" id="domicilio${domicilio.idDomicilio}">
                    <p class="m-1">${domicilio.calle} ${domicilio.numero}${piso}${depto}</p>
                    <p class="m-1">${domicilio.nombreLocalidad}, ${domicilio.nombreProvincia}</p>
                </li>`);
        });

        $listaDomicilios.html($domiciliosFragment);
    } else $listaDomicilios.html('<p class="mb-2">No hay domicilios registrados</p>');

    var $listadoTelefonos = $("#listadoTelefonos");
    if (contacto.telefonos && contacto.telefonos.length) {

        var $telefonosFragment = $(document.createDocumentFragment())
        $.each(contacto.telefonos, function (indexInArray, telefono) {
            $telefonosFragment.append(`
                <li class="list-group-item px-0 py-1" id="telefono${telefono.idTelefono}">
                    <p class="m-1">${telefono.codAreaTelefono} - ${telefono.numeroTelefono}</p>
                </li>`);
        });

        $listadoTelefonos.html($telefonosFragment);
    } else $listadoTelefonos.html('<p class="mb-2">No hay telefonos registrados</p>');

    $("#btn-contacto").toggleClass('d-none');
}

function capitalize(text) {

    let FirstLetterCap = text[0].toUpperCase();
    return FirstLetterCap + text.slice(1);
}

function crearCardNecesidad(necesidad, vistaVisitante) {
    $('.alertNoNecesidades').remove();
    // console.log( vistaVisitante );
    let btnEditarNecesidad = "";
    let btnDeleteNeed = `<button class="dropdown-item" data-toggle="modal" href="#modalBajaNecesidad" id="btnDelete-need${necesidad.idNecesidad}" data-need="${necesidad.idNecesidad}" type="button">Eliminar necesidad</button>`

    if (vistaVisitante == 0) {
        btnEditarNecesidad = `<p class="editarNecesidad">
        <a data-toggle="modal" href="#modalEditarNecesidad" id="editar${necesidad.idNecesidad}"><i class="far fa-edit"></i></a>
        </p>`;
    }

    if (necesidad.descripcionEstado == 'eliminada') {
        btnDeleteNeed = '';
    }
    // console.log( necesidad );

    $("#necesidad" + necesidad.idNecesidad).html("");
    let porcentajeAvance = calcularPorcentaje(necesidad);
    let cantColaboraciones = necesidad.colaboraciones_count;
    if (cantColaboraciones === undefined) cantColaboraciones = 0;

    let cardNecesidad = `<!-- CATEGORIA, FECHA, ESTADO, OPCIONES Y DESCRIPCION -->
    <div class="card-body py-2">
        <div class="d-flex justify-content-between align-items-center">
            <h6 class="card-title mb-n1">${capitalize(necesidad.nombreCategoria)}</h6>
            <button class="btn dropdown px-0 text-muted" type="button" id="OptionsNeed-forID-${necesidad.idNecesidad}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-ellipsis-v fa-xs"></i></button>
            <div class="dropdown-menu dropdown-menu-right shadow-sm mt-n4" aria-labelledby="OptionsNeed-forID-${necesidad.idNecesidad}">
                <button class="dropdown-item" data-toggle="modal" data-target="#modalEditarNecesidad" id="btnEdite-need${necesidad.idNecesidad}" data-need="${necesidad.idNecesidad}" type="button">Editar necesidad</button>
                ${btnDeleteNeed}
                <a target="_blank" class="dropdown-item fb-xfbml-parse-ignore"
                    href="https://www.facebook.com/sharer.php?u=https://solidariapp.com.ar/organizacion/${necesidad.idUsuario}/necesidad/${necesidad.idNecesidad}">Compartir en Facebook</a>
            </div>
        </div>
        <small class="card-subtitle text-muted font-weight-light">Creada hace ${capitalize(moment(necesidad.fechaCreacionNecesidad, "YYYY-MM-DD HH:mm:ss").startOf('day').fromNow())} - ${capitalize(necesidad.descripcionEstado)}</small>
        <div class="card-text mt-2 text-muted">${capitalize(necesidad.descripcionNecesidad)}</div>
    </div>
    <!-- PROGRESO (SOLICITADO Y RECIBIDO) -->
    <div class="progress">
        <div class="progress-count d-flex mx-3">
            <p class="mr-auto" id = "cantidadSolicitada${necesidad.idNecesidad}">Se solicita: ${necesidad.cantidadNecesidad}</p>
            <p class="mr-auto">Se recibio: ${necesidad.cantidadRecibida || 0}</p>
        </div>
        <div class="progress-bar" role="progressbar" style="width:${ porcentajeAvance }%;" aria-valuenow="${ porcentajeAvance }" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <!-- FECHA LIMITE Y COLABORACIONES -->
    <div class="card-footer py-0 d-flex justify-content-between align-items-center">
        <small class="text-muted ">Fecha limite: ${ new Date(necesidad.fechaLimiteNecesidad).toLocaleDateString('es-AR')}</small>
        <a href="#" data-toggle="modal" data-target="#modalDetalleNecesidad" id="btnDetalleNecesidad${necesidad.idNecesidad}" class="text-black-50">
            <span class="nroAyudas">${necesidad.colaboraciones_count ? necesidad.colaboraciones_count : 0}</span> 
            <i class="fas fa-user-friends fa-sm"></i>
        </a>
    </div>`;

    $("#necesidad" + necesidad.idNecesidad).append(cardNecesidad);

    console.log( necesidad );

    if (necesidad.cantidadNecesidad == 0) {
        $("#cantidadSolicitada" + necesidad.idNecesidad).html("Sin limite de cantidad");
    }
    if (vistaVisitante == 0) {
        $("#btnDelete-need" + necesidad.idNecesidad).click(function () {
            $("#btnConfirmarEliminarNecesidad").unbind("click");
            $("#btnConfirmarEliminarNecesidad").click((e) => {
                bloquearBoton($("#btnConfirmarEliminarNecesidad"));
                bajaNecesidad(necesidad.idNecesidad);
            })
        });
        $("#btnEdite-need" + necesidad.idNecesidad).unbind("click");
        //evento click del btn editar necesidad
        $("#btnEdite-need" + necesidad.idNecesidad).click(() => {
            console.log("idNecesidad " + necesidad.idNecesidad);
            mostrarModalEditarNecesidad(necesidad);
        });

        $("#btnDetalleNecesidad" + necesidad.idNecesidad).click(() => {
            cargarDatosModalDetalleNecesidad(necesidad, "organizacion");
        });
    } else {
        $("#btnDetalleNecesidad" + necesidad.idNecesidad).click(() => {
            cargarDatosModalDetalleNecesidad(necesidad);
        });
    }
}

function mostrarModalEditarNecesidad(necesidad) {
    limpiarValidaciones($("#inpFechaLimite"), $("#errorFechaLimite"));
    limpiarValidaciones($("#slctCategoria"), $("#errorCategoria"));
    limpiarValidaciones($("#inpCantidad"), $("#errorCantidad"));
    limpiarValidaciones($("#txtDescripcion"), $("#errorDescripcion"));
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
    $("#btnCerrarModal").click(() => {

        document.getElementById("formEditarNecesidad").reset();
        limpiarValidaciones($("#inpFechaLimite"), $("#errorFechaLimite"));
        limpiarValidaciones($("#slctCategoria"), $("#errorCategoria"));
        limpiarValidaciones($("#inpCantidad"), $("#errorCantidad"));
        limpiarValidaciones($("#txtDescripcion"), $("#errorDescripcion"));

    })
    //Click Guardar necesidad editada
    $("#btnGuardarCambiosNecesidad").unbind("click");
    $("#btnGuardarCambiosNecesidad").click((e) => {

        e.preventDefault();
        if (necesidad.idNecesidad != 0) {
            if (validarNecesidad()) {
                // console.log(necesidad);
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
    $("#btnConfirmarEliminarNecesidad").click((e) => {
        bloquearBoton($("#btnConfirmarEliminarNecesidad"));
        bajaNecesidad(necesidad.idNecesidad);
    })


}
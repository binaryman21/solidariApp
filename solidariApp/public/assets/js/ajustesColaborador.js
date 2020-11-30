document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({
        funcionSuccess: configurarCuentaDelColaborador,
        RedirectIfNot: true
    });

    let btnAgregarTelefono = $('#btnAgregarTelefono');
    let btnAgregarDireccion = $('#btnAgregarDireccion');
    var formularioTelefono = $('#nuevoTelefono');
    var formularioDomicilio = $('#formularioDomicilio');
    let navPills = $('#v-pills-tab');
    let navTabs = $('#nav-tab');
    let opcionesPills = navPills.find('a[role=tab]');
    let opcionesTabs = navTabs.find('a[role=tab]');
    let btnGuardarCambiosDomicilio = $('#btnGuardarCambiosDomicilio');
    let btnGuardarTelefonos = $('#btnGuardarTelefonos');
    document.querySelector('#actualizarAvatar').addEventListener("change", cambiarFotoPerfil, false);
    $('.btnCancelar').on('click', cerrar);

    function cerrar(e) {
        $('[aria-expanded=true]').trigger('click');
        $('#formularioDomicilio').removeClass('show');
    }

    listarProvincias(-1);

    btnGuardarCambiosDomicilio.on('click', e => {

        if (validarDireccion())
            ActualizarDomicilio(e);
    });

    btnAgregarTelefono.on('click', e => {

        EstablecerFormTelefonosEn({
            title: 'Agregar nuevo telefono'
        });
    });

    btnGuardarTelefonos.on('click', e => {
        AgregarTelefono();
    })

    btnAgregarDireccion.on('click', e => {

        EstablecerFormDomiciliosEn({
            title: 'Agregar nuevo domicilio'
        });
    });


    opcionesPills.on('hide.bs.tab', (e) => {
        // console.log('hola');
        navTabs.find(`a[href="#${$(e.target).attr('aria-controls')}"]`).removeClass('active').attr('aria-selected', false);
        // navTabs.find(`a[href="#${$(e.target).attr('aria-controls')}"]`).removeClass('show');
        navTabs.find(`a[href="#${$(e.relatedTarget).attr('aria-controls')}"]`).addClass('active').attr('aria-selected', true);
    });

    opcionesTabs.on('hide.bs.tab', (e) => {

        navPills.find(`[href="#${$(e.target).attr('aria-controls')}"]`).removeClass('active').attr('aria-selected', false);
        navPills.find(`[href="#${$(e.relatedTarget).attr('aria-controls')}"]`).addClass('active').attr('aria-selected', true);
    });

    formularioTelefono.on('show.bs.collapse', () => formularioDomicilio.collapse('hide'));
    formularioTelefono.find('button.close').on('click', () => formularioTelefono.collapse('hide'));
    formularioDomicilio.on('show.bs.collapse', () => formularioTelefono.collapse('hide'));
    formularioDomicilio.find('button.close').on('click', () => formularioDomicilio.collapse('hide'));

    //cambiar foto
    document.querySelector('#actualizarAvatar').addEventListener("change", cambiarFotoPerfil, false);
    document.querySelector('#actualizarPortada').addEventListener("change", cambiarFotoPortada, false);

    //Actualizar datos
    $("form[name='uploader']").on("submit", function (ev) {
        ev.preventDefault(); // Prevent browser default submit.
        let formData = new FormData(this);
        let fotoPerfil = $('#actualizarAvatar').prop('files')[0];
        let fotoPortada = $('#actualizarPortada').prop('files')[0];
        let contador = 0;
        formData.append('fotoPerfil', fotoPerfil);
        formData.append('fotoPortada', fotoPortada);
        //Actualizar foto de perfil
        if (fotoPerfil) {
            axios.post("/updateFotoPerfil", formData)
                .then((response) => {
                    if (response.data.resultado) {
                        alertify.success(response.data.message)
                    } else {
                        alertify.error(response.data.message)
                    }
                });
            contador++;
        }
        if (fotoPortada) {
            axios.post("/updateFotoPortada", formData)
                .then((response) => {
                    if (response.data.resultado) {
                        alertify.success(response.data.message)
                    } else {
                        alertify.error(response.data.message)
                    }
                });
            contador++;
        }
        if (contador == 0) {
            alertify.error('Nada para actualizar');
        }
    });
});

function cambiarFotoPerfil() {
    let fotoPerfil = $('#actualizarAvatar').prop('files')[0];
    $('#imgPerfilColaborador').attr('src', URL.createObjectURL(fotoPerfil));
    $('#imgPerfil').attr('src', URL.createObjectURL(fotoPerfil));
}

function cambiarFotoPortada() {
    let fotoPortada = $('#actualizarPortada').prop('files')[0];
    $('#cover').attr('src', URL.createObjectURL(fotoPortada));
}

var FetchedDomicilios = [];
var FetchedTelefonos = [];

function configurarCuentaDelColaborador(idUsuario) {

    axios.get("/getColaborador/" + idUsuario)
        .then((response) => {

            let colaborador = response.data.colaborador;
            $("#nombreColaborador").html(`${colaborador.nombreColaborador} ${colaborador.apellidoColaborador}`);
            $("#imgPerfilColaborador").attr("src", colaborador.urlFotoPerfilUsuario);
            $("#cover").attr("src", colaborador.urlFotoPortadaUsuario);

            $("#fechaAltaUsuario").html(`Eres usuario desde el ${moment(colaborador.fechaAltaUsuario, "YYYY-MM-DD HH:mm:ss").format('LL')}`);

            $("#emailColaborador").html(colaborador.emailUsuario);

            //DOMICILIOS

            var $listaDomicilios = $('#listadoDomicilios');
            if (response.data.domicilios && response.data.domicilios.length) {

                FetchedDomicilios = response.data.domicilios;
                var $domiciliosFragment = $(document.createDocumentFragment());
                $.each(FetchedDomicilios, function (indexInArray, domicilio) {

                    if (!indexInArray) listarLocalidades(domicilio.idProvincia, -1);

                    var piso = (domicilio.piso != '') ? `Piso ${domicilio.piso}` : '';
                    var depto = (domicilio.depto != '') ? `Depto ${domicilio.depto}` : '';

                    $domiciliosFragment.append(
                        `<li class="list-group-item list-group-item-action px-2 py-1 d-flex justify-content-between align-items-center" id="domicilio${domicilio.idDomicilio}">
                        <div>
                            <small class="m-1 d-block  text-truncate">${domicilio.calle} ${domicilio.numero}, ${piso}, ${depto}</small>
                            <small class="m-1 text-black-50 text-truncate">${domicilio.nombreLocalidad}, ${domicilio.nombreProvincia}</small>
                        </div>
                        <button class="btn dropdown" type="button" id="dirOptions-forID-${domicilio.idDomicilio}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-xs"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-lg-right shadow" aria-labelledby="telOptions-forID-${domicilio.idDomicilio}">
                            <button class="dropdown-item" id="btnEdite-Dir${indexInArray}" data-dir="${indexInArray}" type="button">Editar</button>
                        </div>
                    </li>`
                    );

                    $domiciliosFragment.find(`#btnEdite-Dir${indexInArray}`).on('click', e => {
                        EditarEnFormDomicilios(e)
                    });
                    // console.log(indexInArray);
                });

                $listaDomicilios.html($domiciliosFragment);
            } else $listaDomicilios.html('<p class="mb-2">No hay domicilios registrados</p>');

            $('#selectProvincia').on('change', e => {

                listarProvincias(e.target.value, -1);
            });

            //TELEFONOS
            var $listadoTelefonos = $("#listadoTelefonos");
            if (response.data.telefonos && response.data.telefonos.length) {

                FetchedTelefonos = response.data.telefonos;
                var $telefonosFragment = $(document.createDocumentFragment())
                $.each(FetchedTelefonos, function (indexInArray, telefono) {
                    $telefonosFragment.append(
                        `<a id="telefono${telefono.idTelefono}" class="list-group-item list-group-item list-group-item-action px-2 py-1 d-flex justify-content-between align-items-center">
                    <span class="m-1">${telefono.codAreaTelefono} - ${telefono.numeroTelefono}</span>
                    <button class="btn dropdown" type="button" id="telOptions-forID-${telefono.idTelefono}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-ellipsis-v fa-xs"></i></button>
                    <div class="dropdown-menu dropdown-menu-right shadow" aria-labelledby="telOptionsDrop-forID-${telefono.idTelefono}">
                        <button class="dropdown-item" id="btnDelete-Tel${indexInArray}" data-tel="${indexInArray}" type="button">Eliminar</button>
                    </div>
                </a>`);

                    $telefonosFragment.find(`#btnDelete-Tel${indexInArray}`).on('click', function (e) {
                        EliminarTelefono(e)
                    });
                });

                $listadoTelefonos.html($telefonosFragment);
            } else $listadoTelefonos.html('<p class="mb-2">No hay telefonos registrados</p>');
        });
}

function EditarEnFormDomicilios(e) {

    let index = $(e.target).data("dir");
    let dir = FetchedDomicilios[index];
    // console.log( 'dir' + dir);
    EstablecerFormDomiciliosEn({
        title: 'Editar direccion',
        data: dir,
        id: index
    });
    $('#formularioDomicilio').collapse('show');
}

function EliminarTelefono(e) {

    let id = $(e.target).data('tel');
    let tel = FetchedTelefonos[id];
    alertify.confirm(

        'Eliminar telefono',
        `Estas seguro que quieres eliminar el telefono ${tel.codAreaTelefono} ${tel.numeroTelefono}`,
        function () {

            axios.post("/eliminarTelefono", {
                    idTelefono: tel.idTelefono
                })
                .then((response) => {

                    if (response.data.resultado) {

                        $(e.target).parent()
                            // .replacewith('Eliminado')
                            .fadeOut(1000)
                            .animate({
                                "opacity": "0",
                            }, function () {
                                alertify.success(response.data.message);
                                $(this).parent().remove();
                                FetchedTelefonos.slice(id, 1);
                            });
                    };
                })
                .catch(error => console.log(error));
        },
        function () {

        }
    );
}

function AgregarTelefono(e) {
    let telefono = {
        idTelefono: 0,
        codAreaTelefono: $("#codArea").val(),
        numeroTelefono: $("#numeroTelefono").val(),
        esCelular: 0,
    }

    if (validarTelefono('')) {
        axios.post("/registrarTelefono", telefono)
            .then((response) => {
                if (response.data.resultado) {
                    telefono.idTelefono = response.data.idTelefono;
                    limpiarValidaciones($('#codArea'), $('.errorCodArea'));
                    limpiarValidaciones($('#numeroTelefono'), $('.errorNroTelefono'));
                    alertify.success('Telefono agregado');
                    FetchedTelefonos.push(telefono);
                    let indexInArray = FetchedTelefonos.length - 1;
                    var $listadoTelefonos = $('#listadoTelefonos');
                    $listadoTelefonos.append(
                        `<a id="telefono${telefono.idTelefono}" class="list-group-item list-group-item list-group-item-action px-2 py-1 d-flex justify-content-between align-items-center">
                    <span class="m-1">${telefono.codAreaTelefono} - ${telefono.numeroTelefono}</span>
                    <button class="btn dropdown" type="button" id="telOptions-forID-${telefono.idTelefono}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-ellipsis-v fa-xs"></i></button>
                    <div class="dropdown-menu dropdown-menu-right shadow" aria-labelledby="telOptions-forID-${telefono.idTelefono}">
                        <button class="dropdown-item" id="btnDelete-Tel${indexInArray}" data-tel="${indexInArray}" type="button">Eliminar</button>
                    </div>
                </a>`);
                    $listadoTelefonos.find(`#btnDelete-Tel${indexInArray}`).on('click', function (e) {
                        EliminarTelefono(e)
                    });
                } else {
                    alertify.error(response.data.message);
                }
            });
    }
}

function EstablecerFormDomiciliosEn({
    title = "",
    data = {},
    id = -1
} = {}) {

    // console.log( data );
    $('#idDomicilio').val(data.idDomicilio || '');
    $('#formDirTitle').text(title);
    $('#calle').val(data.calle || '');
    $('#numero').val(data.numero || '');
    $('#piso').val(data.piso || '');
    $('#depto').val(data.depto || '');
    $('#selectLocalidad').val(data.idLocalidad || -1);
    $('#selectProvincia').val(data.idProvincia || -1);
    $('#btnGuardarCambiosDomicilio').data("dir", id);
}

function EstablecerFormTelefonosEn({
    title = "",
    data = {}
} = {}) {

    $('#formTelTitle').text(title);
    $('#codArea').val(data.codAreaTelefono || '');
    $('#numeroTelefono').val(data.numeroTelefono || '');
}

function ActualizarDomicilio(e) {

    obtenerCoordenadas($("#calle").val(), $("#numero").val(), $("#selectLocalidad option:selected").text(), $("#selectProvincia option:selected").text())
        .then(data => {
            let coordenadas = {
                lat: data.lat,
                lon: data.lon
            }
            let domicilio = {
                idDomicilio: $('#idDomicilio').val(),
                calle: $("#calle").val(),
                numero: $("#numero").val(),
                piso: $("#piso").val(),
                depto: $("#depto").val(),
                idLocalidad: $("#selectLocalidad").val(),
                idProvincia: $("#selectProvincia").val(),
                nombreLocalidad: $("#selectLocalidad option:selected").text(),
                nombreProvincia: $("#selectProvincia option:selected").text(),
                latitud: coordenadas.lat,
                longitud: coordenadas.lon
            }
            axios.post("/actualizarDomicilio", domicilio)
                .then((response) => {

                    if (response.data.resultado) {
                        if (response.data.resultado == 1) {
                            alertify.success('Cambios guardados');
                            limpiarValidaciones($("#calle"), $(".errorCalle"));
                            limpiarValidaciones($("#numero"), $(".errorNumero"));
                            limpiarValidaciones($("#selectLocalidad"), $(".errorLocalidad"));
                            limpiarValidaciones($("#selectProvincia"), $(".errorProvincia"));
                            $("#piso").val('');
                            $("#depto").val('');
                            $('#formularioDomicilio').removeClass('show');
                            //Actualizar en el front
                            let $listadoDomicilios = $('#listadoDomicilios');
                            $listadoDomicilios.html(
                                `<li class="list-group-item list-group-item-action px-2 py-1 d-flex justify-content-between align-items-center" id="domicilio${domicilio.idDomicilio}">
                                <div>
                                    <small class="m-1 d-block  text-truncate">${domicilio.calle} ${domicilio.numero}, ${domicilio.piso}, ${domicilio.depto}</small>
                                    <small class="m-1 text-black-50 text-truncate">${domicilio.nombreLocalidad}, ${domicilio.nombreProvincia}</small>
                                </div>
                                <button class="btn dropdown" type="button" id="dirOptions-forID-${domicilio.idDomicilio}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-xs"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-lg-right shadow" aria-labelledby="telOptions-forID-${domicilio.idDomicilio}" style="">
                                    <button class="dropdown-item" id="btnEdite-Dir${0}" data-dir="${0}" type="button">Editar</button>
                                </div>
                            </li>`
                            );
                            FetchedDomicilios[0] = domicilio;
                            $listadoDomicilios.find(`#btnEdite-Dir${0}`).on('click', e => {
                                EditarEnFormDomicilios(e)
                            });
                        } else alertify.notify(response.data.message);
                    } else console.log(response.data.message);
                })
                .catch(error => alertify.error('Ha ocurrido un problema y no se ha podido guardar los cambios'));
        })
}

//Esta accion no se puede deshacer, ¿Estas seguro que deseas darte de baja?

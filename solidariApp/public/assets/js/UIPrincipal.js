

getOrganizaciones();
isLoggedIn();

$( document ).ready(function() {

    $(function() {
        $(document).on('click', '.alert-close', function() {
            $(this).parent().hide();
        })
     });

    listarProvincias(1);
    listarTiposOrganizaciones();
    // agregarPaginacionUsuarios();

    // EVENTOS
    $("#btnRegistrarseComoOrganizacion").on('click', mostrarRegistrarseComoOrganizacion);
    $("#btnRegistrarseComoColaborador").on('click', mostrarRegistrarseComoColaborador);

    //Evento click del boton ingresar en el navbar
    $("#btnIngresar").click(function(){
        limpiarCamposRegistro();
        $("#modoRegistro").val("ingresar"); //seteo el modalLogin en "ingreso"
        $("#btnLogin").html("Ingresar"); //cambio el nombre del boton del modalLogin a "ingresar"
        $("#tituloModalLogin").html("Ingresar a solidariApp"); //Seteo el titulo del modalLogin
    });

    //evento click del boton del modalLogin
    $("#btnLogin").click(clickBtnLogin);

    //evento change en el selectProvincia
    $("#selectProvincia").change(function(){
        let idProvincia = $("#selectProvincia").val();
        $("#selectLocalidad").html("");
        listarLocalidades(idProvincia,1);
    });

    //Evento click para buscar una necesidad
    $('#btnBuscarNeccesidades').on('click', buscarNecesidadPorTexto);

    //Evento click para los filtros por categoria
    $('#filtrosCategoria button').on('click', filtrarPorCategoria);

    //Evento click para el filtro por ubicacion
    $('#btnBuscarPorUbicacion').on('click', filtrarPorUbicacion);

    //evento click en el btnCrearCuenta del modalRegistroColOrg
    $("#btnCrearCuenta").click(function(){
        //Deshabilito el boton y muestro el spinner
        $("#btnCrearCuenta").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
        $("#btnCrearCuenta").attr("disabled", true);

        //Acciones segun el modoRegistro
        if($("#modoRegistro").val() == "colaborador")
        {
            if( validarRegistroColaborador() ){
                registrarColaborador();
            }
            else{
                $("#btnCrearCuenta").html("Crear cuenta");
                $("#btnCrearCuenta").attr("disabled", false);
            }
        }
        else if ($("#modoRegistro").val() == "organizacion"){
            if( validarRegistroOrganizacion() ){
                registrarOrganizacion();
            }
            else{
                $("#btnCrearCuenta").html("Crear cuenta");
                $("#btnCrearCuenta").attr("disabled", false);
            }
        }
    });
});


//Codigo que se ejecuta al clickear el boton del modalLogin
function clickBtnLogin()
{
    //Deshabilito el boton y muestro el spinner
    $("#btnLogin").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
    $("#btnLogin").attr("disabled", true);

    //Si el modoRegistro es "ingresar"
    if($("#modoRegistro").val() == "ingresar")
    {
        if( validarLogin() ){
            var datosLogin = {
                email: $("#emailUsuario").val(),
                idGoogle: 0,
                pass:$("#claveUsuario").val()
            };
            //hago el login
            login(datosLogin);
        }
        else{
            $("#btnLogin").html("Ingresar");
            $("#btnLogin").attr("disabled", false);
        }
    }
    else
    {
        if( validarRegistroGoogle() ){
            axios.post("/isUser",{email:$("#emailUsuario").val()})
            .then((response)=>{
                // alert(response.data.isUser);
                if(response.data.isUser)
                {
                    limpiarCamposRegistro();
                    $("#errorCorreo").html("El correo ya esta registrado");
                    $("#errorCorreo").show();
                    $("#btnLogin").html("Crear cuenta");
                    $("#btnLogin").attr("disabled", false);
                }
                else
                {
                    $("#modalRegistroColOrg").modal("show");
                    $("#modalLogin").modal("hide");
                }

            });
        }
        else{
            $("#btnLogin").html("Crear cuenta");
            $("#btnLogin").attr("disabled", false);
        }

    }
}


function registrarOrganizacion()
{
    obtenerCoordenadas($("#calle").val(), $("#numero").val(), $("#selectLocalidad option:selected" ).text(), $("#selectProvincia option:selected" ).text())
        .then(data => {
            let coordenadas = {
                lat: data.lat,
                lon: data.lon
            }
            console.log( coordenadas );
            let organizacion =
            {
                idUsuario:0,
                claveUsuario:$("#claveUsuario").val(),
                emailUsuario:$("#emailUsuario").val(),
                tokenGoogle:$("#idGoogle").val(),
                urlFotoPerfilUsuario:$("#urlFotoPerfilUsuario").val(),
                rol:{idRolUsuario:0,nombreRolUsuario:""},
                estado:{idEstadoUsuario:0,nombreEstadoUsuario:""},
                razonSocial:$("#nombreOrganizacion").val(),
                tipoOrganizacion:
                {
                    idTipoOrganizacion:$("#selectTipoOrganizacion").val(),
                    nombreTipoOrganizacion:$("#selectTipoOrganizacion :selected").text()
                },
                telefonos:
                [
                    {
                        idTelefono:0,
                        codAreaTelefono:$("#codArea").val(),
                        numeroTelefono:$("#numeroTelefono").val(),
                        esCelular:0
                    }
                ],
                domicilios:
                [
                    {
                        idDomicilio:0,
                        calle:$("#calle").val(),
                        numero:$("#numero").val(),
                        piso:$("#piso").val(),
                        depto:$("#depto").val(),
                        latitud: coordenadas.lat,
                        longitud: coordenadas.lon,
                        localidad:
                        {
                            idLocalidad:$("#selectLocalidad").val(),
                            nombreLocalidad:""
                        }
                    }
                ],
                links:
                [
                    //{idLink:0,urlLink:"",tipoLink:{idTipoLink:0,nombreTipoLink:""}}
                ]
            }
            axios.post("/registrarOrganizacion",JSON.stringify(organizacion))
            .then((response)=>{
                console.log('registrando..');
                // alert(response.data.message);
                $("#btnCrearCuenta").html("Guardar");
                $("#btnCrearCuenta").attr("disabled", false);
                if(response.data.resultado == 1){
                    $("#modalRegistroColOrg").modal("hide");
                    // $("#msjResultadoRegistro").html("Registro exitoso!");
                    // $("#modalResultadoRegistro").modal("show");
                    alertify.success('Registro exitoso!')

                    let datosLogin = {
                        email: organizacion.emailUsuario,
                        idGoogle: organizacion.tokenGoogle,
                        pass:organizacion.claveUsuario
                    };
                    login(datosLogin);
                }
                else{
                    $("#modalRegistroColOrg").modal("hide");
                    alertify.error('Algo fallo, intentalo mas tarde')
                    // $("#msjResultadoRegistro").html("Algo fallo, intentalo mas tarde");
                    // $("#modalResultadoRegistro").modal("show");
                }
                });

        });
}


function registrarColaborador()
{
    obtenerCoordenadas($("#calle").val(), $("#numero").val(), $("#selectLocalidad option:selected" ).text(), $("#selectProvincia option:selected" ).text())
        .then(data => {
            let coordenadas = {
                lat: data.lat,
                lon: data.lon
            }
            var colaborador =
            {
                idUsuario:0,
                claveUsuario:$("#claveUsuario").val(),
                emailUsuario:$("#emailUsuario").val(),
                tokenGoogle:$("#idGoogle").val(),
                urlFotoPerfilUsuario:$("#urlFotoPerfilUsuario").val(),
                rol:{idRolUsuario:0,nombreRolUsuario:""},
                estado:{idEstadoUsuario:0,nombreEstadoUsuario:""},
                nombreColaborador:$("#nombreColaborador").val(),
                apellidoColaborador:$("#apellidoColaborador").val(),

                telefonos:
                [
                    {idTelefono:0,
                        codAreaTelefono:$("#codArea").val(),
                        numeroTelefono:$("#numeroTelefono").val(),
                        esCelular:0
                    }
                ],
                domicilios:
                [
                    {
                        idDomicilio:0,
                        calle:$("#calle").val(),
                        numero:$("#numero").val(),
                        piso:$("#piso").val(),
                        depto:$("#depto").val(),
                        latitud:coordenadas.lat,
                        longitud:coordenadas.lon,
                        localidad:
                        {
                            idLocalidad:$("#selectLocalidad").val(),
                            nombreLocalidad:""
                        }
                    }
                ],
                links:
                [
                    //{idLink:0,urlLink:"",tipoLink:{idTipoLink:0,nombreTipoLink:""}}
                ]
            }
            axios.post("/registrarColaborador",JSON.stringify(colaborador))
            .then((response)=>{
                $("#btnCrearCuenta").html("Guardar");
                $("#btnCrearCuenta").attr("disabled", false);
                // alert(response.data.message);
                if(response.data.resultado == 1){
                    $("#modalRegistroColOrg").modal("hide");
                    alertify.success('Registro exitoso!')
                    // $("#msjResultadoRegistro").html("Registro exitoso!");
                    // $("#modalResultadoRegistro").modal("show");

                    var datosLogin = {
                        email: colaborador.emailUsuario,
                        idGoogle: colaborador.tokenGoogle,
                        pass:colaborador.claveUsuario
                    };

                    login(datosLogin);
                }
                else{
                    $("#modalRegistroColOrg").modal("hide");
                    alertify.error('Registro exitoso!')
                    // $("#msjResultadoRegistro").html("Algo fallo, intentalo mas tarde");
                    // $("#modalResultadoRegistro").modal("show");
                }
            });
        })
}

//PAGINAR LAS ORGANIZACIONES EN LA LISTA
function agregarPaginacionListaOrganizaciones(){
    $('#navListaOrganizaciones').html('');
    $('.listaOrganizaciones').after('<div id="navListaOrganizaciones"></div>');
    let organizacion = document.querySelectorAll('.cardOrganizacion')
    let filasMostradas = 2;
    let filasTotales = organizacion.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navListaOrganizaciones').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }
    $( organizacion ).hide();
    $( organizacion ).slice(0, filasMostradas).show();
    $('#navListaOrganizaciones a:first').addClass('active');
    $('#navListaOrganizaciones a').bind('click', function(){
        $('#navListaOrganizaciones a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( organizacion ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}


//MOSTRAR EL MODAL DE REGISTRO COMO ORGANIZACION
function mostrarRegistrarseComoOrganizacion(){
    mostrarComo('organizacion')
}

//MOSTRAR EL MODAL DE REGISTRO COMO COLABORADOR
function mostrarRegistrarseComoColaborador(){
    mostrarComo('colaborador')
}

//TRAER TODAS LAS ORGANIZACIONES
function getOrganizaciones(){
    fetch('/getOrganizaciones/')
        .then(response => response.json())
        .then(data => {
            let organizaciones = data.organizaciones;
            llenarOrganizaciones( organizaciones );
        })
}

//CARGAR LAS ORGANIZACIONES EN LA LISTA
function llenarOrganizaciones( organizaciones ){
    // Borro los marcadores del mapa
    $(".leaflet-marker-icon").remove(); $(".leaflet-popup").remove();
    $(".leaflet-pane.leaflet-shadow-pane").remove();

    let divOrganizaciones = $('.listaOrganizaciones');
    divOrganizaciones.html('');

    //SI NO HAY ORGANIZACIONES CON NO LAS CARGO
    if( organizaciones.length < 1){
        divOrganizaciones.html(
            `<div class="alert alert-danger" role="alert">
                No se encontraron resultados
            </div>`
        );
    }
    else{
        organizaciones.forEach(org => {
            if(org.necesidades.length>0){
                let cardOrganizacion = `
                <div class="card cardOrganizacion cardOrganizacion${org.idUsuario} shadow-sm border my-2" style="display: block; opacity: 1;">
                    <div class="card-header d-flex flex-row px-2 justify-content-star detalleOrganizacion align-items-center">
                        <img class="rounded-circle imgPerfilOrg" src="${org.urlFotoPerfilUsuario || 'assets/img/imgUserProfile.png'}" alt="Avatar de la org ${org.razonSocial}">
                        <div id="card-org-name" class="ml-2">
                            <p>${org.razonSocial}</p>
                            <p>${org.nombreTipoOrganizacion}</p>
                        </div>
                    </div>
                    <div class="card-body p-0 listaNecesidades${org.idUsuario}">

                    </div>
                    <div class="card-footer py-0 bg-transparent">
                        <button class="btn w-100 btn-link ml-auto text-decoration-none">Ver todas</button>
                    </div>
                </div>`
    
                divOrganizaciones.append( cardOrganizacion );
                org.necesidades.forEach( need => {
                    $(`.listaNecesidades${org.idUsuario}`).append(`
                        <div class="${need.nombreCategoria.toLowerCase()}">
                            <div class="class-body py-2 px-3">
                                <div class="card-title"><h6>${need.nombreCategoria}</h6></div>
                                <div class="card-subtitle text-muted">${need.descripcionNecesidad}</div>
                            </div>
                            <div class="card-footer d-flex align-items-end justify-content-end p-0">
                                <button class="btn btn-link btnDetalleOrg btnDetalleOrg${need.idNecesidad} text-decoration-none" data-toggle="modal" data-target="#modalDetalleNecesidad">Me interesa</button>
                            </div>
                        </div>
                    `)
    
                    $(`.btnDetalleOrg${need.idNecesidad}`).on('click', function(){
                        cargarDatosModalDetalleNecesidad(need);
                    })
                })
    
                cargarOrgEnMapa(org);
            }
        })
    }
    agregarPaginacionListaOrganizaciones();
}

//CARGAR LAS NECESIDADES EN EL MODAL
function cargarDatosModalDetalleNecesidad( necesidad ){
        $('.detalleNecesidadModal').html(
        `<div class="card necesidad ${necesidad.nombreCategoria.toLowerCase()}">
            <div class="card-body">
                <div class="container-fluid">
                    <div class="datosNecesidad">
                        <p class="font-weight-bold">${necesidad.nombreCategoria}</p>
                        <p>${necesidad.descripcionNecesidad}</p>
                        <p>Cantidad: ${necesidad.cantidadNecesidad}</p>
                        <p>Fecha limite: ${ new Date(necesidad.fechaLimiteNecesidad).toLocaleDateString('es-AR') }</p>
                        <p>Estado: en proceso</p>
                        <p>Colaboradores: 5</p>
                    </div>
                </div>
                <button type="button" class="btn btnColaborar btn-block btn-outline-primary mt-4" data-toggle="modal" data-target="#modalColaborar"><i class="far fa-handshake"></i>COLABORAR</button>
            </div>
        </div>`)
}


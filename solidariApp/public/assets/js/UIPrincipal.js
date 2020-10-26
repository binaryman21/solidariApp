$( document ).ready(function() {
    listarProvincias();
    listarTiposOrganizaciones();

    $("#btnRegistrarseComoOrganizacion").on('click', mostrarRegistrarseComoOrganizacion);
    $("#btnRegistrarseComoColaborador").on('click', mostrarRegistrarseComoColaborador);

    agregarPaginacionListaOrganizaciones();
    agregarPaginacionUsuarios();

    $("#btnIngresar").click(function(){
        $("#modoRegistro").val("ingresar");
        $("#btnLogin").html("Ingresar");
        $("#tituloModalLogin").html("Ingresar a solidariApp");
        $("#btnLogin").attr("disabled", false);
    });
    $("#btnLogin").click(clickBtnLogin);

    $("#selectProvincia").change(function(){

        let idProvincia = $("#selectProvincia").val();
        $("#selectLocalidad").html("");
        listarLocalidades(idProvincia);
    });
    $("#btnCerrarSesion").click(cerrarSesion);

    $("#btnCrearCuenta").click(function(){
        // $("#btnCrearCuenta").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
        // $("#btnCrearCuenta").attr("disabled", true);
        if($("#modoRegistro").val() == "colaborador"){
            if( validarRegistroColaborador() ){
                registrarColaborador();
            }
        }
        else if ($("#modoRegistro").val() == "organizacion"){
            if( validarRegistroOrganizacion() ){
                registrarOrganizacion();
            }
        }
    });
});


function clickBtnLogin()
{
    // $("#btnLogin").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
    // $("#btnLogin").attr("disabled", true);
    if($("#modoRegistro").val() == "ingresar"){
        var datosLogin = {
            email: $("#emailUsuario").val(),
            idGoogle: 0,
            pass:$("#claveUsuario").val()
        };
        login(datosLogin);
    }
    else{
        if( validarRegistroGoogle() ){
            $("#modalRegistroColOrg").modal("show");
            $("#modalLogin").modal("hide");
        }
    }
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    let profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    let id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    var datosLogin = {
        email: profile.getEmail(),
        idGoogle: profile.getId(),
        pass:""
    };
    $("#btnLogin").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
    $("#btnLogin").attr("disabled", true);

    axios.post("/login",JSON.stringify(datosLogin))
    .then((response)=>{
        //alert(JSON.stringify(response.data.usuario));

        if(response.data.usuario.length == 0)
        {
            $("#idGoogle").val(profile.getId());
            $("#urlFotoPerfilUsuario").val(profile.getImageUrl());
            $("#emailUsuario").val(profile.getEmail());

           if($("#modoRegistro").val() == "colaborador"){
            $("#nombreColaborador").val(profile.getGivenName());
            $("#apellidoColaborador").val(profile.getFamilyName());
            $("#modalRegistroColOrg").modal("show");
           }
           else if($("#modoRegistro").val() == "organizacion")
           {
            $("#modalRegistroColOrg").modal("show");
           }
        }
        else{
            $("#modalLogin").modal("hide");
            mostrarInterfazSesionIniciada(response.data.usuario[0]);
        }
    });

}

function mostrarInterfazSesionIniciada(usuario)
{
    $("#btnIngresar").hide();
    $("#dropDownUsuario").show();
    $("#botonesRegistro").hide();
    $("#imgPerfil").attr("src",usuario.urlFotoPerfilUsuario);
}
function cerrarSesion()
{
    axios.post("/logOut")
    .then((response)=>{
        signOut();
        $("#btnIngresar").show();
        $("#dropDownUsuario").hide();
        $("#botonesRegistro").show();
    });
}


function registrarOrganizacion()
{
    var organizacion =
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
                latitud:0,
                longitud:0,
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

        alert(response.data.message);
        $("#btnCrearCuenta").html("Guardar");
        $("#btnCrearCuenta").attr("disabled", false);
        if(response.data.resultado == 1){
            $("#modalRegistroColOrg").modal("hide");
            $("#msjResultadoRegistro").html("Registro exitoso!");
            $("#modalResultadoRegistro").modal("show");

            var datosLogin = {
                email: organizacion.emailUsuario,
                idGoogle: organizacion.tokenGoogle,
                pass:organizacion.claveUsuario
            };

            login(datosLogin);

        }
        else{
            $("#modalRegistroColOrg").modal("hide");
            $("#msjResultadoRegistro").html("Algo fallo, intentalo mas tarde");
            $("#modalResultadoRegistro").modal("show");

        }
        });
}

function login(datosLogin){

    axios.post("/login",JSON.stringify(datosLogin))
    .then((response)=>{

        if(response.data.usuario.length == 0){
            $("#errorLogin").show();
            $("#emailUsuario").val("");
            $("#claveUsuario").val("");
            $("#btnLogin").html("Ingresar");
            $("#btnLogin").attr("disabled", false);
        }
        else{
            mostrarInterfazSesionIniciada(response.data.usuario);
            $("#errorLogin").hide();
            $("#modalLogin").modal("hide");
        }
    });
}
function registrarColaborador()
{
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
                piso:$("#calle").val(),
                depto:$("#depto").val(),
                latitud:0,
                longitud:0,
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
        alert(response.data.message);
        if(response.data.resultado == 1){
            $("#modalRegistroColOrg").modal("hide");
            $("#msjResultadoRegistro").html("Registro exitoso!");
            $("#modalResultadoRegistro").modal("show");

            var datosLogin = {
                email: colaborador.emailUsuario,
                idGoogle: colaborador.tokenGoogle,
                pass:colaborador.claveUsuario
            };

            login(datosLogin);

        }
        else{
            $("#modalRegistroColOrg").modal("hide");
            $("#msjResultadoRegistro").html("Algo fallo, intentalo mas tarde");
            $("#modalResultadoRegistro").modal("show");

        }
        });
}

function agregarPaginacionListaOrganizaciones(){
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

function agregarPaginacionUsuarios(){
    $('.usuarios').after('<div id="navUsuarios"></div>');
    let usuario = document.querySelectorAll('.usuario')
    let filasMostradas = 2;
    let filasTotales = usuario.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navUsuarios').append('<a href="#" class="closeLink" rel="' + i + '">' + numPag + '</a> ');
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

function mostrarRegistrarseComoOrganizacion(){
    mostrarComo('organizacion')
}

function mostrarRegistrarseComoColaborador(){
    mostrarComo('colaborador')
}
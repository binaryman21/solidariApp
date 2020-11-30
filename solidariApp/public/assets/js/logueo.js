$(document).ready(function(){
    //Evento click del boton ingresar en el navbar
    $("#btnIngresar").click(function(){
        limpiarCamposLogin();
        $("#modoRegistro").val("ingresar"); //seteo el modalLogin en "ingreso"
        $("#btnLogin").html("Ingresar"); //cambio el nombre del boton del modalLogin a "ingresar"
        $("#tituloModalLogin").html("Ingresar a solidariApp"); //Seteo el titulo del modalLogin
    });
    //evento click del boton del modalLogin
    $("#btnLogin").click(clickBtnLogin);

    //evento click en el boton de cerrar sesion
    $("#btnCerrarSesion").click(cerrarSesion);
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


function login(datosLogin){
    axios.post("/login",JSON.stringify(datosLogin))
    .then((response)=>{
        if(response.data.usuario == null){
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

//puse un indicador para que isLoggedIn se encargue de la redireccion si se lo indica
function isLoggedIn({funcionSuccess = undefined, RedirectIfNot = false} = {})
{
    fetch("/isLoggedIn")
    .then(response => response.json())
    .then(data => {
        console.log( data.usuario );
        if(data.usuario != null)
        {
            mostrarInterfazSesionIniciada(data.usuario);
            if(funcionSuccess != undefined){
                funcionSuccess(data.usuario.idUsuario);
            }
        }
        else {

            $("#dropDownUsuario").hide();
            $("#btnIngresar").show();
            $("#botonesRegistro").show();
            if(RedirectIfNot) window.location = '/';
        }
    });
}

function mostrarInterfazSesionIniciada(usuario)
{
    $("#btnIngresar").hide();
    $("#dropDownUsuario").show();
    $("#botonesRegistro").hide();
    $("#imgPerfil").attr("src",usuario.urlFotoPerfilUsuario);
    // $("#mapa").removeClass("mapa");
    // $("#mapa").addClass("mapaExtendido");
    $("#btnVerMiPerfil").attr("href", `/cuenta-${usuario.rol.nombreRol}/perfil`);
    //asi estaba antes en las rutas que defini uso "/cuenta-rol/perfil", ademas "./"
    // concatenaria el path acutal con el que este en un href y si estas en tu perfil
    // y pulsas en  "tu perfil" devuevo iria a "/orgaizacion/organizacion" por ejemplo
    //dejo comentado lo anterio igual -> $("#btnVerMiPerfil").attr("href","./"+ usuario.rol.nombreRol);
    $("#btnAjustes").attr("href", `/cuenta-${usuario.rol.nombreRol}/ajustes`);
    $("#btnAjustes").removeClass('d-none');
    if( usuario.rol.nombreRol == 'administrador'){
        $("#btnAjustes").addClass('d-none');
    }
    $("#notificaciones").removeClass("d-none");
    cargarNotificaciones(usuario);
}

function signOut() {

    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

function cerrarSesion()
{
    signOut();
    axios.post("/logOut")
    .then((response)=>{
        window.location= "/";
    });
}

function onLoad() {

    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    let profile = googleUser.getBasicProfile();

    // The ID token you need to pass to your backend:
    let id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);
    let datosLogin = {
        email: profile.getEmail(),
        idGoogle: profile.getId(),
        pass:""
    };
    $("#btnLogin").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
    // $("#btnLogin").attr("disabled", true);

    axios.post("/login",JSON.stringify(datosLogin))
    .then((response)=>{

        //estaba con lenght, tiene que ser con null!
        if(response.data.usuario === null)
        {
            // Logica para cuando el usuario se registra con Google
            if( $("#modoRegistro").val() !== "ingresar" ){
                $("#idGoogle").val(profile.getId());
                $("#urlFotoPerfilUsuario").val(profile.getImageUrl());
                $("#emailUsuario").val(profile.getEmail());

                if($("#modoRegistro").val() == "colaborador"){
                    $("#nombreColaborador").val(profile.getGivenName());
                    $("#apellidoColaborador").val(profile.getFamilyName());
                    $("#modalRegistroColOrg").modal("show");
                }
                else if($("#modoRegistro").val() == "organizacion"){
                    $("#modalRegistroColOrg").modal("show");
                }
            }
            else{
                // Logica para cuando el usuario se loguea sin estar registrado
                alertify.error('No estas registrado!!');
                signOut();
            }
            $("#modalLogin").modal("hide");
        }
        else{
            $("#modalLogin").modal("hide");
            mostrarInterfazSesionIniciada(response.data.usuario);
        }
    });


}



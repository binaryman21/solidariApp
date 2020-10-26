// $(function () {
//     let btnLogin = $('#btnLogin');
//     let btnLoginGoogle = $('#btnLogin');

//     $(btnLogin).on('click', validarRegistroGoogle);


// });


function validarRegistroGoogle( e ) { 
    let contador = 0;
    validarEmail() ? contador++ : false; 
    validarPass() ? contador ++ : false;
    if( contador === 2 ){
        return true;
    }
    return false;
}

function validarRegistroColaborador( e ){
    let contador = 0;
    validarNombre() ? contador++ : false;
    validarApellido() ? contador++ : false;
    validarTelefono() ? contador++ : false;
    validarDireccion() ? contador++ : false;
    if( contador === 4 ){
        return true;
    }
    return false;
}

function validarRegistroOrganizacion( e ){
    let contador = 0;
    validarNombreOrganizacion() ? contador++ : false;
    validarTipoOrganizacion() ? contador++ : false;
    validarTelefono() ? contador++ : false;
    validarDireccion() ? contador++ : false;
    if( contador === 4 ){
        return true;
    }
    return false;
}

function validarEmail(){
    let email = $('#emailUsuario');
    let error = $('.errorEmail');

    let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.val() === ''){
        mostrarError( email, error, 'Ingrese un email.');
        return false;
    }
    else if(!regEx.test(email.val())){
        mostrarError( email, error, 'Ingrese un email valido.');
        return false;
    }
    else if(email.val().length>120){
        mostrarError( email, error, 'La longitud del email no puede superar los 120 caracteres.');
        return false;
    }
    quitarError( email, error );
    return true;

}


function validarPass() {
    let pass = $('#claveUsuario');
    let error = $('.errorPass');

    if(pass.val() === ''){
        mostrarError( pass, error, 'Ingrese una contraseña.');
        return false;
    }
    else if(pass.val().length < 8){
        mostrarError( pass, error, 'La longitud de la contraseña debe ser como minimo de 8 caracteres.');
        return false;
    }
    else if( !pass.val().match(/[a-z]/g) || !pass.val().match(/[A-Z]/g) || !pass.val().match(/[0-9]/g) || !pass.val().match( /[^a-zA-Z\d]/g) ){
        mostrarError( pass, error, 'La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial.');
        return false;
    }
    quitarError( pass, error );
    return true;
}


function validarNombre()
{
    let nombreColaborador = $("#nombreColaborador");
    let error = $('.errorNombre');

    let regEx = /[A-Za-zÁÉÍÓÚñáéíóúÑ\s]/;

    if( nombreColaborador.val() === ''){
        mostrarError( nombreColaborador, error, 'Ingrese un nombre.');
        return false;
    }
    else if( !regEx.test( nombreColaborador.val() ) ){
        mostrarError( nombreColaborador, error, 'Ingrese un nombre valido.');
        return false;
    }
    else if(nombreColaborador.val().length < 3){
        mostrarError( nombreColaborador, error, 'Ingrese un nombre con una longitud mayor a 2 caracteres.');
        return false;
    }
    else if(nombreColaborador.val().length > 30){
        mostrarError( nombreColaborador, error, 'Ingrese un nombre con una longitud menor a 30 caracteres.');
        return false;
    }
    quitarError( nombreColaborador, error );
    return true;
}

function validarNombreOrganizacion()
{
    let nombreOrganizacion = $("#nombreOrganizacion");
    let error = $('.errorNombreOrg');

    let regEx = /[A-Za-zÁÉÍÓÚñáéíóúÑ\s]/;

    if( nombreOrganizacion.val() === ''){
        mostrarError( nombreOrganizacion, error, 'Ingrese un nombre.');
        return false;
    }
    else if( !regEx.test( nombreOrganizacion.val() ) ){
        mostrarError( nombreOrganizacion, error, 'Ingrese un nombre valido.');
        return false;
    }
    else if(nombreOrganizacion.val().length < 3){
        mostrarError( nombreOrganizacion, error, 'Ingrese un nombre con una longitud mayor a 2 caracteres.');
        return false;
    }
    else if(nombreOrganizacion.val().length > 30){
        mostrarError( nombreOrganizacion, error, 'Ingrese un nombre con una longitud menor a 30 caracteres.');
        return false;
    }
    quitarError( nombreOrganizacion, error );
    return true;
}


function validarApellido()
{
    let apellidoColaborador = $("#apellidoColaborador");
    let error = $('.errorApellido');

    let regEx = /[A-Za-zÁÉÍÓÚñáéíóúÑ\s]/;

    if( apellidoColaborador.val() === ''){
        mostrarError( apellidoColaborador, error, 'Ingrese un apellido.');
        return false;
    }
    else if( !regEx.test( apellidoColaborador.val() ) ){
        mostrarError( apellidoColaborador, error, 'Ingrese un apellido valido.');
        return false;
    }
    else if(apellidoColaborador.val().length < 3){
        mostrarError( apellidoColaborador, error, 'Ingrese un apellido con una longitud mayor a 2 caracteres.');
        return false;
    }
    else if(apellidoColaborador.val().length > 30){
        mostrarError( apellidoColaborador, error, 'Ingrese un apellido con una longitud menor a 30 caracteres.');
        return false;
    }
    quitarError( apellidoColaborador, error );
    return true;
}


function validarTelefono(){
    let contador = 0;
    validarCodigoArea() ? contador++ : false; 
    validarNroTelefono() ? contador ++ : false;
    if( contador === 2 ){
        return true;
    }
    return false;
}

// CODIGO DE AREA
function validarCodigoArea(){
    let codArea = $("#codArea");
    let errorCod = $('.errorCodArea');

    let regEx = /^[0-9]+$/;

    if( codArea.val() === ''){
        mostrarError( codArea, errorCod, 'Ingrese un codigo de area.');
        return false;
    }
    else if( !regEx.test( codArea.val() ) ){
        mostrarError( codArea, errorCod, 'Ingrese un codigo de area valido.');
        return false;
    }
    else if(codArea.val().length < 2){
        mostrarError( codArea, errorCod, 'Ingrese un codigo de area con una longitud mayor a 1 digito.');
        return false;
    }
    else if(codArea.val().length > 4){
        mostrarError( codArea, errorCod, 'Ingrese un codigo de area con una longitud menor a 4 digitos.');
        return false;
    }
    quitarError( codArea, errorCod );
    return true;
}


// NUMERO DE TELEFONO
function validarNroTelefono(){

    let nroTelefono = $("#numeroTelefono");
    let errorNro = $('.errorNroTelefono');

    let regEx = /^[0-9]+$/;

    if( nroTelefono.val() === ''){
        mostrarError( nroTelefono, errorNro, 'Ingrese un numero de telefono.');
        return false;
    }
    else if( !regEx.test( nroTelefono.val() ) ){
        mostrarError( nroTelefono, errorNro, 'Ingrese un numero de telefono valido.');
        return false;
    }
    else if(nroTelefono.val().length < 8){
        mostrarError( nroTelefono, errorNro, 'Ingrese un numero de telefono con una longitud de almenos 8 digitos.');
        return false;
    }
    else if(nroTelefono.val().length > 10){
        mostrarError( nroTelefono, errorNro, 'Ingrese un numero de telefono con una longitud menor a 11 digitos.');
        return false;
    }

    quitarError( nroTelefono, errorNro );
    return true;
}

function validarDireccion(){
    let contador = 0;
    validarCalle() ? contador++ : false; 
    validarNroCalle() ? contador ++ : false;
    validarProvincia() ? contador ++ : false;
    validarLocalidad() ? contador ++ : false;
    if( contador === 4 ){
        return true;
    }
    return false;
}


function validarCalle(){
    let calle = $("#calle");
    let error = $('.errorCalle');

    if( calle.val() === '' ){
        mostrarError( calle, error, 'Ingrese una calle.');
        return false;
    }

    quitarError( calle, error );
    return true;
}

function validarNroCalle(){
    let nroCalle = $("#numero");
    let error = $('.errorNro');

    let regEx = /^[0-9]+$/;

    if( nroCalle.val() === '' ){
        mostrarError( nroCalle, error, 'Ingrese un numero de calle.');
        return false;
    }
    else if( !regEx.test( nroCalle.val() ) ){
        mostrarError( nroCalle, error, 'Ingrese un numero de calle valido.');
        return false;
    }

    quitarError( nroCalle, error );
    return true;
}


function validarProvincia(){
    let provincia = $('#selectProvincia');
    let error = $('.errorProvincia');

    if( provincia.val() === null ){
        mostrarError( provincia, error, 'Seleccione una provincia.');
        return false;
    }

    quitarError( provincia, error );
    return true;
}

function validarLocalidad(){
    let localidad = $('#selectLocalidad');
    let error = $('.errorLocalidad');

    if( localidad.val() === null ){
        mostrarError( localidad, error, 'Seleccione una localidad.');
        return false;
    }

    quitarError( localidad, error );
    return true;
}

function validarTipoOrganizacion(){
    let tipoOrg = $('#selectTipoOrganizacion');
    let error = $('.errorTipoOrg');

    if( tipoOrg.val() === null ){
        mostrarError( tipoOrg, error, 'Seleccione una tipo de organizacion.');
        return false;
    }

    quitarError( tipoOrg, error );
    return true;
}

function mostrarError( campo, nombreError, texto ){
    nombreError.text( texto );
    nombreError.fadeIn();
    campo.addClass('is-invalid');
}

function quitarError( campo, nombreError ){
    nombreError.fadeOut();
    campo.removeClass('is-invalid');
    campo.addClass('is-valid');
}









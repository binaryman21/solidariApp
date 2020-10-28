// $(function () {
//     let btnLogin = $('#btnLogin');
//     let btnLoginGoogle = $('#btnLogin');

//     $(btnLogin).on('click', validarRegistroGoogle);


// });

function validarLogin(){
    let contador = 0;

    let email = $('#emailUsuario');
    let errorEmail = $('.errorEmail');
    let pass = $('#claveUsuario');
    let errorPass = $('.errorPass');

    validarEmail( email, errorEmail ) ? contador++ : false; 
    validarPassLogin( pass, errorPass ) ? contador ++ : false;

    if( contador === 2 ){
        return true;
    }
    return false;
}

function validarRegistroGoogle( e ) { 
    let contador = 0;

    let email = $('#emailUsuario');
    let errorEmail = $('.errorEmail');
    let pass = $('#claveUsuario');
    let errorPass = $('.errorPass');

    validarEmail( email, errorEmail ) ? contador++ : false; 
    validarPass( pass, errorPass ) ? contador ++ : false;

    if( contador === 2 ){
        return true;
    }
    return false;
}

function validarRegistroColaborador( e ){
    let contador = 0;

    let nombreColaborador = $("#nombreColaborador");
    let errorNombre = $('.errorNombre');
    let apellidoColaborador = $("#apellidoColaborador");
    let errorApellido = $('.errorApellido');

    validarNombre( nombreColaborador, errorNombre ) ? contador++ : false;
    validarApellido( apellidoColaborador, errorApellido ) ? contador++ : false;
    validarTelefono() ? contador++ : false;
    validarDireccion() ? contador++ : false;
    if( contador === 4 ){
        return true;
    }
    return false;
}

function validarRegistroOrganizacion( e ){
    let contador = 0;

    let nombreOrganizacion = $("#nombreOrganizacion");
    let errorNombreOrg = $('.errorNombreOrg');
    let tipoOrg = $('#selectTipoOrganizacion');
    let errorTipoOrg = $('.errorTipoOrg');

    validarNombreOrganizacion( nombreOrganizacion, errorNombreOrg ) ? contador++ : false;
    validarTipoOrganizacion( tipoOrg, errorTipoOrg ) ? contador++ : false;
    validarTelefono() ? contador++ : false;
    validarDireccion() ? contador++ : false;
    if( contador === 4 ){
        return true;
    }
    return false;
}

function validarEmail( email, error ){

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


function validarPass( pass, error ) {
    
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

function validarPassLogin( pass, error ) {
    
    if(pass.val() === ''){
        mostrarError( pass, error, 'Ingrese una contraseña.');
        return false;
    }
    quitarError( pass, error );
    return true;
}


function validarNombre( nombreColaborador, error )
{
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

function validarNombreOrganizacion( nombreOrganizacion, error )
{
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


function validarApellido( apellidoColaborador, error )
{
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

    let codArea = $("#codArea");
    let errorCod = $('.errorCodArea');
    let nroTelefono = $("#numeroTelefono");
    let errorNro = $('.errorNroTelefono');

    validarCodigoArea( codArea, errorCod ) ? contador++ : false; 
    validarNroTelefono( nroTelefono, errorNro ) ? contador ++ : false;
    if( contador === 2 ){
        return true;
    }
    return false;
}

// CODIGO DE AREA
function validarCodigoArea( codArea, errorCod ){
    
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
function validarNroTelefono( nroTelefono, errorNro ){

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

    let calle = $("#calle");
    let errorCalle = $('.errorCalle');
    let nroCalle = $("#numero");
    let errorNroCalle = $('.errorNro');
    let provincia = $('#selectProvincia');
    let errorProvincia = $('.errorProvincia');
    let localidad = $('#selectLocalidad');
    let errorLocalidad = $('.errorLocalidad');

    validarCalle( calle, errorCalle ) ? contador++ : false; 
    validarNroCalle( nroCalle, errorNroCalle ) ? contador ++ : false;
    validarProvincia( provincia, errorProvincia ) ? contador ++ : false;
    validarLocalidad( localidad, errorLocalidad ) ? contador ++ : false;
    if( contador === 4 ){
        return true;
    }
    return false;
}


function validarCalle( calle, error ){
    
    if( calle.val() === '' ){
        mostrarError( calle, error, 'Ingrese una calle.');
        return false;
    }

    quitarError( calle, error );
    return true;
}

function validarNroCalle( nroCalle, error ){
    
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


function validarProvincia( provincia, error ){
    
    if( provincia.val() === null ){
        mostrarError( provincia, error, 'Seleccione una provincia.');
        return false;
    }

    quitarError( provincia, error );
    return true;
}

function validarLocalidad( localidad, error ){
    
    if( localidad.val() === null ){
        mostrarError( localidad, error, 'Seleccione una localidad.');
        return false;
    }

    quitarError( localidad, error );
    return true;
}

function validarTipoOrganizacion( tipoOrg, error ){

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









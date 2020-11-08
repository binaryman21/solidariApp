$(function () {
    $('#btnConfirmarPassNuevo').on('click', cambiarPassWord);
});

function cambiarPassWord( e ){
    e.preventDefault();
    if ( validarClavesCambio() ){
        isLoggedIn( cambiarPass );
        console.log('enviooo');
    } 
    
    function cambiarPass( idUsuario ){
        let datosClaves = {
            idUsuario,
            claveVieja: $('#claveVieja').val(),
            claveNueva: $('#claveNueva').val(),
        }
        console.log( datosClaves );
        axios.post("/cambiarClave",datosClaves)
        .then((response)=>{
            if ( response.data.resultado ){
                alertify.success( response.data.message )
            }
            else{
                alertify.error( response.data.message )
            }
            limpiarValidaciones($('#claveVieja'), $('#errorClaveVieja'))
            $('#claveVieja').val('')
            limpiarValidaciones($('#claveNueva'), $('#errorClaveNueva'))
            $('#claveNueva').val('');
            limpiarValidaciones($('#confirmacionClaveNueva'), $('#errorClaveNuevaConfirmacion'))
            $('#confirmacionClaveNueva').val('');
            $('#modalCambiarPass').modal('hide');
        });
    }
}


$(function () {
    cargarMotivosDenuncia();
    //cambiarPass
    $('#btnConfirmarPassNuevo').on('click', cambiarPassWord);
    //denunciar
    $('#btnConfirmarReporte').on('click', reportar);
    //dar de baja
    $('#btnConfirmarDarmeDeBaja').on('click', bajaUsuario);
    //select provincia
    $("#selectProvincia").change(function(){
        let idProvincia = $("#selectProvincia").val();
        $("#selectLocalidad").html("");
        listarLocalidades(idProvincia,1);
    });
})


function cambiarPassWord( e ){
    e.preventDefault();
    if ( validarClavesCambio() ){
        cambiarPass ();
    }
}

function cambiarPass( ){
    let datosClaves = {
        idUsuario:0,
        claveVieja: $('#claveVieja').val(),
        claveNueva: $('#claveNueva').val(),
    }
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


function cargarMotivosDenuncia(){
    $('#motivoReporte').html('')
    axios.get("/getMotivos")
        .then((response)=>{
            let motivos = response.data.motivos;
            motivos.forEach(motivo => {
                let optionMotivo = document.createElement('option');
                optionMotivo.value = motivo.idMotivoDenuncia;
                optionMotivo.textContent = motivo.descripcionMotivoDenuncia;
                $('#motivoReporte').append( optionMotivo );
            });
        })
    // $('#motivoReporte');

}

/*Dar de baja el usuario logeado*/
function bajaUsuario()
{
     axios.post("/bajaUsuario")
    .then((response)=>{
        if(response.data.resultado === 1 ){
           /*Redireccionar a pagina principal*/
           document.location.href="/";
        }else{
            /*Ocurrio un error*/
            alert("Ocurrio un error inesperado.");
            console.log(response.data.message);
        }
    });
}

function reportar( e ){
    e.preventDefault();
    if( validarDenuncia() ){
        confirmarReporte ();
    }
}

function confirmarReporte( ){
    let datosReporte = {
        idDenunciante: 0,
        idDenunciado: $("#inpIdDenunciado").val(),
        fecha: $('#fechaIncidente').val(),
        motivo: $('#motivoReporte option:selected').val(),
        descripcion: $('#textoDescripcion').val()
    }
    if (!datosReporte.idDenunciado){
        datosReporte.idDenunciado = $(location).attr('href').split("/")[4];
    }
    // console.log( datosReporte.idDenunciado );
    axios.post("/altaDenuncia",datosReporte)
    .then((response)=>{
        if ( response.data.resultado ){
            alertify.success( response.data.message )
        }
        else{
            alertify.error( response.data.message )
        }
        limpiarValidaciones($('#fechaIncidente'), $('#errorFechaIncidente'))
        $('#fechaIncidente').val('')
        limpiarValidaciones($('#motivoReporte'), $('#errorMotivoReporte'))
        $('#textoDescripcion').val('');
        limpiarValidaciones($('#textoDescripcion'), $('#errorTextoDescripcion'))
        $('#modalReportar').modal('hide');
    });
}

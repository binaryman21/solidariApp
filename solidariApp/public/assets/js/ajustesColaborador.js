document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({funcionSuccess: configurarCuentaDelColaborador, RedirectIfNot: true});
})

function configurarCuentaDelColaborador(idUsuario){

    
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

        axios.post("/actualizarDomicilio",domicilio)
        .then((response)=>{
            var piso = "Piso";
            var depto = "Depto";

            if(domicilio.piso == '') piso = '';
            if(domicilio.depto == '') depto = '';

            $("#btnGuardarDomicilio").html('Guardar');
            $("#domicilio" + domicilio.idDomicilio).html(`<p class = "m-1 domicilioInfo1">` + domicilio.calle + ` ` + domicilio.numero + ` ` + piso + ` ` + domicilio.piso + ` ` + depto + ` ` + domicilio.depto + `</p>
            <p class = "m-1">` + domicilio.nombreLocalidad + `, ` + domicilio.nombreProvincia + `</p>`);

            $("#btnEditarDomicilio"+ domicilio.idDomicilio).click(function(){
                cargarDatosModalDomicilio(domicilio);
            });
        });
        limpiarDomicilio();
    })
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
    if( validarTelefono('') ){
        
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
            $('.tacho').removeClass('d-none');
        });
    }
}

/*Dar de baja el usuario logeado*/
function bajaUsuario()
{
     axios.post("/bajaUsuario")
    .then((response)=>{
        if(response.data.resultado === 1 ){
           console.log(response.data.message);

        }else{
            /*Ocurrio un error*/
            alert("Ocurrio un error inesperado.");
            console.log(response.data.message);
        }
    });

}
$(function () {
    $('#aceptarSubscribirse').on('click', suscribirse);
});

function suscribirse( e ){
    e.preventDefault();
    let datosSuscripcion = {
        idColaborador: 0,
        idOrganizacion: $(location).attr('href').split("/")[4],
    }
    console.log( datosSuscripcion );
    axios.post("/registrarSuscripcion",datosSuscripcion)
    .then((response)=>{
        if ( response.data.resultado ){
            alertify.success( response.data.message )
        }
        else{
            alertify.error( response.data.message )
        }
        $('#modalSuscribirse').modal('hide');
    });
}
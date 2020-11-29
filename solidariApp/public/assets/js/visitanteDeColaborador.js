document.addEventListener('DOMContentLoaded', () => {

    //Obtengo la url para saber el id de organizacion
    var url = $(location).attr('href').split("/");
    //alert(url);
    if(url.length == 5 && url[4] != "" && !isNaN(url[4])){
       isLoggedIn();
        getColaborador(url[4],1);
    }
    else if(url.length == 4 || (url.length == 5 && url[4] == "")){
       isLoggedIn(getColaborador);
    }
    else{
        window.location = "/";
    }
})

function getColaborador(idUsuario){

    axios.get("/getColaborador/"+idUsuario)
    .then((response)=>{
        var colaborador = response.data.colaborador;
        $("#nombreColaborador").html(colaborador.nombreColaborador + " " + colaborador.apellidoColaborador);
        $("#imgPerfilColaborador").attr("src",colaborador.urlFotoPerfilUsuario);
        $("#correo").html(colaborador.emailUsuario);
        $("#fechaAltaUsuario").html(colaborador.fechaAltaUsuario);

        $.each(response.data.domicilios, function (indexInArray, domicilio) {

            var piso = (domicilio.piso != '') ? `, Piso ${domicilio.piso}` : '';
            var depto = (domicilio.depto != '') ? `, Depto ${domicilio.depto}` : '';

            $("#listadoDomicilios").html("");
            $("#listadoDomicilios").append(`
                <li class="list-group-item px-0 py-1" id="domicilio${domicilio.idDomicilio}">
                    <p class="m-1">${domicilio.calle} ${domicilio.numero}${piso}${depto}</p>
                    <p class="m-1">${domicilio.nombreLocalidad}, ${domicilio.nombreProvincia}</p>
                </li>`
            );
        });
        $("#listadoTelefonos").html("");
        $.each(response.data.telefonos, function (indexInArray, telefono) {
            $.each(response.data.telefonos, function (indexInArray, telefono) {
                $("#listadoTelefonos").append(`
                    <li class="list-group-item px-0 py-1" id="telefono${telefono.idTelefono}">
                        <p class="m-1">${telefono.codAreaTelefono} - ${telefono.numeroTelefono}</p>
                    </li>`
                );
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    //Obtengo la url para saber el id de colaborador
    var id = +location.pathname.slice('/colaborador/'.length);
    isLoggedIn();
    getColaborador(id);
})

function getColaborador(idUsuario){

    axios.get("/getColaborador/"+idUsuario)
    .then((response)=>{
        var colaborador = response.data.colaborador;
        $("#nombreColaborador").html(colaborador.nombreColaborador + " " + colaborador.apellidoColaborador);
        $("#imgPerfilColaborador").attr("src",colaborador.urlFotoPerfilUsuario);
        $("#correo").html(colaborador.emailUsuario);
        $("#fechaAltaUsuario").html(`Usuario desde el ${moment(colaborador.fechaAltaUsuario, "YYYY-MM-DD HH:mm:ss").format('LL')}`);
        agregarContacto(response.data);
    });
}

function agregarContacto(contacto){


    $("#correo").html(contacto.colaborador.emailUsuario);

    var $listaDomicilios = $('#listadoDomicilios');
    if(contacto.domicilios && contacto.domicilios.length){

        var $domiciliosFragment = $(document.createDocumentFragment());
        $.each(contacto.domicilios, function (indexInArray, domicilio) {

            var piso = (domicilio.piso != '') ? `, Piso ${domicilio.piso}` : '';
            var depto = (domicilio.depto != '') ? `, Depto ${domicilio.depto}` : '';

            $domiciliosFragment.append(`
                <li class="list-group-item px-0 py-1" id="domicilio${domicilio.idDomicilio}">
                    <p class="m-1">${domicilio.calle} ${domicilio.numero}${piso}${depto}</p>
                    <p class="m-1">${domicilio.nombreLocalidad}, ${domicilio.nombreProvincia}</p>
                </li>`
            );
        });

        $listaDomicilios.html($domiciliosFragment);
    }
    else $listaDomicilios.html('<p class="mb-2">No hay domicilios registrados</p>');

    var $listadoTelefonos = $("#listadoTelefonos");
    if(contacto.telefonos && contacto.telefonos.length){

        var $telefonosFragment = $(document.createDocumentFragment())
        $.each(contacto.telefonos, function (indexInArray, telefono) {
            $telefonosFragment.append(`
                <li class="list-group-item px-0 py-1" id="telefono${telefono.idTelefono}">
                    <p class="m-1">${telefono.codAreaTelefono} - ${telefono.numeroTelefono}</p>
                </li>`
            );
        });

        $listadoTelefonos.html($telefonosFragment);
    }
    else $listadoTelefonos.html('<p class="mb-2">No hay telefonos registrados</p>');

    $("#btn-contacto").toggleClass('d-none');
}

function capitalize(text){

    let FirstLetterCap = text[0].toUpperCase();
    return FirstLetterCap+text.slice(1);
}
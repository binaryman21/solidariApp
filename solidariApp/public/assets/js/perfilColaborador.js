document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({funcionSuccess: getColaborador, RedirectIfNot: true});
});

function getColaborador(idUsuario){

    axios.get("/getColaborador/"+idUsuario)
    .then((response)=>{
        var colaborador = response.data.colaborador;
        $("#nombreColaborador").html(colaborador.nombreColaborador + " " + colaborador.apellidoColaborador);
        $("#imgPerfilColaborador").attr("src",colaborador.urlFotoPerfilUsuario);
        $("#correo").html(colaborador.emailUsuario);
        $("#fechaAltaUsuario").html(colaborador.fechaAltaUsuario);
       
        agregarContacto(response.data);
        listarColaboraciones(idUsuario);
        cargarInsignias(idUsuario);
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

function listarColaboraciones ( idUsuario  ){

    fetch(`/getColaboracionesPorUsuario/${idUsuario}`)
    .then(response => response.json())
    .then(data => {

        data.colaboraciones.forEach(colaboracion => {
            
            crearCardColaboracion(colaboracion);
        })
        agregarPaginacionColaboraciones();
    })
}

// MOSTRAR LAS COLABORACIONES
function crearCardColaboracion( colaboracion )
{
    let cardColaboracion =
    `<div id="colaboracion${colaboracion.idColaboracion}">
        <div class="card necesidad ${colaboracion.nombreCategoria.toLowerCase()}">
            <div class="card-body">
                <p class="text-right">Colaboro el dia: ${colaboracion.fechaColaboracion}</p>
                <div class="row">
                    <div class="col-md-3">
                        <img class="rounded-circle imgNecesidad" src="${colaboracion.urlFotoPerfilUsuario}" alt="img usr">
                    </div>
                    <div class="col-md-9">
                        <p class="card-text h5">${colaboracion.nombreCategoria}</p>
                        <p class="mt-2">${colaboracion.descripcionNecesidad}</p>
                    </div>
                </div>
                <h5 class="card-title"><a href="/organizacion/${colaboracion.idUsuario}">${colaboracion.razonSocial}</a></h5>
            </div>
        </div>
    </div>`;
    $("#colaboraciones").append(cardColaboracion);
}

function agregarPaginacionColaboraciones() {
    $('.necesidades').after('<div id="navNecesidades"></div>');
    let necesidad = document.querySelectorAll('.necesidad')
    let filasMostradas = 4;
    let filasTotales = necesidad.length;

    let numPaginas = filasTotales / filasMostradas;
    for (i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navColaboracopnes').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $(necesidad).hide();
    $(necesidad).slice(0, filasMostradas).show();
    $('#navNecesidades a:first').addClass('active');
    $('#navNecesidades a').bind('click', function () {
        $('#navNecesidades a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $(necesidad).css('opacity', '0.0').hide().slice(primerItem, ultimoItem).
            css('display', 'block').animate({ opacity: 1 }, 300);
    });
}

function capitalize(text){

    let FirstLetterCap = text[0].toUpperCase();
    return FirstLetterCap+text.slice(1);
}
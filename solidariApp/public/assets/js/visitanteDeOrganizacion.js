document.addEventListener('DOMContentLoaded', () => {

    //Obtengo la url para saber el id de organizacion
    var url = $(location).attr('href').split("/");
    //alert(url);
    if(url.length == 5 && url[4] != "" && !isNaN(url[4])){
       isLoggedIn();
       getOrganizacion(url[4],1);

    }
    else if(url.length == 4 || (url.length == 5 && url[4] == "")){
       isLoggedIn(getOrganizacion);

    }
    else{
        window.location = "/";
    }
})

function getOrganizacion(idUsuario){

    axios.get("/getOrganizacion/"+idUsuario)
    .then((response)=>{

        let organizacion = response.data.organizacion;
        $("#nombreOrganizacion").html(organizacion.razonSocial);
        $("#tipoOrganizacion").html(organizacion.nombreTipoOrganizacion);
        $("#urlFotoPerfilOrganizacion").attr("src",organizacion.urlFotoPerfilUsuario);
        $("#correo").html(organizacion.emailUsuario);
        if(organizacion.descripcionOrganizacion == "")
        {
            organizacion.descripcionOrganizacion = "La organización no ha especificado ninguna descripción todavia";
        }

        $("#descripcionOrganizacion").html(organizacion.descripcionOrganizacion);
        $("#fechaAltaUsuario").html(organizacion.fechaAltaUsuario);

        var $listaDomicilios = $('#listadoDomicilios');
        if(response.data.domicilios && response.data.domicilios.length){

            var $domiciliosFragment = $(document.createDocumentFragment());
            $.each(response.data.domicilios, function (indexInArray, domicilio) {

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
        if(response.data.telefonos && response.data.telefonos.length){

            var $telefonosFragment = $(document.createDocumentFragment())
            $.each(response.data.telefonos, function (indexInArray, telefono) {
                $telefonosFragment.append(`
                    <li class="list-group-item px-0 py-1" id="telefono${telefono.idTelefono}">
                        <p class="m-1">${telefono.codAreaTelefono} - ${telefono.numeroTelefono}</p>
                    </li>`
                );
            });

            $listadoTelefonos.html($telefonosFragment);
        }
        else $listadoTelefonos.html('<p class="mb-2">No hay telefonos registrados</p>');

        cargarNecesidades(idUsuario);
    });
}

function cargarNecesidades ( idUsuario){
    fetch(`/listarNecesidades/${idUsuario}`)
    .then(response => response.json())
    .then(data => {

        let necesidades = data.necesidades;

        let divNecesidades = $('.necesidades');
        necesidades.forEach(need => {

            if(need.fechaBajaNecesidad == null){

                let cardNeed = 
                `<div class="card need ${need.nombreCategoria.toLowerCase()}" id="necesidad${need.idNecesidad}">
                    <div class="card-body py-2">
                        <h6 class="card-title mb-n1">${capitalize(need.nombreCategoria)}</h6>
                        <small class="card-subtitle text-muted font-weight-light">${capitalize(moment(need.fechaCreacionNecesidad, "YYYY-MM-DD HH:mm:ss").startOf('day').fromNow())} - En progreso</small>
                        <div class="card-text mt-2 text-muted">
                            <p class="font-weight-lighter">${capitalize(need.descripcionNecesidad)}</p>
                            <small>Cantidad: ${need.cantidadNecesidad}</small>
                         </div>
                    </div>
                    <div class="card-footer py-0 d-flex justify-content-between align-items-center">
                        <small class="text-muted ">Fecha limite: ${ new Date(need.fechaLimiteNecesidad).toLocaleDateString('es-AR')}</small>
                        <a href="#" data-toggle="modal" data-target="#modalDetalleNecesidad" id="btnDetalleNecesidad${need.idNecesidad}" class="text-black-50">
                            <span class="nroAyudas">${need.colaboraciones_count ? need.colaboraciones_count : 0}</span> 
                            <i class="fas fa-user-friends fa-sm"></i>
                        </a>
                    </div>
                </div>`;
                divNecesidades.append(cardNeed);
            }
        })
        agregarPaginacionNecesidades();
    })
}

function agregarPaginacionNecesidades(){

    $('#navNecesidades').remove();
    $('.necesidades').after('<div id="navNecesidades"></div>');
    let necesidad = document.querySelectorAll('.need')
    let filasMostradas = 4;
    let filasTotales = necesidad.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navNecesidades').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $( necesidad ).hide();
    $( necesidad ).slice(0, filasMostradas).show();
    $('#navNecesidades a:first').addClass('active');
    $('#navNecesidades a').bind('click', function(){
        $('#navNecesidades a').removeClass('active');
        $(this).addClass('active');

        let pagActual = $(this).attr('rel');

        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( necesidad ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({funcionSuccess: getOrganizacion, RedirectIfNot: true});
})

function getOrganizacion(idUsuario){

    axios.get("/getOrganizacion/"+idUsuario)
    .then((response)=>{

        let organizacion = response.data.organizacion;
        $("#nombreOrganizacion").html(organizacion.razonSocial);
        $("#tipoOrganizacion").html(organizacion.nombreTipoOrganizacion);
        $("#urlFotoPerfilOrganizacion").attr("src",organizacion.urlFotoPerfilUsuario);
        if(organizacion.descripcionOrganizacion == "")
        {
            organizacion.descripcionOrganizacion = "La organización no ha especificado ninguna descripción todavia";
        }

        $("#descripcionOrganizacion").html(organizacion.descripcionOrganizacion);
        $("#fechaAltaUsuario").html(`Usuario desde el ${moment(organizacion.fechaAltaUsuario, "YYYY-MM-DD HH:mm:ss").format('LL')}`);
        agregarModalContacto(response.data);
        cargarNecesidades(idUsuario);
    });

}

function cargarNecesidades ( idUsuario){

    fetch(`/listarNecesidades/${idUsuario}`)
    .then(response => response.json())
    .then(data => {

        let necesidades = data.necesidades;
        let divNecesidadesEnProgreso = $('#necesidadesEnProgreso');
        let divNecesidadesFinalizadas = $('#necesidadesFinalizadas');

        if(necesidades != null || necesidades.length>0){

            necesidades.forEach(need => {

                let cardNeed = 
                `<div class="card need ${need.nombreCategoria.toLowerCase()} ${need.fechaBajaNecesidad==null ? 'inprogress':'finished'}" id="necesidad${need.idNecesidad}">
                    <div class="card-body py-2">
                        <h6 class="card-title mb-n1">${capitalize(need.nombreCategoria)}</h6>
                        <small class="card-subtitle text-muted font-weight-light">Creada hace ${capitalize(moment(need.fechaCreacionNecesidad, "YYYY-MM-DD HH:mm:ss").startOf('day').fromNow())} - ${need.fechaBajaNecesidad==null ? 'En progreso':'Finalizado'}</small>
                        <div class="card-text mt-2 text-muted">
                            <p>${capitalize(need.descripcionNecesidad)}</p>
                            <small text-black-50>Cantidad: ${need.cantidadNecesidad}</small>
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

                if(need.fechaBajaNecesidad==null) divNecesidadesEnProgreso.append(cardNeed);
                else divNecesidadesFinalizadas.append(cardNeed);
            })

            agregarPaginacionNecesidades();
        }
        else divNecesidades.text('Esta organizacion no tiene necesidades publicadas');

        $("#btnNuevaNecesidad").click(function(){

            limpiarValidaciones($("#inpFechaLimite"),  $("#errorFechaLimite") );
            limpiarValidaciones($("#slctCategoria"), $("#errorCategoria"));
            limpiarValidaciones($("#inpCantidad"), $("#errorCantidad"));
            limpiarValidaciones($("#txtDescripcion"), $("#errorDescripcion"));
            document.getElementById("formEditarNecesidad").reset();
            $("#modalEditarNecesidad .modal-content").removeClass($("#categoriaActual").val());
            $("#btnGuardarCambiosNecesidad").unbind( "click" );
            $("#btnGuardarCambiosNecesidad").click(function(e){
                e.preventDefault();
                if( validarNecesidad() ){
                    bloquearBoton($("#btnGuardarCambiosNecesidad"));
                    registrarNecesidad(idUsuario);
                }
            });
        });
    })
}

function agregarPaginacionNecesidades(){

    let $necesidadesEnProgreso = $('#necesidadesEnProgreso');
    let $necesidadesFinalizadas = $('#necesidadesFinalizadas');

    $necesidadesEnProgreso.append('<div id=navNecesidadesEnProgreso></div>');
    $necesidadesFinalizadas.append('<div id=navNecesidadesFinalizadas></div>');

    let $navEnProgreso = $('#navNecesidadesEnProgreso');
    let $navFinalizadas = $('#navNecesidadesFinalizadas');

    let enprogreso = document.querySelectorAll('.need.inprogress');
    let finalizadas = document.querySelectorAll('.need.finished');

    let filasMostradas = 4;
    let filasTotalesEnProgeso = enprogreso.length;
    let filasTotalesFinalizadas = finalizadas.length;

    let numPaginasEnProgreso = filasTotalesEnProgeso/filasMostradas;
    let numPaginasFinalizadas = filasTotalesFinalizadas/filasMostradas;
    
    for(i = 0; i < numPaginasEnProgreso; i++) {

        let numPag = i + 1;
        let pagRel = `<a href="JavaScript:Void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
        $navEnProgreso.append(pagRel);
    }

    for(i = 0; i < numPaginasFinalizadas; i++) {

        let numPag = i + 1;
        let pagRel = `<a href="JavaScript:Void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
        $navFinalizadas.append(pagRel);
    }

    $(enprogreso).hide();
    $(enprogreso).slice(0, filasMostradas).show();

    $(finalizadas).hide();
    $(finalizadas).slice(0, filasMostradas).show();
    $navEnProgreso.find('a').bind('click', function(){

        $navEnProgreso.find('a').removeClass('active');
        $(this).addClass('active');

        let pagActual = $(this).attr('rel');

        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $(enprogreso).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });

    $navFinalizadas.find('a').bind('click', function(){

        $navFinalizadas.find('a').removeClass('active');
        $(this).addClass('active');

        let pagActual = $(this).attr('rel');

        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $(finalizadas).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });

}

function agregarModalContacto(contacto){

    $("#correo").html(contacto.organizacion.emailUsuario);

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
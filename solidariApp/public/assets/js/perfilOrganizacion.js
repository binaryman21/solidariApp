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
        cargarInsignias( idUsuario );
        cargarComentariosOrganizacion(idUsuario);
    });

}

function cargarNecesidades ( idUsuario){

    fetch(`/listarNecesidades/${idUsuario}`)
    .then(response => response.json())
    .then(data => {

        let necesidades = data.necesidades;
        let divNecesidadesEnProgreso = $('#necesidadesEnProceso');
        let divNecesidadesCumplidas = $('#necesidadesCumplidas');
        let divNecesidadesEliminadas = $('#necesidadesEliminadas');
        

        if(necesidades != null || necesidades.length>0){

            necesidades.forEach(need => {

                let porcentajeAvance = calcularPorcentaje(need);

                let cardNeed = 
                `<div class="card need ${need.nombreCategoria.toLowerCase()} ${need.descripcionEstado.replace(/\s+/g, "")}" id="necesidad${need.idNecesidad}">
                    <!-- CATEGORIA, FECHA, ESTADO Y DESCRIPCION -->
                    <div class="card-body py-2">
                        <h6 class="card-title mb-n1">${capitalize(need.nombreCategoria)}</h6>
                        <small class="card-subtitle text-muted font-weight-light">Creada hace ${capitalize(moment(need.fechaCreacionNecesidad, "YYYY-MM-DD HH:mm:ss").startOf('day').fromNow())} - ${capitalize(need.descripcionEstado)}</small>
                        <div class="card-text mt-2 text-muted">${capitalize(need.descripcionNecesidad)}</div>
                    </div>
                    <!-- PROGRESO (SOLICITADO Y RECIBIDO) -->
                    <div class="progress">
                        <div class="progress-count d-flex mx-3">
                            <p class="mr-auto">Se solicita: ${need.cantidadNecesidad}</p>
                            <p class="mr-auto">Se recibio: ${need.cantidadRecibida || 0}</p>
                        </div>
                        <div class="progress-bar" role="progressbar" style="width:${ porcentajeAvance }%;" aria-valuenow="${ porcentajeAvance }" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <!-- FECHA LIMITE Y COLABORACIONES -->
                    <div class="card-footer py-0 d-flex justify-content-between align-items-center">
                        <small class="text-muted ">Fecha limite: ${ new Date(need.fechaLimiteNecesidad).toLocaleDateString('es-AR')}</small>
                        <a href="#" data-toggle="modal" data-target="#modalDetalleNecesidad" id="btnDetalleNecesidad${need.idNecesidad}" class="text-black-50">
                            <span class="nroAyudas">${need.colaboraciones_count ? need.colaboraciones_count : 0}</span> 
                            <i class="fas fa-user-friends fa-sm"></i>
                        </a>
                    </div>
                </div>`;

                switch(need.estadoNecesidad){

                    case 1: divNecesidadesEnProgreso.append(cardNeed); break;
                    case 2: divNecesidadesCumplidas.append(cardNeed); break;
                    default: divNecesidadesEliminadas.append(cardNeed);
                }
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

    paginarTabNecesidad({containerType:'EnProceso', ListType:'enproceso'});
    paginarTabNecesidad({containerType:'Cumplidas', ListType:'cumplida'});
    paginarTabNecesidad({containerType:'Eliminadas', ListType:'eliminada'});
}

function paginarTabNecesidad({containerType = '', ListType = ''} = {}){

    let $necesidadesContainer = $(`#necesidades${containerType}`);
    let necesidades = document.querySelectorAll(`.need.${ListType}`);
    let filasTotales= necesidades.length;

    if(filasTotales){

        $necesidadesContainer.append(`<div id=navNecesidades${containerType}></div>`);
        let $nav = $(`#navNecesidades${containerType}`);
    
        let filasMostradas = 4;
    
        let numPaginas = filasTotales/filasMostradas;
    
        for(i = 0; i < numPaginas; i++) {
    
            let numPag = i + 1;
            let pagRel = `<a href="JavaScript:Void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
            $nav.append(pagRel);
        }
    
        $(necesidades).hide();
        $(necesidades).slice(0, filasMostradas).show();
    
        $nav.find('a').bind('click', function(){
    
            $nav.find('a').removeClass('active');
            $(this).addClass('active');
    
            let pagActual = $(this).attr('rel');
    
            let primerItem = pagActual * filasMostradas;
            let ultimoItem = primerItem + filasMostradas;
            $(necesidades).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
                css('display','block').animate({opacity:1}, 300);
        });
    }
    else {

        let tabType = document.querySelector(`a.nav-link[href="#necesidades${containerType}"]`).textContent.toLowerCase();
        let emptyStateOfNeed = 
        `<img src="/assets/img/SinNecesidades${containerType}.svg">
         <p class="text-center my-5">No hay necesidades ${tabType}</p>`
        $necesidadesContainer.append(emptyStateOfNeed);
    } 
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

function agregarPaginacionComentarios(){
    $('#navComentarios').remove();

    $('.comentarios').after('<div id="navComentarios"></div>');
    let comentario = document.querySelectorAll('.comentario')
    let filasMostradas = 2;
    let filasTotales = comentario.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navComentarios').append('<a href="javascript:void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $( comentario ).hide();
    $( comentario ).slice(0, filasMostradas).show();
    $('#navComentarios a:first').addClass('active');
    $('#navComentarios a').bind('click', function(){
        $('#navComentarios a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( comentario ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

function capitalize(text){

    let FirstLetterCap = text[0].toUpperCase();
    return FirstLetterCap+text.slice(1);
}
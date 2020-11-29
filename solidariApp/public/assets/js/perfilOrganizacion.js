document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({funcionSuccess: getOrganizacion, RedirectIfNot: true});
})

function getOrganizacion(idUsuario){

    axios.get("/getOrganizacion/"+idUsuario)
    .then((response)=>{

        let organizacion = response.data.organizacion;
        let contacto = {

            correo: organizacion.emailUsuario,
            telefonos: response.data.telefonos,
            domicilios: response.data.domicilios
        };

        cargarDatosPerfil(organizacion);
        agregarModalContacto(contacto);
        cargarNecesidades(idUsuario);
        cargarInsignias( idUsuario );
        cargarComentariosOrganizacion(idUsuario);
    });
}

function cargarDatosPerfil(organizacion) {

    $("#nombreOrganizacion").html(organizacion.razonSocial);
        $("#tipoOrganizacion").html(organizacion.nombreTipoOrganizacion);
        $("#urlFotoPerfilOrganizacion").attr("src",organizacion.urlFotoPerfilUsuario);
        if(organizacion.descripcionOrganizacion == "")
        {
            organizacion.descripcionOrganizacion = "La organización no ha especificado ninguna descripción todavia";
        }

        $("#descripcionOrganizacion").html(organizacion.descripcionOrganizacion);
        $("#fechaAltaUsuario").html(`Usuario desde el ${moment(organizacion.fechaAltaUsuario, "YYYY-MM-DD HH:mm:ss").format('LL')}`);
}

function cargarNecesidades(idUsuario){

    fetch(`/listarNecesidades/${idUsuario}`)
    .then(response => response.json())
    .then(data => {

        let necesidades = data.necesidades;
        let divNecesidadesEnProgreso = $('#necesidadesEnProceso');
        let divNecesidadesCumplidas = $('#necesidadesCumplidas');
        let divNecesidadesEliminadas = $('#necesidadesEliminadas');
        

        if(necesidades != null && necesidades.length>0){

            necesidades.forEach(need => {

                let porcentajeAvance = calcularPorcentaje(need);

                let cardNeed = 
                `<div class="card need ${need.nombreCategoria.toLowerCase()} ${need.descripcionEstado.replace(/\s+/g, "")}" id="necesidad${need.idNecesidad}">
                    <!-- CATEGORIA, FECHA, ESTADO, OPCIONES Y DESCRIPCION -->
                    <div class="card-body py-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="card-title mb-n1">${capitalize(need.nombreCategoria)}</h6>
                            <button class="btn dropdown px-0 text-muted" type="button" id="OptionsNeed-forID-${need.idNecesidad}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-ellipsis-v fa-xs"></i></button>
                            <div class="dropdown-menu dropdown-menu-right shadow-sm mt-n4" aria-labelledby="OptionsNeed-forID-${need.idNecesidad}">
                                <button class="dropdown-item" id="btnEdite-need${need.idNecesidad}" data-need="${need.idNecesidad}" type="button">Editar necesidad</button>
                                <button class="dropdown-item" id="btnDelete-need${need.idNecesidad}" data-need="${need.idNecesidad}" type="button">Eliminar necesidad</button>                            
                                <a target="_blank" class="dropdown-item fb-xfbml-parse-ignore"
                                    href="https://www.facebook.com/sharer/sharer.php?u=https://solidariapp.com.ar/organizacion/${need.idUsuario}/necesidad/${need.idNecesidad}">Compartir en Facebook</a>
                            </div>
                        </div>
                        <small class="card-subtitle text-muted font-weight-light">Creada ${moment(need.fechaCreacionNecesidad, "YYYY-MM-DD HH:mm:ss").startOf('day').fromNow()} - ${capitalize(need.descripcionEstado)}</small>
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
        }
        
        agregarPaginacionNecesidades();
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

function agregarPaginacionComentarios(){

    //llamo a la funcion para paginar cada seccion pasandole el nombre del contenedor y la clase de los elementos que contiene
    paginarTabCalificacion({containerType:'trato-1', ListType:'trato-1'});//negativas
    paginarTabCalificacion({containerType:'trato-2', ListType:'trato-2'});//regulares
    paginarTabCalificacion({containerType:'trato-3', ListType:'trato-3'});//positivas
}

function paginarTabNecesidad({containerType = '', ListType = ''} = {}){

    $(`#navNecesidades${containerType}`).remove();
    let $necesidadesContainer = $(`#necesidades${containerType}`);
    let necesidades = document.querySelectorAll(`.need.${ListType}`);
    let filasTotales= necesidades.length;
    let filasParaMostrar = 4;

    if(filasTotales>filasParaMostrar){

        $necesidadesContainer.append(`<div id=navNecesidades${containerType}></div>`);
        let $nav = $(`#navNecesidades${containerType}`);
    
    
        let numPaginas = filasTotales/filasParaMostrar;
    
        for(i = 0; i < numPaginas; i++) {
    
            let numPag = i + 1;
            let pagRel = `<a href="javascript:void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
            $nav.append(pagRel);
        }
    
        $(necesidades).hide();
        $(necesidades).slice(0, filasParaMostrar).show();
    
        $nav.find('a').bind('click', function(){
    
            $nav.find('a').removeClass('active');
            $(this).addClass('active');
    
            let pagActual = $(this).attr('rel');
    
            let primerItem = pagActual * filasParaMostrar;
            let ultimoItem = primerItem + filasParaMostrar;
            $(necesidades).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
                css('display','block').animate({opacity:1}, 300);
        });
    }
    else if(!filasTotales)  {

        let tabType = document.querySelector(`a.nav-link[href="#necesidades${containerType}"]`).textContent.toLowerCase();
        let emptyStateOfNeed = 
        `<img src="/assets/img/SinNecesidades${containerType}.svg">
         <p class="text-center my-5">No hay necesidades ${tabType}</p>`
        $necesidadesContainer.append(emptyStateOfNeed);
    }

}

function paginarTabCalificacion({containerType = "", ListType = ""} = {}) {

    $(`#navCalificaciones${containerType}`).remove();
    let $calificacionContainer = $(`#${containerType}`);
    let calificaciones = document.querySelectorAll(`.${ListType}`);
    let filasTotales= calificaciones.length;
    let filasParaMostrar = 4;

    if(filasTotales>filasParaMostrar){

        $calificacionContainer.append(`<div id=navCalificaciones${containerType}></div>`);
        let $nav = $(`#navNecesidades${containerType}`);
    
        let numPaginas = filasTotales/filasParaMostrar;
    
        for(i = 0; i < numPaginas; i++) {
    
            let numPag = i + 1;
            let pagRel = `<a href="javascript:void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
            $nav.append(pagRel);
        }
    
        $(calificaciones).hide();
        $(calificaciones).slice(0, filasParaMostrar).show();
    
        $nav.find('a').bind('click', function(){
    
            $nav.find('a').removeClass('active');
            $(this).addClass('active');
    
            let pagActual = $(this).attr('rel');
    
            let primerItem = pagActual * filasParaMostrar;
            let ultimoItem = primerItem + filasParaMostrar;
            $(calificaciones).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
                css('display','block').animate({opacity:1}, 300);
        });
    }
    else if(!filasTotales) {
                      
        let tabType = document.querySelector(`a.nav-link[href="#${containerType}"]`).textContent.toLowerCase();
        let emptyState = 
        `<img src="/assets/img/SinComentarios.svg">
         <p class="text-center my-5">No hay calificaciones ${tabType}</p>`
        $calificacionContainer.append(emptyState);
    }
}

function agregarModalContacto(contacto){

    $("#correo").html(contacto.correo);

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
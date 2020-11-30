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
        $("#cover").attr("src",colaborador.urlFotoPortadaUsuario);
        $("#correo").html(colaborador.emailUsuario);
        $("#fechaAltaUsuario").html(colaborador.fechaAltaUsuario);
       
        agregarContacto(response.data);
        listarColaboraciones(idUsuario);
        cargarInsignias(idUsuario);
        cargarComentariosColaborador(idUsuario);
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

function listarColaboraciones(idUsuario){

    fetch(`/getColaboracionesPorUsuario/${ idUsuario }`)
    .then(response => response.json())
    .then(data => {

        let divColaboraciones = $('div.accordion#colaboracionesConOrgs');

        if(data.colaboraciones.length > 0 ){
        
            //agrupo las colaboraciones por id de usuario de la org: colaboraciones del colaborador actual)
            let ColaboracionesPorOrg = data.colaboraciones.reduce((colaboracionesParaLaOrg, org) => {

                colaboracionesParaLaOrg[org.idUsuario] = [...colaboracionesParaLaOrg[org.idUsuario] || [], org];
                return colaboracionesParaLaOrg;
            }, {});
            
            let Agrupaciones = $(document.createDocumentFragment());

            //lo cambio a array para manejarlo
            Object.entries(ColaboracionesPorOrg).forEach(grupo => {

                let grupoColaboraciones = crearGrupoDeColaboraciones(grupo);
                Agrupaciones.append(grupoColaboraciones);
            });

            divColaboraciones.append(Agrupaciones);
        }

        //agregarPaginacionNecesidades();
    })
    .catch(error => console.error);
}

// MOSTRAR LAS COLABORACIONES
function crearGrupoDeColaboraciones(grupo){
    
    let idOrg = grupo[0];
    let razonSocial = grupo[1][0].razonSocial;
    let avatarOrg = grupo[1][0].urlFotoPerfilUsuario;
    let ListaColaboraciones = grupo[1]; 

    let cardColaboracionGroup =
        $('<li>').addClass('list-group-item list-group-item-action p-0')
        .html(
            `<div class="d-flex justify-content-between align-items-center p-3 collapse" id="OrgColaboration${idOrg}"
             data-toggle="collapse" data-target="#ColaborationsFor${idOrg}" aria-expanded="false" aria-controls="ColaborationsFor${idOrg}">
                <div class="media">
                    <img src="${avatarOrg}" class="rounded-circle imgPerfilOrgOnCol mr-2" alt="Avatar de la org ${razonSocial}">
                    <div class="media-body">
                        <a href="/ver-organizacion/${idOrg}" class="text-decoration-none text-reset">${razonSocial}</a>
                    </div>
                </div>
                <span class="badge badge-primary badge-pill">${ListaColaboraciones.length}</span>
            </div>
            <div id="ColaborationsFor${idOrg}" class="collapse list-group px-2 pb-2" aria-labelledby="OrgColaboration${idOrg}" data-parent="#colaboracionesConOrgs">
            </div>`
        );

    ListaColaboraciones.forEach(colaboracion => {

        let  cardColaboracion = 
            `<div class="list-group-item list-group-item-action need ${colaboracion.nombreCategoria.toLowerCase()}" id="colaboracion${colaboracion.idColaboracion}">
                <p class="card-text">${colaboracion.nombreCategoria}</p>
                <p class="text-muted">${colaboracion.descripcionNecesidad}
                <small class="mt-2 text-black-50  d-block">${colaboracion.descripcionEstadoColaboracion == "concretado" ? 'Colaboro':'Incio la colaboracion'} ${moment(colaboracion.fechaColaboracion, "YYYY-MM-DD HH:mm:ss").fromNow()}</small>
                <small class="text-black-50">Estado: ${colaboracion.descripcionEstadoColaboracion}</small>
            </div>`;

        cardColaboracionGroup.find(`#ColaborationsFor${idOrg}`).append(cardColaboracion);
    });

    return cardColaboracionGroup;
}


function agregarPaginacionColaboraciones(){

    $(`#navColaboracionesParaLasOrg`).remove();
    let $colaboracionesContainer = $("#colaboracionesConOrgs");
    let GrupoDeColaboracionesParaOrgs = document.querySelectorAll(`div[id^="OrgColaboration"`);
    let filasTotales= GrupoDeColaboracionesParaOrgs.length;
    let filasParaMostrar = 6;

    if(filasTotales>filasParaMostrar){

        $colaboracionesContainer.append(`<div id=navColaboracionesParaLasOrg></div>`);
        let $nav = $(`#navColaboracionesParaLasOrg`);
    
        let numPaginas = filasTotales/filasParaMostrar;
    
        for(i = 0; i < numPaginas; i++) {
    
            let numPag = i + 1;
            let pagRel = `<a href="javascript:void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
            $nav.append(pagRel);
        }
    
        $(GrupoDeColaboracionesParaOrgs).hide();
        $(GrupoDeColaboracionesParaOrgs).slice(0, filasParaMostrar).show();
    
        $nav.find('a').bind('click', function(){
    
            $nav.find('a').removeClass('active');
            $(this).addClass('active');
    
            let pagActual = $(this).attr('rel');
    
            let primerItem = pagActual * filasParaMostrar;
            let ultimoItem = primerItem + filasParaMostrar;
            $(GrupoDeColaboracionesParaOrgs).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
                css('display','block').animate({opacity:1}, 300);
        });
    }
    else if(!filasTotales) {
                      
        let emptyState = 
        `<img src="/assets/img/SinNecesidadesCumplidas.svg">
         <p class="text-center my-5">No se encontraron colaboraciones</p>`
        $colaboracionesContainer.append(emptyState);
    }
}

function agregarPaginacionComentarios(){

    //llamo a la funcion para paginar cada seccion pasandole el nombre del contenedor y la clase de los elementos que contiene
    paginarTabCalificacion({containerType:'trato-1', ListType:'trato-1'});//negativas
    paginarTabCalificacion({containerType:'trato-2', ListType:'trato-2'});//regulares
    paginarTabCalificacion({containerType:'trato-3', ListType:'trato-3'});//positivas
}


function paginarTabCalificacion({containerType = "", ListType = ""} = {}) {

    $(`#navCalificaciones${containerType}`).remove();
    let $calificacionContainer = $(`#${containerType}`);
    let calificaciones = document.querySelectorAll(`.${ListType}`);
    let filasTotales= calificaciones.length;
    let filasParaMostrar = 2;

    if(filasTotales>filasParaMostrar){

        $calificacionContainer.append(`<div id=navCalificaciones${containerType}></div>`);
        let $nav = $(`#navCalificaciones${containerType}`);
    
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
         <p class="text-center my-5">No hay comentarios ${tabType}</p>`
        $calificacionContainer.append(emptyState);
    }
}

function capitalize(text){

    let FirstLetterCap = text[0].toUpperCase();
    return FirstLetterCap+text.slice(1);
}
document.addEventListener('DOMContentLoaded', () => {

    //Obtengo la url para saber el id de colaborador
    var id = +location.pathname.slice('/ver-colaborador/'.length);
    isLoggedIn();
    getColaborador(id);
})

function getColaborador(idUsuario){

    axios.get("/getColaborador/"+idUsuario)
    .then(response =>{

        var colaborador = response.data.colaborador;
        let contacto = {

            correo: colaborador.emailUsuario,
            telefonos: response.data.telefonos,
            domicilios: response.data.domicilios
        };

        cargarDatosPerfil(colaborador);
        agregarContacto(contacto);
        cargarInsignias(idUsuario);
        listarColaboraciones(idUsuario );
        cargarComentariosColaborador(idUsuario);
    });
}

function cargarDatosPerfil(colaborador) {
    
    $("#nombreColaborador").html(colaborador.nombreColaborador + " " + colaborador.apellidoColaborador);
    $("#imgPerfilColaborador").attr("src",colaborador.urlFotoPerfilUsuario);
    $("#correo").html(colaborador.emailUsuario);
    $("#fechaAltaUsuario").html(`Usuario desde el ${moment(colaborador.fechaAltaUsuario, "YYYY-MM-DD HH:mm:ss").format('LL')}`);
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
        let $nav = $(`#navNecesidades${containerType}`);
    
        let numPaginas = filasTotales/filasParaMostrar;
    
        for(i = 0; i < numPaginas; i++) {
    
            let numPag = i + 1;
            let pagRel = `<a href="JavaScript:Void(0);" rel="${i}" ${!i ? 'class="active"':''}">${numPag}</a>`
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
        `<img src="/assets/img/noComments.png">
         <p class="text-center my-5">No hay comentarios ${tabType}</p>`
        $calificacionContainer.append(emptyState);
    }
}

function listarColaboraciones(idUsuario){

    fetch(`/getColaboracionesPorUsuario/${ idUsuario }`)
    .then(response => response.json())
    .then(data => {

        let colaboraciones = data.colaboraciones;
        let divNecesidades = $('.colaboraciones');

        if( colaboraciones.length > 0 ){
            divNecesidades.html("");
            colaboraciones.forEach(colaboracion => {
                crearCardColaboracion( colaboracion );
            })
            agregarPaginacionNecesidades();
        }
        else{
            let mensaje = 
            `<div class="alert alert-secondary" role="alert">
                Aun no tiene colaboraciones.
            </div>`
            divNecesidades.append( mensaje );
        }
    })
    .catch(error => console.error);
}

// MOSTRAR LAS COLABORACIONES
function crearCardColaboracion( colaboracion ){

    let organizacion = [];
 /*    let {
        idColaboracion, razonSocial,  urlFotoPerfilUsuario,
        nombreCategoria, descripcionNecesidad,
        descripcionEstadoColaboracion, idUsuario, fechaColaboracion

    } = colaboracion;

    let cardColaboracion =
    `<div class="accordion" id="colaboracionesConOrgs">
        <div class="card">
            <div class="card-header" id="OrgColaboration${idColaboracion}">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        
                    </button>
                </h2>
            </div>
            <div id="Colaborations" class="collapse" aria-labelledby="OrgColaboration${idColaboracion}" data-parent="#colaboracionesConOrgs">
                <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
            </div>
        </div>
    </div>
     */

    
    `<div class="col" id="colaboracion${colaboracion.idColaboracion}">
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
                        <p class="mt-2 font-weight-bold">${colaboracion.descripcionEstadoColaboracion}</p>
                    </div>
                </div>
                <h5 class="card-title"><a href="/organizacion/${colaboracion.idUsuario}">${colaboracion.razonSocial}</a></h5>
            </div>
        </div>
    </div>`;


    $(".colaboraciones").append(cardColaboracion);
}

function agregarContacto(contacto){


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
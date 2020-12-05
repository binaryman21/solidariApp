function cargarDatosModalDetalleNecesidad( necesidad, modo = "colaborador")
{
    // console.log( necesidad );
    let porcentajeAvance = calcularPorcentaje( necesidad );
    $('.detalleNecesidadModal').html(
    /*html*/`
    <div class="card detalle ${necesidad.nombreCategoria.toLowerCase()} mt-0">
        <div class="card-body">
                <div class="datosNecesidad">
                    <p class="font-weight-bold">${necesidad.nombreCategoria}</p>
                    <p>${necesidad.descripcionNecesidad}</p>
                    <p id = "cantidadSolicitada">Cantidad solicitada: ${necesidad.cantidadNecesidad || 'Sin limite de cantidad'}</p>
                    <p>Cantidad recibida: ${necesidad.cantidadRecibida}</p>
                    <p>Cumplimiento: ${ porcentajeAvance }%</p>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${ porcentajeAvance }%" aria-valuenow="${ porcentajeAvance }" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p>Fecha limite: ${ new Date(necesidad.fechaLimiteNecesidad).toLocaleDateString('es-AR') }</p>
                    <p>Estado: ${necesidad.descripcionEstado}</p>
                </div>
            </div>
            <button type="button" class="btn btnColaborar btn-block btn-outline-primary mt-4" data-toggle="modal" data-target="#modalColaborar" id = "btnColaborar"><i class="far fa-handshake mr-3"></i>COLABORAR</button>
    </div>`);
    if(modo === "organizacion")
    {
        $("#btnColaborar").addClass("d-none");
        getColaboraciones(necesidad,"organizacion");
    }
    else{
        getColaboraciones(necesidad);
        $("#btnConfirmarColaboracion").unbind("click");
        $("#btnConfirmarColaboracion").click(function(){
            registrarColaboracion(necesidad);
        });
    }

    $("#inputBuscarColaboraciones input").on('keyup search ', () => buscarColaboradoresEnNecesidad());
}

function registrarColaboracion(necesidad)
{
    bloquearBoton($("#btnConfirmarColaboracion"));
    let idNecesidad = necesidad.idNecesidad;
    axios.post("/registrarColaboracion",{idNecesidad:idNecesidad})
    .then((response)=>{
        desbloquearBoton($("#btnConfirmarColaboracion"));
        $("#modalColaborar").modal("hide");
        if(response.data.resultado)
        {
            $("#alertDetalleNecesidad").removeClass("alert-danger");
            $("#alertDetalleNecesidad").addClass("alert-success");
            $("#tituloAlert").html("Gracias!");
            $("#mensajeAlert").html(response.data.message);
            $("#alertDetalleNecesidad").show();
            $("#alertDetalleNecesidad").removeClass('d-none')
            getColaboraciones(necesidad);
            // console.log(idNecesidad);
            crearNotificacionColaboracion(necesidad);
            //alert(response.data.message);
        }
        else
        {
            if(response.data.message === "notLoggedIn")
            {
                mostrarComo('colaborador');
                $("#modalDetalleNecesidad").modal("hide");
                $("#modalLogin").modal("show");
            }
            else
            {
                $("#alertDetalleNecesidad").addClass("alert-danger");
                $("#alertDetalleNecesidad").removeClass("alert-success");
                $("#tituloAlert").text("Error");
                $("#mensajeAlert").html(response.data.message);
                $("#alertDetalleNecesidad").show()
                $("#alertDetalleNecesidad").removeClass('d-none')
            }

            //alert(response.data.message);
        }
    });
}

function getColaboraciones(necesidad, modo = "colaborador")
{
    let listadoDeColaboraciones = $("#listadoColaboraciones");
    let lastshowed = listadoDeColaboraciones.data("lastshowed");

    //si la necesidad que se desea buscar no coincide con la ultima necesidad consultada se carga (planeo poner un boton para cargar bajo demanda)
    if(lastshowed != necesidad.idNecesidad){

        $("#alertDetalleNecesidad").hide();
        $("#inputBuscarColaboraciones").addClass("d-none");
        $("#cantDeColaboraciones2").html("");
        listadoDeColaboraciones.html("");

        axios.get("/getColaboraciones/"+ necesidad.idNecesidad)
        .then((response)=> {
            cantColaboraciones = response.data.colaboraciones.length;
            if(cantColaboraciones > 0)
            {
                $("#inputBuscarColaboraciones").removeClass("d-none");
                $("#cantDeColaboraciones2").html("Ayudando en esta necesidad: " + cantColaboraciones + " colaborador/es");

                var estado = ['pendiente', 'concretada', 'no concretada'];
                var contexto = ['info', 'success', 'danger'];
                response.data.colaboraciones.forEach(colaboracion => {

                    let fullName = `${colaboracion.nombreColaborador} ${colaboracion.apellidoColaborador}`
                    let usuarioHtml =`
                    <li data-name="${fullName.toLowerCase()}" class="usuario list-group-item list-group-item-action">
                        <!--<div class="collapse" id="colaborador${colaboracion.idColaborador}" data-toggle="collapse"
                         data-target="#ColaborationFrom${colaboracion.idUsuario}" aria-expanded="false" aria-controls="ColaborationFrom${colaboracion.idUsuario}">-->
                        <div id="colaborador${colaboracion.idColaborador}">
                            <div class="media">
                                <a  href= "/ver-colaborador/${colaboracion.idUsuario}">
                                    <img src="${colaboracion.urlFotoPerfilUsuario}" class="rounded-circle imgPerfilCol align-self-start mr-2" alt="Avatar de ${fullName}">
                                </a>
                                <div class="media-body">
                                    <a  href= "/ver-colaborador/${colaboracion.idUsuario}" class="text-decoration-none text-reset">
                                        <span class"text-black">${fullName}</span>
                                    </a>
                                    <small class="d-block text-${contexto[colaboracion.estadoColaboracion]}">Colaboracion ${estado[colaboracion.estadoColaboracion]}</small>
                                </div>
                                <button class="btn dropdown ml-4 px-0 text-muted" type="button" id="OptionsCol-forID-${colaboracion.idUsuario}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-xs"></i>
                                </button>
                                <div id="orgOptionsFor${colaboracion.idColaboracion}" class="d-none dropdown-menu dropdown-menu-right shadow-sm mt-n4" aria-labelledby="OptionsCol-forID-${colaboracion.idUsuario}" data-parent="#accordionExample">
                                    <a class="dropdown-item" href= "#"  data-toggle="modal" data-target="#modalCalificar" id = "btnCalificar${colaboracion.idColaboracion}">Calificar</a>
                                </div>
                            </div>
                        </div>
                        <!--<div id="ColaborationFrom${colaboracion.idUsuario}" class="collapse list-group px-2 pb-2" aria-labelledby="colaborador${colaboracion.idColaborador}" data-parent="#listadoColaboraciones">-->
                            <small class="text-muted text-dark">${moment(colaboracion.fechaColaboracion, "YYYY-MM-DD HH:mm:ss").format("LL")}</small>
                        <!--</div>-->
                    </li>`

                    listadoDeColaboraciones.append(usuarioHtml);

                    if(modo === "organizacion")
                    {
                        if(colaboracion.estadoColaboracion == 0)
                        {
                            $(`#OptionsCol-forID-${colaboracion.idUsuario}`).removeClass("d-none");
                            $(`#orgOptionsFor${colaboracion.idColaboracion}`).removeClass("d-none");
                            $(`#btnCalificar${colaboracion.idColaboracion}`).click(function(){
                                $("#modalDetalleNecesidad").modal("hide");
                                configModalCalificar(1,colaboracion,necesidad);
                            });
                        }
                    }
                    else{

                        $(`#OptionsCol-forID-${colaboracion.idUsuario}`).remove();
                        $(`#orgOptionsFor${colaboracion.idColaboracion}`).remove();
                        $(`#btnCalificar${colaboracion.idColaboracion}`).remove();
                    }
                });

                agregarPaginacionUsuarios();
            }
            else
            {
                $("#listadoColaboraciones").html('<img src="assets/img/SinNecesidadesCumplidas.svg">');
                $('#navUsuarios').html('');
                if(modo == "colaborador")
                {
                    $("#cantDeColaboraciones2").html("Aun no hay colaboraciones, animate y se el primero!");
                }
                else
                {
                    $("#cantDeColaboraciones2").html("Todavia no hay colaboraciones para esta necesidad");
                }
            }
            listadoDeColaboraciones.data("lastshowed", necesidad.idNecesidad);
        });
    }
}

function buscarColaboradoresEnNecesidad(){

    let findingText = $('#inputBuscarColaboraciones input').val().toLowerCase();
    const usuarios = $('.usuario');
    const noResultsMessage =  $("#whenNoResults");

    //Filtro los colaboradores que coinciden con el texto de busqueda
    if(findingText == ""){

        usuarios.show();
        noResultsMessage.addClass('d-none');
    }
    else{

        usuarios.hide();
        //obtengo la cantidad de usuarios que han sido encontrados y mostrados como resultado
        
        let resultados = usuarios.filter((i, usuario) => $(usuario).data('name').includes(findingText)).show().length;
        
        if(!resultados) noResultsMessage.removeClass('d-none');
        else noResultsMessage.addClass('d-none');
    }
    agregarPaginacionUsuarios();
}
function cargarDatosModalDetalleNecesidad( necesidad, modo = "colaborador")
{
    let porcentajeAvance = calcularPorcentaje( necesidad );
        $('.detalleNecesidadModal').html(
        `<div class="card necesidad ${necesidad.nombreCategoria.toLowerCase()}">
            <div class="card-body">
                <div class="container-fluid">
                    <div class="datosNecesidad">
                        <p class="font-weight-bold">${necesidad.nombreCategoria}</p>
                        <p>${necesidad.descripcionNecesidad}</p>
                        <p>Cantidad solicitada: ${necesidad.cantidadNecesidad}</p>
                        <p>Cantidad recibida: ${necesidad.cantidadRecibida}</p>
                        <p>Cumplimiento: ${ porcentajeAvance }%</p>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: ${ porcentajeAvance }%" aria-valuenow="${ porcentajeAvance }" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p>Fecha limite: ${ new Date(necesidad.fechaLimiteNecesidad).toLocaleDateString('es-AR') }</p>
                        <p>Estado: ${necesidad.descripcionEstado}</p>
                    </div>
                </div>
                <button type="button" class="btn btnColaborar btn-block btn-outline-primary mt-4" data-toggle="modal" data-target="#modalColaborar" id = "btnColaborar"><i class="far fa-handshake"></i>COLABORAR</button>
            </div>
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
            $("#inputBuscarColaboraciones input").keyup(function(){
                buscarColaboradoresEnNecesidad();
            })
        }

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
                $("#tituloAlert").html("Error");
                $("#mensajeAlert").html(response.data.message);
                $("#alertDetalleNecesidad").show();
            }

            //alert(response.data.message);
        }
    });
}

function getColaboraciones(necesidad,modo = "colaborador")
{

    $("#alertDetalleNecesidad").hide();
    $("#inputBuscarColaboraciones").addClass("d-none");
    $("#cantDeColaboraciones2").html("");
    $("#listadoColaboraciones").html(`<div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>`);

    axios.get("/getColaboraciones/"+ necesidad.idNecesidad)
    .then((response)=>
    {

        cantColaboraciones = response.data.colaboraciones.length;
        if(cantColaboraciones > 0)
        {
            $("#inputBuscarColaboraciones").removeClass("d-none");
            $("#cantDeColaboraciones2").html("Ayudando en esta necesidad: " + cantColaboraciones + " colaborador/es");
            //alert(JSON.stringify(response.data.colaboraciones));
            $("#listadoColaboraciones").html("");
            $.each(response.data.colaboraciones, function (indexInArray, colaboracion) {
                $("#listadoColaboraciones").append(`<div class="usuario">
                                <div class="alert alert-secondary" role="alert" id="colaborador${colaboracion.idColaborador}">
                                <div class = "font-weight-bold" id = "estadoColaboracion`+colaboracion.idColaboracion +`"></div>
                                    <div class="row align-items-center">
                                        <div class="col-md-2">
                                            <img class="rounded-circle imgPerfilOrg" style="height: 50px;"src="`+colaboracion.urlFotoPerfilUsuario +`" alt="imagen de usuario">
                                        </div>
                                        <div class="col-md-3">
                                            <p class="lead nombreColaborador">`+colaboracion.nombreColaborador +` `+ colaboracion.apellidoColaborador+`</p>

                                        </div>
                                        <div class="col-md-4">
                                        <a href= "#" class = "d-none" data-toggle="modal" data-target="#modalCalificar" id = "btnCalificar`+colaboracion.idColaboracion+`">Calificar</a>
                                        <a href= "#" class = "d-none" data-toggle="modal" data-target="#modalCalificar" id = "btnVerCalificacion`+colaboracion.idColaboracion+`">Ver calificacion</a>

                                        </div>
                                        <div class="col-md-3">
                                            <a href= "/colaborador/`+colaboracion.idUsuario+`">Ver perfil</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`);

                        if(modo === "organizacion")
                        {

                            if(colaboracion.estadoColaboracion == 0)
                            {
                                $("#btnCalificar"+colaboracion.idColaboracion).removeClass("d-none");
                                $("#btnCalificar"+colaboracion.idColaboracion).click(function(){
                                    $("#modalDetalleNecesidad").modal("hide");
                                    configModalCalificar(1,colaboracion,necesidad);
                                });
                            }

                        }

                        if(colaboracion.estadoColaboracion  == 0)
                        {
                            $("#estadoColaboracion" + colaboracion.idColaboracion).html("Colaboracion pendiente");
                            $("#estadoColaboracion" + colaboracion.idColaboracion).addClass("text-warning");
                        }
                        else if(colaboracion.estadoColaboracion == 1)
                        {
                            $("#estadoColaboracion" + colaboracion.idColaboracion).html("Colaboracion concretada");
                            $("#estadoColaboracion" + colaboracion.idColaboracion).addClass("text-success");
                        }
                        else
                        {
                            $("#estadoColaboracion" + colaboracion.idColaboracion).html("Colaboracion no concretada");
                            $("#estadoColaboracion" + colaboracion.idColaboracion).addClass("text-danger");
                        }
            });
            agregarPaginacionUsuarios();
        }
        else
        {
            $("#listadoColaboraciones").html("");
            $('#navUsuarios').html('');
            $("#cantDeColaboraciones2").html("Aun no hay colaboraciones, animate y se el primero!");
        }
    });
}


function buscarColaboradoresEnNecesidad(){
    const text = $("#inputBuscarColaboraciones input").val().toLowerCase();
    const usuarios = $('.usuario');
    const nombres = document.querySelectorAll(".nombreColaborador");
    let nombre;
    console.log("textBus: "+text);
    //Filtro los colaboradores que coinciden con el texto de busqueda
    if(text == ''){
        for(i = 0 ; i < usuarios.length ; i++ ){
            $(usuarios[i]).removeClass('d-none');
        }
    }
    for(i = 0 ; i < usuarios.length ; i++ ){
        nombre = nombres[i].innerHTML.toLowerCase();
        console.log("nombreCol: "+nombre);
        if(!nombre.includes(text)){
            $(usuarios[i]).addClass('d-none');
        }else{
            $(usuarios[i]).removeClass('d-none');
        }
    }
    agregarPaginacionUsuarios();
}

function cargarDatosModalDetalleNecesidad( necesidad, modo = "colaborador")
{
    console.log( necesidad );
        $('.detalleNecesidadModal').html(
        `<div class="card necesidad ${necesidad.nombreCategoria.toLowerCase()}">
            <div class="card-body">
                <div class="container-fluid">
                    <div class="datosNecesidad">
                        <p class="font-weight-bold">${necesidad.nombreCategoria}</p>
                        <p>${necesidad.descripcionNecesidad}</p>
                        <p>Cantidad: ${necesidad.cantidadNecesidad}</p>
                        <p>Fecha limite: ${ new Date(necesidad.fechaLimiteNecesidad).toLocaleDateString('es-AR') }</p>
                        <p>Estado: en proceso</p>
                    </div>
                </div>
                <button type="button" class="btn btnColaborar btn-block btn-outline-primary mt-4" data-toggle="modal" data-target="#modalColaborar" id = "btnColaborar"><i class="far fa-handshake"></i>COLABORAR</button>
            </div>
        </div>`);

        if(modo === "organizacion")
        {
            $("#btnColaborar").addClass("d-none");
            getColaboraciones(necesidad.idNecesidad,"organizacion");
        }
        else{
            getColaboraciones(necesidad.idNecesidad);
            $("#btnConfirmarColaboracion").unbind("click");
            $("#btnConfirmarColaboracion").click(function(){
                registrarColaboracion(necesidad.idNecesidad);
            });
        }

}

function registrarColaboracion(idNecesidad)
{
    bloquearBoton($("#btnConfirmarColaboracion"));
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
            getColaboraciones(idNecesidad);
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

function getColaboraciones(idNecesidad,modo = "colaborador")
{

    $("#alertDetalleNecesidad").hide();
    $("#inputBuscarColaboraciones").addClass("d-none");
    $("#cantDeColaboraciones2").html("");
    $("#listadoColaboraciones").html(`<div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>`);

    axios.get("/getColaboraciones/"+ idNecesidad)
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
                                <div class="alert alert-secondary" role="alert">
                                    <div class="row align-items-center">
                                        <div class="col-md-2">
                                            <img class="rounded-circle imgPerfilOrg" style="height: 50px;"src="`+colaboracion.urlFotoPerfilUsuario +`" alt="imagen de usuario">
                                        </div>
                                        <div class="col-md-3">
                                            <p class="lead">
                                            `+colaboracion.nombreColaborador +` `+ colaboracion.apellidoColaborador+`
                                            </p>
                                        </div>
                                        <div class="col-md-4">
                                        <a href= "#" class = "d-none" data-toggle="modal" data-target="#modalCalificar" id = "btnCalificar`+colaboracion.idColaboracion+`">Calificar</a>
                                        </div>
                                        <div class="col-md-3">
                                            <a href= "colaborador/`+colaboracion.idUsuario+`">Ver perfil</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`);

                        if(modo === "organizacion")
                        {
                            $("#btnCalificar"+colaboracion.idColaboracion).removeClass("d-none");
                            $("#btnCalificar"+colaboracion.idColaboracion).click(function(){
                                $("#modalDetalleNecesidad").modal("hide");
                                configModalCalificar(colaboracion);
                            });
                        }
            });
            agregarPaginacionUsuarios();
        }
        else
        {
            $("#listadoColaboraciones").html("");
            $("#cantDeColaboraciones2").html("Aun no hay colaboraciones, animate y se el primero!");
        }
    });
}

function configModalCalificar(idCalificacion)
{

}

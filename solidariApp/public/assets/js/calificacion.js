function configModalCalificar(idRolCalificado, colaboracion, necesidad) {
    limpiarValidaciones($("#textoComentarios"), $("#errorTextoComentarios"));
    $("#textoComentarios").val('');
    $("input[name='radioConcretoAyuda']").change(

        function () {
            if ($("input[name='radioConcretoAyuda']:checked").val() == 1) {
                $("#cantidadRecibida").attr("disabled", false);
            } else {
                $("#cantidadRecibida").attr("disabled", true);
                $("#cantidadRecibida").val("");
                limpiarValidaciones($("#cantidadRecibida"), $("#errorCantidadRecibida"));
            }
        }
    );

    $("#usuarioCalificado").html("");
    $("#usuarioCalificado").append(
        `<div class="usuario">
            <div class="alert alert-secondary" role="alert">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <input type = "hidden" id = "inpIdDenunciado" value = "${colaboracion.idUsuario}">
                        <img class="rounded-circle imgPerfilOrg" style="height: 50px;"src="${colaboracion.urlFotoPerfilUsuario}" alt="imagen de usuario">
                    </div>
                    <div class="col-md-3">
                        <p class="lead">
                        ${colaboracion.nombreColaborador} ${colaboracion.apellidoColaborador}
                        </p>
                    </div>
                    <div class="col-md-3">
                        <a href= "ver-colaborador/${colaboracion.idUsuario}">Ver perfil</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`);
    $("#necesidadCalificada").html("");
    $("#necesidadCalificada").append(`<div class="card necesidad ${necesidad.nombreCategoria.toLowerCase()}">
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <p class="font-weight-bold">${necesidad.nombreCategoria}</p>
                    <p>${necesidad.descripcionNecesidad}</p>
                </div>
            </div>
        </div>
    </div>`);

    $("#btnEnviarCalificacion").unbind("click");
    $("#btnEnviarCalificacion").click(function (event) {
        event.preventDefault();
        if (($("input[name='radioConcretoAyuda']:checked").val() == 0 || validarCantidadRecibida($("#cantidadRecibida"), $("#errorCantidadRecibida"))) && validarComentario($('#textoComentarios'), $('#errorTextoComentarios'))) {
            registrarCalificacion(idRolCalificado, colaboracion.idColaboracion, colaboracion.idNecesidad);
        }
    });
}

//CALIFICAR A UNA ORGANIZACION
$('#btnEnviarCalificacionOrganizacion').click(function (e) {
    e.preventDefault();
    let idCalificado = $(location).attr('href').split("/")[4];
    if (validarComentario($('#textoComentariosOrg'), $('#errorTextoComentariosOrg'))) {
        registrarCalificacionOrganizacion(idCalificado);
    }
});

function registrarCalificacionOrganizacion(idCalificado) {
    bloquearBoton($("#btnEnviarCalificacionOrganizacion"));
    var calificacion = {
        idCalificado,
        idCalificante: 0,
        tratoRecibido: $("input[name='radioTratoOrg']:checked").val(),
        comentario: $("#textoComentariosOrg").val()
    };

    axios.post("/registrarCalificacionOrganizacion", calificacion)
        .then((response) => {
            desbloquearBoton($("#btnEnviarCalificacionOrganizacion"));
            if (response.data.resultado) {
                alertify.success(response.data.message);
                $("#modalCalificarOrganizacion").modal("hide");
                crearNotificacionCalificacionOrganizacion(calificacion)
                limpiarValidaciones($("#textoComentariosOrg"), $("#errorTextoComentariosOrg"));
                $("#textoComentariosOrg").val('');
                cargarComentariosOrganizacion(idCalificado);
            } else {
                alertify.error(response.data.message);
            }
        });
}

function registrarCalificacion(idRolCalificado, idColaboracion, idNecesidad) {
    bloquearBoton($("#btnEnviarCalificacion"));
    var calificacion = {
        idCalificacion: 0,
        idColaboracion: idColaboracion,
        tratoRecibido: $("input[name='radioTrato']:checked").val(),
        ayudaConcretada: $("input[name='radioConcretoAyuda']:checked").val(),
        comentario: $("#textoComentarios").val(),
        idRolCalificado: idRolCalificado,
        cantidadRecibida: $("#cantidadRecibida").val(),
        idNecesidad: idNecesidad
    };

    axios.post("/registrarCalificacion", calificacion)
        .then((response) => {
            desbloquearBoton($("#btnEnviarCalificacion"));
            if (response.data.resultado) {
                alertify.success(response.data.message);
                $("#modalCalificar").modal("hide");
                crearNotificacionCalificacionColaboracion(idColaboracion);

            } else {
                alertify.error(response.data.message);
            }
        });
}

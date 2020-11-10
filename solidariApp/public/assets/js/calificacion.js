
function configModalCalificar(idRolCalificado,idColaboracion,idNecesidad)
{
    $("#btnEnviarCalificacion").unbind("click");
    $("#btnEnviarCalificacion").click(function(event){
        event.preventDefault();
        registrarCalificacion(idRolCalificado,idColaboracion,idNecesidad);
    });
}

function registrarCalificacion(idRolCalificado,idColaboracion,idNecesidad)
{
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

    axios.post("/registrarCalificacion",calificacion)
    .then((response)=>{
        desbloquearBoton($("#btnEnviarCalificacion"));
        alert(response.data.message);
    });
}

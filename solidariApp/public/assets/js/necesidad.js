
function registrarNecesidad(idUsuario)
{

    let necesidad = {
        idNecesidad:0,
        descripcionNecesidad:$("#txtDescripcion").val(),
        cantidadNecesidad: Number( $("#inpCantidad").val() ),
        fechaLimiteNecesidad: $("#inpFechaLimite").val(),
        fechaBajaNecesidad: "",
        idCategoria:$("#slctCategoria").val(),
        nombreCategoria:$("#slctCategoria option:selected").text(),
        idUsuario: idUsuario
    }

    axios.post("/registrarNecesidad",necesidad)
    .then((response)=>{
        // console.log( 'respuesta' + response.data.id);
        // console.log( 'respuestaaa ' + response.data.message);
        // console.log(necesidad);
        necesidad.idNecesidad = response.data.id;
        necesidad.descripcionEstado = "En proceso";
        necesidad.fechaCreacionNecesidad = response.data.fecha;
        desbloquearBoton($("#btnGuardarCambiosNecesidad"));
        let divNecesidades = $('#necesidadesEnProceso');
        const pag = $('#navNecesidadesEnProceso .active').html();
        divNecesidades.prepend(`<div class="card need ${necesidad.nombreCategoria.toLowerCase()} ${necesidad.descripcionEstado.replace(/\s+/g, "")}" id="necesidad${necesidad.idNecesidad}"></div>`);
        crearCardNecesidad(necesidad, 0);
        agregarPaginacionNecesidades();
        limpiarValidaciones($("#inpFechaLimite"),  $("#errorFechaLimite") );
        limpiarValidaciones($("#slctCategoria"), $("#errorCategoria"));
        limpiarValidaciones($("#inpCantidad"), $("#errorCantidad"));
        limpiarValidaciones($("#txtDescripcion"), $("#errorDescripcion"));
        $("#inpFechaLimite").val('');
        $("#slctCategoria").val('');
        $("#inpCantidad").val('');
        $("#txtDescripcion").val('');
        $('#navNecesidadesEnProceso a:contains('+pag+')').trigger('click');
        alertify.success('Necesidad creada');
    });
}
function listarCategorias()
{
    $("#slctCategoria").html("<option value = '0'>--Seleccione una categoria--</option");
    axios.get("/listarCategoriasNecesidad")
    .then((response)=>{
        $.each(response.data.CategoriasNecesidad, function (indexInArray, categoria) {
            if(categoria.activo){
                $("#slctCategoria").append("<option value = '" + categoria.idCategoria + "'>" + categoria.nombreCategoria + "</option");
            }
        });
    });
}

function updateNecesidad(necesidad){
    //console.log("el id de la necesidad es " + idNecesidad);
    necesidad.descripcionNecesidad = $("#txtDescripcion").val();
    necesidad.cantidadNecesidad = Number( $("#inpCantidad").val() );
    necesidad.fechaLimiteNecesidad =  $("#inpFechaLimite").val();
    necesidad.fechaBajaNecesidad =  "";
    necesidad.idCategoria = $("#slctCategoria").val();
    necesidad.nombreCategoria = $("#slctCategoria option:selected").text();
    console.log($("#slctCategoria option :selected").text());
    JSON.stringify(necesidad);
    axios.post("/updateNecesidad",necesidad)
    .then((response)=>{
        if(response.data.resultado){
            const pag = $('#navNecesidadesEnProceso .active').html();
            crearCardNecesidad(necesidad, 0);
            agregarPaginacionNecesidades();
            $("#modalEditarNecesidad").modal('toggle');
            document.getElementById("formEditarNecesidad").reset();
            desbloquearBoton($("#btnGuardarCambiosNecesidad"));
            if( necesidad.estadoNecesidad == 1 )
                $('#navNecesidadesEnProceso a:contains('+pag+')').trigger('click');
            else
                $('#navNecesidadesCumplidas a:contains('+pag+')').trigger('click');
            alertify.success('Necesidad modificada');

        }else{
            alertify.error(response.data.message);
        }
    });
}

function bajaNecesidad(idNecesidad){

    axios.post("/bajaNecesidad",{idNecesidad:idNecesidad})
    .then((response)=>{
        desbloquearBoton($("#btnConfirmarEliminarNecesidad"));
        if(response.data.resultado){
            cargarNecesidades( response.data.idUsuario );
            $("#modalBajaNecesidad").modal('toggle');
            $("#modalEditarNecesidad").modal('hide');
            document.getElementById("formEditarNecesidad").reset();
            alertify.error('Necesidad eliminada');
        }else{
            alert(response.data.message);
        }
    });
}




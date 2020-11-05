
function registrarNecesidad(idUsuario)
{

    let necesidad = {
        idNecesidad:0,
        descripcionNecesidad:$("#txtDescripcion").val(),
        cantidadNecesidad: Number( $("#inpCantidad").val() ),
        fechaLimiteNecesidad: $("#inpFechaLimite").val(),
        fechaBajaNecesidad: "",
        categoria: {idCategoria:$("#slctCategoria").val(),nombreCategoria:$("#slctCategoria option:selected").text()},
        idUsuario: idUsuario
    }

    axios.post("/registrarNecesidad",necesidad)
    .then((response)=>{
        // console.log( 'respuesta' + response.data.id);
        // console.log(necesidad);
        necesidad.idNecesidad = response.data.id;
        desbloquearBoton($("#btnGuardarCambiosNecesidad"));
        let divNecesidades = $('.necesidades');
        divNecesidades.prepend(`<div class="col-md-6" id="necesidad${necesidad.idNecesidad}"></div>`);
        crearCardNecesidad(necesidad);
        agregarPaginacionNecesidades();
        alertify.success('Necesidad creada');
    });
}
function listarCategorias()
{
    $("#slctCategoria").html("<option value = '0'>--Seleccione una categoria--</option");
    axios.get("/listarCategoriasNecesidad")
    .then((response)=>{
        $.each(response.data.CategoriasNecesidad, function (indexInArray, categoria) {
            $("#slctCategoria").append("<option value = '" + categoria.idCategoria + "'>" + categoria.nombreCategoria + "</option");
        });
    });
}

function updateNecesidad(necesidad){
    //console.log("el id de la necesidad es " + idNecesidad);
    necesidad.descripcionNecesidad = $("#txtDescripcion").val();
    necesidad.cantidadNecesidad = Number( $("#inpCantidad").val() );
    necesidad.fechaLimiteNecesidad =  $("#inpFechaLimite").val();
    necesidad.fechaBajaNecesidad =  "";
    necesidad.categoria.idCategoria = $("#slctCategoria").val();
    necesidad.categoria.nombreCategoria = $("#slctCategoria option:selected").text();
    console.log($("#slctCategoria option :selected").text());
    JSON.stringify(necesidad);
    axios.post("/updateNecesidad",necesidad)
    .then((response)=>{
        if(response.data.resultado){
            //cargarNecesidades(idUsuario);
            crearCardNecesidad(necesidad);
            agregarPaginacionNecesidades();
            $("#modalEditarNecesidad").modal('toggle');
            document.getElementById("formEditarNecesidad").reset();
            desbloquearBoton($("#btnGuardarCambiosNecesidad"));
            // alert(response.data.message);
            alertify.success('Necesidad modificada');

        }else{
            alert(response.data.message);
        }
    });
}

function bajaNecesidad(idNecesidad){

    axios.post("/bajaNecesidad",{idNecesidad:idNecesidad})
    .then((response)=>{
        desbloquearBoton($("#btnConfirmarEliminarNecesidad"));
        if(response.data.resultado){

            $("#necesidad" + idNecesidad).remove();
            $("#modalBajaNecesidad").modal('toggle');
            $("#modalEditarNecesidad").modal('toggle');
            document.getElementById("formEditarNecesidad").reset();
            alertify.error('Necesidad eliminada');

        }else{
            alert(response.data.message);
        }
    });
}





function registrarNecesidad(idUsuario)
{
    //$("#formEditarNecesidad")[0].checkValidity();
    let necesidad = {
        idNecesidad:0,
        descripcionNecesidad:$("#txtDescripcion").val(),
        cantidadNecesidad:$("#inpCantidad").val(),
        fechaLimiteNecesidad: $("#inpFechaLimite").val(),
        fechaBajaNecesidad: "",
        categoriaNecesidad: {idCategoria:$("#slctCategoria").val(),nombreCategoria:$("#slctCategoria option :selected").text()},
        idUsuario: idUsuario
    }
    alert(JSON.stringify(necesidad));
    axios.post("/registrarNecesidad",necesidad)
    .then((response)=>{
        alert(response.data.message);
    });
}
function listarCategorias()
{
    $("#slctCategoria").html("<option value = '0'>--Seleccione una categoria--</option");
    axios.get("/listarCategoriasNecesidad")
    .then((response)=>{
        alert(JSON.stringify(response.data));
        $.each(response.data.CategoriasNecesidad, function (indexInArray, categoria) {
            $("#slctCategoria").append("<option value = '" + categoria.idCategoria + "'>" + categoria.nombreCategoria + "</option");
        });
    });
}

function updateNecesidad(idUsuario, idNecesidad){
    console.log("el id de la necesidad es " + idNecesidad);
    let necesidad ={
        idNecesidad:idNecesidad,
        descripcionNecesidad:$("#txtDescripcion").val(),
        cantidadNecesidad:$("#inpCantidad").val(),
        fechaLimiteNecesidad: $("#inpFechaLimite").val(),
        fechaBajaNecesidad: "",
        categoriaNecesidad: {idCategoria:$("#slctCategoria").val(),nombreCategoria:$("#slctCategoria option :selected").text()},
        idUsuario: idUsuario
    }

    alert(JSON.stringify(necesidad));
    axios.post("/updateNecesidad",necesidad)
    .then((response)=>{
        if(response.data.resultado){
            cargarNecesidades(idUsuario);
            $("#modalEditarNecesidad").modal('toggle');
            document.getElementById("formEditarNecesidad").reset();
            alert(response.data.message);
        }else{
            alert(response.data.message);
        }
    });
}

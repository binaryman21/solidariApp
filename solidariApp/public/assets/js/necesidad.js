
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
        $.each(response.data.CategoriasNecesidad, function (indexInArray, categoria) {
            $("#slctCategoria").append("<option value = '" + categoria.idCategoria + "'>" + categoria.nombreCategoria + "</option");
        });
    });
}

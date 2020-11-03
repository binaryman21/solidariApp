document.addEventListener('DOMContentLoaded', () => {
    isLoggedIn(cargarDatosPerfil);
    agregarPaginacionComentarios();
    agregarPaginacionNecesidades();

    $("#editarMiPerfil").click(camposEditables);
    $("#guardarCambios").click(guardarCambios);
    $("#btnConfirmarDarmeDeBaja").click(bajaUsuario);
    $("#btnConfirmarFotoPerfil").click(updateFotoPerfil);
})

/*Dar de baja el usuario logeado*/
function bajaUsuario()
{
     axios.post("/bajaUsuario")
    .then((response)=>{
        if(response.data.resultado === 1 ){
           console.log(response.data.message);

        }else{
            /*Ocurrio un error*/
            alert("Ocurrio un error inesperado.");
            console.log(response.data.message);
        }   
    });

}

/*Actualizar foto de perfil de usuario logeado*/
function updateFotoPerfil(urlFotoPerfil)
{
    /*rlFotoPerfil = 'https://lh3.googleusercontent.com/a-/AOh14GhTGY3nf9J3kD650nNV6TieHWdgU_wVpKDOMrK1wA=s96-c';*/
     axios.post("/updateFotoPerfil/"+"'"+urlFotoPerfil+"'")
    .then((response)=>{
        if(response.data.resultado === 1 ){
           console.log(response.data.message);

        }else{
            /*Ocurrio un error*/
            alert("Ocurrio un error inesperado.");
            console.log(response.data.message);
        }   
    });

}


/*Hace los campos editables al apretar boton "Editar"*/
function camposEditables() {
    /*Botones*/
    $("#guardarCambios").removeClass("d-none");
    $("#editarMiPerfil").addClass("disabled");


    /*Campos editables*/
    $(".campoEditable").prop('disabled', false);

    /*Mostrar botones de "Agregar*/
    $("#btnAgregarTelefono").removeClass("d-none");
    $("#btnAgregarDireccion").removeClass("d-none");
    $("#btnModificarImgPerfil").removeClass("d-none");
    $(".eliminar").removeClass("d-none");



}

/*Guarda los cambios realizados*/
function guardarCambios() {
    /*TODO: Guardar cambios en base de datos*/
    /** */
    if (1 )
    /*Si los cambios fueron guardados exitosamente vuelvo a la vista original (sin modo edicion)*/ {


        $("#guardarCambios").addClass("d-none");
        $("#editarMiPerfil").removeClass("disabled");
        $("#btnAgregarTelefono").addClass("d-none");
        $("#btnAgregarDireccion").addClass("d-none");
        $(".campoEditable").prop('disabled', true);
        $("#btnModificarImgPerfil").addClass("d-none");
        $(".eliminar").addClass("d-none");
    } else {
        /*Imprimir error*/
    }

}


function cargarDatosPerfil(usuario)
{

    getColaborador(usuario.idUsuario);
    //getTelefonosUsuario(usuario.idUsuario);
    //getDomiciliosUsuario(usuario.idUsuario);
}

function getColaborador(idUsuario){
    axios.get("/getColaborador/"+idUsuario)
    .then((response)=>{
        var colaborador = response.data.colaborador;
        $("#nombreColaborador").html(colaborador.nombreColaborador + " " + colaborador.apellidoColaborador);
        $("#imgPerfilColaborador").attr("src",colaborador.urlFotoPerfilUsuario);
        $("#emailColaborador").val(colaborador.emailUsuario);
        $("#fechaAltaUsuario").val(colaborador.fechaAltaUsuario);
        $.each(response.data.domicilios, function (indexInArray, domicilio) {
            $("#listadoDomicilios").html("");
             $("#listadoDomicilios").append(`<div class="form-row">
             <div class="col-9 col-md-6 mb-3">
                 <input type="text" class="form-control campoEditable" id="calle" value = "` + domicilio.calle + `" disabled placeholder="Calle" required>
                 <span class="error text-danger errorCalle"> </span>
             </div>
             <div class="col-3 col-md-2 mb-3">
                 <input type="text" class="form-control campoEditable" id="numero" value = "` + domicilio.numero + `" disabled placeholder="Nro" required>
                 <span class="error text-danger errorNro"> </span>
             </div>
             <div class="col-6 col-md-2 mb-3">
                 <input type="text" class="form-control campoEditable" id="piso" disabled placeholder="Piso" value = "` + domicilio.piso + `" required>
                 <span class="error text-danger errorPiso"> </span>
             </div>
             <div class="col-6 col-md-2 mb-3">
                 <input type="text" class="form-control campoEditable" id="depto" disabled placeholder="Depto" value = "` + domicilio.depto + `" required>
                 <span class="error text-danger errorDepto"> </span>
             </div>
         </div>`);
        });
        $.each(response.data.telefonos, function (indexInArray, telefono) {
            $("#listadoTelefonos").html("");

            $("#listadoTelefonos").append(`<div class="form-row">
            <div class="col-3 col-mb-3 mb-3">
                <input type="text" class="form-control campoEditable" id="codArea" value="` + telefono.codAreaTelefono + `" disabled placeholder="Cod. Area" required>
                <span class="error text-danger errorCodArea"> </span>
            </div>
            <div class="col-6 col-mb-6 mb-6">

                <input type="text" class="form-control campoEditable" id="numeroTelefono" value="` + telefono.numeroTelefono + `" disabled placeholder="Numero" required>
                <span class="error text-danger errorNroTelefono"></span>
            </div>
            <div class="col-1 col-mb-1 mb-1">
                <button type="button" class="btn btn-danger btn-sm eliminar d-none">Eliminar</button>
            </div>
        </div>`);

        });
    });
}
/*
function getTelefonosUsuario(idUsuario){
    axios.get("/listarTelefonosUsuario/"+idUsuario)
    .then((response)=>{
        let telefonos = response.data.telefonos;
       $.each(telefonos, function (indexInArray, telefono) {
           $("#listadoTelefonos").html("");
            $("#listadoTelefonos").append("<input type='text' class='form-control' value=("+ telefono.codAreaTelefono +")" + telefono.numeroTelefono + " disabled required></input>");
       });
    });
}

function getDomiciliosUsuario(idUsuario){
    axios.get("/listarDomiciliosUsuario/"+idUsuario)
    .then((response)=>{
        let domicilios = response.data.domicilios;
       $.each(domicilios, function (indexInArray, domicilio) {
           $("#listadoDomicilios").html("");
            $("#listadoDomicilios").append("<input type='text' class='form-control' value="+ domicilio.calle + " " + domicilio.numero + ", " + domicilio.localidad + " disabled required></input>");
       });
    });
}
*/
function agregarPaginacionComentarios(){
    $('.comentarios').after('<div id="navComentarios"></div>');
    let comentario = document.querySelectorAll('.comentario')
    let filasMostradas = 2;
    let filasTotales = comentario.length;

    let numPaginas = filasTotales / filasMostradas;
    for (i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navComentarios').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $(comentario).hide();
    $(comentario).slice(0, filasMostradas).show();
    $('#navComentarios a:first').addClass('active');
    $('#navComentarios a').bind('click', function () {
        $('#navComentarios a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $(comentario).css('opacity', '0.0').hide().slice(primerItem, ultimoItem).
            css('display', 'block').animate({ opacity: 1 }, 300);
    });
}

function agregarPaginacionNecesidades() {
    $('.necesidades').after('<div id="navNecesidades"></div>');
    let necesidad = document.querySelectorAll('.necesidad')
    let filasMostradas = 4;
    let filasTotales = necesidad.length;

    let numPaginas = filasTotales / filasMostradas;
    for (i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navNecesidades').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $(necesidad).hide();
    $(necesidad).slice(0, filasMostradas).show();
    $('#navNecesidades a:first').addClass('active');
    $('#navNecesidades a').bind('click', function () {
        $('#navNecesidades a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $(necesidad).css('opacity', '0.0').hide().slice(primerItem, ultimoItem).
            css('display', 'block').animate({ opacity: 1 }, 300);
    });
}

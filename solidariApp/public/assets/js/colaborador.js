


document.addEventListener('DOMContentLoaded', ()=>{
    isLoggedIn(cargarDatosPerfil);
    agregarPaginacionComentarios();
    agregarPaginacionNecesidades();

})

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
             $("#listadoDomicilios").append("<input type='text' class='form-control' value='"+ domicilio.calle + " " + domicilio.numero + ", " + domicilio.localidad + "' disabled required></input>");
        });
        $.each(response.data.telefonos, function (indexInArray, telefono) {
            $("#listadoTelefonos").html("");
             $("#listadoTelefonos").append("<input type='text' class='form-control' value=("+ telefono.codAreaTelefono +")" + telefono.numeroTelefono + " disabled required></input>");
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

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navComentarios').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $( comentario ).hide();
    $( comentario ).slice(0, filasMostradas).show();
    $('#navComentarios a:first').addClass('active');
    $('#navComentarios a').bind('click', function(){
        $('#navComentarios a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( comentario ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

function agregarPaginacionNecesidades(){
    $('.necesidades').after('<div id="navNecesidades"></div>');
    let necesidad = document.querySelectorAll('.necesidad')
    let filasMostradas = 4;
    let filasTotales = necesidad.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navNecesidades').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $( necesidad ).hide();
    $( necesidad ).slice(0, filasMostradas).show();
    $('#navNecesidades a:first').addClass('active');
    $('#navNecesidades a').bind('click', function(){
        $('#navNecesidades a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( necesidad ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

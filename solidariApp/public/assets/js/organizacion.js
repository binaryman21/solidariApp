document.addEventListener('DOMContentLoaded', ()=>{
    isLoggedIn(cargarDatosPerfil);
    agregarPaginacionComentarios();
    agregarPaginacionNecesidades();

})

function cargarDatosPerfil(usuario)
{

    getOrganizacion(usuario.idUsuario);
    //getTelefonosUsuario(usuario.idUsuario);
    //getDomiciliosUsuario(usuario.idUsuario);
}

function getOrganizacion(idUsuario){
    axios.get("/getOrganizacion/"+idUsuario)
    .then((response)=>{
        var organizacion = response.data.organizacion;
        $("#nombreOrganizacion").html(organizacion.razonSocial);
        $("#tipoOrganizacion").html(organizacion.nombreTipoOrganizacion);
        $("#urlFotoPerfilOrganizacion").attr("src",organizacion.urlFotoPerfilUsuario);
        $("#emailOrganizacion").val(organizacion.emailUsuario);
        $("#fechaAltaUsuario").val(organizacion.fechaAltaUsuario);
        alert(JSON.stringify(response.data));
        $.each(response.data.domicilios, function (indexInArray, domicilio) {
            $("#listadoDomicilios").html("");
             $("#listadoDomicilios").append("<input type='text' class='form-control' value='"+ domicilio.calle + " " + domicilio.numero + ", " + domicilio.nombreLocalidad + "' disabled required></input>");
        });
        $.each(response.data.telefonos, function (indexInArray, telefono) {
            $("#listadoTelefonos").html("");
             $("#listadoTelefonos").append("<input type='text' class='form-control' value=("+ telefono.codAreaTelefono +")" + telefono.numeroTelefono + " disabled required></input>");
        });
    });
}


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

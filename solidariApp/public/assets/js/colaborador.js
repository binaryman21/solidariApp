document.addEventListener('DOMContentLoaded', () => {
    agregarPaginacionComentarios();
    agregarPaginacionNecesidades();

    $("#editarMiPerfil").click(camposEditables);
    $("#guardarCambios").click(guardarCambios);

})

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

function agregarPaginacionComentarios() {
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
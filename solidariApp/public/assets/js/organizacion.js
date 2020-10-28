document.addEventListener('DOMContentLoaded', ()=>{
    agregarPaginacionComentarios();
    agregarPaginacionNecesidades();

    $("#btnEditarNecesidad").click(()=>{
        mostrarModalEditarNecesidad();
    })

    //cambiar color del modalEditarNecesidad en función de la categoria.
    let categoriaActual;
    $("#slctCategoria").change(()=>{
        let colorModal = $("#slctCategoria option:selected").text().toLowerCase();
        $("#modalEditarNecesidad .modal-content").removeClass(categoriaActual);
        $("#modalEditarNecesidad .modal-content").addClass(colorModal);
        categoriaActual = $("#slctCategoria option:selected").text().toLowerCase();
    })

    console.log('si');
})


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

function mostrarModalEditarNecesidad(){
    /*let colorModal = $("#cardCategoria").text().toLowerCase();
    $("#modalEditarNecesidad .modal-content").addClass(colorModal);
    console.log("color " + colorModal);*/

}

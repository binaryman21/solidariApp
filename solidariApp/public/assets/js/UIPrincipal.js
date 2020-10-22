$( document ).ready(function() {

    let btnRegistrarseComoOrganizacion = document.getElementById("btnRegistrarseComoOrganizacion");
    let btnRegistrarseComoColaborador = document.getElementById("btnRegistrarseComoColaborador");

    btnRegistrarseComoColaborador.addEventListener('click', mostrarRegistrarseComoOrganizacion);
    btnRegistrarseComoOrganizacion.addEventListener('click', mostrarRegistrarseComoColaborador);
    agregarPaginacionListaOrganizaciones();
});


function mostrarRegistrarseComoOrganizacion(){
    let exclusivoOrg = $('.exclusivoOrg');
    let exclusivoCol = $('.exclusivoCol');
    exclusivoCol.hide();
    exclusivoOrg.show();
}

function mostrarRegistrarseComoColaborador(){
    let exclusivoOrg = $('.exclusivoOrg');
    let exclusivoCol = $('.exclusivoCol');
    exclusivoOrg.hide();    
    exclusivoCol.show();    
}

function agregarPaginacionListaOrganizaciones(){
    $('.listaOrganizaciones').after('<div id="navListaOrganizaciones"></div>');
    let organizacion = document.querySelectorAll('.cardOrganizacion')
    let filasMostradas = 2;
    let filasTotales = organizacion.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navListaOrganizaciones').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $( organizacion ).hide();
    $( organizacion ).slice(0, filasMostradas).show();
    $('#navListaOrganizaciones a:first').addClass('active');
    $('#navListaOrganizaciones a').bind('click', function(){
        $('#navListaOrganizaciones a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( organizacion ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

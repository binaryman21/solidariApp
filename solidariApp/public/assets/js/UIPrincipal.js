$( document ).ready(function() {

    let btnRegistrarseComoOrganizacion = document.getElementById("btnRegistrarseComoOrganizacion");
    let btnRegistrarseComoColaborador = document.getElementById("btnRegistrarseComoColaborador");

    btnRegistrarseComoColaborador.addEventListener('click', mostrarRegistrarseComoOrganizacion);
    btnRegistrarseComoOrganizacion.addEventListener('click', mostrarRegistrarseComoColaborador);
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

$( document ).ready(function() {

    let btnRegistrarseComoOrganizacion = document.getElementById("btnRegistrarseComoOrganizacion");
    let btnRegistrarseComoColaborador = document.getElementById("btnRegistrarseComoColaborador");

    btnRegistrarseComoColaborador.addEventListener('click', mostrarRegistrarseComoOrganizacion);
    btnRegistrarseComoOrganizacion.addEventListener('click', mostrarRegistrarseComoColaborador);
});

/*Cuando se hace click en Registrase como Organizacion, se muestra el modal de
Registrase pero se reemplaza el target del boton por el modal de alta de Organizacion*/
function mostrarRegistrarseComoOrganizacion(){
    let btnCrearCuenta = document.getElementById("btnCrearCuenta");
    btnCrearCuenta.dataset.target = "#modalOrganizacion";
    document.getElementById("registroVisitante").textContent = 'organizacion';
}

/*Cuando se hace click en Registrase como Colaborador, se muestra el modal de
Registrase pero se reemplaza el target del boton por el modal de alta de Colaborador*/
function mostrarRegistrarseComoColaborador(){
    let btnCrearCuenta = document.getElementById("btnCrearCuenta");
    btnCrearCuenta.dataset.target = "#modalColaborador";
    document.getElementById("registroVisitante").textContent = 'colaborador';
}

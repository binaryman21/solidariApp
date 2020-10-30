document.addEventListener('DOMContentLoaded', () => {

    activarNavItem();

})

/*activo el menu que corresponde*/
function activarNavItem() {
    var pathname = window.location.pathname;
    switch (pathname) {
        case '/contacto':
            $("#navContacto").addClass("active");
            break;
        case '/acerca':
            $("#navAcerca").addClass("active");
            break;
        default:
            $("#navInicio").addClass("active");
    }
}
document.addEventListener('DOMContentLoaded', () => {

    activarNavItem();
    $('.modal').on("hidden.bs.modal", function (e) { //fire on closing modal box
        if ($('.modal:visible').length) { // check whether parent modal is opend after child modal close
            $('body').addClass('modal-open'); // if open mean length is 1 then add a bootstrap css class to body of the page
        }
    });

    alertify.set('notifier', 'position', 'bottom-left')


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
document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({funcionSuccess: configurarCuentaDeLaOrganizacion, RedirectIfNot: true});
    
    let btnAgregarTelefono = $('#btnAgregarTelefono');
    let btnAgregarDireccion = $('#btnAgregarDireccion');
    var formularioTelefono = $('#nuevoTelefono');
    var formularioDomicilio = $('#formularioDomicilio');
    let navPills = $('#v-pills-tab');
    let navTabs = $('#nav-tab');
    let opcionesPills = navPills.find('a[role=tab]');
    let opcionesTabs = navTabs.find('a[role=tab]');
    let btnGuardarCambiosDomicilio = $('#btnGuardarCambiosDomicilio');

    btnGuardarCambiosDomicilio.on('click', e => {

        ActualizarDomicilio(e);
    });
    
    btnAgregarTelefono.on('click', e => {

        EstablecerFormTelefonosEn({title:'Agregar nuevo telefono'});
    });

    btnAgregarDireccion.on('click', e => {

        EstablecerFormDomiciliosEn({title:'Agregar nuevo domicilio'});
    });

    opcionesPills.on('hide.bs.tab', (e) => {
        
        navTabs.find(`a[href="#${$(e.target).attr('aria-controls')}"]`).removeClass('active').attr('aria-selected', false);
        navTabs.find(`[href="#${$(e.relatedTarget).attr('aria-controls')}"]`).addClass('active').attr('aria-selected', true);
    });

    opcionesTabs.on('hide.bs.tab', (e) => {
        
        navPills.find(`[href="#${$(e.target).attr('aria-controls')}"]`).removeClass('active').attr('aria-selected', false);
        navPills.find(`[href="#${$(e.relatedTarget).attr('aria-controls')}"]`).addClass('active').attr('aria-selected', true);
    });

    formularioTelefono.on('show.bs.collapse', () => formularioDomicilio.collapse('hide'));
    formularioTelefono.find('button.close').on('click', () => formularioTelefono.collapse('hide'));
    formularioDomicilio.on('show.bs.collapse', () => formularioTelefono.collapse('hide'));
    formularioDomicilio.find('button.close').on('click', () => formularioDomicilio.collapse('hide'));
})

var FetchedDomicilios = [];
var FetchedTelefonos = [];

function configurarCuentaDeLaOrganizacion(idUsuario){

    axios.get("/getOrganizacion/"+idUsuario)
    .then((response)=>{
        
        let organizacion = response.data.organizacion;
        $("#nombreOrganizacion").html(organizacion.razonSocial);
        $("#tipoOrganizacion").html(organizacion.nombreTipoOrganizacion);
        $("#urlFotoPerfilOrganizacion").attr("src",organizacion.urlFotoPerfilUsuario);
        if(organizacion.descripcionOrganizacion == "")
        {
            organizacion.descripcionOrganizacion = "No has especificado una descripcion todavia";
        }

        $("#descripcionOrganizacion").val(organizacion.descripcionOrganizacion);
        $("#descripcionOrganizacion").toggleClass("loading");
        $("#fechaAltaUsuario").html(`Eres usuario desde el ${moment(organizacion.fechaAltaUsuario, "YYYY-MM-DD HH:mm:ss").format('LL')}`);
        
        $("#emailOrganizacion").html(organizacion.emailUsuario);

        //DOMICILIOS
        
        var $listaDomicilios = $('#listadoDomicilios');
        if(response.data.domicilios && response.data.domicilios.length){
            
            FetchedDomicilios = response.data.domicilios;
            var $domiciliosFragment = $(document.createDocumentFragment());
            $.each(FetchedDomicilios, function (indexInArray, domicilio) {
    
                var piso = (domicilio.piso != '') ? `Piso ${domicilio.piso}` : '';
                var depto = (domicilio.depto != '') ? `Depto ${domicilio.depto}` : '';

                $domiciliosFragment.append(
                    `<li class="list-group-item list-group-item-action px-2 py-1 d-flex justify-content-between align-items-center" id="domicilio${domicilio.idDomicilio}">
                        <div>
                            <small class="m-1 d-block  text-truncate">${domicilio.calle} ${domicilio.numero}, ${piso}, ${depto}</small>
                            <small class="m-1 text-black-50 text-truncate">${domicilio.nombreLocalidad}, ${domicilio.nombreProvincia}</small>
                        </div>
                        <button class="btn dropdown" type="button" id="dirOptions-forID-${domicilio.idDomicilio}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-xs"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-lg-right shadow" aria-labelledby="telOptions-forID-${domicilio.idDomicilio}" style="">
                            <button class="dropdown-item" id="btnEdite-Dir${indexInArray}" data-dir="${indexInArray}" type="button">Editar</button>
                        </div>
                    </li>`
                );

                $domiciliosFragment.find(`#btnEdite-Dir${indexInArray}`).on('click', e => {EditarEnFormDomicilios(e)});
            });
    
            $listaDomicilios.html($domiciliosFragment);
        }
        else $listaDomicilios.html('<p class="mb-2">No hay domicilios registrados</p>');
        
        //TELEFONOS
        var $listadoTelefonos = $("#listadoTelefonos");
        if(response.data.telefonos && response.data.telefonos.length){
            
            FetchedTelefonos = response.data.telefonos;
            var $telefonosFragment = $(document.createDocumentFragment())
            $.each(FetchedTelefonos, function (indexInArray, telefono) {
                $telefonosFragment.append(
                `<a id="telefono${telefono.idTelefono}" class="list-group-item list-group-item list-group-item-action px-2 py-1 d-flex justify-content-between align-items-center">
                    <span class="m-1">${telefono.codAreaTelefono} - ${telefono.numeroTelefono}</span>
                    <button class="btn dropdown" type="button" id="telOptions-forID-${telefono.idTelefono}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-ellipsis-v fa-xs"></i></button>
                    <div class="dropdown-menu dropdown-menu-lg-right shadow" aria-labelledby="telOptions-forID-${telefono.idTelefono}">
                        <button class="dropdown-item" id="btnEdite-Tel${indexInArray}" data-tel="${indexInArray}" type="button">Editar</button>
                        <button class="dropdown-item" id="btnDelete-Tel${indexInArray}" data-tel="${indexInArray}" type="button">Eliminar</button>
                    </div>
                </a>`);

                $telefonosFragment.find(`#btnEdite-Tel${indexInArray}`).on('click', function (e) {EditarEnFormTelefonos(e)});
                $telefonosFragment.find(`#btnDelete-Tel${indexInArray}`).on('click', function (e) {EliminarTelefono(e)});
            });
    
            $listadoTelefonos.html($telefonosFragment);
        }
        else $listadoTelefonos.html('<p class="mb-2">No hay telefonos registrados</p>');
    });
}

function EditarEnFormDomicilios(e){

    let id = $(e.target).data('dir');
    let dir = FetchedDomicilios[id];
    EstablecerFormDomiciliosEn({title: 'Editar direccion', data: dir});
    $('#formularioDomicilio').collapse('show');
}
function EditarEnFormTelefonos(e){

    let id = $(e.target).data('tel');
    let tel = FetchedTelefonos[id];
    EstablecerFormTelefonosEn({title: 'Editar direccion', data: tel});
    $('#nuevoTelefono').collapse('show');
}

function EliminarTelefono(e){

    let id = $(e.target).data('tel');
    let tel = FetchedTelefonos[id];
    alertify.confirm(
        
        'Eliminar telefono',
        `Estas seguro que quieres eliminar el telefono ${tel.codAreaTelefono} ${tel.numeroTelefono}`,
        function(){ 

            axios.post("/eliminarTelefono", {idTelefono:tel.idTelefono})
            .then((response)=>{
                
                if(response.data.resultado){

                    $(e.target).parent()
                    .replacewith('Eliminado')
                    .fadeOut(1000)
                    .animate({
                       "opacity" : "0",
                    }, function() {
                        alertify.success(response.data.message);
                        $(this).remove();
                        FetchedTelefonos.slice(id, 1);
                    });
                };
            })
            .catch(error => console.log(error));
        },
        function(){


        }
    );
}

function EstablecerFormDomiciliosEn({title="", data = {}} = {}) {

    $('#formDirTitle').text(title);
    $('#calle').val(data.calle || '');
    $('#numero').val(data.numero || '');
    $('#piso').val(data.piso || '');
    $('#dpto').val(data.depto || '');
    $('#selectLocalidad').val(data.idLocalidad || -1);
    $('#selectProvincia').val(data.idProvincia || -1);
}

function EstablecerFormTelefonosEn({title="", data = {}} = {}) {

    $('#formTelTitle').text(title);
    $('#codArea').val(data.codAreaTelefono || '');
    $('#numeroTelefono').val(data.numeroTelefono || '');
}

function ActualizarDomicilio(e){

    let id = $(e.target).data('dir');
    axios.post("/actualizarDomicilio", {idDomicilio:46, calle: "San Luis", numero: 675, idLocalidad:3})
    .then((response)=>{
        
        console.log(response.data);
    });
}
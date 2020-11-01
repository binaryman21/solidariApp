var map = L.map('mapa');
var markers = []

document.addEventListener('DOMContentLoaded', ()=> {
    getLocation();
})

function cargarMapa( lat, lng ){   
    map.setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, errorMapa);
    } else {
      console.log( "Geolocation is not supported by this browser." );
    }
  }
  
  function showPosition(position) {
    // latitud y longitud de tu navegaor
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    cargarMapa( lat , lng );
  }
  
  function errorMapa( error ){
    // latitud y longitud de la UPE
    let lat= -34.788942;
    let lng= -58.523357;
    cargarMapa( lat, lng )
  }

  function cargarOrgEnMapa( organizacion ){
      markers[organizacion.idUsuario] =  new L.marker([organizacion.latitud, organizacion.longitud], {id: organizacion.idUsuario}).addTo(map)
      .bindPopup( organizacion.razonSocial )
      .openPopup();
      markers[organizacion.idUsuario].on('click', () => {
        $('.modal-footer .btn-link').remove()
        $('.modal-title').text( organizacion.razonSocial );
        let card = $(`.cardOrganizacion${organizacion.idUsuario}`).clone();
        console.log( card );
        $("#modalOrganizaciones .modal-body").html( card );
        $("#modalOrganizaciones .modal-body .cardOrganizacion").css('display', 'block');
        $('.modal-footer').append( $("#modalOrganizaciones .modal-body .btn-link") )
        $("#modalOrganizaciones .modal-body .btn-link").remove();
        $('.btnDetalleOrg').on( 'click', ocultarModal )
        $("#modalOrganizaciones").modal('show');
      })
      getLocation();
  }

  function ocultarModal(){
    $("#modalOrganizaciones").modal('hide')
    $("#modalOrganizaciones .modal-body").html( '' );
  }
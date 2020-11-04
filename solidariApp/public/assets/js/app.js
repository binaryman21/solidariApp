var map = L.map('mapa', {
    attributionControl: false
});
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
        $("#modalOrganizaciones .modal-body").html( '' );
        $("#modalOrganizaciones .modal-footer .btn-link").remove();
        let cardOrganizacion = 
          `<div class = "cardOrganizacion cardOrganizacion${organizacion.idUsuario} my-2rounded shadow-sm border my-2 pb-3">
              <div class ="d-flex flex-row m-2 px-2 pt-5 justify-content-star detalleOrganizacion rounded align-items-center">
                <img class="rounded-circle imgPerfilOrg" src="${organizacion.urlFotoPerfilUsuario}" alt="imagen de usuario">
                <div id="card-org-name" class="ml-2">
                    <p>${organizacion.razonSocial}</p>
                    <p>${organizacion.nombreTipoOrganizacion}</p>
                </div>
              </div>
              <div class = "listaNecesidades${organizacion.idUsuario} px-2">
              </div>
            </div>`
              $("#modalOrganizaciones .modal-body").append( cardOrganizacion );
              $('#modalOrganizaciones .modal-footer').append('<button class = "btn btn-link float-right">Ver todas</button>');
              organizacion.necesidades.forEach( necesidad => {
              $(`#modalOrganizaciones .listaNecesidades${organizacion.idUsuario}`).append(
                  `<div class="card necesidad ${necesidad.categoria.nombreCategoria.toLowerCase()}">           
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <p class="font-weight-bold">${necesidad.categoria.nombreCategoria}</p>
                          <p>${necesidad.descripcionNecesidad}</p>
                        </div>
                      <div class = "col-md-6 d-flex flex-row align-items-end justify-content-end">
                        <button class = "btn btn-primary btnDetalleOrg btnDetalleOrg${necesidad.idNecesidad}" data-toggle="modal" data-target="#modalDetalleNecesidad">Me interesa</button></div>
                      </div>
                    </div>
                  </div>`
                  )
                  $(`.btnDetalleOrg${necesidad.idNecesidad}`).on('click', function(){
                      cargarDatosModalDetalleNecesidad(necesidad);    
                  })
              })
          $('.btnDetalleOrg').on( 'click', ocultarModal )
          $("#modalOrganizaciones").modal('show');
      })
      getLocation();
  }

  function ocultarModal(){
    $("#modalOrganizaciones").modal('hide');
  }
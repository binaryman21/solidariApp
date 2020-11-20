//FUNCIONALIDAD DE LOS MAPAS

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
        $('.modal-title').text( organizacion.razonSocial );
        $("#modalOrganizaciones .modal-body").html( '' );
        let cardOrganizacion = 
        `<div class="card cardOrganizacion cardOrganizacion${organizacion.idUsuario} shadow-sm my-2" style="display: block; opacity: 1;">
          <div class="card-header d-flex flex-row px-2 justify-content-star detalleOrganizacion align-items-center">
              <img class="rounded-circle imgPerfilOrg" src="${organizacion.urlFotoPerfilUsuario || 'assets/img/imgUserProfile.png'}" alt="Avatar de la org ${organizacion.razonSocial}">
              <div id="card-org-name" class="ml-2">
                  <a href="organizacion/${organizacion.idUsuario}">${organizacion.razonSocial}</a>
                  <a href="#">${organizacion.nombreTipoOrganizacion}</a>
              </div>
          </div>
          <div class="card-body p-0 listaNecesidades${organizacion.idUsuario}">

          </div>
          <div class="card-footer py-0 bg-transparent">
              <a href="/organizacion/${organizacion.idUsuario}" class="btn btn-sm w-100 btn-link ml-auto text-decoration-none text-muted">Ver todas</a>
          </div>
        </div>`
        $("#modalOrganizaciones .modal-body").append( cardOrganizacion );
        organizacion.necesidades.forEach( necesidad => {
          $category = necesidad.nombreCategoria.split(' ')[0].toLowerCase();
          $diffDate = moment(necesidad.fechaCreacionNecesidad, "YYYY-MM-DD HH:mm:ss").startOf('day').fromNow();
          $(`#modalOrganizaciones .listaNecesidades${organizacion.idUsuario}`).append(
              ` <div class="need ${$category}">
                  <div class="card-body py-2 px-3">
                      <div class="card-title"><a title="${$category}" href="#" class="card-category">${capitalize(necesidad.nombreCategoria)}</a></div>
                      <div class="card-subtitle text-muted">${capitalize(necesidad.descripcionNecesidad)}</div>
                  </div>
                  <div class="card-footer d-flex align-items-center p-0">
                      <small class="ml-3 mr-auto align-items-center">${$diffDate}</small>
                      <button class="btn btn-link btn-sm btnDetalleOrg btnDetalleOrg${necesidad.idNecesidad} text-decoration-none pl-0" data-toggle="modal" data-target="#modalDetalleNecesidad">Me interesa</button>
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
document.addEventListener('DOMContentLoaded', ()=> {
    getLocation();
})

function cargarMapa( lat, lng ){   
    let map = L.map('mapa');
    map.setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map)
        .bindPopup('Organizaciones')
        .openPopup();
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
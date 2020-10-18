document.addEventListener('DOMContentLoaded', ()=> {
    cargarMapa();
    verCoordenadas();
})



function cargarMapa(){
    // latitud y longitud de la UPE
    let lat= -34.788942;
    let lng= -58.523357;
    let map = L.map('mapa').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map)
        .bindPopup('Organizaciones')
        .openPopup();
}

function verCoordenadas(){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
    }

function showPosition(position) {
    console.log( "Latitude: " + position.coords.latitude +
    "Longitude: " + position.coords.longitude);
}
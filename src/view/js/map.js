let lat=-38.5601517;
let lng=-6.88769800;

let map = L.map('map', {
    center: [-6.887698002563706, -38.56015173326553],
    zoom: 15,
    minZoom: 14,
    maxZoom: 16
});

let houseIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/256/4064/4064836.png',

    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
});

let marker = L.marker([-6.887698002563706, -38.56015173326553], {
    draggable: true,
    icon:houseIcon
}).addTo(map);

map.locate();

map.on('locationfound', e => {
    marker.setLatLng(e.latlng);
    map.setView(e.latlng);
    lat=marker.getLatLng().lat;
    lng=marker.getLatLng().lng;
});

map.on('click', l => {
    marker.setLatLng(l.latlng);
    map.setView(l.latlng);
    lat=marker.getLatLng().lat;
    lng=marker.getLatLng().lng;
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

export {lat,lng};

// Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibWFuaXNobWhyMiIsImEiOiJjandlZHV3cG8wcTZ4NDZxaGFwbzhjbWx2In0.IBcVZ_6eWKKr7FYl8dt-cA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});


// Googlemaps
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(27.719519,85.302804),
        zoom:10,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);




}
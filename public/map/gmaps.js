// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.524511, lng: -0.099124},
    zoom: 18
  });

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var userMarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: im,
        title: 'Hello I live here!',
        animation: google.maps.Animation.BOUNCE
      });

      infoWindow.setPosition({lat: 51.523690, lng: -0.098834});
      infoWindow.setContent('Smelly bin');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

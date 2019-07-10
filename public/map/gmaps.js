// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';

function initMap() {
  var styledMapType = new google.maps.StyledMapType(
    [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 13
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#144b53"
              },
              {
                  "lightness": 14
              },
              {
                  "weight": 1.4
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#08304b"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#0c4152"
              },
              {
                  "lightness": 5
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#0b434f"
              },
              {
                  "lightness": 25
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#0b3d51"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#146474"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#021019"
              }
          ]
      }
  ],
  {name: 'Styled Map'});

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.508, lng: -0.075},
    zoom: 18,
    gestureHandling: 'greedy',
    disableDefaultUI: true,
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  infoWindow = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      map.setCenter(new google.maps.LatLng(latitude, longitude));
      const pos = {
        lat: latitude,
        lng: longitude
      };
      var ourBouncingBallMarker = new google.maps.Marker({
        position: {lat: latitude, lng:  longitude},
        map: map,
        icon: im,
        title: 'Hello I live here!',
        animation: google.maps.Animation.BOUNCE
      });

    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  map.data.loadGeoJson('/api/sample-bins');

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

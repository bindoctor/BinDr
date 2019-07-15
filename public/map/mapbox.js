var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/bindr/cjxyplq2c064h1cmxgpyefs28',
  center: [-157.862539, 21.305034],
  zoom: 15
});

const geoLocation = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserLocation: true
});

map.on('load', function () {
  geoLocation.trigger();
  map.loadImage('/map-markers/mixed.png', function (error, image) {
    if (error) throw error;
    map.addImage('recyclingBin', image);
    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": "allBins",
      "layout": {
        "icon-image": "recyclingBin",
        "icon-size": 0.3
      }
    });
  });
  map.addSource('allBins', {
    type: 'geojson',
    data: '/api/bins'
  });
});

map.addControl(geoLocation);

let addBinMarker;

let lngLat;

map.on('click', (e) => {
  if(!addBinMarker) {
    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = 'mapboxgl-mixed-bin-marker';
    // el.draggable = true;
  
    // create the marker
    addBinMarker = new mapboxgl.Marker({draggable: true, element: el})
        .setLngLat(e.lngLat)
        .addTo(map);
    var addButton = document.getElementById('add-box');

    addButton.style.display = 'block';
        
    function onDragEnd() {
      lngLat = addBinMarker.getLngLat();
      console.log(lngLat)
      }
      
    addBinMarker.on('dragend', onDragEnd)
  } else {
    addBinMarker.setLngLat(e.lngLat)
  }

});

$(document).ready(function() {
  
  $('#submit-bin').click(function() {
    markerLngLat = addBinMarker.getLngLat()
    console.log(markerLngLat)
    var binType = $("input:radio[name='bintype']:checked").attr('id');
    console.log(binType)
    $.ajax({
      type: 'POST',
      url: `/api/bins`,
      data: {
        bin: {
          type: binType,
          lng: markerLngLat.lng,
          lat: markerLngLat.lat
        }
      }
    })
    .done(function(result){
      console.log(result)
      callback(result)
    })
  })
})

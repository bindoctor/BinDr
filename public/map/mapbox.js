let directions

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/bindr/cjxyplq2c064h1cmxgpyefs28",
  center: [-0.099207, 51.524531],
  zoom: 15
});

const geoLocation = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserLocation: true
});

map.on("load", async function() {
  geoLocation.trigger();

  Promise.all([
    new Promise((resolve, reject) => {
      map.loadImage('/map-markers/paper.png', (error, image) => {
        map.addImage('/map-markers/paper.png', image)
        resolve();
      });
    }),
    new Promise((resolve, reject) => {
      map.loadImage('/map-markers/plastic.png', (error, image) => {
        map.addImage('/map-markers/plastic.png', image)
        resolve();
      });
    }),
    new Promise((resolve, reject) => {
      map.loadImage('/map-markers/glass.png', (error, image) => {
        map.addImage('/map-markers/glass.png', image)
        resolve();
      });
    }),
    new Promise((resolve, reject) => {
      map.loadImage('/map-markers/mixed.png', (error, image) => {
        map.addImage('/map-markers/mixed.png', image)
        resolve();
      });
    }),
  ]).then(() => {
    map.addSource('allBins', {
      type: 'geojson',
      data: '/api/bins'
    });

    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": "allBins",
      "layout": {
        "icon-image": ['get', 'iconUrl', ['get', 'icon', ['get', 'binType']]],
        "icon-size": 0.3
      }
    });
  });
});

map.addControl(geoLocation, 'top-left');

var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

async function getAddress(lat, long) {
  let address
  await mapboxClient.geocoding.reverseGeocode({
    query: [lat, long],
    limit: 1
  })
    .send()
    .then(response => {
      if (response.body.features.length > 0) {
        address = (response.body.features[0].place_name)
      } else {
        address = "No address found"
      }
    })
  return address
}

map.on('click', 'points', function(event) {
  // console.log(event)
  const clickedPoint = event.features[0]
  console.log(clickedPoint)
  // console.log(clickedPoint.geometry.coordinates)
  console.log(event.lngLat)
  const binLng = clickedPoint.geometry.coordinates[0]
  const binLat = clickedPoint.geometry.coordinates[1]
  const binType = JSON.parse(clickedPoint.properties.binType).binTypeName
  const binId = clickedPoint.properties.binId
  console.log(binId)
  if (!addModeEnabled) {
    getAddress(binLng, binLat).then((address) => {
      new mapboxgl.Popup()
        .setLngLat({lng: binLng, lat: binLat})
        .setHTML(
          `
          <h3> ${binType} </h3>
          <h5>Address:</h4> 
          <p>${address}</p>
          <br>
          <button type="button" class="btn btn-primary" id="directions" onclick="startDirections(${event.lngLat.lng.toFixed(5)},${event.lngLat.lat.toFixed(5)})">Directions</button>
          <button type="button" class="btn btn-danger" id="delete" onclick="deleteBin('${binId}')">Delete</button>
          `,
        )
        .addTo(map);
    });
  }
});

function deleteBin(deleteId) {
  $.ajax({
    type: "DELETE",
    url: `/api/bins`,
    contentType: 'application/json',
    data: JSON.stringify({
      bin: {
        id: deleteId,
      }
    })
  })
  .done(function(result){
    refreshMapData()
  })
}


function startDirections(lng,lat) {
  console.log(lng,lat)
  directions = new MapboxDirections(({
    accessToken: mapboxgl.accessToken,
    interactive: false,
    zoom: 200,
    controls: {inputs: false, instructions: false},
    profile: 'mapbox/walking'
    }), 'top-left');
  directions.setOrigin([geoLocation._lastKnownPosition.coords.longitude, geoLocation._lastKnownPosition.coords.latitude])
  directions.setDestination([lng, lat])
  map.addControl(directions);
  $('#directions').remove();
  $('#remove-directions').remove();
  $("#container-with-buttons").append("<div id=\"remove-directions\"><button type=\"button\" class=\"btn btn-light map-button\" >Remove directions</button></div>");
  $('#remove-directions').click(function(event) {
    directions.removeRoutes();
    $('#remove-directions').remove();
  })
}

// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'states-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'states-layer', function () {
  map.getCanvas().style.cursor = '';
});

let addModeEnabled = false

let addBinMarker;

function toggleAddBins() {
  if (directions) {directions.removeRoutes()}
  $('#remove-directions').remove();

  if(addModeEnabled) {
    hideAddBox()
    hideAddMarker()
    addModeEnabled = false
    $('#add-toggle').html('Add a bin')
  } else {
    showAddBox()
    showAddMarker()
    addModeEnabled = true
    $('#add-toggle').html('Disable add mode')
  }
}

function showAddBox() {
  getAddBox().style.display = 'block';
}

function getAddBox() {
 return document.getElementById('add-box')

}

function hideAddBox() {
  getAddBox().style.display = 'none';
}

function showAddMarker() {
  var marker = document.createElement('div');
  marker.id = 'mapboxgl-mixed-bin-marker';

  addBinMarker = new mapboxgl.Marker({draggable: true, element: marker})
      .setLngLat(map.getCenter())
      .addTo(map);

}

function hideAddMarker() {
  addBinMarker.remove()
}

function refreshMapData() {
  map.getSource('allBins').setData('/api/bins');
}

map.on('click', (event) => {
  if(addModeEnabled) {
    addBinMarker.setLngLat(event.lngLat)
  }
});


$(document).ready(function() {
  $("#submit-bin").click(function() {
    markerLngLat = addBinMarker.getLngLat();
    var binType = $("input:radio[name='bintype']:checked").attr("id");

    $.ajax({
      type: "POST",
      url: `/api/bins`,
      headers: {
        Authorization: 'Token ' + $.cookie('Auth')
      },
      contentType: 'application/json',
      data: JSON.stringify({
        bin: {
          type: binType,
          lng: markerLngLat.lng,
          lat: markerLngLat.lat
        }
      })
    })
    .done(function(result){
      refreshMapData()
      toggleAddBins()
    });
  });

  $('#add-toggle').click(function(event) {
    $.ajax({
      url: '/api/users/current',
      type: 'get',
      headers: {
        Authorization: 'Token ' + $.cookie('Auth')
      },
      success: function(response, error) {
        toggleAddBins();
      },
      error: function() {
        window.location.replace('/login');
      }
    });
  });
});

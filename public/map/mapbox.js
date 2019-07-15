var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/bindr/cjxyplq2c064h1cmxgpyefs28',
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

map.on('load', async function () {
  geoLocation.trigger();

  await map.loadImage('/map-markers/paper.png', (error, image) => map.addImage('/map-markers/paper.png', image));
  await map.loadImage('/map-markers/plastic.png', (error, image) => map.addImage('/map-markers/plastic.png', image));
  await map.loadImage('/map-markers/mixed.png', (error, image) => map.addImage('/map-markers/mixed.png', image));
  await map.loadImage('/map-markers/glass.png', (error, image) => map.addImage('/map-markers/glass.png', image));

  map.addSource('allBins', {
    type: 'geojson',
    data: '/api/bins'
  });

  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": "allBins",
    "layout": {
      "icon-image": ['get','iconUrl', ['get', 'icon']],
      "icon-size": 0.3
    }
  });

  map.on('click', 'points', function (e) {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML("<h3>" + e.features[0].properties.binTypeName + "</h3>" + "<p>" + e.lngLat)
    .addTo(map);
    });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'states-layer', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
   
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'states-layer', function () {
    map.getCanvas().style.cursor = '';
  });
     

});

map.addControl(geoLocation);

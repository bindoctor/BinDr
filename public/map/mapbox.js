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

map.on('load', async function () {
  geoLocation.trigger();

  await map.loadImage('/map-markers/paper.png', (error, image) => {
    await map.addImage('/map-markers/paper.png', image)
  });
  await map.loadImage('/map-markers/plastic.png', (error, image) => { 
    await map.addImage('/map-markers/plastic.png', image)
  });
  await map.loadImage('/map-markers/mixed.png', (error, image) => {
    await map.addImage('/map-markers/mixed.png', image)
  });
  await map.loadImage('/map-markers/glass.png', (error, image) => {
    await map.addImage('/map-markers/glass.png', image)
  });
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
});

map.addControl(geoLocation);

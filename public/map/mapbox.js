var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/bindr/cjxyplq2c064h1cmxgpyefs28',
center: [-0.099207, 51.524531],
zoom: 15
});

map.on('load', function() {

const geoLocation = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true
});
map.addControl(geoLocation);
  
map.addSource('allBins', {
    type: 'geojson',
    data: '/api/bins'
});

map.on('load', function() {
    geoLocation.trigger();
    map.loadImage('/map-markers/mixed.png', function(error, image) {
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

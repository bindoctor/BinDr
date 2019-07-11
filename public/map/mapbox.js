var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [ -157.862539, 21.305034],
zoom: 15
});

const geoLocation = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true
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

geolocate.on('geoLocation', function() {
    var userlocation = geolocate._lastKnownPosition;
    var lat = userlocation.coords.latitude;
    var lng = userlocation.coords.longitude;

});

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aG9ueWh1bGwiLCJhIjoiY2p1Y2ZzZ2YxMDF5YTQ0b3pnM24wZHo2MiJ9.hMM0VZCqVFUmgqPjh1dqfg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
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

map.loadImage('/images/kissclipart-recycle-png-clipart-recycling-symbol-recycling-bin-d54071ced034dc09.png', function(error, image) {
    if (error) throw error;
    map.addImage('recyclingBin', image);
    map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": "allBins",
        "layout": {
            "icon-image": "recyclingBin",
            "icon-size": 0.1
            }
        });
    });

setTimeout(geoLocation.trigger(), 5000);


});
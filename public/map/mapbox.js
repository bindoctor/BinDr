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

  await map.loadImage("/map-markers/paper.png", (error, image) =>
    map.addImage("/map-markers/paper.png", image)
  );
  await map.loadImage("/map-markers/plastic.png", (error, image) =>
    map.addImage("/map-markers/plastic.png", image)
  );
  await map.loadImage("/map-markers/mixed.png", (error, image) =>
    map.addImage("/map-markers/mixed.png", image)
  );
  await map.loadImage("/map-markers/glass.png", (error, image) =>
    map.addImage("/map-markers/glass.png", image)
  );

  map.addSource("allBins", {
    type: "geojson",
    data: "/api/bins"
  });

  map.addLayer({
    id: "points",
    type: "symbol",
    source: "allBins",
    layout: {
      "icon-image": ["get", "iconUrl", ["get", "icon"]],
      "icon-size": 0.3
    }
  });

  map.on("click", "points", function(event) {
    new mapboxgl.Popup()
      .setLngLat(event.lngLat)
      .setHTML(
        "<h3>" +
          event.features[0].properties.binTypeName +
          "</h3>" +
          "<p>" +
          event.lngLat +
          "</p>"
      )
      .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on("mouseenter", "states-layer", function() {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "states-layer", function() {
    map.getCanvas().style.cursor = "";
  });
});

map.addControl(geoLocation);

let addBinMarker;

map.on("click", event => {
  if (!addBinMarker) {
    var marker = document.createElement("div");
    marker.id = "mapboxgl-mixed-bin-marker";

    addBinMarker = new mapboxgl.Marker({ draggable: true, element: marker })
      .setLngLat(event.lngLat)
      .addTo(map);

    let addBox = document.getElementById("add-box");
    addBox.style.display = "block";
  } else {
    addBinMarker.setLngLat(event.lngLat);
  }
});

$(document).ready(function() {
  $("#submit-bin").click(function() {
    markerLngLat = addBinMarker.getLngLat();
    var binType = $("input:radio[name='bintype']:checked").attr("id");

    $.ajax({
      type: "POST",
      url: `/api/bins`,
      data: {
        bin: {
          type: binType,
          lng: markerLngLat.lng,
          lat: markerLngLat.lat
        }
      }
    }).done(function(result) {});
  });
});

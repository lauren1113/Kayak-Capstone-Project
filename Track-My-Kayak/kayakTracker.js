// Set up initial latitude & longitude
window.lat = 38.627;
window.lng = -90.1994;
function circlePoint(time) {
  let radius = 0.01;
  let x = Math.cos(time) * radius;
  let y = Math.sin(time) * radius;
  return { lat: window.lat + y, lng: window.lng + x };
}

// functions for getting device location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updatePosition);
  }
  return null;
}
function updatePosition(position) {
  if (position) {
    window.lat = position.coords.latitude;
    window.lng = position.coords.longitude;
  }
}
setInterval(function() {
  updatePosition(getLocation());
}, 10000);
function currentLocation() {
  return { lat: window.lat, lng: window.lng };
}

// determine distance traveled -- add event listener when stopwatch clicked
function distanceTraveled() {
  return currentLocation - getLocation;
}
console.log(distanceTraveled);

//  define map and mark variables to hold map and marker objects
let map;
let mark;
let lineCoords = [];
let initialize = function() {
  map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: { lat: lat, lng: lng },
    zoom: 12
  });
  mark = new google.maps.Marker({ position: { lat: lat, lng: lng }, map: map });
};
window.initialize = initialize;

// when position changes, redraw event handler will set the latitude and longitude to the new values, update the marker's position, and recenter the map
let redraw = function(payload) {
  lat = payload.message.lat;
  lng = payload.message.lng;
  map.setCenter({ lat: lat, lng: lng, alt: 0 });
  mark.setPosition({ lat: lat, lng: lng, alt: 0 });
  lineCoords.push(new google.maps.LatLng(lat, lng));
  let lineCoordinatesPath = new google.maps.Polyline({
    path: lineCoords,
    geodesic: true
  });
  lineCoordinatesPath.setMap(map);
};

// connect map to my PubNub account
let pnChannel = "map3-channel";
let pubnub = new PubNub({
  publishKey: "${process.env.PN_PUB_KEY}",
  subscribeKey: "${process.env.PN_SUB_KEY}"
});
pubnub.subscribe({ channels: [pnChannel] });
pubnub.addListener({ message: redraw });

// interval timer to publish new positions
setInterval(function() {
  pubnub.publish({
    channel: pnChannel,
    message: circlePoint(new Date().getTime() / 1000)
  });
}, 500);

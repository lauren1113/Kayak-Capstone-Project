// request user's location
const successCallback = (position) => {
  console.log(position);
};
const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// track location as it changes -- add event listener to "start" on sw
const successCallback = (position) => {
  console.log(position);
};
const errorCallback = (error) => {
  console.log(error);
};
const watchId = navigator.geolocation.watchCurrentPosition(successCallback, errorCallback);

// stop watching location -- add event listener to "stop" on sw
navigator.geolocation.clearWatch(watchId);

// position options: accuracy of position and timeout
const successCallback = (position) => {
  console.log(position);
};
const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.watchCurrentPosition(successCallback, errorCallback, {
  enableHighAccuracy: true,
  timeout: 5000
});

// create map
const myMap = L.map("trackerMap").setView([0, 0], 2); // setView = starting lat & long + zoom level

const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' // attributions required to use map
const tileUrl = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.MAPBOX_TOKEN}"
const L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

const marker = L.marker([0, 0]).addTo(myMap); // adds marker to current location

const api_url = "https://maps.googleapis.com/maps/api/js?key=${process.env.GM_API_KEY}&callback=initMap";

let firstTime = true;

async function getAPI() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    myMap.setView([latitude, longitude], 2); // get current lat/long to update map -- need to add event listener to start and stop this tracking upon click
    firstTime = false;
  }
  document.getElementById('lat').textContent = latitude.toFixed(2);
  document.getElementById('lon').textContent = longitude.toFixed(2);
}
getAPI();
setInterval(getAPI, 1000); // automatically refreshes to update current location
// use setTimeout()?

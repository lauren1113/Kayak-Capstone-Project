import { Header, Logo, pageTitle, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";

const router = new Navigo(window.location.origin);
router
  .on(":page", handleRoute)
  .on("/", () => render(state.Home))
  .resolve();
function handleRoute(params) {
  const page = params.page;
  render(state[page]);
}
function render(st) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Logo()}
    ${pageTitle(st)}
    ${Main(st)}
    ${Footer()}
  `;

  // only load tracker functionality when on kayak tracker page
  if (st.page === "KayakTracker") {
    trackMyKayakFunctionality();
  }
}
function trackMyKayakFunctionality() {
  getMapData();
  stopwatch();
  calculateDistance();
  calculateAvgPace();
}

function getMapData() {
  const myMap = L.map("trackerMap");
  let firstTime = true;
  const successCallback = position => {
    if (position) {
      if (firstTime) {
        // create marker showing current location on map
        const marker = L.marker(
          [
            position.coords.latitude.toFixed(2),
            position.coords.longitude.toFixed(2)
          ],
          { opacity: 0.5 }
        ).addTo(myMap);
        firstTime = false;
      }
      myMap.setView(
        [
          position.coords.latitude.toFixed(2),
          position.coords.longitude.toFixed(2)
        ],
        15
      );
    }
  };
  const errorCallback = error => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  // watch location and update map marker as location changes
  const watchId = navigator.geolocation.watchPosition(
    successCallback,
    errorCallback
  );
  // enable high accuracy of position and timeout after 5 seconds
  navigator.geolocation.watchPosition(successCallback, errorCallback, {
    enableHighAccuracy: true,
    timeout: 5000
  });
  // create map with leaflet API
  const attribution =
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
  const tileUrl =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
  const tiles = L.tileLayer(tileUrl, {
    attribution,
    id: "mapbox/streets-v11",
    accessToken:
      "pk.eyJ1IjoibGF1cmVuMTExMyIsImEiOiJja2U3Zjl4bmgwYWtqMnJwaXJtZDExNTd1In0.RwMkf_IR8Usjvz0kFQuHbw",
    tileSize: 512,
    zoomOffset: -1
  });
  tiles.addTo(myMap);
}

// Stopwatch
function stopwatch() {
  let sw = {
    etime: null,
    ereset: null,
    estart: null,
    timer: null,
    geoWatch: null,
    now: 0,
    init: function() {
      // Get HTML Elements
      sw.etime = document.getElementById("sw-time");
      sw.ereset = document.getElementById("sw-resetButton");
      sw.estart = document.getElementById("sw-startButton");

      // Attach listeners
      sw.ereset.addEventListener("click", sw.reset);
      sw.ereset.disabled = false;
      sw.estart.addEventListener("click", sw.start);
      sw.estart.disabled = false;
    },

    /* [ACTIONS] */
    tick: function() {
      // tick(): update display if stopwatch running

      // Calculate hours, mins, seconds
      sw.now++;
      let remain = sw.now;
      let hours = Math.floor(remain / 3600);
      remain -= hours * 3600;
      let mins = Math.floor(remain / 60);
      remain -= mins * 60;
      let secs = remain;

      // Update the display timer
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (mins < 10) {
        mins = "0" + mins;
      }
      if (secs < 10) {
        secs = "0" + secs;
      }
      sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
    },

    start: function() {
      // start(): start the stopwatch

      sw.timer = setInterval(sw.tick, 1000);
      sw.estart.value = "Stop";
      sw.estart.removeEventListener("click", sw.start);
      sw.estart.addEventListener("click", sw.stop);
    },

    stop: function() {
      // stop(): stop the stopwatch

      clearInterval(sw.timer);
      sw.timer = null;
      sw.estart.value = "Start";
      sw.estart.removeEventListener("click", sw.stop);
      sw.estart.addEventListener("click", sw.start);
    },

    reset: function() {
      // reset(): reset the stopwatch

      // Stop if running
      if (sw.timer != null) {
        sw.stop();
      }

      // Reset time
      sw.now = -1;
      sw.tick();
    }
  };

  window.addEventListener("load", sw.init);
}

// calculate Distance
function calculateDistance() {
  // Attach listeners here?
  //  sw.ereset.addEventListener("click", sw.reset);
  //  sw.ereset.disabled = false;
  //  sw.estart.addEventListener("click", sw.start);
  //  sw.estart.disabled = false;

  // get location when page is opened, save as starting location
  // want to tie starting loc to "sw-start" event listener instead...saving to test
  window.onload = function() {
    let startPos;
    navigator.geolocation.getCurrentPosition(function(position) {
      startPos = position;
      document.getElementById(
        "startLat"
      ).innerHTML = startPos.coords.latitude.toFixed(2);
      document.getElementById(
        "startLon"
      ).innerHTML = startPos.coords.longitude.toFixed(2);
    });
  };
  navigator.geolocation.watchPosition(function(position) {
    document.getElementById(
      "currentLat"
    ).innerHTML = position.coords.latitude.toFixed(2);
    document.getElementById(
      "currentLon"
    ).innerHTML = position.coords.longitude.toFixed(2);
    document.getElementById("sw-distance").innerHTML = calculateDistance(
      (startPos.coords.latitude = lat1),
      (startPos.coords.longitude = lon1),
      (position.coords.latitude = lat2),
      (position.coords.longitude = lon2)
    );
  });
  function calculateMilesTraveled(lat1, lon1, lat2, lon2) {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}

// calculate Average Pace
function calculateAvgPace() {
  document.getElementById("#sw-pace").innerHTML = dist / sw.timer;
  return calculateAvgPace;
}

// FIREBASE USER DATABASE

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
let firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCqruQYeJVKqGCZpcXX9rQyYkKpOgMh5Ug",
  authDomain: "kayak-fanatic-user-db.firebaseapp.com",
  databaseURL: "https://kayak-fanatic-user-db.firebaseio.com",
  projectId: "kayak-fanatic-user-db",
  storageBucket: "kayak-fanatic-user-db.appspot.com",
  messagingSenderId: "133365157512",
  appId: "1:133365157512:web:0771a019978678752dd93d",
  measurementId: "G-J1P8TNN3S2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
email - password.html;

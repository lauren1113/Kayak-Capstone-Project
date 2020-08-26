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
  if (st.page === "KayakTracker") {
    trackMyKayakFunctionality();
  }
}
function trackMyKayakFunctionality() {
  getMapData();
}
function getMapData() {
  const myMap = L.map("trackerMap"); // setView = starting lat & long + zoom level
  let firstTime = true;
  const successCallback = position => {
    if (position) {
      if (firstTime) {
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
  // track location as it changes -- add event listener to "start" on sw
  const watchId = navigator.geolocation.watchPosition(
    successCallback,
    errorCallback
  );
  // position options: accuracy of position and timeout
  navigator.geolocation.watchPosition(successCallback, errorCallback, {
    enableHighAccuracy: true,
    timeout: 5000
  });
  // create map
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
function somethingAboutAStopWatch() {
  console.log("gonna be a bomb ass movie");
}

// FIREBASE USER DATABASE

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

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

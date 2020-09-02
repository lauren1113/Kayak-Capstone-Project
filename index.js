import { Header, Logo, pageTitle, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import "./env";
import { auth, db } from "./firebase";

// firebase.analytics();

axios
  .get(
    "https://maps.googleapis.com/maps/api/js?key=${process.env.GM_API_KEY}&callback=initMap"
  )
  .then(response => console.log(response.data));
axios
  .get(`https://api.github.com/users/lauren1113/repos`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })
  .then(response => console.log(response.data));

const router = new Navigo(window.location.origin);

router
  .on(":page", handleRoute)
  .on("/", () => render(state.Home))
  .resolve();
function handleRoute(params) {
  const page = params.page;
  render(state[page]);
}

router.updatePageLinks();

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
    // document
    //   .getElementById("sw-startButton")
    //   .addEventListener("click", calculateDistance);
  }
  if (st.page === "AccountLogin") {
    addSignInListeners(state);
  }
}

function trackMyKayakFunctionality() {
  getMapData();
  stopwatch();
  getLocation();
  calculateDistance();
  // calculateAvgPace();
}

function getMapData() {
  const myMap = L.map("trackerMap");
  let firstTime = true;
  const successCallback = position => {
    if (position) {
      if (firstTime) {
        firstTime = false;
      }
      // create marker showing location on map
      const marker = L.marker(
        [
          position.coords.latitude.toFixed(2),
          position.coords.longitude.toFixed(2)
        ],
        { opacity: 0.5 }
      ).addTo(myMap);
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
  // watch location and update map as location changes
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
    accessToken: ${process.env.MAPBOX_TOKEN},
    tileSize: 512,
    zoomOffset: -1
  });
  tiles.addTo(myMap);
}

// [ Get lat/long using Geolocation, then use to Calculate Miles Traveled ]
function getLocation() {
  // get current/starting position when page is opened
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
  // watch position and update as user moves
  navigator.geolocation.watchPosition(function(position) {
    let startPos;
    document.getElementById(
      "currentLat"
    ).innerHTML = position.coords.latitude.toFixed(2);
    document.getElementById(
      "currentLon"
    ).innerHTML = position.coords.longitude.toFixed(2);
    document.getElementById("sw-distance").innerHTML = calculateDistance(
      startPos.coords.latitude,
      startPos.coords.longitude,
      position.coords.latitude,
      position.coords.longitude
    );
  });
}

// Convert difference between starting lat & long to miles
function calculateDistance(lat1, lon1, lat2, lon2) {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist.toFixed(2);
}
calculateDistance();

// [ Stopwatch ] //
function stopwatch() {
  let sw = {
    etime: null,
    edist: null,
    ereset: null,
    estart: null,
    timer: null,
    geoWatch: null,
    now: 0,
    init: function() {
      // Get HTML Elements
      sw.etime = document.getElementById("sw-time");
      sw.edist = document.getElementById("sw-distance");
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
      sw.edist = calculateDistance();
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

// [FIREBASE USER DATABASE]

function addSignInListeners(st) {
  addLogInAndOutListener(state.User);
  listenForAuthChange();
  listenForRegister(st);
  listenForSignIn(st);
}

// FUNCTIONS & EVENT LISTENERS
function addLogInAndOutListener(user) {
  // select link in header
  document.querySelector("header a").addEventListener("click", event => {
    // if user is logged in,
    if (user.loggedIn) {
      event.preventDefault();
      // log out functionality
      auth.signOut().then(() => {
        console.log("User logged out");
        logOutUserInDb(user.email);
        resetUserInState();
        // update user in database
        db.collection("Users").get;
        render(state.Home);
        router.navigate("/Home");
      });
      console.log(state.User);
    }
    // if user is logged out, clicking the link will route to sign in page
  });
}
function logOutUserInDb(email) {
  if (state.User.loggedIn) {
    db.collection("Users")
      .get()
      .then(snapshot =>
        snapshot.docs.forEach(doc => {
          if (email === doc.data().email) {
            let id = doc.id;
            db.collection("Users")
              .doc(id)
              .update({ signedIn: false });
          }
        })
      );
    console.log("User signed out in db");
  }
}
function resetUserInState() {
  state.User.username = "";
  state.User.firstName = "";
  state.User.lastName = "";
  state.User.email = "";
  state.User.loggedIn = false;
}

function listenForAuthChange() {
  // log user object from auth if a user is signed in
  auth.onAuthStateChanged(user => (user ? console.log(user) : ""));
}

function listenForRegister(st) {
  document.querySelector("#newUserForm").addEventListener("submit", event => {
    event.preventDefault();
    // convert HTML elements to Array
    let inputList = Array.from(event.target.elements);
    // remove submit button from list
    inputList.pop();
    const inputs = inputList.map(input => input.value);
    let firstName = inputs[0];
    let lastName = inputs[1];
    let email = inputs[2];
    let password = inputs[3];

    // create user in Firebase
    auth.createUserWithEmailAndPassword(email, password).then(response => {
      console.log("User registered!");
      console.log(response);
      console.log(response.user);
      addUserToStateAndDb(firstName, lastName, email, password);
      render(state.Home);
      router.navigate("/Home");
    });
  });
}

function addUserToStateAndDb(first, last, email, pass) {
  state.User.username = first + last;
  state.User.firstName = first;
  state.User.lastName = last;
  state.User.email = email;
  state.User.loggedIn = true;

  db.collection("Users").add({
    firstName: first,
    lastName: last,
    email: email,
    password: pass,
    signedIn: true
  });
}

function listenForSignIn(st) {
  document.querySelector("#loginForm").addEventListener("submit", event => {
    event.preventDefault();
    // convert HTML elements to Array
    let inputList = Array.from(event.target.elements);
    // remove submit button from list
    inputList.pop();
    const inputs = inputList.map(input => input.value);
    let email = inputs[0];
    let password = inputs[1];
    auth.signInWithEmailAndPassword(email, password).then(() => {
      console.log("User signed in");
      getUserFromDb(email).then(() => render(state.Home));
      router.navigate("/Home");
    });
  });
}
function getUserFromDb(email) {
  return db
    .collection("Users")
    .get()
    .then(snapshot =>
      snapshot.docs.forEach(doc => {
        if (email === doc.data().email) {
          let id = doc.id;
          db.collection("Users")
            .doc(id)
            .update({ signedIn: true });
          console.log("user signed in in db");
          let user = doc.data();
          state.User.username = user.firstName + user.lastName;
          state.User.firstName = user.firstName;
          state.User.lastName = user.lastName;
          state.User.email = email;
          state.User.loggedIn = true;
          console.log(state.User);
        }
      })
    );
}

// Stopwatch

let sw = {
  etime: null,
  edist: null,
  epace: null,
  ereset: null,
  estart: null,
  timer: null,
  geoWatch: null,
  now: 0,
  init: function() {
    // Get HTML Elements
    sw.etime = document.getElementById("sw-time");
    sw.edist = document.getElementById("sw-distance");
    sw.epace = document.getElementById("sw-pace");
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

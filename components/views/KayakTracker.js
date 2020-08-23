export default () => `
  <div id="trackNmap">
    <div id="kayakTracker">
      <!-- [START/STOP BUTTON] -->
        <input type="button" value="Start Tracking" class="tracking" id="sw-startButton" disabled/>
      <!-- [DISPLAY DISTANCE] -->
        <div class="trackerTopic">
          <h5 class="tracking">Distance Traveled</h5>
          <div id="sw-distance">00.00</div>
        </div>
      <!-- [DISPLAY TIMER] -->
        <div class="trackerTopic">
          <h5 class="tracking">Total Time</h5>
          <div id="sw-time">00:00:00</div>
        </div>
      <!-- [DISPLAY PACE] -->
      <div class="trackerTopic">
          <h5 class="tracking">Average Pace Per Mile</h5>
          <div id="sw-pace">00.00</div>
        </div>
      <!-- [RESET BUTTON] -->
        <input type="button" value="Reset" class="tracking" id="sw-resetButton" disabled/>
      </div>
      <div class="container">
        <div id="map-canvas" style="width:600px;height:400px">></div>
      </div>
  </div>
`;

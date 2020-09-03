export default () => `
  <div id="trackerPageContainer">
    <div id="kayakTracker">
      <!-- [START/STOP BUTTON] -->
        <input type="button" value="Start Tracking" class="tracking" id="sw-startButton" disabled/>
      <!-- [DISPLAY DISTANCE] -->
        <div class="trackerTopic">
          <h5 class="tracking">Distance Traveled</h5>
          <div class="sw-distance">00.00</div>miles
        </div>
      <!-- [DISPLAY TIMER] -->
        <div class="trackerTopic">
          <h5 class="tracking">Total Time</h5>
          <div id="sw-time">00:00:00</div>
        </div>
      <!-- [DISPLAY PACE] -->
      <div class="trackerTopic">
          <h5 class="tracking">Average Pace Per Mile</h5>
          <div id="sw-pace">00:00:00</div>
        </div>
      <!-- [RESET BUTTON] -->
        <input type="button" value="Reset" class="tracking" id="sw-resetButton" disabled/>
      </div>
      <div id="mapAndMeter">
        <div class="mapContainer">
         <div id="trackerMap" style="height:700px;width:650px">></div>
        </div>
        <br><br>
        <div id="tripmeter">
          <p>
           Starting Location (lat, lon): <span id="startLat">???</span>°, <span id="startLon">???</span>°
          </p>
          <p>
            Current Location (lat, lon): <span id="currentLat">???</span>°, <span id="currentLon">???</span>°
          </p>
            <p>Distance Traveled: <span class="sw-distance">0.00</span>mi
          </p>
        </div>
      </div>
  </div>
`;

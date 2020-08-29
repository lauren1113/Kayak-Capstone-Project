import loginPageLink from "../../store/loginPageLink";

export default () => `
  <div id="homeBox">

    <img id="kayakDogs" src="https://github.com/lauren1113/Kayak-Capstone-Project/blob/master/Documents/Design/Kayak%20Photos/patrick-carr-kNvMlMCzY9A-unsplash.jpg?raw=true"/>


    <div id="homeTextBox">
      <p id="homeSummary">Kayak Fanatic is your one-stop resource for all of your kayaking needs! The <a href="/Track-My-Kayak/tracker.html">Track My Kayak</a> tool will help you track your journey, logging the total time of your trip, your total distance, and your average pace per mile. Click on <a href="/lakefinder.html">Find A Lake</a> or <a href="/riverfinder.html">Find A River</a> to find your next float, and don't forget to check the <a href="/packlist.html">Packing List</a> before you go! Beginners can visit our <a href="/begguide.html">Beginner's Guide</a> for helpful tips and tricks, and take the <a href="/quiz.html">Kayak Quiz</a> to find the best kayak to fit your adventure-style. Don't forget to look over the <a href="/safety.html">Safety Tips</a> before you head out on your next adventure!</p>
      <button class="createAcctBtn"><a href="${loginPageLink.title}" data-navigo>${loginPageLink.text}</a></button>

    </div>

    <img id="mntnsGirl" src="https://github.com/lauren1113/Kayak-Capstone-Project/blob/master/Documents/Design/Kayak%20Photos/kalen-emsley-kGSapVfg8Kw-unsplash-cropped4home.jpg?raw=true"/>

  </div>


`;

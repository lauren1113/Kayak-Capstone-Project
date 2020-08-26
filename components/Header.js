import Nav from "./Nav.js";
import links from "../store/Links";
export default st => `
  <header>
    <div class="header">
      <img id="headImg" src="https://github.com/lauren1113/Kayak-Capstone-Project/blob/master/Documents/Design/Kayak%20Photos/header-damir-spanic-1QL8fLEpxaE-unsplash.jpg?raw=true"/>
      ${Nav(links)}
    </div>
  </header>
`;

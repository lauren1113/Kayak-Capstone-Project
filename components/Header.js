export default st => `
  <header>
    <div class="header">
      <img id="headImg" src="https://github.com/lauren1113/Kayak-Capstone-Project/blob/master/Documents/Design/Kayak%20Photos/header-damir-spanic-1QL8fLEpxaE-unsplash.jpg?raw=true"/>
      <nav id="navButtons">${st.links}</nav>
    </div>
    <div id="logo">
      <img id="logoPhoto" src="https://github.com/lauren1113/Kayak-Capstone-Project/blob/master/Documents/Design/Kayak%20Photos/IMG_3107-landscape2.jpg?raw=true"/>
      <h1 id="logoText">Kayak Fanatic</h1>
    </div>
    <h3 class="welcomeLine1">${st.header}</h3>
    <h3 class="welcomeLine2">${st.welcome}</h3>
  </header>
`;

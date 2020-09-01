export default () => `

  <div class="loginPage">

    <div class="signInSection" id="existingUser">
      <p class="loginHead">Sign In</p>
      <form class="signInForm" id="loginForm">
        <label for="email">Email: </label>
        <input type="email" name="email" class="signInField" placeholder="enter your email">
        <br>
        <label for="password">Password: </label>
        <input type="password" name="password" class="signInField" placeholder="enter your password">
        <br>
        <br>
        <input type="submit" class="loginButton" id="sign-in-button" value="Sign In">
      </form>
      <br>
      <img id="signinFormImg" src="https://github.com/lauren1113/Kayak-Capstone-Project/blob/master/Documents/Design/Kayak%20Photos/roya-ann-miller-ojG9qrU_blw-unsplash.jpg?raw=true"/>
    </div>

    <img id="loginPgImg" src="https://github.com/lauren1113/Kayak-Capstone-Project/blob/master/Documents/Design/Kayak%20Photos/shawn-ang-0qo8EEWx-aY-unsplash.jpg?raw=true"/>

    <div class="signInSection" id="register">
      <p class="loginHead">Create An Account</p>
      <form class="signInForm" id = "newUserForm">
        <label for="firstName">First Name: </label>
        <input type="text" name="firstName" id="firstName" class="signInField" placeholder="First Name">
        <br>
        <label for="lastName">Last Name: </label>
        <input type="text" name="lastName" id="lastName" class="signInField" placeholder="Last Name">
        <br>
        <label for="email">Email: </label>
        <input type="email" name="email" class="signInField" placeholder="enter your email">
        <br>
        <label for="password">Password: </label>
        <input type="password" name="password" class="signInField" placeholder="create a password">
        <br>
        <br>
        <input type="submit" class="loginButton" id="register-button" value="Create Account">
      </form>
      <br>
    </div>

  </div>
`;

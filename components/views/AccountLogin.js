export default () => `

  <div class="loginPage">

    <div class="signInSection" id="existingUser">
      <p class="loginHead">Existing Users</p>
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
    </div>

    <img id="loginPgImg" src="https://images.unsplash.com/photo-1538475788437-036371c6f833?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"/>

    <div class="signInSection" id="register">
      <p class="loginHead">Create A New Account</p>
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
    </div>

  </div>
`;

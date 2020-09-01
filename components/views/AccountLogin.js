export default () => `

  <div class="loginPage">

    <div class="signInForm" id="existingUser">
      <p class="loginHead">Existing Users</p>
      <form id = "loginForm">
        <label for="email">Email: </label>
        <input type="email" name="email" class="signInField" placeholder="enter your email"> <br>
        <label for="password">Password: </label>
        <input type="password" name="password" class="signInField" placeholder="enter your password">
        <input type="submit" class="loginButton" id="sign-in-button" value="Sign In">
      </form>
    </div>

    <div class="signInForm" id="register">
      <p class="loginHead">Create A New Account</p>
      <form id = "newUserForm">
        <label for="firstName">First Name: </label>
        <input type="text" name="firstName" id="firstName" class="signInField" placeholder="First Name">
        <label for="lastName">Last Name: </label>
        <input type="text" name="lastName" id="lastName" class="signInField" placeholder="Last Name"> <br>
        <label for="email">Email: </label>
        <input type="email" name="email" class="signInField" placeholder="enter your email">
        <label for="password">Password: </label>
        <input type="password" name="password" class="signInField" placeholder="create a password">
        <input type="submit" class="loginButton" id="register-button" value="Create Account">
      </form>
    </div>

  </div>
`;

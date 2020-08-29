export default () => `

  <div class="loginPage">

    <div id="existingUser">
      <p class="loginHead">Existing Users</p>
      <form id = "loginForm" action="" method="POST">
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" placeholder="enter your email"> <br>
        <label for="password">Password: </label>
        <input type="password" name="password" id="password" placeholder="enter your password">
        <input type="submit" id="sign-in-button" value="Sign In">
      </form>
    </div>

    <div id="newUser">
      <p class="loginHead">Create A New Account</p>
      <form id = "newUserForm" action="" method="POST">
        <label for="firstName">First Name: </label>
        <input type="text" name="firstName" id="firstName" placeholder="First Name">
        <label for="lastName">Last Name: </label>
        <input type="text" name="lastName" id="lastName" placeholder="Last Name"> <br>
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" placeholder="enter your email">
        <label for="password">Password: </label>
        <input type="password" name="password" id="password" placeholder="create a password">
        <input type="submit" id="register-button" value="Create Account">
      </form>
    </div>

  </div>
`;

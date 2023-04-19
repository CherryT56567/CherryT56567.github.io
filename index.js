// Initialize the Auth0 client
const auth0Cli = new auth0.WebAuth({
  domain: 'webknight.au.auth0.com',
  clientID: 'KNMridEdkBC8fOWxJ8VpZhR3VI1M1pIt',
  redirectUri: window.location.href,
  responseType: 'token id_token',
  scope: 'openid profile'
});

// Handle the login button click event
function Login(){
  auth0Cli.authorize();
}

// Handle the logout button click event
function Logout() {
  auth0Cli.logout({
    returnTo: window.location.href
  });
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
}

// Handle the user information display
const userInfo = document.getElementById('user-info');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
auth0Cli.parseHash((err, authResult) => {
  if (authResult && authResult.accessToken && authResult.idToken) {
    // Store the user's access token and ID token
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);

    // Retrieve the user's profile information
    auth0Cli.client.userInfo(authResult.accessToken, (err, user) => {
      console.log('user object:', user);
      if (user) {
        // Display the user's name and profile picture
        userInfo.innerHTML = `
          <p>Welcome, ${user.name}!</p>
          <img src="${user.picture}" alt="Profile Picture" />
          <p>${s}</p>
        `;

        // Show the logout button and hide the login button
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
      }
    });
  } else if (err) {
    console.error(err);
  }
});

// Check if the user is already logged in
const accessToken = localStorage.getItem('access_token');
const idToken = localStorage.getItem('id_token');
if (accessToken && idToken) {
  // Retrieve the user's profile information
  auth0Cli.client.userInfo(accessToken, (err, user) => {
    if (user) {
      // Display the user's name and profile picture
      userInfo.innerHTML = `
        <p>Welcome back, ${user.name}!</p>
        <img src="${user.picture}" alt="Profile Picture" />
      `;

      // Show the logout button and hide the login button
      loginButton.style.display = 'none';
      logoutButton.style.display = 'inline-block';
    }
  });
} else {
  // Show the login button and hide the logout button
  loginButton.style.display = 'inline-block';
  logoutButton.style.display = 'none';
}

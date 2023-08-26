
const CLIENT_ID = "849774135290-6fmfb3ku97er6f7p9i48g0lenurte09j.apps.googleusercontent.com"
const login_button = document.getElementById('login-button');

export function init() {
  login_button.addEventListener('click', evt => onClick(evt));
}

function onClick(evt) {
  fetch(oauthSignIn())
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
}

function toPopup() {
  const popup = window.open(url, "popup", popup=true);
  const checkPopup = setInterval(() => {
    if (popup.window.location.href
        .includes(CLIENT_URL)) {popup.close()}
    if (!popup || !popup.closed) return;
    clearInterval(checkPopup);
  }, 1000);
}


/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: 'http://localhost:3000/login',
    client_id: CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(" "),
  };

  const qs = new URLSearchParams(options).toString();

  return `${oauth2Endpoint}?${qs}`;
}

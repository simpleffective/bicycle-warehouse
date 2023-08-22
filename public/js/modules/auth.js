
function toPopup() {
  const popup = window.open(url, "popup", popup=true);
  const checkPopup = setInterval(() => {
    if (popup.window.location.href
        .includes(CLIENT_URL)) {popup.close()}
    if (!popup || !popup.closed) return;
    clearInterval(checkPopup);
  }, 1000);
}


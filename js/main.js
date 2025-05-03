fetch("php/session_info.php", {
  credentials: "include"
})
.then(response => response.json())
.then(data => {
  const loggedInUser = data.username;

  const login = document.getElementById("nav-login");
  const register = document.getElementById("nav-register");
  const ask = document.getElementById("nav-ask");
  const profile = document.getElementById("nav-profile");
  const logout = document.getElementById("nav-logout");

  if (loggedInUser) {
    if (login) login.style.display = "none";
    if (register) register.style.display = "none";
    if (ask) ask.style.display = "inline";
    if (profile) profile.style.display = "inline";
    if (logout) logout.style.display = "inline";
  } else {
    if (login) login.style.display = "inline";
    if (register) register.style.display = "inline";
    if (ask) ask.style.display = "none";
    if (profile) profile.style.display = "none";
    if (logout) logout.style.display = "none";
  }
});

function logout() {
  fetch("php/logout.php", {
    method: "POST",
    credentials: "include"
  }).then(() => {
    window.location.href = "home.html";
  });
}

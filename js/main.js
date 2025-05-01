window.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  console.log("Logged in user:", loggedInUser);

  const ask = document.getElementById("nav-ask");
  const logout = document.getElementById("nav-logout");
  const login = document.getElementById("nav-login");
  const register = document.getElementById("nav-register");

  console.log("ask:", ask);
  console.log("logout:", logout);
  console.log("login:", login);
  console.log("register:", register);

  if (loggedInUser) {
    if (ask) ask.style.display = "inline";
    if (logout) logout.style.display = "inline";
    if (login) login.style.display = "none";
    if (register) register.style.display = "none";
  }
});

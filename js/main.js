window.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

 

  const ask = document.getElementById("nav-ask");
  const logout = document.getElementById("nav-logout");
  const login = document.getElementById("nav-login");
  const register = document.getElementById("nav-register");
  const profile = document.getElementById("nav-profile");


 


  if (loggedInUser) {
    if (ask) ask.style.display = "inline";
    if (logout) logout.style.display = "inline";
    if (login) login.style.display = "none";
    if (register) register.style.display = "none";
    if (profile) profile.style.display = "inline";
   
  }
});


function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "home.html";
}

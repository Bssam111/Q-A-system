// لما المستخدم يضغط زر login
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    if (username === "" || password === "") {
      alert("Please enter username and password.");
      return;
    }
  
    // نخزن اسم المستخدم في localStorage
    localStorage.setItem("loggedInUser", username);
    alert("Welcome, " + username + "!");
  
    // نرجع للصفحة الرئيسية
    window.location.href = "home.html";
  });
  
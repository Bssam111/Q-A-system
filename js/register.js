// عند إرسال نموذج التسجيل
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    if (username === "" || email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }
  
    // نحاكي الحفظ (بدون تحقق من التكرار حاليًا)
    localStorage.setItem("loggedInUser", username);
  
    alert("Account created successfully! Welcome, " + username);
    window.location.href = "home.html";
  });
  
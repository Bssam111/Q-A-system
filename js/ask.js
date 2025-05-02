// إرسال سؤال جديد إلى قاعدة البيانات
fetch("php/session_info.php", {
  credentials: "include"
})
  .then(response => response.json())
  .then(data => {
    const currentUser = data.username;

    document.getElementById("ask-form").addEventListener("submit", function (e) {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const content = document.getElementById("content").value.trim();

      if (!title || !content) {
        alert("Please fill in all fields.");
        return;
      }

      if (!currentUser) {
        alert("You must be logged in.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      fetch("php/add_question.php", {
        method: "POST",
        body: formData,
        credentials: "include"
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            alert("Question posted!");
            window.location.href = "home.php";
          } else {
            alert(result.message || "Something went wrong.");
          }
        })
        .catch(() => {
          alert("Error while submitting question.");
        });
    });
  });

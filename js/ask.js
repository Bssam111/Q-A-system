document.getElementById("ask-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    var title = document.getElementById("title").value.trim();
    var content = document.getElementById("content").value.trim();
    var author = localStorage.getItem("loggedInUser");
  
    if (title === "" || content === "") {
      alert("Please fill in all fields.");
      return;
    }
  
    if (!author) {
      alert("You must be logged in.");
      return;
    }
  
    // قراءة الأسئلة القديمة (إذا موجودة)
    var stored = localStorage.getItem("questions");
    var questions = stored ? JSON.parse(stored) : [];
  
    // توليد ID تلقائي
    var newId = questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
  
    var newQuestion = {
      id: newId,
      title: title,
      content: content,
      author: author,
      date: new Date().toISOString().split("T")[0]
    };
  
    // إضافة السؤال وتحديث التخزين
    questions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(questions));
  
    alert("Question posted!");
    window.location.href = "home.html";
  });
  
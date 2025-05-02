// عرض الأسئلة من قاعدة البيانات في الصفحة الرئيسية
fetch("php/get_questions.php")
  .then(response => response.json())
  .then(questions => {
    var container = document.getElementById("question-list");
    container.innerHTML = "";

    if (questions.length === 0) {
      container.textContent = "No questions yet.";
      return;
    }

    for (var i = 0; i < questions.length; i++) {
      var div = document.createElement("div");

      var h3 = document.createElement("h3");
      var link = document.createElement("a");
      link.href = "question.html?id=" + questions[i].id;
      link.textContent = questions[i].title;

      h3.appendChild(link);
      div.appendChild(h3);

      var meta = document.createElement("p");
      meta.textContent = "Asked by " + questions[i].author + " on " + questions[i].created_at.split(" ")[0];
      div.appendChild(meta);

      container.appendChild(div);
    }
  })
  .catch(error => {
    document.getElementById("question-list").textContent = "Failed to load questions.";
    console.error("Fetch error:", error);
  });

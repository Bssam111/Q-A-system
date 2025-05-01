// استرجاع الأسئلة من localStorage
var stored = localStorage.getItem("questions");
var questions = stored ? JSON.parse(stored) : [];

var container = document.getElementById("question-list");

for (var i = 0; i < questions.length; i++) {
  var q = questions[i];

  var div = document.createElement("div");

  var title = document.createElement("h3");
  var link = document.createElement("a");
  link.href = "question.html?id=" + q.id;
  link.textContent = q.title;

  title.appendChild(link);

  var meta = document.createElement("p");
  meta.textContent = "Asked by " + q.author + " on " + q.date;

  div.appendChild(title);
  div.appendChild(meta);

  container.appendChild(div);
}

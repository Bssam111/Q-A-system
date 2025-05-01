var url = window.location.search; 
var keyword = "";

if (url.indexOf("q=") !== -1) {
  var parts = url.split("q=");
  keyword = decodeURIComponent(parts[1]).toLowerCase();
}

var stored = localStorage.getItem("questions");
var questions = stored ? JSON.parse(stored) : [];

var container = document.getElementById("result-list");
var found = false;

for (var i = 0; i < questions.length; i++) {
  var title = questions[i].title.toLowerCase();

  if (title.indexOf(keyword) !== -1) {
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    var link = document.createElement("a");

    link.href = "question.html?id=" + questions[i].id;
    link.textContent = questions[i].title;

    h3.appendChild(link);
    div.appendChild(h3);
    container.appendChild(div);

    found = true;
  }
}

if (!found) {
  container.textContent = "No questions found.";
}

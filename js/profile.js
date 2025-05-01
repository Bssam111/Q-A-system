var currentUser = localStorage.getItem("loggedInUser");
document.getElementById("username-placeholder").textContent = currentUser;

// جلب الأسئلة
var storedQuestions = localStorage.getItem("questions");
var questions = storedQuestions ? JSON.parse(storedQuestions) : [];

var myQuestions = document.getElementById("my-questions");
for (var i = 0; i < questions.length; i++) {
  if (questions[i].author === currentUser) {
    var q = document.createElement("p");
    q.innerHTML = "<a href='question.html?id=" + questions[i].id + "'>" + questions[i].title + "</a>";
    myQuestions.appendChild(q);
  }
}

// جلب الإجابات
var storedAnswers = localStorage.getItem("answers");
var answers = storedAnswers ? JSON.parse(storedAnswers) : [];

var myAnswers = document.getElementById("my-answers");
for (var i = 0; i < answers.length; i++) {
  if (answers[i].author === currentUser) {
    var a = document.createElement("p");
    a.innerHTML = "On question " + "<a href='question.html?id="+ answers[i].questionId + "'>"+ questions[i].title +"</a>"+": " + answers[i].content;
    myAnswers.appendChild(a);
  }
}

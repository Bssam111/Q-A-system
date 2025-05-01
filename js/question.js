// جلب الأسئلة من localStorage
var stored = localStorage.getItem("questions");
var questions = stored ? JSON.parse(stored) : [];

// قراءة id من الرابط
var url = window.location.search;
var id = null;

if (url.indexOf("id=") !== -1) {
  var parts = url.split("id=");
  id = parseInt(parts[1]);
}

// نبحث عن السؤال المطلوب
var selectedQuestion = null;
for (var i = 0; i < questions.length; i++) {
  if (questions[i].id === id) {
    selectedQuestion = questions[i];
    break;
  }
}

// نعرض السؤال إذا لقيناه
if (selectedQuestion !== null) {
  var titleElement = document.getElementById("question-title");
  var metaElement = document.getElementById("question-meta");

  titleElement.textContent = selectedQuestion.title;
  metaElement.textContent = "Asked by " + selectedQuestion.author + " on " + selectedQuestion.date;
} else {
  document.getElementById("question-title").textContent = "Question not found.";
}

// جلب الإجابات من localStorage
var storedAnswers = localStorage.getItem("answers");
var answers = storedAnswers ? JSON.parse(storedAnswers) : [];

// عرض الإجابات المرتبطة بهذا السؤال
var answerList = document.getElementById("answer-list");

for (var j = 0; j < answers.length; j++) {
  if (answers[j].questionId === id) {
    var p = document.createElement("p");
    p.textContent = answers[j].author + ": " + answers[j].content;
    answerList.appendChild(p);
  }
}

// إضافة إجابة جديدة وتخزينها
var form = document.getElementById("answer-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var answerText = document.getElementById("answer").value.trim();

  if (answerText === "") {
    alert("Answer cannot be empty.");
    return;
  }

  var currentUser = localStorage.getItem("loggedInUser");
  if (!currentUser) {
    alert("You must be logged in to post an answer.");
    return;
  }

  // جلب الإجابات القديمة
  var storedAnswers = localStorage.getItem("answers");
  var answers = storedAnswers ? JSON.parse(storedAnswers) : [];

  // إنشاء إجابة جديدة
  var newAnswer = {
    questionId: id,
    content: answerText,
    author: currentUser
  };

  answers.push(newAnswer);
  localStorage.setItem("answers", JSON.stringify(answers));

  // عرض الإجابة مباشرة
  var p = document.createElement("p");
  p.textContent = currentUser + ": " + answerText;
  answerList.appendChild(p);
  document.getElementById("answer").value = "";

  alert("Your answer has been posted.");
});

// عرض زر التعديل إذا المستخدم هو صاحب السؤال
var currentUser = localStorage.getItem("loggedInUser");

if (selectedQuestion !== null && currentUser === selectedQuestion.author) {
  var editButton = document.createElement("button");
  editButton.textContent = "Edit Question";
  editButton.onclick = function () {
    document.getElementById("edit-controls").style.display = "block";
    document.getElementById("edit-title").value = selectedQuestion.title;
  };
  document.body.insertBefore(editButton, document.getElementById("answer-list"));
}

// تعديل عنوان السؤال
function saveEdit() {
  var newTitle = document.getElementById("edit-title").value.trim();

  if (newTitle === "") {
    alert("Title cannot be empty.");
    return;
  }

  // تعديل في الشاشة
  document.getElementById("question-title").textContent = newTitle;
  document.getElementById("edit-controls").style.display = "none";
  document.getElementById("edited-flag").style.display = "inline";

  // تعديل في المصفوفة
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].id === selectedQuestion.id) {
      questions[i].title = newTitle;
      break;
    }
  }

  // إعادة تخزين المصفوفة
  localStorage.setItem("questions", JSON.stringify(questions));

  alert("Question updated successfully.");
}


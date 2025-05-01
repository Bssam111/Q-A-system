// جلب الأسئلة من localStorage
var stored = localStorage.getItem("questions");
var questions = stored ? JSON.parse(stored) : [];

// قراءة ID من الرابط
var url = window.location.search;
var id = null;

if (url.indexOf("id=") !== -1) {
  var parts = url.split("id=");
  id = parseInt(parts[1]);
}

// البحث عن السؤال
var selectedQuestion = null;
for (var i = 0; i < questions.length; i++) {
  if (questions[i].id === id) {
    selectedQuestion = questions[i];
    break;
  }
}

if (selectedQuestion !== null) {
  document.getElementById("question-title").textContent = selectedQuestion.title;
  document.getElementById("question-meta").textContent =
    "Asked by " + selectedQuestion.author + " on " + selectedQuestion.date;
} else {
  document.getElementById("question-title").textContent = "Question not found.";
}

// جلب الإجابات
var storedAnswers = localStorage.getItem("answers");
var answers = storedAnswers ? JSON.parse(storedAnswers) : [];

var answerList = document.getElementById("answer-list");
var currentUser = localStorage.getItem("loggedInUser");

// عرض الإجابات
for (var j = 0; j < answers.length; j++) {
  if (answers[j].questionId === id) {
    var answerDiv = document.createElement("div");

    var p = document.createElement("p");
    p.textContent = answers[j].author + ": " + answers[j].content;
    p.id = "answer-text-" + j;

    if (answers[j].edited === true) {
      var editedFlag = document.createElement("span");
      editedFlag.textContent = " (edited)";
      p.appendChild(editedFlag);
    }

    answerDiv.appendChild(p);

    // التصويتات
    var voteSpan = document.createElement("p");
    voteSpan.textContent = " 👍 " + (answers[j].votes || 0);
    answerDiv.appendChild(voteSpan);

    // أزرار التصويت
    if (currentUser && answers[j].author !== currentUser) {
      var upBtn = document.createElement("button");
      upBtn.textContent = "Upvote";
      upBtn.setAttribute("data-index", j);
      upBtn.onclick = function () {
        var index = parseInt(this.getAttribute("data-index"));
        upVote(index);
      };
      answerDiv.appendChild(upBtn);

      var downBtn = document.createElement("button");
      downBtn.textContent = "Downvote";
      downBtn.setAttribute("data-index", j);
      downBtn.onclick = function () {
        var index = parseInt(this.getAttribute("data-index"));
        downVote(index);
      };
      answerDiv.appendChild(downBtn);
    }

    // تعديل وحذف
    if (answers[j].author === currentUser) {
      var editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.setAttribute("data-index", j);
      editBtn.onclick = function () {
        var index = this.getAttribute("data-index");
        showEditAnswer(index);
      };

      var deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute("data-index", j);
      deleteBtn.onclick = function () {
        var index = this.getAttribute("data-index");
        deleteAnswer(index);
      };

      answerDiv.appendChild(editBtn);
      answerDiv.appendChild(deleteBtn);
    }

    answerList.appendChild(answerDiv);
  }
}

// إرسال إجابة جديدة
var form = document.getElementById("answer-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var answerText = document.getElementById("answer").value.trim();

  if (answerText === "") {
    alert("Answer cannot be empty.");
    return;
  }

  if (!currentUser) {
    alert("You must be logged in to post an answer.");
    return;
  }

  var newAnswer = {
    questionId: id,
    content: answerText,
    author: currentUser,
    votes: 0,
    votedBy: []
  };

  answers.push(newAnswer);
  localStorage.setItem("answers", JSON.stringify(answers));

  location.reload();
});

// تعديل الإجابة
function showEditAnswer(index) {
  var current = answers[index];

  var newContent = prompt("Edit your answer:", current.content);
  if (newContent !== null) {
    newContent = newContent.trim();
    if (newContent !== "") {
      answers[index].content = newContent;
      answers[index].edited = true;
      localStorage.setItem("answers", JSON.stringify(answers));
      location.reload();
    }
  }
}

// حذف الإجابة
function deleteAnswer(index) {
  if (confirm("Are you sure you want to delete this answer?")) {
    answers.splice(index, 1);
    localStorage.setItem("answers", JSON.stringify(answers));
    location.reload();
  }
}

// التصويت - Upvote
function upVote(index) {
  if (!currentUser) {
    alert("You must be logged in to vote.");
    return;
  }

  if (!answers[index].votedBy) {
    answers[index].votedBy = [];
  }

  if (answers[index].votedBy.includes(currentUser)) {
    alert("You already voted on this answer.");
    return;
  }

  answers[index].votes += 1;
  answers[index].votedBy.push(currentUser);

  localStorage.setItem("answers", JSON.stringify(answers));
  location.reload();
}

// التصويت - Downvote (يسحب التصويت إذا سبق وصوّت)
function downVote(index) {
  if (!currentUser) {
    alert("You must be logged in to vote.");
    return;
  }

  if (!answers[index].votedBy || !answers[index].votedBy.includes(currentUser)) {
    alert("You didn't vote on this answer.");
    return;
  }

  answers[index].votes -= 1;

  // نحذف المستخدم من votedBy
  for (var i = 0; i < answers[index].votedBy.length; i++) {
    if (answers[index].votedBy[i] === currentUser) {
      answers[index].votedBy.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("answers", JSON.stringify(answers));
  location.reload();
}

// تعديل عنوان السؤال
if (selectedQuestion !== null && currentUser === selectedQuestion.author) {
  var editButton = document.createElement("button");
  editButton.textContent = "Edit Question";
  editButton.onclick = function () {
    document.getElementById("edit-controls").style.display = "block";
    document.getElementById("edit-title").value = selectedQuestion.title;
  };
  document.body.insertBefore(editButton, document.getElementById("answer-list"));
}

function saveEdit() {
  var newTitle = document.getElementById("edit-title").value.trim();

  if (newTitle === "") {
    alert("Title cannot be empty.");
    return;
  }

  document.getElementById("question-title").textContent = newTitle;
  document.getElementById("edit-controls").style.display = "none";
  document.getElementById("edited-flag").style.display = "inline";

  for (var i = 0; i < questions.length; i++) {
    if (questions[i].id === selectedQuestion.id) {
      questions[i].title = newTitle;
      break;
    }
  }

  localStorage.setItem("questions", JSON.stringify(questions));
  alert("Question updated.");
}

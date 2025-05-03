
let currentUser = null;
let questionId = null;

fetch("php/session_info.php", {
  credentials: "include"
})
  .then(res => res.json())
  .then(data => {
    currentUser = data.username;
    loadQuestion();
  });

function loadQuestion() {
  const urlParams = new URLSearchParams(window.location.search);
  questionId = urlParams.get("id");

  if (!questionId) {
    document.getElementById("question-title").textContent = "No question ID found.";
    return;
  }

  fetch("php/get_question.php?id=" + questionId, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (data.error || !data.question) {
        document.getElementById("question-title").textContent = "Question not found.";
        return;
      }

      const q = data.question;
      document.getElementById("question-title").textContent = q.title;
      document.getElementById("question-meta").textContent =
        "Asked by " + q.author + " on " + q.created_at.split(" ")[0];

      const list = document.getElementById("answer-list");
      list.innerHTML = "";

      data.answers.forEach((a) => {
        const div = document.createElement("div");

        const p = document.createElement("p");
        p.textContent = `${a.author}: ${a.content}`;
        if (a.edited) {
          const edited = document.createElement("span");
          edited.textContent = " (edited)";
          p.appendChild(edited);
        }
        div.appendChild(p);

        const voteDisplay = document.createElement("p");
        voteDisplay.id = `vote-${a.id}`;
        voteDisplay.textContent = "👍 " + a.votes;
        div.appendChild(voteDisplay);

        if (currentUser && a.author !== currentUser) {
          const up = document.createElement("button");
          up.textContent = "Upvote";
          up.onclick = () => vote(a.id, "up");
          div.appendChild(up);

          const down = document.createElement("button");
          down.textContent = "Downvote";
          down.onclick = () => vote(a.id, "down");
          div.appendChild(down);
        }

        if (currentUser === a.author) {
          const edit = document.createElement("button");
          edit.textContent = "Edit";
          edit.onclick = () => editAnswer(a.id, a.content);
          div.appendChild(edit);

          const del = document.createElement("button");
          del.textContent = "Delete";
          del.onclick = () => deleteAnswer(a.id);
          div.appendChild(del);
        }

        list.appendChild(div);
      });
    });
}

// إرسال إجابة جديدة
document.getElementById("answer-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const content = document.getElementById("answer").value.trim();
  if (!content) {
    alert("Answer cannot be empty.");
    return;
  }

  if (!currentUser) {
    alert("You must be logged in to answer.");
    return;
  }

  const formData = new FormData();
  formData.append("question_id", questionId);
  formData.append("content", content);

  fetch("php/add_answer.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        location.reload();
      } else {
        alert(data.message || "Failed to post answer.");
      }
    });
});

// دالة التصويت
function vote(answerId, type) {
  const voteElement = document.querySelector(`#vote-${answerId}`);
  const currentVotes = parseInt(voteElement.textContent.replace("👍 ", ""));
  let newVotes = currentVotes;

  if (type === "up") newVotes += 1;
  else if (type === "down") newVotes -= 1;

  const formData = new FormData();
  formData.append("answer_id", answerId);
  formData.append("vote", type);
  formData.append("new_votes", newVotes);

  fetch("php/vote_answer.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        voteElement.textContent = `👍 ${data.votes}`;
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      alert("Error submitting vote");
      console.error(err);
    });
}

function editAnswer(answerId, oldContent) {
  const newContent = prompt("Edit your answer:", oldContent);
  if (newContent !== null && newContent.trim() !== "") {
    const formData = new FormData();
    formData.append("answer_id", answerId);
    formData.append("content", newContent.trim());

    fetch("php/edit_answer.php", {
      method: "POST",
      body: formData,
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          location.reload();
        } else {
          alert(data.message || "Failed to edit answer.");
        }
      });
  }
}

function deleteAnswer(answerId) {
  if (!confirm("Are you sure you want to delete this answer?")) return;

  const formData = new FormData();
  formData.append("answer_id", answerId);

  fetch("php/delete_answer.php", {
    method: "POST",
    body: formData,
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        location.reload();
      } else {
        alert(data.message || "Failed to delete answer.");
      }
    });
}

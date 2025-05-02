fetch("php/get_my_profile.php")
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      document.body.innerHTML = "<p>You must be logged in.</p>";
      return;
    }

    document.getElementById("username-placeholder").textContent = data.username;

    const qContainer = document.getElementById("my-questions");
    data.questions.forEach(q => {
      const p = document.createElement("p");
      p.innerHTML = `<a href='question.html?id=${q.id}'>${q.title}</a>`;
      qContainer.appendChild(p);
    });

    const aContainer = document.getElementById("my-answers");
    data.answers.forEach(a => {
      const p = document.createElement("p");
      p.innerHTML = `On question <a href='question.html?id=${a.question_id}'>${a.title}</a>: ${a.content}`;
      aContainer.appendChild(p);
    });
  });


const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get("q") || "";

const container = document.getElementById("result-list");

if (!keyword) {
  container.textContent = "Please enter a search keyword.";
} else {
  fetch("php/search_questions.php?q=" + encodeURIComponent(keyword), {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success || !data.questions || data.questions.length === 0) {
        container.textContent = "No questions found.";
        return;
      }

      data.questions.forEach(q => {
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const link = document.createElement("a");

        link.href = "question.html?id=" + q.id;
        link.textContent = q.title;

        h3.appendChild(link);
        div.appendChild(h3);
        container.appendChild(div);
      });
    })
    .catch(err => {
      container.textContent = "Error while searching.";
      console.error(err);
    });
}

fetch("php/get_my_profile.php", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.body.innerHTML = "<p>You must be logged in.</p>";
        return;
      }
  
      document.getElementById("username-placeholder").textContent = data.username;
  
      const qContainer = document.getElementById("my-questions");
  
      for(var i=0; i<data.questions.length; i++){
        const p = document.createElement("p");
        p.innerHTML ="<a href='question.html?id="+data.questions[i].id+"'>"+data.questions[i].title+"</a>";
        qContainer.appendChild(p);
      }
      const aContainer = document.getElementById("my-answers");
    
      for(var i=0; i<data.answers.length; i++){
        const p = document.createElement("p");
        p.innerHTML ="On question <a href='question.html?id="+data.answers[i].question_id+"'>"+data.answers[i].title+"</a><strong>:</strong> <br> <strong>  "+data.answers[i].content+"</strong>";
        aContainer.appendChild(p);
      }
    });
  
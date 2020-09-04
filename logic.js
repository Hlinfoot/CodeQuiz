const start = document.getElementById("start");
const next = document.getElementById("next");
const container = document.querySelectorAll(".container");
const questionsEl = document.getElementById("questions");
const welcome = document.getElementById("welcome");
const answers = document.getElementById("answers");
const finished = document.getElementById("finished");
const correct = document.getElementsByClassName("correct");
const finalScore = document.getElementById("finalScore");
const saveScore = document.getElementById("saveScore");
var current = 0;
var score = 0;

//listens for click on start quiz
start.addEventListener("click", startQuiz);
saveScore.addEventListener("click", saveScoreLocal);

function startQuiz() {
  console.log("Started");
  welcome.setAttribute("class", "hide");
  questionsEl.removeAttribute("class", "hide");
  start.setAttribute("class", "hide");
  score = 0;

  nextQuestion();
}

function nextQuestion() {
  console.log("Next Question");
  answers.innerHTML = "";
  const currentQuestion = questions[current];

  const questionTitle = document.getElementById("question");
  questionTitle.textContent = currentQuestion.title;

  currentQuestion.choices.forEach(function (answer, i) {
    const answerPick = document.createElement("button");
    answerPick.setAttribute("class", "answer");
    answerPick.setAttribute("value", answer);

    answerPick.textContent = i + 1 + ". " + answer;

    answerPick.onclick = answerClick;
    answers.appendChild(answerPick);
  });
}

function answerClick() {
  console.log("answer selected");

  if (this.value === questions[current].answer) {
    score++;
  }

  current++;
  if (current === questions.length) {
    endQuiz();
  } else {
    nextQuestion();
  }
  console.log(score);
}

function endQuiz() {
  console.log("Quiz Finished");
  finished.removeAttribute("class", "hide");
  questionsEl.setAttribute("class", "hide");
  finalScore.textContent = score;
}

function saveScoreLocal() {
  let scores;
  if (localStorage.getItem("scores") === null) {
    scores = [];
  } else {
    scores = JSON.parse(localStorage.getItem("scores"));
  }
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));
  console.log("score saved");
  window.location.reload();
}

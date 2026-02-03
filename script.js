const quiz = [
  {
    question: "ما هي عاصمة مصر؟",
    choices: ["القاهرة", "الإسكندرية", "الجيزة", "أسوان"],
    answer: 0
  },
  {
    question: "ما هو أكبر كوكب في المجموعة الشمسية؟",
    choices: ["الأرض", "المريخ", "المشتري", "زحل"],
    answer: 2
  },
  {
    question: "أي لغة برمجة تستخدم لتصميم المواقع؟",
    choices: ["Python", "HTML", "C++", "Java"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionContainer = document.getElementById("question-container");
const choicesDiv = document.getElementById("choices");
const scoreSpan = document.getElementById("score");
const timerSpan = document.getElementById("time");
const resultScreen = document.getElementById("result-screen");
const finalScoreSpan = document.getElementById("final-score");

function loadQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question").textContent = q.question;
  choicesDiv.innerHTML = "";
  
  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice-btn";
    btn.onclick = () => selectAnswer(btn, index);
    choicesDiv.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(btn, index) {
  stopTimer();
  const q = quiz[currentQuestion];

  Array.from(document.getElementsByClassName("choice-btn")).forEach(b => b.disabled = true);

  if(index === q.answer){
    btn.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    btn.classList.add("wrong");
    const buttons = document.getElementsByClassName("choice-btn");
    buttons[q.answer].classList.add("correct");
  }
}

function nextQuestion() {
  stopTimer();
  currentQuestion++;
  if(currentQuestion < quiz.length){
    loadQuestion();
  } else {
    showResult();
  }
}

function resetGame() {
  currentQuestion = 0;
  score = 0;
  scoreSpan.textContent = score;
  resultScreen.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  loadQuestion();
}

function showResult() {
  questionContainer.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScoreSpan.textContent = `${score} / ${quiz.length}`;
}

function startTimer() {
  timeLeft = 10;
  timerSpan.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if(timeLeft <= 0){
      stopTimer();
      Array.from(document.getElementsByClassName("choice-btn")).forEach(b => b.disabled = true);
      const q = quiz[currentQuestion];
      const buttons = document.getElementsByClassName("choice-btn");
      buttons[q.answer].classList.add("correct");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

// تحميل السؤال الأول
loadQuestion();

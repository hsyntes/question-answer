"use strict";

const QuestionsAndAnswers = [
  {
    question:
      "Which one is the most popular programming language on the world in 2021?",
    options: ["JavaScript", "Python", "C#", "Java"],
    correctAnswer: "JavaScript",
  },
  {
    question: "Which one is only working on Android applications?",
    options: ["C#", "Swift", "Java", "Objective-C"],
    correctAnswer: "Java",
  },
  {
    question: "Which one is only working on IOS applications?",
    options: ["Java", "Swift", "C/C++", "NodeJS"],
    correctAnswer: "Swift",
  },
  {
    question: "Which one is JavaScript Framework to develop mobile apps?",
    options: ["React", "Vue", "Angular", "React Native"],
    correctAnswer: "React Native",
  },
  {
    question: "Which one is the most use technology for embedded systems?",
    options: ["C/C++", "Ruby", "Python", "C#"],
    correctAnswer: "C/C++",
  },
  {
    question: "Which one is the Google's technlogoy?",
    options: ["Go", "Python", "JavaScript", "Swift"],
    correctAnswer: "Go",
  },
  {
    question: "Which one is the Facebook's technology?",
    options: ["Angular", "React", "C#", "Python"],
    correctAnswer: "React",
  },
  {
    question: "Which one is open-source operation system?",
    options: ["Windows", "MacOS", "GNU/Linux", "MSDOS"],
    correctAnswer: "GNU/Linux",
  },
  {
    question: "Which ones are framework to develop mobile apps?",
    options: [
      "Flutter - React Native",
      "ASP.NET - Django",
      "Vue - NodeJS",
      "Java Spring - .NET Core",
    ],
    correctAnswer: "Flutter - React Native",
  },
  {
    question: "Which one is back-end framework?",
    options: ["Angular", "Vue", "React", "NodeJS"],
    correctAnswer: "NodeJS",
  },
  {
    question: "Which one is front-end framework?",
    options: ["Django", "ASP.NET", "Angular", "Java Spring"],
    correctAnswer: "Angular",
  },
  {
    question: "Which one is the first programming language?",
    options: ["C", "Fortan", "Python", "Ada"],
    correctAnswer: "Fortan",
  },
  {
    question: "Who was written the Linux Kernel by?",
    options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Ada Lovelace"],
    correctAnswer: "Linus Torvalds",
  },
  {
    question: "Which years was written the Windows operation system?",
    options: ["1993", "1956", "1985", "1999"],
    correctAnswer: "1985",
  },
  {
    question: "Which years was wirtten the Linux Kernel?",
    options: ["1991", "1999", "1976", "2004"],
    correctAnswer: "1991",
  },
  {
    question: "Which one is the best for data science?",
    options: ["C/C++", "Python", "JavaScript", "TypeScript"],
    correctAnswer: "Python",
  },
  {
    question: "Which one isn't a data structure?",
    options: ["Stack", "Tree", "Linked List", "openFile"],
    correctAnswer: "openFile",
  },
  {
    question: "Which one isn't open-source application?",
    options: ["MS Office", "Libre Office", "KdenLive", "Shutcut"],
    correctAnswer: "MS Office",
  },
];

const questionTitle = document.querySelector("#question");
const btnAnswer = document.querySelectorAll(".btn-answer");
const navQuestion = document.querySelectorAll(".nav-question");
const btnContinue = document.querySelector("#btn-continue");
const btnRestart = document.querySelector("#btn-restart");

const countOfTrueWrong = [[1, 2]];

function starting() {
  btnContinue.classList.add("d-none");
  btnRestart.classList.add("d-none");
  countOfTrueWrong[[0, 0]] = 0;
  countOfTrueWrong[[0, 1]] = 0;
}

starting();

let previousRnds = [];

const produceRandomNumber = function () {
  let rnd = Math.floor(Math.random() * QuestionsAndAnswers.length);

  if (previousRnds.length >= 1) {
    for (let i = 0; i < previousRnds.length; i++) {
      while (previousRnds.indexOf(rnd) !== -1) {
        rnd = Math.floor(Math.random() * QuestionsAndAnswers.length);
      }
    }
  }

  return rnd;
};

let rndQ;
const createQA = function () {
  rndQ = produceRandomNumber();
  previousRnds.push(rndQ);

  questionTitle.textContent = QuestionsAndAnswers[rndQ].question;

  for (let i = 0; i < btnAnswer.length; i++) {
    btnAnswer[i].textContent = QuestionsAndAnswers[rndQ].options[i];
  }

  return rndQ;
};

createQA();

let countOfQ = 0;
function setQ() {
  for (let i = 0; i < navQuestion.length; i++) {
    navQuestion[countOfQ].classList.add("active-question");
    if (countOfQ > 0) {
      navQuestion[countOfQ - 1].classList.remove("active-question");
    }
  }
}

setQ();

function disableBtns() {
  for (let i = 0; i < btnAnswer.length; i++) {
    btnAnswer[i].disabled = true;
  }
}

function setBtns(btn, stateOfClass) {
  btn.classList.remove("btn-light");
  btn.classList.add(stateOfClass);
}

for (let i = 0; i < btnAnswer.length; i++) {
  btnAnswer[i].addEventListener("click", function () {
    disableBtns();
    btnContinue.classList.remove("d-none");
    if (this.textContent === QuestionsAndAnswers[rndQ].correctAnswer) {
      setBtns(this, "btn-success");
      countOfTrueWrong[[0, 0]]++;
    } else {
      setBtns(this, "btn-danger");
      countOfTrueWrong[[0, 1]]++;
    }
  });
}

function enableBtns() {
  for (let i = 0; i < btnAnswer.length; i++) {
    btnAnswer[i].disabled = false;
  }
}

function clearBtns() {
  for (let i = 0; i < btnAnswer.length; i++) {
    btnAnswer[i].classList.remove(
      btnAnswer[i].className.indexOf("btn-success") != -1
        ? "btn-success"
        : "btn-danger"
    );
    btnAnswer[i].classList.add("btn-light");
  }
}

function finish(btn) {
  btn.disabled = true;
  alert(`Count of true: ${countOfTrueWrong[[0, 0]]}
Count of false: ${countOfTrueWrong[[0, 1]]}`);

  btnRestart.classList.remove("d-none");
}

function continueTo(btn) {
  setQ();

  rndQ = createQA();

  enableBtns();
  clearBtns();

  btn.classList.add("d-none");
}

btnContinue.addEventListener("click", function () {
  countOfQ++;
  countOfQ === 5 ? finish(this) : continueTo(this);
});

function clearNav() {
  for (let i = 0; i < navQuestion.length; i++) {
    navQuestion[i].classList.remove("active-question");
  }
}

btnRestart.addEventListener("click", function () {
  clearNav();

  countOfQ = 0;
  setQ();

  previousRnds = [];
  rndQ = createQA();

  enableBtns();
  clearBtns();
  starting();

  btnContinue.disabled = false;
});

console.log("hi")
function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0
}

function Question(questionText, options, answer) {
    this.questionText = questionText;
    this.options = options;
    this.answer = answer
}

let questions = [
    new Question("Javascript supports", ["Functions", "xhtml", "html", "css"], "Functions"),
    new Question("CSS STANDS FOR", ["Cascading style sheet", "Cascading style script", "color style sheet", "clss style sheet"], "Cascading style sheet"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
]

let quiz = new Quiz(questions)


Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkUserAttempt = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return choice === this.answer
}

Quiz.prototype.isEnded = function () {

    return this.questionIndex === this.questions.length
}

function loadQuestions() {

    if (quiz.isEnded()) {
        showScores();
    } else {
        let elem = document.getElementById("question");
        elem.innerHTML = quiz.getQuestionByIndex().questionText;

        let options = quiz.getQuestionByIndex().options;
        for (let i = 0; i < options.length; i++) {
            let eachOption = document.getElementById("choice" + i);
            eachOption.innerText = options[i];
            handleOptionBtn("btn" + i, options[i]);

        }
        showProgress();
    }

}

function showScores() {
    let endResult = "<h1>Result</h1>";
    endResult += "<h2 id='score'>youre score:" + quiz.score + ". and percentage is :" + (quiz.score / questions.length * 100) + "%<h2>";

    let elem = document.getElementById("quiz");
    elem.innerHTML = endResult
}

function handleOptionBtn(id, currentOption) {

    let btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.checkUserAttempt(currentOption);
        loadQuestions();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let elem = document.getElementById("progress");
    elem.innerHTML = "Question " + currentQuestionNumber + "of " + quiz.questions.length
   

}

loadQuestions();
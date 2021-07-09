"use strict";
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonElement = document.getElementById('answer-buttons');
var resultButton = document.getElementById('result-btn');
var resultText = document.getElementById('result');
var shuffledQuestions;
var currentQuestionIndex;
var number;
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', function () {
    currentQuestionIndex++;
    setNextQuestion();
});
resultButton.addEventListener('click', viewResult);
function startGame() {
    resultText.classList.add('hide');
    resultButton.classList.add('hide');
    document.body.classList.remove('wrong');
    document.body.classList.remove('correct');
    startButton.classList.add('hide');
    shuffledQuestions = question;
    currentQuestionIndex = 0;
    number = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answer.forEach(function (answer) {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = String(answer.correct);
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}
function selectAnswer(e) {
    var seletedButton = e.target;
    var correct = seletedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(function (button) {
        var tempButton = button;
        setStatusClass(tempButton, tempButton.dataset.correct);
        button.classList.remove('btn');
        button.classList.add('hover-effect');
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1)
        nextButton.classList.remove('hide');
    else {
        startButton.innerText = "Restart";
        startButton.classList.remove('hide');
        resultButton.classList.remove('hide');
    }
}
function viewResult() {
    resetState();
    questionContainerElement.classList.add('hide');
    startButton.classList.add('hide');
    resultButton.classList.add('hide');
    document.body.classList.remove('wrong');
    document.body.classList.remove('correct');
    resultText.classList.remove('hide');
    resultText.innerText = "Result: " + (number - 3) + "/" + question.length;
    startButton.classList.remove('hide');
}
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct == "true") {
        number++;
        element.classList.add('correct');
    }
    else {
        element.classList.add('wrong');
    }
}
function clearStatusClass(element) {
    element.classList.remove('wrong');
    element.classList.remove('correct');
}
var question;
question = [
    {
        question: 'Which team is the champion of La Liga 2020/2021?',
        answer: [
            { text: 'Aletico Madrid', correct: true },
            { text: 'Real Madrid', correct: false },
            { text: 'Barcelona', correct: false },
            { text: 'Sevilla', correct: false }
        ]
    },
    {
        question: 'Which team is the champion of Serie A 2020/2021? ',
        answer: [
            { text: 'Juventus', correct: false },
            { text: 'AC Milan', correct: false },
            { text: 'Inter Milan', correct: true },
            { text: 'Atalanta', correct: false }
        ]
    },
    {
        question: 'Which team is the champion of EPL 2020/2021? ?',
        answer: [
            { text: 'Manchester United', correct: false },
            { text: 'Chelsea', correct: false },
            { text: 'Manchester City', correct: true },
            { text: 'Arsenal', correct: false }
        ]
    },
];

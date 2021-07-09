import { doc } from "prettier";
import React from "react";
import { start } from "repl";
import { array } from "yargs";
const startButton = document.getElementById('start-btn') as HTMLButtonElement;
const nextButton  = document.getElementById('next-btn') as HTMLButtonElement;
const questionContainerElement = document.getElementById('question-container') as HTMLDivElement;
const questionElement = document.getElementById('question') as HTMLDivElement;
const answerButtonElement = document.getElementById('answer-buttons') as HTMLDivElement;
const resultButton = document.getElementById('result-btn') as HTMLButtonElement;
const resultText = document.getElementById('result') as HTMLAreaElement;
let shuffledQuestions:{
    question:string,
    answer:{
        text:string,
        correct: boolean;
    }[]
}[]

let currentQuestionIndex:number;
let number:number;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++;
    setNextQuestion();
})

resultButton.addEventListener('click', viewResult);

function startGame()
{
    resultText.classList.add('hide');
    resultButton.classList.add('hide');
    document.body.classList.remove('wrong');
    document.body.classList.remove('correct');
    startButton.classList.add('hide');
    shuffledQuestions = question;
    currentQuestionIndex=0;
    number=0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion()
{
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question:{
    question: string,
    answer:{
        text:string,
        correct: boolean,
    }[]
})
{
    questionElement.innerText=question.question;
    question.answer.forEach(answer=>{
        const button = document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('btn');
        if (answer.correct)
        {
            button.dataset.correct = String(answer.correct)
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    })
}

function resetState(){
    nextButton.classList.add('hide');
    while(answerButtonElement.firstChild)
    {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e: MouseEvent)
{
    const seletedButton = e.target as HTMLButtonElement; 
    const correct = seletedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button=>{
        let tempButton = button as HTMLButtonElement;
        setStatusClass(tempButton, tempButton.dataset.correct);
        button.classList.remove('btn');
        button.classList.add('hover-effect');
    })

    if (shuffledQuestions.length > currentQuestionIndex+1)
        nextButton.classList.remove('hide');
    else
    {
        startButton.innerText="Restart";
        startButton.classList.remove('hide');
        resultButton.classList.remove('hide');
    }
}

function viewResult()
{
    resetState();
    questionContainerElement.classList.add('hide');
    startButton.classList.add('hide');
    resultButton.classList.add('hide');
    document.body.classList.remove('wrong');
    document.body.classList.remove('correct');
    resultText.classList.remove('hide');
    resultText.innerText="Result: " + (number-3) + "/" +question.length;
    startButton.classList.remove('hide');
}
function setStatusClass(element:Element, correct: string|undefined)
{
    clearStatusClass(element);
    if (correct=="true")
    {
        number++;
        element.classList.add('correct');
    }
    else
    {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element:Element)
{
    element.classList.remove('wrong');
    element.classList.remove('correct');
}

let question:{
    question: string,
    answer:{
        text: string,
        correct: boolean;
    }[]
}[]

question=[
    {
        question:'Which team is the champion of La Liga 2020/2021?',
        answer:[
            {text: 'Aletico Madrid', correct: true},
            {text: 'Real Madrid', correct: false},
            {text: 'Barcelona', correct: false},
            {text: 'Sevilla', correct: false}
        ]
    },


    {
        question:'Which team is the champion of Serie A 2020/2021? ',
        answer:[
            {text: 'Juventus', correct: false},
            {text: 'AC Milan', correct: false},
            {text: 'Inter Milan', correct: true},
            {text: 'Atalanta', correct: false}
        ]
    },


    {
        question:'Which team is the champion of EPL 2020/2021? ?',
        answer:[
            {text: 'Manchester United', correct: false},
            {text: 'Chelsea', correct: false},
            {text: 'Manchester City', correct: true},
            {text: 'Arsenal', correct: false}
        ]
    },

]

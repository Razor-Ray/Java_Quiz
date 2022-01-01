//Pesudo Code

// On Click of Start Quiz
    //Start timer from 75 Secs
    //hide the inital elements and present with the first question and its options
var quizHeader = document.querySelector("#quizHeader")
var quizTip = document.querySelector("#quizTip")
var startQuiz = document.querySelector("#startQuizButton")
var questions = document.querySelector("#question")
var optionsBttn = document.querySelector("#options")
var questionIndex = 0
var sectionContainer = document.querySelector(".container")
var questionAndOptions = [
    {question: "Commonly used data types DO NOT include:",
    options: ["1. Strings","2. Booleans","3. Alerts","4. Numbers"],
    correct: "3. Alerts"},
    {question: "Functions are reusable blocks of code that perform a specific task?",
    options: ["1. True","2. False"],
    correct: "1. True"},
]

console.log(questionAndOptions[0].question)

startQuiz.addEventListener("click",function(){
    startQuiz.setAttribute("style","display: none")
    quizTip.setAttribute("style","display: none")
    quizHeader.setAttribute("style","display: none")
    displayQuestion();
    generateOptions();
    verifySelection();
})

var displayQuestion = function(){
    questions.textContent = questionAndOptions[questionIndex].question

}

function generateOptions(){
    for(i=0;i<questionAndOptions[questionIndex].options.length; i++){
        var btn = document.createElement("button")
        var t = document.createTextNode(questionAndOptions[questionIndex].options[i])
        btn.appendChild(t);
        optionsBttn.appendChild(btn);

    }

}

function verifySelection(){
    sectionContainer.addEventListener("click", function(event){
        var element = event.target;
        event.stopPropagation();
        if(element.matches("button")){
           var selectedAnswer = element.innerText
           var correctAnswer = questionAndOptions[questionIndex].correct
        //    console.log(selectedAnswer)
        //    console.log(correctAnswer)
        //    console.log(selectedAnswer == correctAnswer)
           if(selectedAnswer == correctAnswer){
               console.log("Correct Answer")
           } else{
             console.log("Incorrect Answer")
           }

        }
    })    
}
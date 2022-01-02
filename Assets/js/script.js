    //Pesudo Code

    // On Click of Start Quiz
        //Start timer from 75 Secs
        //hide the inital elements and present with the first question and its options
    var quizHeader = document.querySelector("#quizHeader")
    var quizTip = document.querySelector("#quizTip")
    var startQuiz = document.querySelector("#startQuizButton")
    var questions = document.querySelector("#question")
    var questionIndex = 0
    var sectionContainer = document.querySelector(".container #options")
    var displayResult = document.querySelector("#displayResult")
    var questionAndOptions = [
        {question: "Commonly used data types DO NOT include:",
        options: ["1. Strings","2. Booleans","3. Alerts","4. Numbers"],
        correct: "3. Alerts"},
        {question: "Functions are reusable blocks of code that perform a specific task?",
        options: ["1. True","2. False"],
        correct: "1. True"},
    ]
    var optionsEl = document.getElementById("options")
    var time = 75
    var timer = document.querySelector("#timer")

    startQuiz.addEventListener("click",function(){
        startQuiz.setAttribute("style","display: none")
        quizTip.setAttribute("style","display: none")
        quizHeader.setAttribute("style","display: none")
        displayQuestion();
        generateOptions();
        secondsRemaining();
    })

    sectionContainer.addEventListener("click", function(event){
        var element = event.target;
        event.stopPropagation();
        optionsEl.setAttribute("style","display: none")
        if(element.matches("button")){
            var selectedAnswer = element.innerText
            var correctAnswer = questionAndOptions[questionIndex].correct
            if(selectedAnswer == correctAnswer){
                displayResult.textContent = "Correct!";
                clearOldAnswers();
                questionIndexAdd();
            } else{
                displayResult.textContent = "Wrong!";
                time = time-10;
                clearOldAnswers()
                questionIndexAdd()
            }
        }
    })

    var displayQuestion = function(){
        questions.textContent = questionAndOptions[questionIndex].question
    }

    function generateOptions(){
        optionsEl.setAttribute("style","display: block")
        for(i=0;i<questionAndOptions[questionIndex].options.length; i++){
            var optionsButtons = document.createElement("button")
            optionsButtons.textContent = questionAndOptions[questionIndex].options[i]
            optionsEl.appendChild(optionsButtons)} 
    }

    function questionIndexAdd(){
        if(questionIndex<(questionAndOptions.length-1)){
            questionIndex++;
            displayQuestion();
            generateOptions();
        } else{
            showHighScore();
        }
    }

    function clearOldAnswers(){
        while(optionsEl.firstChild){
            optionsEl.removeChild(optionsEl.firstChild)
        }
    }

    function showHighScore(){
        questions.textContent=""
        var divEl = document.createElement("div")
        var viewHighScore = document.createElement("button")
        var tryagain = document.createElement("button")
        viewHighScore.textContent = "View Highscore"
        tryagain.textContent = "Try Again"
        divEl.setAttribute("class","container")
        document.body.appendChild(divEl)
        divEl.appendChild(viewHighScore)
        divEl.appendChild(tryagain)
    }

    function secondsRemaining(){
        var remainingTime = setInterval(function(){
            timer.textContent = time + " seconds remaining"
            time--;
        if(time === -1){
            clearInterval(remainingTime);
            clearOldAnswers();
            showHighScore();
        }
        },1000)
    }

    //Pesudo Code

    // On Click of Start Quiz
        //Start timer from 75 Secs
        //hide the inital elements and present with the first question and its options
    var quizHeader = document.querySelector("#quizHeader")
    var quizTip = document.querySelector("#quizTip")
    var startQuiz = document.querySelector("#startQuizButton")
    var questions = document.querySelector("#question")
    var questionIndex = 0
    var formEl = document.querySelector("#formEl")

    var sectionContainer = document.querySelector("#options")
    var displayResult = document.querySelector("#displayResult")
    var displayScore = document.querySelector("#displayScore")
    var questionAndOptions = [{
        question: "Commonly used data types DO NOT include:",
        options: ["1. Strings","2. Booleans","3. Alerts","4. Numbers"],
        correct: "3. Alerts"},
        {question: "Functions are reusable blocks of code that perform a specific task?",
        options: ["1. True","2. False"],
        correct: "1. True"
        }
    ]
    var score = 0
    var optionsEl = document.getElementById("options")
    var time = 75
    var timer = document.querySelector("#timer")

    startQuiz.addEventListener("click",function(){
        startQuiz.setAttribute("style","display: none")
        quizTip.setAttribute("style","display: none")
        quizHeader.setAttribute("style","display: none")
        secondsRemaining()
        displayQuestion();
        generateOptions();
    })

    sectionContainer.addEventListener("click", function(event){
        var element = event.target;
        
        event.stopPropagation()
        if(element.matches("button")){
            if(element.innerText == questionAndOptions[questionIndex].correct){
                displayResult.textContent = "Correct!";
                score = score + 10;
                resultDelay();
            } else{
                time = time-10;
                displayResult.textContent = "Wrong!";
                resultDelay();
            }
        }
        clearOldAnswers()
        questionIndexAdd()
    })

    var resultDelay = function(){
        var showResult = 1;
        var timeResultID = setInterval(function(){
            if(showResult<=3){
            showResult--;
            }
            if(showResult===0){
            clearInterval(timeResultID);
            displayResult.textContent="";
            }
        },1000);
    }

    var displayQuestion = function(){
        questions.textContent = questionAndOptions[questionIndex].question
        questions.setAttribute("style","text-align: left; font-size: 30px; font-weight: bold")
    }

    function generateOptions(){
        optionsEl.setAttribute("style","display: block")
        for(i=0;i<questionAndOptions[questionIndex].options.length; i++){
            var optionsButtons = document.createElement("button")
            optionsButtons.textContent = questionAndOptions[questionIndex].options[i]
            optionsEl.appendChild(optionsButtons)
            optionsButtons.setAttribute("style","display: flex; margin: 10px")
        } 
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
        var h1El = document.createElement("h1")
        var pEl = document.createElement("p")
        h1El.textContent = "All Done!"
        var finalScore = score + time
        pEl.textContent = "Your final score is "+(finalScore)
        displayScore.appendChild(divEl);
        divEl.appendChild(h1El);
        divEl.appendChild(pEl);
        questionIndex=questionAndOptions.length;
        timer.textContent = time + " seconds remaining"
        formEl.setAttribute("style","display:inline");
        formEl.children[2].setAttribute("style","font-size:20px")
        console.log(formEl)
    }
    
    function secondsRemaining(){
        
        var remainingTime = setInterval(function(){
        if(time>=0 && questionIndex<questionAndOptions.length){
            timer.textContent = time + " seconds remaining"
            time--;
        }
            
        else if(time === -1){
            console.log(time);
            clearInterval(remainingTime);
            clearOldAnswers();
            showHighScore();
        }
        },1000)
    }


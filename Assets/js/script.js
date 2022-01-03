    //Pesudo Code

    // On Click of Start Quiz
        //Start timer from 75 Secs
        //hide the inital elements and present with the first question and its options
    var quizHeader = document.querySelector("#quizHeader")
    var quizTip = document.querySelector("#quizTip")
    var startQuiz = document.querySelector("#startQuizButton")
    var questions = document.querySelector("#question")
    var questionIndex = 0
    var sectionEl = document.querySelector("#submitData")
    var highScoreList = document.querySelector("highScoreList")
    var submittedHighScores = []


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
        var storedHighScores = JSON.parse(localStorage.getItem("storedHighScores"))
        if(storedHighScores==!null){
        submittedHighScores = storedHighScores}
        var divEl = document.createElement("div")
        var h1El = document.createElement("h1")
        var pEl = document.createElement("p")
        var labelEl = document.createElement("label")
        var textAreaEl = document.createElement("textarea")
        var submitButton = document.createElement("button")
        displayScore.appendChild(divEl);
        divEl.append(h1El, pEl);
        sectionEl.append(labelEl, textAreaEl, submitButton)
        h1El.textContent = "All Done!"
        var finalScore = score + time
        pEl.textContent = "Your final score is "+(finalScore)
        questionIndex=questionAndOptions.length;
        timer.textContent = time + " seconds remaining"
        labelEl.textContent = "Enter Initals"
        submitButton.textContent = "Submit"
        
        sectionEl.children[2].addEventListener("click", function(){
        var highScoreText = sectionEl.children[1].value.trim()
        if (highScoreText ===""){
            alert("Initals cannot be blank");
            return;}
        var initalAndScore = highScoreText +" "+finalScore;
        submittedHighScores.push(initalAndScore)
        localStorage.setItem("storedHighScores",JSON.stringify(submittedHighScores))
        sectionEl.children[1].value = ""
    })
    }

    function store(){
        submittedHighScores.push(initalAndScore.value)
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

    function init(){
        var storedHighScores = JSON.parse(localStorage.getItem("storedHighScores"))
        if (storedHighScores !==null){
            submittedHighScores = storedHighScores;
        }
        // renderStoredHighScores();
    }
    init();
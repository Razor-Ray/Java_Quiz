var highScoreList = document.querySelector("highScoreList")

function init(){
    var storedHighscores = JSON.parse(localStorage.getItem("submittedHighScores"))
    if(storedHighscores = !null){
        submittedHighScores = storedHighscores
    }
    createListForHighScore();
}

function createListForHighScore(){
    for(var i = 0;i<submittedHighScores.length;i++){
        var highscore = submittedHighScores[i];
        
        var li = document.createElement("li");
        li.textContent = highscore
        li.setAttribute("data-index",i)
        highScoreList.appendChild(li)
    }
}
init()
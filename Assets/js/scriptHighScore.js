var highScoreList = document.querySelector("#highScoreList")
var clearHighScore = document.querySelector("#clearHighScore")
var storedHighScoreList = JSON.parse(localStorage.getItem("storedHighScores"))
var count = 0
console.log(storedHighScoreList.length)

for(i=0; i<storedHighScoreList.length; i++){
    var liEl = document.createElement("li");
    count++;
    liEl.textContent = count +". "+storedHighScoreList[i];
    highScoreList.appendChild(liEl)
    liEl.setAttribute("style","display:block;color:black;")
}
    clearHighScore.addEventListener("click", function(){
    localStorage.clear();
    window.location.reload()
})
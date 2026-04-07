// add javascript here
let range;
let targetNumber;
let wins = 0;
let pName;
let guess;
let score;
let scoreAverage
const scoreList = [];
//shorthand, got tired of typing document.getElementById
function getElement(id) {
    return document.getElementById(id);
}
//gets name of player
function getName() {
    let temp = prompt("Enter your name");
    //makes first letter uppercase and the rest lowercase
    pName = temp[0].toUpperCase() + temp.toLowerCase().slice(1, temp.length);
}
//checks proximity of guess to answer
function hotOrCold() {
    if (Math.abs(guess - targetNumber) <= 2) {
        return "hot"
    }
    else if (Math.abs(guess - targetNumber) <= 5) {
        return "warm"
    }
    else if (Math.abs(guess - targetNumber) > 5) {
        return "cold"
    }
}
//gets the target number and enables
function play() {
    //gets value so we know range
    range = document.querySelector('input[name = "level"]:checked').value;
    //disables all radio buttons
    let radioButtons = document.getElementsByName("level");
    for (i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = true;
    }
    //disables play button and enables the guess and giveup
    getElement("playBtn").disabled = true;
    getElement("guessBtn").disabled = false;
    getElement("giveUpBtn").disabled = false;
    //changes msg
    getElement("msg").innerHTML = "Take a guess, " + pName;
    //generates a number
    targetNumber = Math.floor(Math.random() * range + 1);
    //resets score
    score = 0;
}
function makeGuess() {
    //gets guess from text field
    guess = getElement("guess").value;
    score++;
    //checks if guess is more less or equal and changes msg
    if (parseInt(guess) == targetNumber) {
        //updates win and html element
        wins++;
        getElement("msg").innerHTML = "Correct, " + pName;
        getElement("wins").innerHTML = "Total wins: " + wins;
        //appends score to all scores, sorts list and calculates average and displays average
        if(scoreList.length == 0){
            scoreList[0] = score;
        }
        else{
            const temp = [];
            for (i = 0; i<scoreList.length;i++){
                if(score < scoreList[i]){
                    temp[i] = scoreList[i];
                }
                else if (score >= scoreList[i]){
                    temp[i] = score;
                    temp.slice(i+1, scoreList.length) = scoreList[i,scoreList.length - 1];
                    break;
                }
            }
            scoreList = temp;
        }
        // scoreList[scoreList.length] = score;
        // scoreList
        let temp = 0;
        for (i = 0; i < scoreList.length; i++) {
            temp = temp + scoreList[i];
        }
        scoreAverage = temp / scoreList.length;
        getElement("avgScore").innerHTML = "Average Score: " + scoreAverage;
        //restarts game
        getElement("guessBtn").disabled = true;
        getElement("giveUpBtn").disabled = true;
        getElement("playBtn").disabled = false;
        let radioButtons = document.getElementsByName("level");
        for (i = 0; i < radioButtons.length; i++) {
            radioButtons[i].disabled = false;
        }
        //updates leaderboard
        let leaderboard = document.getElementsByName("leaderboard");

    }
    else if (parseInt(guess) > targetNumber) {
        getElement("msg").innerHTML = "Too high " + pName + ", and you're " + hotOrCold();

    }
    else if (parseInt(guess) < targetNumber) {
        getElement("msg").innerHTML = "Too low " + pName + ", and you're " + hotOrCold();
    }
}
getElement("playBtn").addEventListener("click", play);
getElement("guessBtn").addEventListener("click", makeGuess);

getName();
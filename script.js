// declare variables used everywhere
let range;
let targetNumber;
let wins = 0;
let pName;
let guess;
let score;
let scoreAverage;
let startTime;
let endTime;
let averageTime = 0;
const scoreList = [];
const timeList = [];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ending = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
//shorthand, got tired of typing document.getElementById
function getElement(id) {
    return document.getElementById(id);
}
function time() {
    var date = new Date().getDate();
    //figure out suffix
    if (date == 11 || date == 12 || date == 13) {
        var day = String(date) + "th";
    }
    else {
        var day = String(date) + ending[date % 10];
    }
    //add 0 if seconds or minutes is less than 10 so it looks better
    var seconds = new Date().getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var minutes = new Date().getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //display the date and time
    getElement("date").innerHTML = month[new Date().getMonth()] + " " + day + " " + new Date().getFullYear() + " " + new Date().getHours() + ":" + minutes + ":" + seconds;
}
function sortScores() {
    //if it's the first game, add the score
    if (scoreList.length == 0) {
        scoreList[0] = score;
    }
    else {
        //add the new score to the list
        scoreList.push(score);
        //sort from largest to smallest
        scoreList.sort(function (a, b) {
            return a - b;
        });
    }
    console.log("sortScores completed. scoreList:", scoreList);
}
//gets name of player
function getName() {
    let temp = prompt("Enter your name");
    if (!temp || temp.trim() === "") {
        pName = "Player";
    } else {
        //makes first letter uppercase and the rest lowercase
        pName = temp[0].toUpperCase() + temp.toLowerCase().slice(1, temp.length);
    }
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
    range = parseInt(document.querySelector('input[name = "level"]:checked').value);
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
    //sets start time
    startTime = new Date().getTime();
}
function updateScore() {
    wins++;
    //appends score to all scores, sorts list and calculates average and displays average
    sortScores();
    // Calculate and display average
    let temp = 0;
    for (i = 0; i < scoreList.length; i++) {
        temp = temp + scoreList[i];
    }
    scoreAverage = temp / scoreList.length;
    getElement("avgScore").innerHTML = "Average Score: " + scoreAverage;
    //updates leaderboard
    let leaderboard = document.getElementsByName("leaderboard");
    for (i = 0; i < leaderboard.length; i++) {
        if (scoreList[i] == undefined) {
            leaderboard[i].innerHTML = "--";
        }
        else {
            leaderboard[i].innerHTML = scoreList[i];
        }
    }
}
function makeGuess() {
    //gets guess from text field
    guess = getElement("guess").value;
    score++;
    //checks if guess is more less or equal and changes msg
    if (parseInt(guess) == targetNumber) {
        //updates html element
        updateScore();
        getElement("msg").innerHTML = "Correct, " + pName;
        getElement("wins").innerHTML = "Total wins: " + wins;
        //restarts game
        getElement("guessBtn").disabled = true;
        getElement("giveUpBtn").disabled = true;
        getElement("playBtn").disabled = false;
        let radioButtons = document.getElementsByName("level");
        for (i = 0; i < radioButtons.length; i++) {
            radioButtons[i].disabled = false;
        }
        //sets end time and calculates total time, appends to list, sorts list and calculates average
        endTime = new Date().getTime();
        let totalTime = (endTime - startTime) / 1000;
        timeList.push(totalTime);
        for (i = 0; i < timeList.length; i++) {
            averageTime = averageTime + timeList[i];
        }
        averageTime = averageTime / timeList.length;
        getElement("avgTime").innerHTML = "Average Time: " + averageTime.toFixed(2) + " seconds";
        //finds fastest time
        let fastestTime;
        for (i = 0; i < timeList.length; i++) {
            if (fastestTime == undefined || timeList[i] < fastestTime) {
                fastestTime = timeList[i];
            }
        }
        getElement("fastestTime").innerHTML = "Fastest Game: " + fastestTime.toFixed(2) + " seconds";

    }
    else if (parseInt(guess) > targetNumber) {
        getElement("msg").innerHTML = "Too high " + pName + ", and you're " + hotOrCold();
    }
    else if (parseInt(guess) < targetNumber) {
        getElement("msg").innerHTML = "Too low " + pName + ", and you're " + hotOrCold();
    }
}
function giveUp() {
    //sets score to range
    score = range;
    updateScore();
    //updates html
    getElement("msg").innerHTML = "Correct, " + pName;
    getElement("wins").innerHTML = "Total wins: " + wins;
    //restarts game
    getElement("guessBtn").disabled = true;
    getElement("giveUpBtn").disabled = true;
    getElement("playBtn").disabled = false;
    let radioButtons = document.getElementsByName("level");
    for (i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = false;
    }
}
time();
setInterval(time, 1000);
getElement("playBtn").addEventListener("click", play);
getElement("guessBtn").addEventListener("click", makeGuess);
getElement("giveUpBtn").addEventListener("click", giveUp);
getName();
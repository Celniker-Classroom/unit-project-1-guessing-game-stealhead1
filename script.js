// add javascript here
let range;
let targetNumber;
let wins;
let pName;
let guess
//shorthand, got tired of typing document.getElementById
function getElement(id){
    return document.getElementById(id);
}
//gets name of player
function getName(){
    let temp = prompt("Enter your name");
    //makes first letter uppercase and the rest lowercase
    pName = temp[0].toUpperCase() + temp.toLowerCase().slice(1,temp.length);
}
//checks proximity of guess to answer
function hotOrCold(){
    if(Math.abs(guess - targetNumber) <= 2){
        return "hot"
    }
    else if (Math.abs(guess-targetNumber) <=5){
        return "warm"
    }
    else if(Math.abs(guess - targetNumber) > 5){
        return "cold"
    }
}
//gets the target number and enables
function play(){
    //gets value so we know range
    range = document.querySelector('input[name = "level"]:checked').value;
    //disables all radio buttons
    let radioButtons = document.getElementsByName("level");
    for(i = 0; i<radioButtons.length;i++){
        radioButtons[i].disabled = true;
    }
    //disables play button and enables the guess and giveup
    getElement("playBtn").disabled = true;
    getElement("guessBtn").disabled = false;
    getElement("giveUpBtn").disabled = false;
    //changes msg
    getElement("msg").innerHTML = "Guess";
    //generates a number
    targetNumber = Math.floor(Math.random() * range + 1);
}
function makeGuess(){
    //gets guess from text field
    guess = getElement("guess").value;
    if(parseInt(guess) == targetNumber){
        wins ++;
        getElement("msg").innerHTML = "Correct, " + pName;
        getElement("guessBtn").disabled = true;
    }
    else if(parseInt(guess) > targetNumber){
        getElement("msg").innerHTML = "Too high " + pName + ", and you're " + hotOrCold();

    }
    else if(parseInt(guess) < targetNumber){
        getElement("msg").innerHTML = "Too low" + pName + ", and you're " + hotOrCold();
    }
}
getElement("playBtn").addEventListener("click", play);
getElement("guessBtn").addEventListener("click", makeGuess);

getName();
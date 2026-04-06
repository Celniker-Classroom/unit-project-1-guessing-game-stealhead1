// add javascript here
let range;
let targetNumber;
let wins;
//shorthand, got tired of typing document.getElementById
function getElement(id){
    return document.getElementById(id);
}
//gets the target number and enables
function play(){
    //gets value so we know range
    range = document.querySelector('input[name = "level"]:checked').value;
    //disables all radio buttons
    let radioButtons = document.getElementsByName("level")
    for(i = 0; i<radioButtons.length;i++){
        radioButtons[i].disabled = true;
    }
    //disables play button and enables the guess and giveup
    getElement("playBtn").disabled = true;
    getElement("guessBtn").disabled = false;
    getElement("giveUpBtn").disabled = false;
    //generates a number
    targetNumber = Math.floor(Math.random() * range + 1);
}
function makeGuess(){
    //gets guess from text field
    var guess = getElement("guess").value;
    if(parseInt(guess) == targetNumber){
        wins ++;
        getElement("msg").innerHTML = "Correct";
        getElement("guessBtn").disabled = true;
    }
}
getElement("playBtn").addEventListener("click", play);
getElement("guessBtn").addEventListener("click", makeGuess);
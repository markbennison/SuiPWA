// Slider
var slideCol = document.getElementById("guessRange");
var y = document.getElementById("guessValue");
y.innerHTML = slideCol.value;

slideCol.oninput = function() {
    guess = this.value;
    y.innerHTML = guess;
     
}

// Think

const TEMPERATURE_ENUM = {
    COLD: "<strong>Cold!</strong><br />",
    WARM: "<strong>Warm...</strong><br />",
    HOT: "<strong>Hot!</strong><br />",
    MATCH: "<strong>Well Done!</strong><br />"
}

const HIGHORLOW_ENUM = {
    LOW: "Your guess is too low.<br />",
    EQUAL: "You guessed RIGHT!!!<br />",
    HIGH: "Your guess is too high.<br />"
}

var guess;
var randomNumber;
var outputMessage;
var count;
var temperature;
var highOrLow;

var alertBox = document.getElementById("alertThink");
var alertBoxClose = document.getElementById("alertThinkClose");
var alertMessage = document.getElementById("alertMessage");
var guessButton = document.getElementById("guessButton");

alertBoxClose.onclick = function(){
    alertBox.style.display = "none";
    setTimeout(function(){ alertBox.style.display = "none"; }, 600);
}


initialise();

// Think! Play function

function play() {
    console.log("Guess: " + guess);
    count++;
    if(guess == randomNumber){
        temperature = TEMPERATURE_ENUM.MATCH;
        highOrLow = HIGHORLOW_ENUM.EQUAL;
        guessButton.disabled = true; 
    }else{
        if(guess >= randomNumber - 10 && guess <= randomNumber + 10 ){
            temperature = TEMPERATURE_ENUM.HOT; 
        }else if(guess < randomNumber - 30 || guess > randomNumber + 30 ){
            temperature = TEMPERATURE_ENUM.COLD;
        }else{
            temperature = TEMPERATURE_ENUM.WARM;
        }

        if(guess > randomNumber){
            highOrLow = HIGHORLOW_ENUM.HIGH;
        }else{
            highOrLow = HIGHORLOW_ENUM.LOW;
        }
    }
    messageColor();
    messageMakeup();
}

function initialise(){
    randomNumber = Math.floor(Math.random() * 100) + 1;
    outputMessage = "";
    count = 0;
    temperature = null;
    highOrLow = null;
    guess = 50
    slideCol.value = guess;
    y.innerHTML = guess;
    guessButton.disabled = false; 
    messageColor();
    messageMakeup();
    console.log("%cRandom number: " + randomNumber, 'color: #ff4500; font-weight: bold;');
}

function messageColor(){
    console.log(temperature);
    switch(temperature){
        case TEMPERATURE_ENUM.COLD:
            alertBox.classList.remove("success");
            alertBox.classList.remove("cold");
            alertBox.classList.remove("warm");
            alertBox.classList.add("cold");
            alertBox.style.display = "initial";
            break;
        case TEMPERATURE_ENUM.WARM:
            alertBox.classList.remove("success");
            alertBox.classList.remove("cold");
            alertBox.classList.remove("warm");
            alertBox.classList.add("warm");
            alertBox.style.display = "initial";
            break;
        case TEMPERATURE_ENUM.HOT:
            alertBox.classList.remove("success");
            alertBox.classList.remove("cold");
            alertBox.classList.remove("warm");
            alertBox.style.display = "initial";
            break;
        case TEMPERATURE_ENUM.MATCH:
            alertBox.classList.remove("success");
            alertBox.classList.remove("cold");
            alertBox.classList.remove("warm");
            alertBox.classList.add("success");
            alertBox.style.display = "initial";
            break;
        default:
            alertBox.classList.remove("success");
            alertBox.classList.remove("cold");
            alertBox.classList.remove("warm");
            alertBox.style.display = "none";
    }
}

function messageMakeup(){
    let message = temperature + highOrLow +
                  "You have had " + count + " guesses. ";
    
    if(temperature == TEMPERATURE_ENUM.MATCH){
        alertMessage.innerHTML = message;
        return;
    }
    message += "Please guess again.";
    alertMessage.innerHTML = message;

        
    /*switch(temperature){
        case TEMPERATURE_ENUM.COLD:
            message += "<strong>Cold!</strong>\n"
        case TEMPERATURE_ENUM.WARM:
            message += "<strong>Warm...</strong>\n"
        case TEMPERATURE_ENUM.HOT:
            message += "<strong>Hot!</strong>\n"
        case TEMPERATURE_ENUM.MATCH:
            message += "<strong>Well Done!</strong>\n"


     if(temperature == TEMPERATURE_ENUM.MATCH){
        message += "You guessed RIGHT!!!\n" + 
                   "You have had " + count + "guesses.";
        return message;
    }else if(guessTooHigh){
        message += "Your guess is too high.\n";
    }else{
        message += "Your guess is too low.\n";
    }
    }*/
}

// Guess
document.getElementById('guessButton').onclick = function() {
    play();
}

// Restart
document.getElementById('restartButton').onclick = function() {
    initialise();
}

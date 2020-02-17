  var phraseStore = []; //array of quotes
  var gamePhrase; // Selected phrase
  var gameClue; // Selected phrase's clue
  var guess; // Guess
  var guesses = []; // Stored guesses
  var lives; // Lives
  var counter; // Count correct guesses
  var space; // Number of spaces in phrase '-'

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];

  // Get elements
  var showLives = document.getElementById("mylives");
  var showClue = document.getElementById("clue");

  hangmanCanvas = document.getElementById("stickman");
  hangmanCanvas.width = 800;
  hangmanCanvas.height = 1000;

  window.onload = function() {
      usePromise();
  }

  function usePromise() {
      fetch("./hangman.json").then(function(response) {
          return response.text();
      }).then(function(data) {
          processResponse(data)
      }).catch(function(error) {
          console.log(`Error - ${error}`);
      });
  }

  function processResponse(responseText) {
      let phrases = JSON.parse(responseText);
      phraseStore = []; //clear array
      phrases.forEach(element => {
          phraseStore.push(element);
          localStorage.setItem('phraseStore', JSON.stringify(phraseStore));
      });
      play();
  }

  if ("phraseStore" in localStorage) {
      phraseStore = JSON.parse(localStorage.getItem('phraseStore'));
  }

  function showEntries() {
      for (let i = 0; i < phraseStore.length; i++) {
          console.log(phraseStore[i].phrase + " : " + phraseStore[i].clue + "\n");
      }
  }

  // create alphabet ul
  function buttons() {
      myButtons = document.getElementById('buttons');
      alphabetList = document.createElement('ul');

      for (var i = 0; i < alphabet.length; i++) {
          alphabetList.id = 'alphabet';
          alphabetListElement = document.createElement('li');
          alphabetListElement.id = 'letter'+i;
          alphabetListElement.innerHTML = alphabet[i];
          alphabetButtonClick();
          myButtons.appendChild(alphabetList);
          alphabetList.appendChild(alphabetListElement);
      }
  }

  // Create guesses ul
  function phraseUpdate() {
      phraseHolder = document.getElementById('phraseHolder');
      correct = document.createElement('ul');

      for (var i = 0; i < gamePhrase.length; i++) {
          correct.setAttribute('id', 'phrase');
          guess = document.createElement('li');
          guess.setAttribute('class', 'guess');
          if (gamePhrase[i] === "-") {
              guess.innerHTML = "/";
              space += 1;
          } else {
              guess.innerHTML = "_";
          }

          guesses.push(guess);
          phraseHolder.appendChild(correct);
          correct.appendChild(guess);
      }
  }

  // Show lives
  function comments() {
      showLives.innerHTML = "You have " + lives + " lives";
      if (lives < 1) {
          showLives.innerHTML = "You have been hanged!";
          disableGame();

      } else if (counter + space === guesses.length) {
          showLives.innerHTML = "You Win!";
          disableGame();
      }
  }

  // Hangman Canvas
  canvas = function() {
      context = hangmanCanvas.getContext('2d');
      context.beginPath();
      context.lineCap = "round";
      context.strokeStyle = "#000";
      context.lineWidth = 30;
  };

  // Hangman Draw a Line
  drawLine = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

      context.moveTo($pathFromx, $pathFromy);
      context.lineTo($pathTox, $pathToy);
      context.stroke();
  }

  // Hangman Components
  gallows1 = function() {
      drawLine(100, 900, 100, 100);
  };

  gallows2 = function() {
      drawLine(100, 100, 700, 100);
  };

  gallows3 = function() {
      drawLine(350, 100, 100, 350);
  };

  gallows4 = function() {
      drawLine(500, 100, 500, 200);
  };

  head = function() {
      context.beginPath();
      context.arc(500, 250, 50, 0, Math.PI * 2, true);
      context.stroke();
  }

  torso = function() {
      drawLine(500, 300, 500, 550);
  };

  rightArm = function() {
      drawLine(500, 300, 700, 450);
  };

  leftArm = function() {
      drawLine(500, 300, 300, 450);
  };

  rightLeg = function() {
      drawLine(500, 550, 600, 800);
  };

  leftLeg = function() {
      drawLine(500, 550, 400, 800);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, gallows4, gallows3, gallows2, gallows1];

  // Draw Next Hangman
  function nextHangman() {
      var hangmanComponent = lives;
      drawArray[hangmanComponent]();
  }

  // OnClick Function
  function alphabetButtonClick() {
      alphabetListElement.onclick = function() {
          var guess = (this.innerHTML);
          this.setAttribute("class", "chosen");
          this.onclick = null;
          for (var i = 0; i < gamePhrase.length; i++) {
              if (gamePhrase[i] === guess) {
                  guesses[i].innerHTML = guess;
                  counter += 1;
              }
          }
          var j = (gamePhrase.indexOf(guess));
          if (j === -1) {
              lives -= 1;
              comments();
              nextHangman();
          } else {
              comments();
          }
      }
  }

  function play() {
      gamePhrase = phraseStore[Math.floor(Math.random() * phraseStore.length)];
      gameClue = gamePhrase.clue;
      gamePhrase = gamePhrase.phrase.replace(/\s/g, "-");
      console.log("%cPhrase is: " + gamePhrase + "\nClue is: " + gameClue, 'color: #ff4500; font-weight: bold;');

      buttons();

      guesses = [];
      lives = 10;
      counter = 0;
      space = 0;
      phraseUpdate();
      comments();
      canvas();
  }

  function disableGame(){
    if(correct.parentNode != null){
      correct.parentNode.removeChild(correct);
    }
    if (alphabetList.parentNode != null){
    alphabetList.parentNode.removeChild(alphabetList);
    }
  }

  // Clue
  const clueButtons = [].slice.call(document.getElementsByClassName('clueButton'))
  clueButtons.forEach((element, index) => {
      element.addEventListener('click', (event) => {
          showClue.innerHTML = "Clue: " + gameClue;
      })
  })

  // Start
  document.getElementById('startButton').onclick = function() {
      disableGame();
      showClue.innerHTML = "";
      context.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
      play();
  }
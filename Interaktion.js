// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
  "Time is money, so why do you spend it on sleeping.",
  "Once you get a little bit they just want to take you down.",
  "It starts with success, and success is all about growing.",
  "Started from the bottom, now we're here.",
  "It all comes down to this next game.",
  "It's going to be hard, but hard does not mean impossible.",
  "Failure is the condiment that gives success its flavor.",
  "There is no pause or rewind in life, it is continuously playing."
];

// selecting required elements
let intro_text = document.querySelector(".IntroText");
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];

  // separate each character and make an element 
  // out of each of them to individually style them
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  // roll over to the first quote
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {

  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // incorrect characters
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click on restart to start a new game.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";

if(total_errors > 100){
  wpm = 0;
  wpm_text.textContent = "?";
  intro_text.textContent = "Try to get less errors this time.";
  intro_text.style.color = "black";
}

else
  if(wpm<=10){
    intro_text.textContent = "Have you ever touched a keyboard before?";
    intro_text.style.color = "red";
  }
  else if(wpm>=11 && wpm<=20){
    intro_text.textContent = "Stop typing with 2 fingers";
    intro_text.style.color = "red";
  }
  else if(wpm>=21 && wpm<=30){
    intro_text.textContent = "Below average, keep practicing";
    intro_text.style.color = "orange";
  }
  else if(wpm>=31 && wpm<=40){
    intro_text.textContent = "Getting close to the average typing speed";
    intro_text.style.color = "orange";
  }
  else if(wpm>=41 && wpm<=50){
    intro_text.textContent = "You are at the average typing speed, well done";
    intro_text.style.color = "orange";
  }
  else if(wpm>=51 && wpm<=60){
    intro_text.textContent = "Above average! Good job!";
    intro_text.style.color = "yellow";
  }
  else if(wpm>=61 && wpm<=70){
    intro_text.textContent = "Speed Requirement for most jobs, you're almost a proffesional!";
    intro_text.style.color = "yellow";
  }
  else if(wpm>=71 && wpm<=80){
    intro_text.textContent = "Way above average! Qualified for any typing job (if your accuracy is high)";
    intro_text.style.color = "green";
  }
  else if(wpm>=81 && wpm<=90){
    intro_text.textContent = "Any employers looking for a typist NEEDS you!";
    intro_text.style.color = "green";
  }
  else if(wpm>=91 && wpm<=100){
    intro_text.textContent = "You are DOUBLING the average typing speed!";
    intro_text.style.color = "green";
  }
  else{
    intro_text.textContent = "Top 1% of typists!?";
    intro_text.style.color = "green";
  }
}


function startGame() {

  resetValues();
  updateQuote();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

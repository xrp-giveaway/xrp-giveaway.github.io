var initialNumber = parseInt(localStorage.getItem('randomNumber'), 10);

if (!initialNumber || isNaN(initialNumber)) {
  initialNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100 as the initial number
  localStorage.setItem('randomNumber', initialNumber);
}

function countToNumber(currentNumber, targetNumber, duration) {
  var liveTxtElement = document.querySelector('.live-txt');
  var frameDuration = 1000 / 60; // Assuming 60 frames per second
  var totalFrames = Math.round(duration / frameDuration);
  var frame = 0;

  var countInterval = setInterval(function() {
    var progress = frame / totalFrames;
    var increment = Math.ceil((targetNumber - currentNumber) * Math.pow(progress, 2));
    var number = currentNumber + increment;

    liveTxtElement.textContent = number + '\u00A0Online';

    frame++;

    if (frame === totalFrames) {
      clearInterval(countInterval);
      liveTxtElement.textContent = targetNumber + '\u00A0Online';
    }
  }, frameDuration);
}

function randomizeNumber() {
  var liveTxtElement = document.querySelector('.live-txt');
  var currentNumber = parseInt(liveTxtElement.textContent.split(' ')[0], 10) || initialNumber; // Use the initialNumber if no current number exists

  var randomRange = Math.floor(Math.random() * (10 - 1 + 1)) + 1; // Generate a random number between 1 and 10
  var randomNumber = currentNumber;

  if (Math.random() < 0.5) {
    randomNumber += randomRange; // Add the random range
  } else {
    randomNumber -= randomRange; // Subtract the random range
  }

  if (randomNumber <= 0) {
    randomNumber = currentNumber + randomRange; // Add the random range if the result is 0 or negative
  }

  countToNumber(currentNumber, randomNumber, 1500); // Count from currentNumber to randomNumber in 1.5 seconds

  // Store the randomNumber in localStorage for future use
  localStorage.setItem('randomNumber', randomNumber);
}

function startRandomization() {
  randomizeNumber(); // Call the randomizeNumber function immediately
  setInterval(randomizeNumber, 6000); // Call the randomizeNumber function every 3 seconds
}

startRandomization(); // Start the randomization process

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

let intervalId = null;

startButton.addEventListener('click', () => {
    
    intervalId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
    }, 1000);
  startButton.disabled = true;
  });

  
  stopButton.addEventListener("click", () => {
    clearInterval(intervalId  );
    startButton.disabled = false;
      });

   
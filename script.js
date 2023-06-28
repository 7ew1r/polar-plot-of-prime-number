"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let numberOfPrimes = 100000;
const primeNumbers = getPrimeNumbers(numberOfPrimes);

let scale = 0.03;

function drawPoint(coordinate) {
  let canvasX = (canvas.width / 2) + coordinate.x * scale;
  let canvasY = (canvas.height / 2) - coordinate.y * scale;

  ctx.beginPath();
  ctx.arc(canvasX, canvasY, 1, 0, 2 * Math.PI, false);
  ctx.fillStyle = "cyan";
  ctx.fill();
  ctx.strokeStyle = "cyan";
  ctx.stroke();
}

function polarToCartesian(radius, angle) {
  let x = radius * Math.cos(angle);
  let y = radius * Math.sin(angle);
  return { x: x, y: y };
}

function getPrimeNumbers(count) {
  let primes = [];

  if(count < 1) {
    return primes;
  }

  for (let number = 2;; number++) {
    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(number);
    }

    if(primes.length === count) {
      return primes;
    }
  }

}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  primeNumbers.forEach(number => {
    drawPoint(polarToCartesian(number, number));
  });
}

const scaleInputElement = document.getElementById("scaleInput");
const scaleRageElement = document.getElementById("scaleRange");
scaleRageElement.addEventListener('input', () => {
  const value = Math.trunc(scaleRageElement.value);
  scale = 0.000000999 * value**3 + 0.001;
  scaleInputElement.value = scale;
});


scaleInputElement.addEventListener("change", () => {
  scale = Number(scaleInputElement.value);
  scaleRageElement.value = Math.cbrt((scale - 0.001) / 0.000000999);
});

const plotButtonElement = document.getElementById("plotButton");
plotButton.addEventListener('click', () => {
  drawCanvas();
})

function initiate() {
  scaleRageElement.value = Math.cbrt((scale - 0.001) / 0.000000999);
  scaleInputElement.value = scale;
  drawCanvas();
}

initiate();



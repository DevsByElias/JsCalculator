let runTotal = 0;
let input = "0";
let previous;

const display = document.querySelector(".display");

function buttonClick(value) {
  if (isNaN(value)) {
    symbolHandle(value);
  } else {
    numberHandle(value);
  }
  display.innerText = input;
}

function symbolHandle(symbol) {
  switch (symbol) {
    case "C":
      input = "0";
      runTotal = 0;
      break;
    case "=":
      if (previous === null) {
        return;
      }
      flushOperation(parseInt(input));
      previous = null;
      input = runTotal;
      runTotal = 0;
      break;
    case "←":
      if (input.length === 1) {
        input = "0";
      } else {
        input = input.slice(0, -1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      mathHandle(symbol);
      break;
  }
}
function mathHandle(symbol) {
  if (input === "0") {
    return;
  }

  const intInput = parseInt(input);

  if (runTotal === 0) {
    runTotal = intInput;
  } else {
    flushOperation(intInput);
  }
  previous = symbol;
  input = "0";
}

function flushOperation(intInput) {
  if (previous === "+") {
    runTotal += intInput;
  } else if (previous === "−") {
    runTotal -= intInput;
  } else if (previous === "×") {
    runTotal *= intInput;
  } else if (previous === "÷") {
    runTotal /= intInput;
  }
}

function numberHandle(numberValue) {
  if (input === "0") {
    input = numberValue;
  } else {
    input += numberValue;
  }
}

function init() {
  document
    .querySelector(".buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();

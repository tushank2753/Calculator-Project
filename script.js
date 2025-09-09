// Get display element
const display = document.getElementById("display");

// Flag to check if last action was "="
let isResultDisplayed = false;

// Operators list
const operators = ["+", "-", "*", "/", "%"];

// Append input to display
function appendToDisplay(input) {
  let current = display.value;
  let lastChar = current.slice(-1);

  // --- Prevent multiple dots in same number ---
  if (input === ".") {
    let lastNumber = current.split(/[\+\-\*\/%]/).pop(); // get last number
    if (lastNumber.includes(".")) return; // stop if already has dot
    if (current === "" || operators.includes(lastChar)) return; // stop if dot is first or after operator
  }

  // --- Prevent invalid operators ---
  if (operators.includes(input)) {
    // Stop if display is empty and input is *, /, %
    if (current === "" && (input === "*" || input === "/" || input === "%")) {
      return;
    }
    // Stop if last character is already an operator or dot
    if (operators.includes(lastChar) || lastChar === ".") {
      return;
    }
  }

  // --- Handle when result was just displayed ---
  if (isResultDisplayed) {
    if (!isNaN(input) || input === ".") {
      // If new number, start fresh
      display.value = input;
    } else {
      // If operator, continue from result
      display.value += input;
    }
    isResultDisplayed = false;
  } else {
    display.value += input;
  }
}

// Clear display
function clearDisplay() {
  display.value = "";
  isResultDisplayed = false;
}

// Backspace
function BackSpace() {
  display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
  try {
    let expression = display.value.replace(/÷/g, "/"); // replace division symbol
    display.value = eval(expression);
    isResultDisplayed = true;
  } catch (error) {
    display.value = "Error";
    isResultDisplayed = true;
  }
}

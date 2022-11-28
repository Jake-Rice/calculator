let displayValue;
let num1;
let num2;
let operation;
init();

function init() {
  displayValue = "0";
  num1 = null;
  num2 = null;
  operation = null;
  const buttons = document.querySelectorAll("button");
  const numKeys = [];
  const operKeys = [];
  buttons.forEach(e => {
    if (/btn-num-[0-9]/.test(e.id)) numKeys.push(e);
    else if (/btn-oper-/.test(e.id)) operKeys.push(e);
  });
  numKeys.forEach(e => e.addEventListener("click", event => {
    displayValue += e.id.slice(8);
    //trim leading zeros
    while (displayValue.length>1 && displayValue[0]==="0") displayValue = displayValue.slice(1);
    document.querySelector("#display").textContent = displayValue;
  }));
  operKeys.forEach((e) => e.addEventListener("click", event => {
    if (!operation) {
      num1 = +displayValue;
    }
    else {
      num2 = displayValue;
      num1 = operate(operation, +num1, +num2);
      displayValue = num1;
      document.querySelector("#display").textContent = displayValue;
    }
    operation = e.id.slice(9);
    displayValue = 0;
    console.log(num1, operation);
  }));
}

// Basic Math Functions
function add(num1,num2) {
  return num1+num2;
}
function subtract(num1,num2) {
  return num1-num2;
}
function multiply(num1,num2) {
  return num1*num2;
}
function divide(num1,num2) {
  return num1/num2;
}

// Generalized Math Function
function operate(operator, num1, num2) {
  switch (operator) {
    case "add": return add(num1,num2);
    case "subtract": return subtract(num1,num2);
    case "multiply": return multiply(num1,num2);
    case "divide": return divide(num1,num2);
    default: return;
  }
}
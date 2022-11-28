let displayValue;
let num1;
let num2;
let operation;
let equalsFlag;
let operatorFlag;
init();

function init() {
  displayValue = "0";
  num1 = null;
  num2 = null;
  operation = null;
  equalsFlag = false;
  operatorFlag = false;
  const buttons = document.querySelectorAll("button");
  const numKeys = [];
  const operKeys = [];
  buttons.forEach(e => {
    if (/btn-num-[0-9]/.test(e.id)) numKeys.push(e);
    else if (/btn-oper-/.test(e.id)) operKeys.push(e);
  });
  numKeys.forEach(e => e.addEventListener("click", event => {
    if (equalsFlag) {
      displayValue = "";
      equalsFlag = false;
    }
    operatorFlag = false;
    displayValue += e.id.slice(8);
    //trim leading zeros
    while (displayValue.length>1 && displayValue[0]==="0" && displayValue[1]!==".") displayValue = displayValue.slice(1);
    document.querySelector("#display").textContent = displayValue;
  }));
  operKeys.forEach((e) => e.addEventListener("click", event => {
    if (operatorFlag) operation = e.id.slice(9);
    else if (!operation) {
      num1 = +displayValue;
      operation = e.id.slice(9);
      displayValue = "0";
    }
    else if (operation==="divide" && document.querySelector("#display").textContent==="0") alert("Dividing by Zero is not allowed!");
    else {
      num2 = +displayValue;
      num1 = operate(operation, +num1, +num2);
      displayValue = num1.toString();
      document.querySelector("#display").textContent = displayValue;
      operation = e.id.slice(9);
      displayValue = "0";
    }
    operatorFlag = true;
  }));
  document.querySelector("#btn-equals").addEventListener("click", event => {
    if (operatorFlag) {
      return;
    }
    else if (operation==="divide" && document.querySelector("#display").textContent==="0") alert("Dividing by Zero is not allowed!");
    else if (operation) {
      equalsFlag = true;
      num2 = +displayValue;
      num1 = operate(operation, +num1, +num2);
      displayValue = num1.toString();
      if (displayValue.includes("e") && displayValue.includes(".")) {
        displayValue = displayValue.split('');
        displayValue = displayValue.slice(0, displayValue.indexOf(".")+2).concat(displayValue.slice(displayValue.indexOf("e")));
        displayValue = displayValue.join('');
      }
      document.querySelector("#display").textContent = displayValue;
      operation = null;
    }
  });
  document.querySelector("#btn-clear").addEventListener("click", event => {
    num1 = null;
    num2 = null;
    operation = null;
    displayValue = "0";
    document.querySelector("#display").textContent = displayValue;
  });
  document.querySelector("#btn-decimal").addEventListener("click", event => {
    if (equalsFlag) {
      displayValue = "0";
      equalsFlag = false;
    }
    if (displayValue.indexOf(".") < 0) {
      displayValue += ".";
      document.querySelector("#display").textContent = displayValue;
    }
  });
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
    case "add": return Math.round(add(num1,num2)*10)/10;
    case "subtract": return Math.round(subtract(num1,num2)*10)/10;
    case "multiply": return Math.round(multiply(num1,num2)*10)/10;
    case "divide": return Math.round(divide(num1,num2)*10)/10;
    default: return;
  }
}
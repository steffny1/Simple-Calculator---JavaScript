/* 
1. Select all button elements
2. Only select and display input from user (make it read only)
3. Get the value when user clicks on a button (add an event listener)
4. Check if the user 
  a. clicks on equals then compute the input
  b. if display is not empty, display the value
  c. if user clicks on clear button then reset/display nothing
  d. otherwise add the inputs and calculate when user clicks on equals  
*/

//=================================================================================================================================================

// find and select all the HTML button elements by CSS Selectors - querySelectorAll() method
let buttons = document.querySelectorAll("button");
// select the <input type="text" class="display" disabled> element
let display = document.querySelector(".display");

// add eventListener to each button
buttons.forEach(function (button) {
  button.addEventListener("click", calculate);
  button.addEventListener("click", changeBorderColor);
});

//=========Change background color of input field ===============================

// add eventListener to display
display.addEventListener("focusin", changeBackgroundColor);
display.addEventListener("focusout", undoBackgroundColor);

function changeBackgroundColor() {
  document.getElementById("userInput").style.backgroundColor = "lightblue";
}

function undoBackgroundColor() {
  document.getElementById("userInput").style.backgroundColor = "";
}
//=================================== Validate input ===============================
function validate(input) {
  var regex = /[^-?+?.?\d(\+-\/\*)?-?+?.?\d]/g;
  input.value = input.value.replace(regex, "");
}

//============== change border color of buttons when clicked=======================
//this only works for button clicks with mouse, not keyboard inputs.
function changeBorderColor() {
  buttons.forEach(function (butn) {
    butn.addEventListener("click", () => {
      butn.classList.toggle("buttonpressed");
    });
  });
}

//==============Bind keyboard input with buttons =============================
const btnkeys = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  equals: "Enter",
  clear: "Backspace",
  clearAll: "Delete",
  point: ".",
  minus: "-",
  plus: "+",
  mulitply: "*",
  divide: "/",
};

//create an array of arrays to get both property & value.
const entries = Object.entries(btnkeys);
document
  .getElementById("userInput")
  .addEventListener("keydown", function (event) {
    //to change border color, CSS class must be tied to keyboard event listener
    // this includes listening to the input
    buttons.forEach(function (butn) {
      butn.addEventListener("click", () => {
        butn.classList.toggle("buttonpressed");
      });
      butn.classList.remove("buttonpressed");
    });

    //loop through the array to get both property/key & value.
    for (const [buttons, keyvalues] of entries) {
      //if key values match button IDs bind when clicked
      if (event.key === keyvalues) {
        document.getElementById(buttons).click();
        //cancel if keypress event is cancellable
        event.preventDefault();
      }
    }
  });

//hande multiplication key on keyboard since key value does not work
//in above listed in object.
document
  .getElementById("userInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "*") {
      document.getElementById("multiply").click();
      //cancel if keypress event is cancellable
      event.preventDefault();
    }
  });

//listen to when key is relased and remove button highlight.
document.getElementById("userInput").addEventListener("keyup", function () {
  //to change border color, CSS class must be tied to keyboard event listener
  // this includes listening to the input
  buttons.forEach(function (butn) {
    butn.addEventListener("click", () => {
      butn.classList.remove("buttonpressed");
    });
  });
});

//====================== Calculate =============================================
function calculate(event) {
  // current clicked buttons value
  const clickedButtonValue = event.target.value;

  if (clickedButtonValue === "=") {
    // check if the display is not empty then only do the calculation
    if (display.value !== "") {
      // calculate and show the answer to display
      // Checking for subtraction of a negative second number
      if (/--/.test(display.value)) {
        //Splitting Numbers from operators
        let splits = display.value.split(/--/);
        // Manually Subtracting
        let answer = splits[0] - -splits[1];
        // Displaying Answer
        display.value = answer;
      } else {
        // calculate and show the answer to display
        display.value = eval(display.value);
      }
    }
  } else if (clickedButtonValue === "AC") {
    // clear everything on display
    display.value = "";
  } else if (clickedButtonValue === "C") {
    // clear last pressed key on display
    display.value = display.value.substring(0, display.value.length - 1);
  } else {
    // otherwise concatenate it to the display
    display.value += clickedButtonValue;
  }
}

//===============================================================================

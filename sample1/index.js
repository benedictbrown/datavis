// function to change the SVG's color
function setSVGColor(c) {
  // You can interpolate variables into stirngs
  // by using backquotes (`).  Inside of ${...}
  // you can put variables or full-fledged
  // javascript expressions
  //
  // This is similar to f"..." stirngs in python
  // and to strings in shell scripting/awk/perl/...

  // use console.log to print debug information to the browser's console
  // open the browser's developer tools to access the console
  console.log(`Setting color to ${c}`);

  // use const for vaariables whose value never changes
  const svgGroup = document.getElementById('sample-group');

  // set the fill attribute of the HTML element named sample-group
  // we could also manipulate this via CSS
  svgGroup.setAttribute('fill', c);
}

// function to set the SVG to a user-selected color
function setSVGToUserColor() {
  // retrieve the color components from the text boxes
  const red = document.getElementById('color-red').value;
  const green = document.getElementById('color-green').value;
  const blue = document.getElementById('color-blue').value;

  const color = `rgb(${red}, ${green}, ${blue})`;

  setSVGColor(color);
}

// hide the circle for 5 seconds,
// which is an excuse to us an anonymous function
function hideCircle() {
  // step 1: disable the hide circle button until the circle is visible again
  const button = document.getElementById('hide-circle-button');
  button.disabled = true;

  // next hide the circle by manipulating it's CSS visibility property
  const circle = document.getElementById('circle');
  circle.style.visibility = 'hidden';

  // now set a timer that will call another function in 5 seconds
  // we'll have it call an anonymous function the makes
  // the circle visible again and re-enables the button
  window.setTimeout(() => { /* () => { ... } is called an "arrow function" */
    // functions have access to all the variables defined in their parent function
    // because javascript has lexical scoping like racket
    circle.style.visibility = 'visible';
    button.disabled = false;
  }, 5000 /* 5 seconds = 5000 milliseconds */);
}

// add a button to change the SVG color to a custom color
// where there is a placeholder <span> tag in the HTML
//
// Note the mixing of javascript and HTML in the string below.
// Since HTML uses " to quote strings, it's convenient
// to consistently use ' for strings in javascript.

// use let for variables whose value will change
let newHtml = ' ... or type a red <input type="number" min="0" max="255" id="color-red" />';
newHtml += ', a green <input type="number" min="0" max="255" id="color-green" />';
newHtml += ', and a blue <input type="number" min="0" max="255" id="color-blue" /> value';
newHtml += ', then <button type="button" onclick="setSVGToUserColor()">Click Here</button>!';

// now update the contents of the custom-color span element to newHTML
const customColor = document.getElementById('custom-color');
customColor.innerHTML = newHtml;

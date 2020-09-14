// fetch the latest state summary data from Covid Act Now
//
// The fetch function is the ES6 way to download data in the background,
// and superceded older methods like XMLHttpRequest and the axios library.
//
// Despite having 20 years of past experience to rely on, it's surprisingly annoying.
// The async/await keywords you see below were added to javascript
// to make fetch slightly less annoying.
async function updateCovidData() {
  // /data will get routed to the same web server as this file is on, i.e. localhost:3000/data
  // that web server (implemented in index.js one folder up), calls the Covid Act Now API
  // to retrieve the data, and returns it
  const resp = await fetch('/data');

  // Once we get a response back from the web server, start
  // converting the response from JSON format into an actual
  // javascript object.
  let data = await resp.json();

  // Covid Act Now returns data for all states, D.C., and Puerto Rico,
  // but it doesn't have metrics for quite all of them.  This filters
  // out the ones that don't have metrics, so you don't have to
  // worry about that later.
  data = data.filter((elem) => elem.metrics);

  // log the data that was returned, so we can examine it
  // in the browser's debug console and easily see its structure
  console.log('Covid Act Now Data:');
  console.log(data);

  // return the data that ultimately came from the Covid Act Now API
  return data;
}

// TO-DO: Implement this function and any helper function you need
// You'll probably find array functions like .map and .sort very helpful.
// Use ** for exponentiation.
// You may also find the spread operator (...) handy, but there are alternatives
// if you don't want to learn about it right now.
function createGraph(covidData) {
}

// Download the COVID-19 data, and when it is all downloaded and ready to go, call createGraph
updateCovidData().then(createGraph);

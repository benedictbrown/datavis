/*
  Start up a simple web server using express.js

  This is the most common package for writing the server side of simple
  web applications in javascript.  It is very similar to python's Flask.

  YOU DO NOT NEED TO MODIFY THIS FILE

  The purpose of this server is to let you access the Covid Act Now API from within
  a simple web page.  Browsers employ a security measure called CORS to prevent
  web pages from loading resources from 3rd-party sites unless the resource in
  question specifically allows that to happen.  The Covid Act Now API does
  not seem to specifically allow it, so we need a little server that sits
  in between your web page and that server to proxy the request.
*/

// This is the syntax that node projects use to import libraries (like import in python or java)
// In modern javascript, there is an import keyword, but node has unfortunately existed
// for considerably longer than the import keyword has.  So it still uses an older syntax.
const express = require('express'); // this is the module for the web server
const fetch = require('cross-fetch'); // this module lets us use fetch() inside the node environment

// create the web server and specify the port
const app = express();
const port = 3000;

// Any request to /data on this server (probably localhost:3000/data in your browser)
// should make a request to the Covid Act Now API server in the background, then
// pass the results on.  This is a workaround for the fact that the Covid Act Now
// server is missing the CORS request headers that would let any web page access it
app.get('/data', async (req, res) => {
  const data = await fetch('https://data.covidactnow.org/latest/us/states.OBSERVED_INTERVENTION.json');
  const json = await data.json();
  console.log(json);
  res.send(json);
});

// for any URL except /data, look for the file in the static directory
// So to access the covid.html and covid.js files inside the static directory
// you use a URL like http://localhost:3000/covid.html
app.use(express.static('static'));

// now start up the web server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

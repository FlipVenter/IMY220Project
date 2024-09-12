"use strict";

var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 1337;

// Adjust the path to point to the correct frontend directory
var frontendPath = path.join(__dirname, '..', '..', 'frontend', 'public');

// Serve static files from the React app
app.use(express["static"](frontendPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', function (req, res) {
  res.sendFile(path.join(frontendPath, 'index.html'));
});
app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
  console.log("Serving static files from: ".concat(frontendPath));
});
module.exports = app;
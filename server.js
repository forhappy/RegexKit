var express = require('express');
var app = express();

// The number of milliseconds in 60s.
var oneDay = 60000;

// Serve up content from public directory
app.use(express.static('public', {
  maxAge: oneDay
}));

app.listen(process.env.PORT || 18788);


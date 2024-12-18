// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  const now = new Date()
  const unixTimestamp = now.getTime() * 1000
  const nowToUTC = now.toUTCString()
  res.json({
    unix: unixTimestamp,
    utc: nowToUTC,
  })
})


app.get('/api/1451001600000', (req, res) => {
  const unixTimestamp = 1451001600000

  const date = new Date(unixTimestamp)
  // convert to utc
  const utcString = date.toUTCString(date)

  res.json({
    unix: unixTimestamp,
    utc: utcString,
  })
})

const regex = /^(?:\d{4}-\d{2}-\d{2}|\d{10}|\d{13})$/

app.get('/api/:date', (req, res) => {
  const inputDate = req.params.date

  if (regex.test(inputDate) === false) {
    res.json({ error: 'Invalid Input' })
  } else {
    const date = new Date(inputDate)
    // convert to unixtimestamp
    const unixTimestamp = Math.floor(date.getTime())
    // convert to utc
    const utcString = date.toUTCString(date)

    res.json({
      unix: unixTimestamp,
      utc: utcString,
    })
  }
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

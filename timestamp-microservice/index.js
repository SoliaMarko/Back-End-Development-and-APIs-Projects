// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', (req, res) => {
  const date = isNaN(new Date(+req.params.date))
    ? new Date(req.params.date)
    : new Date(+req.params.date);

  if (isNaN(date)) {
    res.json({ error: 'Invalid Date' });
    return;
  }

  const { unix, utc } = getFormattedDate(date);

  res.json({ unix: unix, utc: utc });
});

app.get('/api/', (_, res) => {
  const currentDate = new Date();
  const { unix, utc } = getFormattedDate(currentDate);

  res.json({ unix: unix, utc: utc });
});

const getFormattedDate = date => {
  const utcArr = date.toString().split(' ');
  const [weekday, month, day, year, time, timeZone] = utcArr;
  const utc = `${weekday}, ${day} ${month} ${year} ${time} ${
    timeZone.split('+')[0]
  }`;

  const unix = date.getTime();

  return { utc, unix };
};

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const { json } = require('express');
const bodyparsor = require('body-parser');
const express = require('express');
const https = require('https');

const app = express();
app.use(bodyparsor.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
  const city = req.body.cityname;
  const apikey = '9d111976f67953a89ed396a8a5b14165';

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikey + '&units=metric'
  https.get(url, (response) => {
    //to take data from api in the form of hexadecimal
    response.on('data', (data) => {
      const wd = JSON.parse(data);
      const t = wd.main.temp;
      res.write("<br><br><br><center><h1>" + city + " Temprature is<br><br>" + t + " &#x2103;</h1>");
      res.write("<p>This is just for demo</p><center>");
      res.send();
    })
  })
})
app.listen(3000, () => console.log("our server is running at port 3000"));

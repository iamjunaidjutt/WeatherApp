const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {  
    const query = req.body.cityName;
    const appid = "16c24c389cc2ecfc951f6b654c35646a";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}&units=${units}`;
    https.get(url , (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            res.write(`<p>The weather is currently ${weatherDescription}.</p>`);
            res.write(`<h1>The current temperature in ${query} is ${Math.round(temp)} degrees celcius.</h1>`);
            res.write(`<img src="${icon}"/>`);
            res.send();
        });
    });
});


app.listen(3000, () => {
    console.log("server is running on port 3000");
})
const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=lahore&appid=16c24c389cc2ecfc951f6b654c35646a&units=metric";
    https.get(url , (response) => {
        console.log(response);
    });
    res.send("server is up and running");
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
})
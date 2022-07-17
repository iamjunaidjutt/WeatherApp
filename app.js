const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    res.write(req.body.cityName);
    res.write("post request received!");
    res.send(); 
});


app.listen(3000, () => {
    console.log("server is running on port 3000");
})
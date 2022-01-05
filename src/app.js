const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Parmvir Shergill"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Parmvir Shergill"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Frequently Asked Questions",
        title: "Help",
        name: "Parmvir Shergill"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You Must Provide An Adress"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location,
                forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorText: "Help Article Not Found",
        title: "404",
        name: "Parmvir Shergill"
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errorText: "Page Not Found",
        title: "404",
        name: "Parmvir Shergill"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
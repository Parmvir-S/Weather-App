const request = require('request');

//Convert Lat/Long Into Weather Data
const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=576bf2cdc54dba225ec2486e7672efce&query=${lat},${long}`;
    
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const {weather_descriptions, temperature, feelslike, wind_speed, pressure, precip, humidity, uv_index} = body.current;
            callback(undefined, {
                description: weather_descriptions[0],
                temperature: temperature,
                feelsLike: feelslike,
                wind_speed,
                pressure,
                precip,
                humidity,
                uv_index
            })
        }
    })
}

module.exports = forecast;
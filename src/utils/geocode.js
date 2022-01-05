const request = require('request');

//Convert Address Into Lat/Long Coordinate Pair
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGFybXZpci0xNyIsImEiOiJja3hyMGRhZHg0eDhzMm5zdHhtN2wyN2N5In0.ipX5vUJHb7YJaFqic9naog&limit=1`

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Location Not Found', undefined);
        } else {
            const {center, place_name} = body.features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode;
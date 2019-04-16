const request = require('request');
const chalk = require('chalk');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY29yb25lbGwiLCJhIjoiY2p1OGp1OHR2MWxxdjQ0cWtiNzc5eTlwNSJ9.g_jmzx3kDEF7cnNBuuFSZA&limit=1`;
  request({ url, json: true }, (err, { body }) => {
    const feature = body.features[0];
    const isValid = body.features.length > 0;
    if (err) {
      callback('Unable to connect to location services!', undefined);
    } else if (!isValid) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        lng: feature.center[0],
        lat: feature.center[1],
        location: feature.place_name,
      })
    }
  })
}

module.exports = geocode;
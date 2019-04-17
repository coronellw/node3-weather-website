const request = require('request');

const forecast = (lat, lng, callback, opts = { units: 'si', lang: 'en' }) => {
  const url = `https://api.darksky.net/forecast/a59d60cd958df794a2a477ad6dfe0942/${lat},${lng}?units=${opts.units}&lang=${opts.lang}`;
  request({ url, json: true }, (err, {body}) => {
    if (err) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback(body.error);
    } else {
      const { temperature, precipProbability, precipType } = body.currently;
      const {summary: daySummary, temperatureHigh, temperatureLow} = body.daily.data[0];
      const forecast = `${daySummary} It is currently ${temperature} Celcius out. There is a ${precipProbability}% chance of ${precipType || 'rain'}. Min: ${temperatureLow} and Max: ${temperatureHigh}`;
      callback(undefined, { temperature, precipProbability, precipType, daySummary, forecast, temperatureHigh, temperatureLow });
    }
  })
}

module.exports = forecast;
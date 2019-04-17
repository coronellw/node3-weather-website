const hbs = require('hbs');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

const app = express();

/**
 * Directories for express config
 */
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/**
 * Setup Handlebars engine and views location
 */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static direcotry
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Wiston Coronell'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Wiston Coronell'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'This is a test message',
    title: 'Help',
    name: 'Wiston Coronell'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address' })
  }

  geocode(req.query.address, (err, { lat, lng, location } = {}) => {
    if (err) return res.send({ error: err });

    forecast(lat, lng, (err, { forecast }) => {
      if (err) return res.send({ error: err });

      return res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/:topic', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Help article not found',
    topic: req.params.topic,
    name: 'Wiston Coronell'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Page not found',
    name: 'Wiston Coronell'
  });
});

app.listen(port, () => {
  console.log(chalk.bold.inverse(` Listening on port ${port} `));
});
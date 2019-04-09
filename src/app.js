const express = require('express');
const chalk = require('chalk');
const port = process.env.port || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/help', (req, res) => {
  res.send('This is the help page!  ');
})

app.get('/about', (req, res) => {
  res.send('This is the about page!  ');
});

app.get('/weather', (req, res) => {
  res.send('Your weather!  ');
});

app.listen(port, () => {
  console.log(chalk.bold.inverse(` Listening on port ${port} `));
});
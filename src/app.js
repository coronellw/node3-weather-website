const path = require('path');
const chalk = require('chalk');
const express = require('express');
const port = process.env.port || 3000;

const app = express();

/**
 * Directories
 */
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
  res.send({forecast: 'warm', temperature: 52, location: 'Bogota'});
});

app.listen(port, () => {
  console.log(chalk.bold.inverse(` Listening on port ${port} `));
});
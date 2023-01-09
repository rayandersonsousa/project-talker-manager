const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve('src', 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const response = await fs.readFile(filePath);
  const responseJSON = JSON.parse(response);
  if (responseJSON.length === 0) {
    return res.status(200).send([]);
  }
  return res.status(200).json(responseJSON);
});

module.exports = app;

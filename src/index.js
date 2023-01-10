const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const generateToken = require('./utils/generateTolken');
const { validateEmail, validatePassword } = require('./utils/validateLogin');

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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile(filePath);
  const responseJSON = JSON.parse(response);
  const selectedTalker = responseJSON.find((talker) => Number(id) === talker.id);
  if (!selectedTalker) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(selectedTalker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const post = req.body;
  const token = generateToken();
  const userData = ['email', 'password'];
  const gotData = userData.every((user) => user in post);

  if (gotData) {
    return res.status(200).send({ token });
  }
});

module.exports = app;

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }

  if (age > 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).send({ message: 'O campor "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate) {
    return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
  }

  if (rate < 1 || rate > 5 || (!Number.isInteger(rate))) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { token } = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!dateRegex.test(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = {
  validateAge,
  validateName,
  validateRate,
  validateTalk,
  validateToken,
  validateWatchedAt,
};
const validateEmail = (req, res, next) => {
  const emailRegex = /^\w+@[a-z]+(\.[a-z]+){1,2}$/i;
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};

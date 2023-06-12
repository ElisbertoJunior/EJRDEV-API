const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({
      username: username,
      password: bcrypt.hashSync(password),
    });

    await user.save();
    res.json({ user, msg: "usuario criado!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar usuario" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const selectedUser = await User.findOne({ username: username });
  if (!selectedUser)
    return res.status(400).send("Usuario ou senha incorretos!");

  const passwordAndUserMatch = bcrypt.compareSync(
    password,
    selectedUser.password
  );
  if (!passwordAndUserMatch)
    return res.status(400).send("Usuario ou senha incorretos!");

  const token = jwt.sign({ id: selectedUser._id }, process.env.TOKEN_SECRET)
  res.header('authorization-token', token)

  res.send({
    token: token,
    user: {
      username,
      passwordAndUserMatch
    }
  });
};

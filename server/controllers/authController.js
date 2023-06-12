const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);

    const token = user.createToken();

    return res.status(201).send({ user: { name: user.name }, token });
  } catch (err) {
    console.log(err);
    if (err.code === 11000)
      return res
        .status(400)
        .send(
          `Duplicate value entered for ${Object.keys(
            err.keyValue
          )} field, please choose another one`
        );

    return res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Please provide email and password");

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid credentials");

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) return res.status(401).send("Invalid credentials");

    const token = user.createToken();

    return res.status(200).send({ user: { name: user.name }, token });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

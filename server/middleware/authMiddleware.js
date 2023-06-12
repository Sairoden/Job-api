const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // Check header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(401).send("Authentication invalid");

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

module.exports = auth;

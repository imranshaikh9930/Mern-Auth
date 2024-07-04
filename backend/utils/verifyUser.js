const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const { secret_token } = req.cookies; // Extract the token correctly

  if (!secret_token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  jwt.verify(secret_token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = user;
    next();
  });
};

module.exports = verifyToken;

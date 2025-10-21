const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Extract the token from the request
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // if there's no token

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: err.message,
      });
    }
    req.user = user;
    return next();
  });
};

module.exports = {
  authenticateJWT,
};
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Access token missing. Please log in.',
    });
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or expired token',
    });
  }
};

module.exports = {
  authenticateJWT,
};

const express = require('express');
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    status: "fail",
    message: "Too many login attempts. Please try again in 1 minute.",
  },
});

const {
  UserSignup,
  UserSignIn,
  GetAllUser,
  UpdateUser,
  UpdatePassword,
  GetUserByUsername,
  UserVerifyToken,
} = require('../controller/user');
const { authenticateJWT } = require('../controller/verifyToken');

const router = express.Router();

router.post('/signup', UserSignup);
router.post('/signin', loginLimiter, UserSignIn);
router.post('/verifyToken', UserVerifyToken);
router.get('/', authenticateJWT, GetAllUser);
router.get('/username/:username', authenticateJWT, GetUserByUsername);
router.put('/update', authenticateJWT, UpdateUser);
router.put('/updatePassword', authenticateJWT, UpdatePassword);

module.exports = router;
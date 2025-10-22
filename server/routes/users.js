const express = require('express');
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
router.post('/signin', UserSignIn);
router.post('/verifyToken', UserVerifyToken);
router.get('/', authenticateJWT, GetAllUser);
router.get('/username/:username', authenticateJWT, GetUserByUsername);
router.put('/update', authenticateJWT, UpdateUser);
router.put('/updatePassword', authenticateJWT, UpdatePassword);

module.exports = router;
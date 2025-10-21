/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models');
require('dotenv').config();

const GetAccessToken = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userLogin = await User.authenticate({ username, password });
    // console.log(userLogin);
    const { token } = userLogin;

    res.status(200).json({
      access_token: token.access_token,
    });
  } catch (error) {
    if (error?.message === 'user not found' || error?.message === 'wrong password!') {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const UpdateToken = async (req, res) => {
  const { user, token } = req.body;
  try {
    const newToken = await User.newToken({ user, token });
    res.status(200).json({
      data: newToken,
      message: 'new token',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const UserSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userLogin = await User.authenticate({ username, password });
    // console.log(userLogin);
    res.status(200).json({
      data: userLogin,
      message: 'Login successfull',
    });
  } catch (error) {
    if (error?.message === 'user not found' || error?.message === 'wrong password!') {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const SignInWithToken = async (req, res) => {
  const { access_token } = req.body;
  try {
    const userLogin = await User.authenticateToken(access_token);
    // console.log(userLogin);
    res.status(200).json({
      data: userLogin,
      message: 'Login successfull',
    });
  } catch (error) {
    if (error?.message === 'user not found' || error?.message === 'wrong password!') {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  UpdateToken,
  GetAccessToken,
  UserSignIn,
  SignInWithToken,
};
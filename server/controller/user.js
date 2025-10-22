/* eslint-disable consistent-return */
const path = require('path');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const { Op } = require('sequelize');
const {
  User,
} = require('../models');

const validator = new Validator();

const UserSignup = async (req, res) => {
  const {
    fullname,
    username,
    email,
    password,
  } = req.body;

  const userScheme = {
    fullname: { type: 'string', empty: false },
    username: { type: 'string', empty: false },
    email: { type: 'string' },
    password: { type: 'string', empty: false },
  };

  try {
    const bodyParsed = {
      fullname,
      username,
      email,
      password,
    };
    const validationMessagee = validator.validate(bodyParsed, userScheme);

    if (validationMessagee.length) {
      return res.status(401).json({
        status: 'fail',
        message: validationMessagee,
        data: null,
      });
    }

    const usernameExist = await User.findOne({
      where: { username },
    });
    if (usernameExist) {
      return res.status(404).json({
        status: 'fail',
        message: 'Username has been used',
        data: null,
      });
    }
    if (!username || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please fill all the fields',
        data: null,
      });
    }
    if (!usernameExist && username && password) {
      await User.create({
        fullname,
        username,
        email,
        password: bcrypt.hashSync(password, 8),
      });

      const userLogin = await User.authenticate({ username, password });
      return res.status(201).json({
        status: 'success',
        message: 'user created successfully',
        data: userLogin,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const UserSignIn = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const userLogin = await User.authenticate({ identifier, password });
    if (!userLogin.user) {
      return res.status(404).json({
        status: 'fail',
        message: userLogin.message || 'Authentication failed',
      });
    }

    const { access_token, refreshToken } = userLogin.token;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: userLogin.user,
    });
  } catch (error) {

    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const UserLogout = (req, res) => {
  try {
    // Hapus cookie access_token & refresh_token
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Logout failed",
    });
  }
};

const UserVerifyToken = async (req, res) => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Access token missing. Please log in.',
    });
  }

  try {
    const userLogin = await User.verifyToken(access_token);
    res.status(200).json({
      data: userLogin,
      message: 'Login successful',
    });
  } catch (error) {

    console.log('xxxxx', error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const UpdateUser = async (req, res) => {
  const {
    id,
    fullname,
    username,
    email,
  } = req.body;

  const userScheme = {
    id: { type: 'number', positive: true, integer: true },
    fullname: { type: 'string', empty: false },
    username: { type: 'string', empty: false },
    email: { type: 'string' },
  };

  try {
    const bodyParsed = {
      id,
      fullname,
      username,
      email,
    };

    const validationMessagee = validator.validate(bodyParsed, userScheme);

    if (validationMessagee.length) {
      return res.status(400).json({
        status: 'fail',
        message: validationMessagee,
        data: null,
      });
    }

    const usernameExist = await User.findOne({
      where: {
        [Op.and]: [
          { username },
          {
            [Op.not]: [
              { id },
            ],
          },
        ],
      },
    });

    if (usernameExist) {
      return res.status(400).json({
        status: 'fail',
        message: 'User with the same username has been exist',
        data: null,
      });
    }

    const emailExist = await User.findOne({
      where: {
        [Op.and]: [
          { email },
          {
            [Op.not]: [
              { id },
            ],
          },
        ],
      },
    });

    if (emailExist) {
      return res.status(400).json({
        status: 'fail',
        message: 'User with the same email has been exist',
        data: null,
      });
    }

    const isUpdate = await User.update(bodyParsed, { where: { id } });

    if (isUpdate < 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'User not updated',
        data: null,
      });
    }

    const userUpdated = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json({
      status: 'success',
      message: 'User updated',
      data: userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const UpdatePassword = async (req, res) => {
  const {
    id,
    newPassword,
    oldPassword,
  } = req.body;

  const userScheme = {
    id: { type: 'number', positive: true, empty: false },
    newPassword: { type: 'string', empty: false },
    oldPassword: { type: 'string', empty: false },
  };

  try {
    const bodyParsed = {
      id,
      newPassword,
      oldPassword,
    };
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare the old password with the one in the database
    const isMatch = await bcrypt.compareSync(oldPassword, user.dataValues.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    const validationMessagee = validator.validate(bodyParsed, userScheme);

    if (validationMessagee.length) {
      return res.status(400).json({
        status: 'fail',
        message: validationMessagee,
        data: null,
      });
    }

    const isUpdate = await User.update(
      {
        password: bcrypt.hashSync(newPassword, 8),
      },
      {
        where: { id },
      },
    );

    if (isUpdate < 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password not updated',
        data: null,
      });
    }

    const userUpdated = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json({
      status: 'success',
      message: 'User updated',
      data: userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      order: ['fullname'],
      attributes: { exclude: ['password'] },
    });
    return res.status(200).json({
      status: 'success',
      message: users.length > 0 ? 'User Found' : 'User is empty',
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const GetUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const users = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] },
    });
    return res.status(200).json({
      status: 'success',
      message: users?.dataValues ? 'User Found' : 'User is empty',
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  UserSignup,
  UserSignIn,
  UserLogout,
  UserVerifyToken,
  UpdateUser,
  UpdatePassword,
  GetAllUser,
  GetUserByUsername,
};
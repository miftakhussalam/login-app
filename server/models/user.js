'use strict';

const {
  Model,
  Op,
} = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
        password: this.password,
      };

      const secretKey = process.env.ACCESS_TOKEN_SECRET;

      const access_token = jwt.sign(payload, secretKey, {
        expiresIn: '24h',
      });
      const refreshToken = jwt.sign({
        id: uuidv4(),
      }, process.env.REFRESH_TOKEN_SECRET);
      return { access_token, refreshToken };
    };

    static authenticate = async (body) => {
      try {

        const user = await User.findOne({
          where: {
            [Op.or]: [
              { username: body?.identifier },
              { email: body?.identifier }
            ]
          },
        });

        if (!user) {
          return Promise.resolve({ message: 'user not found' });
        }
        
        const isPasswordValid = user.checkPassword(body.password);
        if (!isPasswordValid) {
          return Promise.resolve({ message: 'wrong password!' });
        }

        const token = await user.generateToken();

        const { password, ...noPassword } = user.dataValues;
        return Promise.resolve({ user: noPassword, token });
      } catch (err) {
        return Promise.reject(err);
      }
    };

    static authenticateToken = async (access_token) => {
      try {
        const decodedAccessToken = jwt
          .verify(access_token, process.env.ACCESS_TOKEN_SECRET);

        const user = await this.findOne({
          where: {
            username: decodedAccessToken.username,
          },
        });

        if (!user) {
          return Promise.reject(new Error('user not found!'));
        }

        const isPasswordValid = decodedAccessToken.password === user.password;
        if (!isPasswordValid) {
          return Promise.reject(new Error('Wrong password'));
        }

        const token = await user.generateToken();

        return Promise.resolve({ user, token });
      } catch (err) {
        return Promise.reject(err);
      }
    };

    static verifyToken = async (access_token) => {
      try {
        const decodedAccessToken = jwt
          .verify(access_token, process.env.ACCESS_TOKEN_SECRET);

        const user = await this.findOne({
          where: {
            username: decodedAccessToken.username,
          },
        });

        if (!user) {
          return Promise.reject(new Error('user not found!'));
        }

        const isPasswordValid = decodedAccessToken.password === user.password;
        if (!isPasswordValid) {
          return Promise.reject(new Error('Wrong password'));
        }

        const { password, ...userWithoutPassword } = user.dataValues;
        return Promise.resolve({ user: userWithoutPassword, isAuthenticated: true });
      } catch (err) {
        return Promise.reject(err);
      }
    };

    static newToken = async (dataUser) => {
      try {
        const decodedRefreshToken = jwt
          .verify(dataUser.token.refreshToken, process.env.REFRESH_TOKEN_SECRET);

        console.log(decodedRefreshToken);
        const user = await this.findOne({
          where: {
            username: dataUser.user.username,
          },
        });
        const token = await user.generateToken();
        return Promise.resolve(token);
      } catch (error) {
        return Promise.reject(error);
      }
    };

    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING(50),
    username: DataTypes.STRING(50),
    password: DataTypes.STRING(100),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
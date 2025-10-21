require('dotenv').config();

const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
  MYSQL_DB_TEST,
  MYSQL_HOST,
  DIALECT,
} = process.env;
module.exports = {
  development: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB,
    host: MYSQL_HOST,
    dialect: DIALECT,
  },
  test: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_TEST,
    host: MYSQL_HOST,
    dialect: DIALECT,
  },
  production: {
    use_env_variable: 'DATABASE_URL_ELEPHANTSQL',
    dialect: 'mysql',
    protocol: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
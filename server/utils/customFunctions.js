const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("./environment");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const comparePassword = (plainTextPassword, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, hashedPassword, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const generateToken = (data, expTime) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ data }, env.server.secret, { expiresIn: expTime }, (err, token) => {
      resolve(`Bearer ${token}`);
    });
  });
};

const getUserDataFromToken = (token) => {
  var tokenValue = token.split(" ")[1];
  if (!tokenValue) {
    throw new Error("Invalid token");
  }
  var userData = jwt.decode(tokenValue);

  if (userData == null) {
    throw new Error("Unauthorized");
  }
  return userData.data;
};

const checkAuthorization = async (bearerToken) => {
  var data = { status: false, user: {} };
  if (!bearerToken) return data;

  var token = bearerToken.split(" ")[1];
  if (!token) return data;

  return new Promise((resolve, reject) => {
    jwt.verify(token, env.server.secret, (err, authData) => {
      if (err) {
        resolve(data);
      } else {
        data.status = true;
        data.user = authData.data;
        resolve(data);
      }
    });
  });
};

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
  getUserDataFromToken,
  checkAuthorization,
};

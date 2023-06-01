const sequelize = require("sequelize");
const db = require("../config/database");

const bcrypt = require("bcrypt");

var Auth = db.define(
  "user",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "user",
  }
);

Auth.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((error) => {
      throw new Error();
    });
});

module.exports = Auth;

const sequelize = require("sequelize");
const Disciplina = require("./disciplina.model");
const db = require("../config/database");

var Aluno = db.define(
  "student",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: sequelize.STRING,
    address: sequelize.STRING,
    nif: sequelize.INTEGER,
  },
  {
    timestamps: false,
    tableName: "student",
  }
);

module.exports = Aluno;

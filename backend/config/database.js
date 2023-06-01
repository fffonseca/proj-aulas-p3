const sequelize = require("sequelize");
const conexao = new sequelize("aulas", "root", "<pass>", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = conexao;

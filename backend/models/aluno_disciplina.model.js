const sequelize = require("sequelize");
const Aluno = require("./aluno.model");
const Disciplina = require("./disciplina.model");
const db = require("../config/database");

var AlunoDisciplina = db.define(
  "student_subject",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
    tableName: "student_subject",
  }
);
Aluno.belongsToMany(Disciplina, { through: "student_subject" });
Disciplina.belongsToMany(Aluno, { through: "student_subject" });

module.exports = AlunoDisciplina;

const Aluno = require("../models/aluno.model");
const AlunoDisciplina = require("../models/aluno_disciplina.model");
const sequelize = require("../config/database");

const controllers = {};
sequelize.sync();

/* This function is getting all the students from the database. */
controllers.getStudents = async (req, res) => {
  const dados = await Aluno.findAll()
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message:
          error.message || "Ocorreu um erro ao carregar os dados dos alunos.",
      });
    });

  res.status(200).json({
    success: true,
    data: dados,
  });
};

/* This function is getting the student by id. */
controllers.getStudentById = async (req, res) => {
  const { studentId } = req.params;
  const dados = await Aluno.findAll({
    where: { id: studentId },
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: error.message || "Aluno não encontrado.",
      });
    });

  res.status(200).json({
    success: true,
    data: dados,
  });
};

controllers.getStudentByName = async (req, res) => {
  const { studentName } = req.params;
  const dados = await Aluno.findAll({
    where: { name: studentName },
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: error.message || "Aluno não encontrado.",
      });
    });

  res.status(200).json({
    success: true,
    data: dados,
  });
};

/* A function that adds a student to the database. */
controllers.addStudent = async (req, res) => {
  const { name, address, nif, subjects } = req.body;
  const dados = await Aluno.create({
    name: name,
    address: address,
    nif: nif,
    subjects: subjects,
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        message: error.message || "Ocorreu um erro ao tentar criar o aluno.",
      });
    });

  res.status(201).json({
    success: true,
    data: dados,
  });
};

/* Updating the student with the id that is passed in the request. */
controllers.updateStudent = async (req, res) => {
  const { studentId } = req.params;
  console.log("--------------> " + studentId);
  const { name, address, nif, subjects } = req.body;
  const dados = await Aluno.update(
    {
      name: name,
      address: address,
      nif: nif,
      subjects: subjects,
    },
    {
      where: { id: studentId },
    }
  )
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        message:
          error.message || "Ocorreu um erro ao atualizar os dados do aluno.",
      });
    });

  const dados_aluno = await Aluno.findAll({
    where: { id: studentId },
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: error.message || "Aluno não encontrado.",
      });
    });

  res.status(200).json({
    success: true,
    data: dados_aluno,
  });
};

/* Deleting the student with the id that is passed in the request. */
controllers.deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const dados = await Aluno.destroy({
    where: { id: studentId },
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        message: error.message || "Ocorreu um erro ao tentar eliminar o aluno.",
      });
    });

  res.status(204).json({
    success: true,
    data: dados,
  });
};

module.exports = controllers;

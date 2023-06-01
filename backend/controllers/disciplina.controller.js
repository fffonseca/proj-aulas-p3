const Disciplina = require("../models/disciplina.model");
const sequelize = require("../config/database");

const controllers = {};
sequelize.sync();

controllers.getSubjects = async (req, res) => {
  const dados = await Disciplina.findAll()
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: error.message || "Ocorreu um erro ao carregar as disciplinas.",
      });
    });

  res.status(200).json({
    success: true,
    data: dados,
  });
};

controllers.getSubjectById = async (req, res) => {
  const { subjectId } = req.params;
  const dados = await Disciplina.findAll({
    where: { id: subjectId },
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: error.message || "Disciplina não encontrada.",
      });
    });

  res.status(200).json({
    success: true,
    data: dados,
  });
};

controllers.getSubjectByName = async (req, res) => {
  const { subjectName } = req.params;
  const dados = await Disciplina.findAll({
    where: { name: subjectName },
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: error.message || "Disciplina não encontrada.",
      });
    });

  res.status(200).json({
    success: true,
    data: dados,
  });
};

controllers.addSubject = async (req, res) => {
  const { name, totalHours, category } = req.body;
  const dados = await Disciplina.create({
    name: name,
    totalHours: totalHours,
    category: category,
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        message:
          error.message ||
          "Ocorreu um erro ao tentar criar uma nova disciplina.",
      });
    });

  res.status(201).json({
    success: true,
    data: dados,
  });
};

controllers.updateSubject = async (req, res) => {
  const { subjectId } = req.params;
  const { name, totalHours, category } = req.body;
  const dados = await Disciplina.update(
    {
      name: name,
      totalHours: totalHours,
      category: category,
    },
    {
      where: { id: subjectId },
    }
  )
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        message:
          error.message ||
          "Ocorreu um erro ao atualizar os dados da disciplina.",
      });
    });

  const dados_disciplina = await Disciplina.findAll({
    where: { id: subjectId },
  })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: error.message || "Disciplina não encontrada.",
      });
    });

  res.json({
    success: true,
    data: dados_disciplina,
  });
};

controllers.deleteSubject = async (req, res) => {
  const { subjectId } = req.params;
  const dados = await Disciplina.destroy({ where: { id: subjectId } })
    .then((dados) => {
      return dados;
    })
    .catch((error) => {
      res.status(404).send({
        message:
          error.message || "Ocorreu um erro ao tentar eliminar a disciplina.",
      });
    });

  res.status(204).json({
    success: true,
    data: dados,
  });
};

module.exports = controllers;

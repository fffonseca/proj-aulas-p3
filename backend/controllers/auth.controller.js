const sequelize = require("../config/database");
const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const controllers = {};
sequelize.sync();

controllers.register = async (req, res) => {
  const dados = await Auth.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  res.status(200).json({
    success: true,
    message: "Utilizador criado com sucesso.",
    data: dados,
  });
};

controllers.login = async (req, res) => {
  let email, password;
  if (req.body.email && req.body.password) {
    email = req.body.email;
    password = req.body.password;
  }

  const auth = await Auth.findOne({ where: { email: email } })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  if (password === null || typeof password === "undefined") {
    res.status(403).json({
      success: false,
      message: "Erro na autenticação do utilizador.",
    });
  } else {
    if (req.body.email && req.body.password && auth) {
      //compara as passwords (em hash)
      const isMatch = await bcrypt.compare(req.body.password, auth.password);

      if (req.body.email == auth.email && isMatch) {
        let token = jwt.sign(
          {
            email: req.body.email,
          },
          config.secret,
          { expiresIn: config.timer }
        );

        res.status(200).json({
          success: true,
          message: "Autenticação realizada com sucesso",
          AccessToken: token,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Erro na autenticação do utilizador.",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message:
          "Erro durante o processo de autenticação do utilizador. Tente novamente mais tarde.",
      });
    }
  }
};

module.exports = controllers;

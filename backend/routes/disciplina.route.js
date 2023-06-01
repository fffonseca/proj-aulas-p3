const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const disciplinaController = require("../controllers/disciplina.controller");

//endpoints da collection 'subject'
router.get(
  "/subjects",
  middleware.checkToken,
  disciplinaController.getSubjects
);
router.get(
  "/subject/:subjectId",
  middleware.checkToken,
  disciplinaController.getSubjectById
);
router.post("/subject", middleware.checkToken, disciplinaController.addSubject);
router.put(
  "/subject/:subjectId",
  middleware.checkToken,
  disciplinaController.updateSubject
);
router.delete(
  "/subject/:subjectId",
  middleware.checkToken,
  disciplinaController.deleteSubject
);

module.exports = router;

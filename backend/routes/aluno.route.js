const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const alunoController = require("../controllers/aluno.controller");

//endpoints da collection 'student'
router.get("/students", middleware.checkToken, alunoController.getStudents);
router.get(
  "/student/:studentId",
  middleware.checkToken,
  alunoController.getStudentById
);
router.get(
  "/student/:studentName",
  middleware.checkToken,
  alunoController.getStudentByName
); //bug
router.post("/student", middleware.checkToken, alunoController.addStudent);
router.put(
  "/student/:studentId",
  middleware.checkToken,
  alunoController.updateStudent
);
router.delete(
  "/student/:studentId",
  middleware.checkToken,
  alunoController.deleteStudent
);

module.exports = router;

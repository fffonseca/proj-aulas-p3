const express = require("express");
const cors = require("cors");
const bodyParser = require("express");
const app = express();

app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", require("./routes/auth.route"));
app.use("/api/v1", require("./routes/aluno.route"));
app.use("/api/v1", require("./routes/disciplina.route"));

app.listen(app.get("port"), () => {
  console.log("API em execução (PORT: " + app.get("port") + ")");
});

import express from "express";
import router from "./rotas/rotas.js";
const porta = process.env.PORT || 3000;

const app = express();

app.use("/", router);

// When no route is found,
app.get("*", (req, res) => {
  res.send("CFB Cursos");
});

app.listen(porta, () => {
  console.log("Rodando");
});

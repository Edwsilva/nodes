//import express from "express";
//const express = require("express");
import { Router } from "express";

const router = Router();
//const router = express.Router();

let courseInfo = [
  { curso: "node", info: "Curso de Node" },
  { curso: "react", info: "Curso de React" },
  { curso: "java", info: "Curso de Java" },
  { curso: "arduino", info: "Curso de Arduino" },
];

router.get("/", (req, res) => {
  res.json({ ola: "Seja bem vindo" });
});

// router.get("/:all", (req, res) => {
//   res.status(200).json(courseInfo);
// });

router.get("/:courseid", (req, res) => {
  const course = req.params.courseid;
  console.log(course);
  let courseInformation = courseInfo.find((item) => item.curso == course);
  if (!courseInformation) {
    res
      .status(404)
      .json({ erro: "Curso não encontrato", cursoPesquisado: course });
  } else {
    res.status(200).json(courseInformation);
  }
});

export default router;

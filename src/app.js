// import { openDb } from "./configDB.js";
import express from "express";
import fs from "fs";
import https from "https";
//var db = require("./configDB.js");
import db from "./configDB.js";
//import { db } from "./configDB.js";
//import cors from "cors";

//const express = require("express");
const app = express();

// get the body of the request in json format
//database();
app.use(express.json());
// without it returns undefined
//console.log(req.body);

//openDb();

app.get("/", function (req, res) {
  res.send("Olá mundo");
});

app.get("/api/users", (req, res, next) => {
  var sql = "select * from user";
  var params = [];
  db.all(sql, params, (err, rows) => {
    console.log("ROWS ", rows);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.post("/pessoa", (req, res) => {
  console.log("REQ ", req.body);
  res.json({
    statusCode: 200,
  });
});

app.listen(3000, () => {
  console.log("Api Rodando...");
});

//var sqlite3 = require("sqlite3").verbose();
import sqlite3 from "sqlite3";
//var md5 = require("md5");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO user (name, email, password) VALUES (?,?,?)";
          db.run(insert, ["admin", "admin@example.com", "admin123456"]);
          db.run(insert, ["user", "user@example.com", "user123456"]);
        }
      }
    );
    db.each("SELECT * FROM user", (err, name) => {
      console.log("Usuario: ");
      console.log(name);
    });
  }
});

//module.exports = db;
export default db;

// const sqlite3 = require("sqlite3").verbose();
// const DBSOURCE = "db.sqlite"
// const db = new sqlite3.Database(DBSOURCE);

// const USUARIOS_SCHEMA = `
// CREATE TABLE IF NOT EXISTS usuarios (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     nome_completo VARCHAR(40) NOT NULL UNIQUE,
//     email VARCHAR(255) NOT NULL,
//     senha VARCHAR(255) NOT NULL
// )
// `;

// const INSERIR_USUARIO_1 = `INSERT INTO usuarios (
//   nome_completo,
//   email,
//   senha
// ) SELECT 'Gabriel Leite', 'gabriel@alura.com.br', '123' WHERE NOT EXISTS (SELECT * FROM usuarios WHERE email = 'gabriel@alura.com.br')
// `;

// db.serialize(() => {
//   db.run("CREATE TABLE lorem (info TEXT)");
//   db.run(USUARIOS_SCHEMA);
//   db.run(INSERIR_USUARIO_1);

//   // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   // for (let i = 0; i < 210; i++) {
//   //   stmt.run("Ipsum " + i);
//   // }
//   // stmt.finalize();

//   // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//   //   console.log(row.id + ": " + row.info);
//   // });
//   db.each("SELECT * FROM usuarios", (err, usuario) => {
//     console.log("Usuario: ");
//     console.log(usuario);
//   });
// });

// db.close();

// // import sqlite3 from "sqlite3";
// // import { open } from "sqlite";

// // // you would have to import / invoke this in another file
// // export async function openDb() {
// //   return open({
// //     filename: "./database.db",
// //     driver: sqlite3.Database,
// //   });
// // }

// // import sqlite3 from "sqlite3";
// // const DBSOURCE = "db.sqlite";
// // const SQL_ITENS_CREATE = `
// //     CREATE TABLE itens (
// //         id INTEGER PRIMARY KEY AUTOINCREMENT,
// //         nome TEXT,
// //         descricao TEXT
// //     )`;
// // const database = new sqlite3.Database(DBSOURCE, (err) => {
// //   if (err) {
// //     console.error(err.message);
// //     throw err;
// //   } else {
// //     console.log("Base de dados conectada com sucesso.");
// //     database.run(SQL_ITENS_CREATE, (err) => {
// //       if (err) {
// //         // Possivelmente a tabela já foi criada
// //       } else {
// //         console.log("Tabela itens criada com sucesso.");
// //       }
// //     });
// //   }
// // });

// // export default database;

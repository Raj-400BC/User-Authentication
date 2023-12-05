import express from "express"
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended:true}));

app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/public/SignUp.html');
})

app.post('/check' , (req , res)=>{
    if (fs.existsSync(`${req.body.email}.txt`)) {
       
        res.send(`<h1>Please choose a different mail</h1>`);
    }
    else {fs.writeFile(`${req.body.email}.txt` , req.body.password , (err)=>{
        if (err) throw err;
        console.log("The file has been saved");
    });
    res.send(`<h1>Welcome ${req.body.name}.</h1>`);
    }
})

app.listen(port , ()=>{
    console.log(`Server running at port ${port}.`)
})

// index.js
// import express from 'express';
// import sqlite3 from 'sqlite3';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const app = express();
// const port = 3000;
// const __dirname = dirname(fileURLToPath(import.meta.url));

// const db = new sqlite3.Database('users.db');

// app.use(express.urlencoded({ extended: true }));

// // Create a users table if it doesn't exist
// db.run(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT UNIQUE,
//     phone TEXT,
//     password TEXT
//   )
// `);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/SignUp.html');
// });

// app.post('/check', (req, res) => {
//   const { name, email, phone, password } = req.body;

//   // Check if email already exists
//   db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
//     if (err) {
//       return res.status(500).send('Internal Server Error');
//     }

//     if (row) {
//       return res.send('<h1>Email already in use. Please choose a different email.</h1>');
//     }

//     // Insert new user into the database
//     db.run('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)', [name, email, phone, password], (err) => {
//       if (err) {
//         return res.status(500).send('Internal Server Error');
//       }

//       res.send(`<h1>Welcome ${name}.</h1>`);
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running at port ${port}.`);
// });

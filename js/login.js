const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thitracnghiem'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database on XAMPP');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  connection.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send({ message: 'Login success' });
    } else {
      res.send({ message: 'Invalid username or password' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


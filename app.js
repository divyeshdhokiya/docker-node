const express = require('express');
const { Client } = require('pg')
const bodyParser = require('body-parser')

const PORT = 4000;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connectionString = "postgres://umqbbehd:StT7N6IrKeAsthnT9b4Tkg3eQuprMBEd@baasu.db.elephantsql.com:5432/umqbbehd";
const client = new Client({
  user: 'umqbbehd',
  host: 'baasu.db.elephantsql.com',
  database: 'umqbbehd',
  password: 'StT7N6IrKeAsthnT9b4Tkg3eQuprMBEd',
  port: 5432,
})
client.connect();

app.get('/getAll', function (req, res, next) {
  const text = 'SELECT * FROM store';
  client.query(text, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).json(result.rows);
  });
});

app.post('/save', (req, res, next) => {
  const body = req.body;
  const text = 'INSERT INTO store (id,championSkin, skinType,gameType,platform) VALUES($1, $2, $3,$4,$5) RETURNING *'
  const values = [body.id, body.championSkin, body.skinType, body.gameType, body.platform];
  client.query(text, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result);
  });
});


app.listen(PORT,HOST);
console.log('Server is running.. on Port 4000');


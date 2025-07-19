const mysql = require('mysql2');
const { db } = require('../config/config');
const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

module.exports = connection;
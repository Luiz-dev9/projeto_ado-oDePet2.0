const mysql = require('mysql2');
const conectar = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"petlife"
});

conectar.connect((err) =>{
    if(err) throw err;
    console.log("conectado ao banco de dados")
})
module.exports = conectar;
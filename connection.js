const mySQL = require('mysql2');
const cTable = require('console.table');

const dbConnection = mySQL.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password1234',
    database: 'employeedb'
})

dbConnection.connect (function(err){
    if (err) throw err 
});

module.exports = dbConnection

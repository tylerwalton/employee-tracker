const mySQL = require('mysql2')

const dbConnection = mySQL.createConnection({
    host: 'localhost',
    port: 3306,
    name: 'root',
    password: 'password1234',
    database: 'employeedb'
})

dbConnection.connect (function(err){
    if (err) throw err 
});

module.exports = dbConnection

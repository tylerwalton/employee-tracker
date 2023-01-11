const inquirer = require ('inquirer');
const dbConnection = require ('./connection')

function startPrompt () {
 inquirer.prompt([
  {
    name: "question",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Create a new department",
      "Create a new role",
      "Add a new employee",
      "Update employee role",
      "Quit"
    ]
  }])
  .then(function (res) {
    switch (res.question) {
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Create a new department":
        createDepartment();
        break;
      case "Create a new role":
        createRole();
        break;
      case "Create a new employee":
        createEmployee();
        break;
      case "Update employee role":
       updateRole();
        break;
      case "Quit":
        Quit()
        break;
    }
  });
}



startPrompt()

// functions to query database for viewing department role and employee tables

function viewDepartments () {
    dbConnection.query ('SELECT * FROM department', (err,res) => {
        if (err) throw err 
        console.table(res)
        startPrompt()
    })
};
function viewEmployees () {
    dbConnection.query ('SELECT * FROM employee', (err,res) => {
        if (err) throw err 
        console.table(res)
        startPrompt()
    })
};
function viewRoles () {
    dbConnection.query ('SELECT * FROM role', (err,res) => {
        if (err) throw err 
        console.table(res)
        startPrompt()
    })
};
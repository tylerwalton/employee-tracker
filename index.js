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
      "Create a new employee",
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

function createEmployee () {
    dbConnection.query ('SELECT * FROM role', (err,res)=> {
        if (err) throw err
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employees first name?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the employees last name?",
            },
            {
              type: "list",
              name: "roletitle",
              message: "What is the new employees role?",
              choices: res.map((role) => role.title),
            },
            {
              type: "list",
              name: "managerId",
              message: "What is the managers ID?",
              choices: [1,2,3] ,
            },
          ])
          .then((data) => {
            let roleTitle = res.find((role) => role.title === data.roletitle);
            dbConnection.query("insert into employee set ?", {
              first_name: data.first_name,
              last_name: data.last_name,
              role_id: roleTitle.id,
              manager_Id : data.managerId
            });
            startPrompt();
          });
    })
}
function createRole () {
    dbConnection.query ('SELECT * FROM department', (err,res)=> {
        if (err) throw err
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'What is the employees title?'
          },
          {
            type: 'input',
            name: 'salary',
            message: 'What is the employees starting salary?'
          },
          {
            type: 'list',
            name: 'department',
            message: 'What department is this employee apart of?',
            choices: res.map(department => department.name)
          },
        ]) .then (data => {
let newRole = res.find(department => department.name === data.department)
            dbConnection.query ('insert into role set ?', {
                title: data.title, salary: data.salary, department_id: newRole.id
            })
            startPrompt()
        })
    })
}

function createDepartment () {
  inquirer.prompt ([
    {
      type : "input",
      name : "department_name",
      message : "Please provide the name for the new department."
    }
  ]) .then (data => {
    dbConnection.query ('INSERT INTO department SET ?', {name : data.department_name})
    startPrompt()
  })
}
// need to select employee whos role we want to change by name and convert to employee id we need to grab the role that we are changing the employee to and convert it to its id and update the employee table with our changes

function updateRole () {
  dbConnection.query("SELECT * FROM employee", (err, empRes) => {
    if (err) throw (err)
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_name",
          message: "Please select the employees whos role you would like to update",
          choices: empRes.map (employee => employee.first_name + " " + employee.last_name)
        },
      ])
      .then((data) => {
// convert employee name to employee id here
const selectedEmployee = empRes.find((employee) => employee.first_name + " " + employee.last_name === data.employee_name);
        dbConnection.query("SELECT * FROM role", (err,roleRes) => {
          if (err) throw err;
          inquirer.prompt([
            {
              type: "list",
              name: "role_title",
              message:
                "Please select the new role for this employee",
              choices: roleRes.map(
                (role) => role.title
              ),
            },
          ]) .then (data => {
            // convert role title to role id
            const selectedTitle = roleRes.find (role => role.title === data.role_title)
            dbConnection.query('UPDATE employee SET role_id = ? where id = ?', [selectedTitle.id, selectedEmployee.id], function (err){
              if (err) throw err
              startPrompt();
            })
          })
        });
      });
  });
}
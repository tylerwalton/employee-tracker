USE employeedb;

INSERT INTO department(name)
VALUES ('Engineering'), ('HR'), ('Janitorial');

INSERT INTO role (title , salary, department_id)
VALUES ('Engineer', 80000, 1), ('HR', 60000, 2), ('Janitorial', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rob', 'Johnson', 1, 2), ('Tyler', 'Walton', 1, NULL), ('Robby', 'Kurle', 2, 2), ('Alli', 'Hilton', 3, 2);




const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Ham mock82!',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );
  
//   // Query database
//   db.query('SELECT * FROM students', function (err, results) {
//     console.log(results);
//   });

inquirer
    .prompt([
        {
            name: 'username',
            type: 'list',
            message: 'Select what you would like to do:',
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
      
        }
    ]).then((response) => {

        switch(response.username) {
            case "view all departments":
                console.log("view departments")
                db.query('SELECT * FROM department', (err, results) => {
                    if (err) {
                        console.error(err)
                    } else {
                        let departmentTable = cTable.getTable(results)
                        console.table(departmentTable)
                    }            
                })

            break;
            case "view all roles":
                console.log("view roles")
                db.query(`SELECT * FROM roles`, (err, results) => {
                    if (err) {
                        console.error(err)
                    } else {
                        let roleTable = cTable.getTable(results)
                        console.table(departmentTable)
                    }            
                })

            break;
            case "view all employees":
                console.log("view employees")

                let query = `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
                FROM employee 
                    JOIN role 
                        ON role.id = employee.role_id
                    JOIN department
                        ON department.id = role.department_id
                    LEFT JOIN employee as manager
                        ON manager.manager_id = employee.employee_id;`

                db.query(query, (err, results) => {
                    if (err) {
                        console.error(err)
                    } else {
                        let departmentTable = cTable.getTable(results)
                        console.table(departmentTable)
                    }            
                })
                
            break;
            case "add a department":

            break;
            case "add a role":

            break;
            case "add an employee":

            break;
            case "update an employee role":

            break;
        }
    })
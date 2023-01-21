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

            break;
            case "view all employees":
                
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
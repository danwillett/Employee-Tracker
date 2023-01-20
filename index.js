const inquirer = require('inquirer');

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
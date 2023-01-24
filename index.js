const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')

// query to see all departments
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
    if (err) {
        console.error(err)
    } else {                       
        console.table(cTable.getTable(results))
    }            
})}

const viewAllRoles = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON department.id = role.department_id;`, (err, results) => {
        if (err) {
            console.error(err)
        } else {
    
            console.table(cTable.getTable(results))
        }            
    })
}

const viewAllEmployees = () => {
    let query = `SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
                FROM employee 
                    JOIN role 
                        ON role.id = employee.role_id
                    JOIN department
                        ON department.id = role.department_id
                    LEFT JOIN employee as manager
                        ON employee.manager_id = manager.employee_id;`

                db.query(query, (err, results) => {
                    if (err) {
                        console.error(err)
                    } else {
                        let departmentTable = cTable.getTable(results)
                        console.table(departmentTable)
                    }            
                })
}

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



inquirer
    .prompt([
        {
            name: 'username',
            type: 'list',
            message: 'Select what you would like to do:',
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
      
        }
    ]).then(async (response) => {

        switch(response.username) {
            case "view all departments":
                console.log("view departments")
                viewAllDepartments()

            break;
            case "view all roles":
                console.log("view roles")
                viewAllRoles()

            break;
            case "view all employees":
                console.log("view employees")

                viewAllEmployees()
                
            break;
            case "add a department":
                inquirer
                    .prompt([
                        {
                            name: 'newDepartment',
                            type: 'input',
                            message: 'Enter the name of your new department'                                            
                        }
                    ]).then((response) => {
                        let add_department = `INSERT INTO department (department_name) VALUES ("${response.newDepartment}")`;
                        db.execute(add_department, (err, results) =>
                        {
                            if (err) {
                                console.error(err)
                            } else {
                                console.log("added new department")
                                viewAllDepartments()
                            }
                            
                        });
                    })
                
            break;
            case "add a role":

                // get list of departments
                let departments = [];
                let departmentObj;
                db.query("Select * FROM department", (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result)
                        departmentObj = result;
                        
                        for (let i = 0; i < result.length; i++) {
                            departments.push(result[i].department_name);
                        }                      
                    }
                });
                inquirer
                    .prompt([
                        {
                            name: 'title',
                            type: 'input',
                            message: 'Enter the title of the new role'                                            
                        },
                        {
                            name: 'salary',
                            type: 'input',
                            message: 'Enter the salary of the new role'                                            
                        },
                        {
                            name: 'department',
                            type: 'list',
                            message: 'Enter the department of the new role',
                            choices: departments                                          
                        }
                    ]).then((response) => {
                        // match department name with id
                        let department_id;
                        console.log(`department Obj ${departmentObj.length}`)

                        for (let i = 0; i<departmentObj.length; i++){
                            if (departmentObj[i].department_name == response.department){
                                department_id = departmentObj[i].id;
                            }
                        };
                        console.log(department_id)

                        let add_department = `INSERT INTO role (title, salary, department_id) VALUES ("${response.title}", "${response.salary}", "${department_id}")`;
                        db.execute(add_department, (err, results) =>
                        {
                            if (err) {
                                console.error(err)
                            } else {
                                console.log("Added new role")
                                viewAllRoles()
                            }
                            
                        });
                    })

            break;
            case "add an employee":

                let roleObj;
                let titles = [];
                db.query(`SELECT role.title, role.id
                FROM role;`, (err, result)=> {
                    err ? console.log(err) :
                    console.log(result)
                    roleObj = result;
                    
                    for (let i = 0; i < result.length; i++) {
                        titles.push(result[i].title);
                    }    
                });
  
                let employeeObj;
                let names =[];
                db.query(`SELECT employee.employee_id, CONCAT(employee.first_name, ' ', employee.last_name) AS name
                FROM employee;`, (err, result)=> {
                    err ? console.log(err) :
                    console.log(result)
                    employeeObj = result;
                    for (let i = 0; i < result.length; i++) {
                        names.push(result[i].name);
                    }                       
                });

                inquirer
                    .prompt([
                        {
                            name: 'firstName',
                            type: 'input',
                            message: "Enter your new employee's first name"                                            
                        },
                        {
                            name: 'lastName',
                            type: 'input',
                            message: "Enter your new employee's last name"                                            
                        },
                        {
                            name: 'role',
                            type: 'list',
                            message: 'What is the role?',
                            choices: titles                                           
                        },
                        {
                            name: 'manager',
                            type: 'list',
                            message: "Please select your employee's manager",
                            choices: names                                       
                        },
                    ]).then((response) => {

                        // find role id
                        let roleId;
                        for (let i = 0; i<roleObj.length; i++){
                            if (roleObj[i].title == response.role){
                                roleId = roleObj[i].id;
                            }
                        };

                        // find manager id
                        let managerId;

                        for (let i = 0; i<employeeObj.length; i++){
                            if (employeeObj[i].name == response.manager){
                                managerId = employeeObj[i].employee_id;
                            }
                        };


                        let add_employee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", "${roleId}", "${managerId}")`;
                        db.execute(add_employee, (err, results) =>
                        {
                            if (err) {
                                console.error(err)
                            } else {
                                console.log("Added new role")
                                viewAllEmployees()
                            }
                            
                        });
                    })

            break;
            case "update an employee role":

            break;
        }
    })

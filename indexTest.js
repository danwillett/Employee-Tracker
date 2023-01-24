const inquirer = require('inquirer');
const mysql = require('mysql2')
const cTable = require('console.table')

// query to see all departments
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error(err)
        } else {
            console.table(cTable.getTable(results))
        }
    })
}

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

const updateEmployee = async (response) => {
    console.log("hello?")
    let [empObj, names] = await getEmployees()
    let [roleObj, titles] = await getRoles()

    console.log(roleObj)
    console.log(titles)
    console.log(empObj)
    console.log(names)

}

const getEmployees = () => {
    return new Promise((resolve, reject) => {
        let employeeObj;
        let names = [];
        db.query(`SELECT employee.employee_id, CONCAT(employee.first_name, ' ', employee.last_name) AS name
        FROM employee;`, (err, result) => {
            if (err) {
                console.error(err);
                reject(err)
            } else {
                employeeObj = result;
                for (let i = 0; i < result.length; i++) {
                    names.push(result[i].name);
                }
                resolve([employeeObj, names])
            }
        });
    })


}

const getRoles = () => {
    return new Promise((resolve, reject) => {
        let roleObj;
        let titles = [];
        db.query(`SELECT role.title, role.id
                FROM role;`, (err, result) => {
            if(err) {
                console.error(err)
                reject(err)
            } else {
                roleObj = result;

            for (let i = 0; i < result.length; i++) {
                titles.push(result[i].title);
            }

            resolve([roleObj, titles])
        }
        });
    })
}

inquirer
    .prompt([
        {
            name: 'username',
            type: 'list',
            message: 'Select what you would like to do:',
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]

        }
    ]).then((response) => {
        console.log(response)
        if (response.username == "update an employee role") {
            console.log("this!")
            updateEmployee(response)
        }

    })


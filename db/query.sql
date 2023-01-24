-- Show all departments with ids
-- SELECT * FROM department;

-- Show employee ids, first names, last names, job titles, departments, salaries, and managers --

-- SELECT employee.employee_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
-- FROM employee 
--     JOIN employee as manager
--         ON manager.manager_id = employee.employee_id;

SELECT * FROM employee;
SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee 
        JOIN role 
            ON role.id = employee.role_id
        JOIN department
            ON department.id = role.department_id
        LEFT JOIN employee as manager
            ON employee.manager_id = manager.employee_id;

-- SELECT employee.employee_id, employee.first_name, employee.last_name, employee.manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
--     FROM employee 
--         LEFT JOIN employee as manager
--             ON employee.manager_id = manager.employee_id;
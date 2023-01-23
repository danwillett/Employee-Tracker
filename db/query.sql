-- Show all departments with ids
SELECT * FROM department;

-- Show employee ids, first names, last names, job titles, departments, salaries, and managers --
-- employee.employee_id employee.first_name employee.last_name --
-- 
SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee 
    JOIN role 
        ON role.id = employee.role_id
    JOIN department
        ON department.id = role.department_id
    LEFT JOIN employee as manager
        ON manager.manager_id = employee.employee_id;
    
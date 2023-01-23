-- Show all departments with ids
-- SELECT * FROM department;

-- Show employee ids, first names, last names, job titles, departments, salaries, and managers --

SELECT employee.employee_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee 
    JOIN employee as manager
        ON manager.manager_id = employee.employee_id;

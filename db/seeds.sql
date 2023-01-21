INSERT INTO department(department_name)
VALUES ("Engineering"),
    ("Legal"),
    ("Sales"),
    ("Human Resources"),
    ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", "100000", 3),
("Salesperson", "80000", 3),
("Lead Engineers", "150000", 1),
("Software Engineer", "120000", 1),
("Account Manager", "160000", 5),
("Accountant", "125000", 5),
("Legal Team Lead", "250000", 2),
("Lawyer", "190000", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Taylor", 1, null),
("Rebecca", "Ramirez", 2, 1),
("Sonya", "Pryanka", 3, null),
("Rich", "Williams", 4, 3),
("Oscar", "Ferrera", 5, null),
("Jimmy", "Busket", 6, 5),
("Sallie", "Johnson", 7, null),
("Jaime", "Freesky", 8, 7);

SELECT * FROM department;
SELECT * FROM role;

SELECT * FROM employee;
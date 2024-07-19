CREATE TABLE students (
pantherID INT PRIMARY KEY,
first_name VARCHAR(50),
last_name VARCHAR(50),
password VARCHAR(50),
email VARCHAR(100)
);
INSERT INTO students (pantherID, first_name, last_name, password, email)
VALUES (6222222, 'Mike', 'OxSmall', 'trashpassword', 'email@gmail.com'),
(4321234, 'Walsbe', 'Talcinto', 'forgotthis1', 'walsbetalcintome@gmail.com');

CREATE TABLE teachers (
facultyID INT PRIMARY KEY,
first_name VARCHAR(50),
last_name VARCHAR(50),
password VARCHAR(50),
email VARCHAR(100)
);
INSERT INTO teachers (facultyID, first_name, last_name, password, email)
VALUES (1234567, 'Sumting', 'Wong', 'betterpassword', 'wherearetheother2groupmembers@gmail.com'),
(0212239, 'Tempur', 'Ary', 'whatwasit2', '426amstillcooking@fiu.edu');


CREATE TABLE classes (
className VARCHAR(50),
classCode INT PRIMARY KEY
);
INSERT INTO classes (className, classCode)
VALUES ('Application Building', 101),
('Software Engineering', 102);

CREATE TABLE teaches (
facultyID INT,
classCode INT,
    PRIMARY KEY (facultyID, classCode),
    FOREIGN KEY (facultyID) REFERENCES teachers(facultyID),
    FOREIGN KEY (classCode) REFERENCES classes(classCode)
);
INSERT INTO teaches (facultyID, classCode)
VALUES (1234567, 101),
(0212239, 102);

CREATE TABLE assignments(
assignmentID INT,
classCode INT,
assignmentName VARCHAR(50),
    PRIMARY KEY (assignmentID, classCode),
    FOREIGN KEY (classCode) REFERENCES classes(classCode)
);
INSERT INTO assignments(assignmentID, classCode, assignmentName)
VALUES (1, 101 , 'Test Build Part 1'), (2, 101 , 'Test Build Part 2'),
(1, 102, 'Types of Testing'), (2, 102, 'Types of Testing Part 2');

CREATE TABLE gradebook (
facultyID INT,
classCode INT,
pantherID INT,
assignmentID INT,
grade DECIMAL(5,2),
    PRIMARY KEY (facultyID, classCode, pantherID, assignmentID),
    FOREIGN KEY (facultyID) REFERENCES teachers(facultyID),
    FOREIGN KEY (pantherID) REFERENCES students(pantherID),
    FOREIGN KEY (assignmentID, classCode) REFERENCES assignments(assignmentID, classCode)
);
INSERT INTO gradebook (facultyID, classCode, pantherID, assignmentID, grade)
VALUES (1234567, 101, 6222222, 1, 82.55), (1234567, 101, 4321234, 1, 76.20),
(1234567, 101, 6222222, 2, 75.30), (1234567, 101, 4321234, 2, 97.80),
(0212239, 102, 4321234, 1, 92.10), (0212239, 102, 6222222, 1, 82.55),
(0212239, 102, 4321234, 2, 76.55), (0212239, 102, 6222222, 2, 32.66);






CREATE TABLE IF NOT EXISTS students (
pantherID BIGINT PRIMARY KEY,
first_name VARCHAR(50),
last_name VARCHAR(50),
password VARCHAR(50),
email VARCHAR(100)
);

INSERT INTO students (pantherID, first_name, last_name, password, email)
VALUES (6222222, 'Mike', 'OxSmall', 'trashpassword', 'email@gmail.com');

CREATE DATABASE allUsers;

CREATE TABLE User (
    id              INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email           VARCHAR(255) NOT NULL,
    create_date     DATETIME NOT NULL,
    pw              VARCHAR(255) NOT NULL,
    gender          CHAR(1) NOT NULL,
    preference      CHAR(1) NOT NULL,
    last_name       VARCHAR(255),
    first_name      VARCHAR(255),
    street          VARCHAR(255),
    city            VARCHAR(255),
    usstate         CHAR(2),
    zip             CHAR(10),
    phone           VARCHAR(25),
    phone_type      VARCHAR(255)
);


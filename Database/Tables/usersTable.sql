USE [E-Commerce]


CREATE TABLE USERDB (
    id VARCHAR (100) NOT NULL PRIMARY KEY,
    username VARCHAR(200),
    email VARCHAR(50) UNIQUE,
	role VARCHAR(10) NOT NULL,
    password VARCHAR(200)
);

select * from USERDB


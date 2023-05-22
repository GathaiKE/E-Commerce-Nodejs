USE [E-Commerce]


CREATE TABLE users (
    user_id VARCHAR (100) NOT NULL PRIMARY KEY,
    username VARCHAR(200),
    email VARCHAR(50) UNIQUE,
	email_sent int,
	role VARCHAR(10) not null,
    password VARCHAR(200)
);

select * from users

drop table USERDB



CREATE TABLE PRODUCTS (
     id VARCHAR(100) NOT NULL PRIMARY KEY,
     name VARCHAR(100),
     description VARCHAR(1000),
	 images VARCHAR(1000),
     price DECIMAL(10, 2)
);

select * from PRODUCTS
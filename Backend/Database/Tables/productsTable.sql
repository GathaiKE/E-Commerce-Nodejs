

CREATE TABLE PRODUCTS (
     product_id VARCHAR(100) NOT NULL PRIMARY KEY,
     product_name VARCHAR(100),
     descriptions VARCHAR(1000),
	images VARCHAR(1000),
     product_price DECIMAL(10, 2)
);

select * from PRODUCTS



drop table PRODUCTS

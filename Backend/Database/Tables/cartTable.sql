USE [E-Commerce]

CREATE TABLE cart(
	item_id VARCHAR(100) PRIMARY KEY,
	cart_id VARCHAR(100)  NOT NULL,
	user_id VARCHAR (100) NOT NULL,
	product_id VARCHAR(100) NOT NULL,
	product_count INT NOT NULL,
	product_price DECIMAL(10,2),
	total_price DECIMAL(10,2)
)


drop table cart
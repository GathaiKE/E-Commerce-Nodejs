USE [E-Commerce]

CREATE TABLE cart(
	item_id INT IDENTITY(1,1) NOT NULL,
	user_id VARCHAR(200) NOT NULL,
	product_id VARCHAR(200) NOT NULL,
	product_name VARCHAR(200) NOT NULL,
	product_count INT NOT NULL,
	product_price DECIMAL(10,2),
	total_price DECIMAL(10,2)
)


drop table cart
use [E-Commerce]

CREATE TABLE orders(
	order_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	cart_id INT NOT NULL,
	user_id VARCHAR(200) NOT NULL,
	order_status INT NOT NULL
)
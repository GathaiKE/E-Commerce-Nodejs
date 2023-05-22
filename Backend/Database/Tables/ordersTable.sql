use [E-Commerce]
go
CREATE TABLE orders(
	order_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	cart_id VARCHAR(100) NOT NULL,
	user_id VARCHAR(100) NOT NULL,
	order_status VARCHAR(20) NOT NULL
)

drop table orders
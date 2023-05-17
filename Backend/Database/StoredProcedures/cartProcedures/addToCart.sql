USE [E-Commerce]

CREATE OR ALTER PROCEDURE addToCart(
    @item_id INT,
	@cart_id INT,
	@user_id VARCHAR(200),
	@product_id VARCHAR(200),
	@product_name VARCHAR(200),
	@product_count INT,
	@product_price DECIMAL(10,2),
	@total_price DECIMAL(10,2)
)
AS
BEGIN
INSERT INTO cart(
    item_id,
	cart_id,
	user_id,
	product_id,
	product_name,
	product_count,
	product_price,
	total_price
)
VALUES(
    @item_id,
	@cart_id,
	@user_id,
	@product_id,
	@product_name,
	@product_count,
	@product_price,
	@total_price
)
END
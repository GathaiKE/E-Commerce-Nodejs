USE [E-Commerce]
GO
CREATE OR ALTER PROCEDURE addToCart(
	@item_id VARCHAR(100),
	@cart_id VARCHAR(100),
	@user_id VARCHAR(100),
	@product_id VARCHAR(100),
	@product_count int,
	@product_price DECIMAL(10,2),
	@total_price DECIMAL(10,2)
)
AS
BEGIN

	INSERT INTO cart ( item_id,cart_id, user_id,  product_id, product_count, product_price, total_price)
	values (@item_id,@cart_id, @user_id, @product_id, @product_count, @product_price, @total_price)
END
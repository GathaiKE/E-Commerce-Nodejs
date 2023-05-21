use [E-Commerce]
go
CREATE OR ALTER PROCEDURE reduceProduct(
	@user_id VARCHAR(100),
	@product_id VARCHAR(100),
	@product_count int,
	@total_price DECIMAL(10,2)
)
AS
BEGIN

	UPDATE cart SET product_count = @product_count, total_price =@total_price
	WHERE product_id = @product_id AND user_id=@user_id
END
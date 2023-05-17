use [E-Commerce]


CREATE OR ALTER PROCEDURE removeFromCart(@product_id VARCHAR(200))
AS
BEGIN
	DELETE FROM cart WHERE @product_id=product_id
END
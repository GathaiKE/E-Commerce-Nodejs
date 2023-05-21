use [E-Commerce]
GO
CREATE OR ALTER PROCEDURE cancelOrder(@order_id INT)
AS
BEGIN
UPDATE cart
	SET order_status = 'Cancelled' WHERE order_id=@order_id
END
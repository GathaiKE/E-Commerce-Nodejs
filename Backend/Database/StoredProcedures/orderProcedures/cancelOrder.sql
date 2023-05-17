use [E-Commerce]

CREATE OR ALTER PROCEDURE deleteOrder(@order_id INT)
AS
BEGIN
	DELETE FROM orders WHERE order_id=@order_id
END
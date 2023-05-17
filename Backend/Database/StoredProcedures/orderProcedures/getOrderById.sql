
CREATE OR ALTER PROCEDURE getOrderById(@order_id INT)
AS
BEGIN
	SELECT * FROM orders WHERE order_id=@order_id
END







USE [E-Commerce]
go
CREATE OR ALTER PROCEDURE updateOrder(
	@order_id VARCHAR (100),
    @user_id VARCHAR(100),
	@order_status VARCHAR(20)
)
AS

BEGIN
    UPDATE orders SET order_status=@order_status
    WHERE order_id=@order_id
END
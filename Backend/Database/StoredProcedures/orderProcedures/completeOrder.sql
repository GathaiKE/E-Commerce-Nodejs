USE [E-Commerce]
go
CREATE OR ALTER PROCEDURE completeOrder(
	@order_id VARCHAR (100),
    @user_id VARCHAR(100),
	@order_status VARCHAR(20)
)
AS

BEGIN
    UPDATE orders SET order_status='Complete'
    WHERE user_id = @user_id AND order_id=@order_id
END
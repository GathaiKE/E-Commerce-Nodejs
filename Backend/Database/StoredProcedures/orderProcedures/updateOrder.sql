USE [E-Commerce]




 CREATE OR ALTER PROCEDURE updateOrder(
	@order_id VARCHAR (100),
    @cart_id VARCHAR(100),
    @user_id VARCHAR(100),
	@order_status VARCHAR(20),
    @price DECIMAL(10, 2)
 )
 AS

 BEGIN
  UPDATE orders SET cart_id=@cart_id, user_id=@user_id, order_status=@order_status
  WHERE order_id=@order_id
 END
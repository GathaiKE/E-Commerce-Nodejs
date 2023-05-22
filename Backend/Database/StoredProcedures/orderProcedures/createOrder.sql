use [E-Commerce]
go
CREATE OR ALTER PROCEDURE createOrder(
@cart_id VARCHAR(100),
@user_id VARCHAR(100),
@order_status VARCHAR(20)
)
as
begin
	insert into orders ( cart_id,user_id,order_status)
	values ( @cart_id, @user_id,@order_status)
end
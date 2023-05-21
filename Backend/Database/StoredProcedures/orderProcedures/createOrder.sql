use [E-Commerce]

select * from orders
go
CREATE OR ALTER PROCEDURE createOrder(
@cart_id int,
@user_id varchar(100),
@order_status int
)
as
begin
	insert into orders ( cart_id,user_id,order_status)
	values ( @cart_id, @user_id,@order_status)
end

exec createOrder 5,'15bbe9a4-7484-4b2a-9e68-043f7da5a35f',0
exec createOrder 1,'0c315c24-a8dc-4f56-9b41-ce22671619c5',0
exec createOrder 2,'15bbe9a4-7484-4b2a-9e68-043f7da5a35f',0
exec createOrder 3,'25f25654-5f55-4fa4-855e-c9df91e5c265',0
exec createOrder 4,'15bbe9a4-7484-4b2a-9e68-043f7da5a35f',0
exec createOrder 5,'2c2b8627-9433-4b99-9864-446ad86432ff',0

select * from products
use [E-Commerce]

select * from orders

CREATE OR ALTER PROCEDURE createOrder(@order_id int,@cart_id int, @user_id varchar(200), @order_status varchar(20))
as
begin
insert into orders (order_id, cart_id,user_id,order_status)
values (@order_id, @cart_id, @user_id,@order_status)
end
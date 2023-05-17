use [E-Commerce]


create or alter procedure checkCart(@user_id varchar(200),@product_id int)
as
begin
SELECT * FROM cart WHERE user_id = @user_id AND product_id = @product_id
end
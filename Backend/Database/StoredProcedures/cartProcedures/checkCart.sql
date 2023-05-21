use [E-Commerce]

GO
create or alter procedure checkCart(@user_id VARCHAR(100),@product_id VARCHAR(100))
as
begin
SELECT * FROM cart WHERE user_id = @user_id AND product_id = @product_id
end
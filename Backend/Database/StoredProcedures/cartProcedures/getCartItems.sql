use [E-Commerce]

CREATE OR ALTER PROCEDURE getCartItems(@user_id VARCHAR(200))
AS
BEGIN
	SELECT * FROM cart WHERE @user_id=user_id
END
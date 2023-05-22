CREATE OR ALTER PROCEDURE clearCart(
  @user_id VARCHAR (100)
  )
AS 
BEGIN
    DELETE FROM cart WHERE user_id=@user_id
END
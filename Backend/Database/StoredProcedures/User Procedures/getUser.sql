CREATE OR ALTER PROCEDURE getUser(
   @user_id VARCHAR (100)
)
AS 
BEGIN
SELECT * FROM users WHERE user_id=@user_id
END

CREATE OR ALTER PROCEDURE updateUser(
    @user_id VARCHAR (100),
    @username VARCHAR(200),
    @email VARCHAR(50)
)
AS
BEGIN

UPDATE USERDB SET username= @username, email= @email
WHERE user_id= @user_id 

END
CREATE OR ALTER PROCEDURE insertUser(
	@user_id VARCHAR (100),
    @username VARCHAR(200),
    @email VARCHAR(50),
    @role VARCHAR(10),
    @password VARCHAR(200)
)
AS
BEGIN
INSERT INTO USERDB(user_id,username,email,role,password)
VALUES(@user_id,@username,@email,@role,@password)
END


select * from dbo.userdb























 



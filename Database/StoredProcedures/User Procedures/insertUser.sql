CREATE OR ALTER PROCEDURE insertUser(
	@id VARCHAR (100),
    @username VARCHAR(200),
    @email VARCHAR(50),
    @role VARCHAR(10),
    @password VARCHAR(200)
)
AS
BEGIN
INSERT INTO USERDB(id,username,email,role,password)
VALUES(@id,@username,@email,@password)
END


select * from dbo.userdb























 



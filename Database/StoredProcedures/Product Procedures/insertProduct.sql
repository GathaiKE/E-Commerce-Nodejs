CREATE OR ALTER PROCEDURE insertProduct(
     @id VARCHAR (100),
     @name VARCHAR(100),
     @description VARCHAR(1000),
	 @images VARCHAR(1000),
     @price DECIMAL(10, 2)
)
AS
BEGIN
INSERT INTO PRODUCTS(
     id,
     name,
     description,
	 images,
     price
)
VALUES(
    @id,
     @name,
     @description,
	 @images,
     @price
)
END
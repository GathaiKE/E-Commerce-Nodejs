 CREATE OR ALTER PROCEDURE updateProduct(
	@id VARCHAR (100),
     @name VARCHAR(100),
     @description VARCHAR(1000),
	 @images VARCHAR(1000),
     @price DECIMAL(10, 2)
 )
 AS

 BEGIN
  UPDATE PRODUCTS SET name=@name, description=@description, images=@images, price=@price
  WHERE id=@id
 END
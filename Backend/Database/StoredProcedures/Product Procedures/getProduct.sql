CREATE OR ALTER PROCEDURE getProduct(
	@product_id VARCHAR (100)     
)
AS 
BEGIN
  SELECT * FROM PRODUCTS WHERE product_id=@product_id
END
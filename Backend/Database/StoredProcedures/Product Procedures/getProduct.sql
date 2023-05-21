CREATE OR ALTER PROCEDURE getProduct(
	@product_id VARCHAR (100)     
)
AS 
BEGIN
  SELECT * FROM PRODUCTS WHERE product_id = @product_id
END

exec getProduct '0c315c24-a8dc-4f56-9b41-ce22671619c5'
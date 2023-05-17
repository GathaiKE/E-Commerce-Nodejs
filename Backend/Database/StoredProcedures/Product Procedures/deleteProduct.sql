CREATE OR ALTER PROCEDURE deleteProduct(
	@product_id VARCHAR (100)     
)
AS 
BEGIN
    DELETE FROM PRODUCTS WHERE product_id=@product_id
END
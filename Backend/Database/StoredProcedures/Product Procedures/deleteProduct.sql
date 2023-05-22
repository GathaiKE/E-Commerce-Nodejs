CREATE OR ALTER PROCEDURE deleteProduct(
	@product_id VARCHAR (100)     
)
AS 
BEGIN
    DELETE FROM PRODUCTS WHERE product_id=@product_id
END

exec deleteProduct '6e856783-3469-475a-9eaa-1b54e06c6834'
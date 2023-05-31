use [E-Commerce]
go
CREATE OR ALTER PROCEDURE updateProduct(
	@product_id VARCHAR (100),
    @product_name VARCHAR(100),
    @descriptions VARCHAR(1000),
    @category VARCHAR(100),
	@images VARCHAR(1000),
    @product_price DECIMAL(10, 2)
)
AS

BEGIN
    UPDATE PRODUCTS SET product_name=@product_name, descriptions=@descriptions,category=@category, images=@images, product_price=@product_price
    WHERE product_id=@product_id
END
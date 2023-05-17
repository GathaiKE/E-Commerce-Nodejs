product_ CREATE OR ALTER PROCEDURE updateProduct(
	@product_id VARCHAR (100),
    @product_name VARCHAR(100),
    @description VARCHAR(1000),
	@images VARCHAR(1000),
    @product_price DECIMAL(10, 2)
)
AS

BEGIN
    UPDATE PRODUCTS SET product_name=@product_name, description=@description, images=@images, product_price=@product_price
    WHERE product_id=@product_id
END
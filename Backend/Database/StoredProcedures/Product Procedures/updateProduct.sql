CREATE OR ALTER PROCEDURE updateProduct(
	@product_id VARCHAR (100),
    @product_name VARCHAR(100),
    @descriptions VARCHAR(1000),
	@images VARCHAR(1000),
    @product_price DECIMAL(10, 2)
)
AS

BEGIN
    UPDATE PRODUCTS SET product_name=@product_name, descriptions=@descriptions, images=@images, product_price=@product_price
    WHERE product_id=@product_id
END

exec updateProduct '0c315c24-a8dc-4f56-9b41-ce22671619c5','Lamborghini','Gallardo','http://lamborgini.com','20000'
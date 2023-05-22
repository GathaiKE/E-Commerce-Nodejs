use [E-Commerce]

CREATE OR ALTER PROCEDURE insertProduct(
     @product_id VARCHAR (100),
     @product_name VARCHAR(100),
     @descriptions VARCHAR(1000),
	 @images VARCHAR(1000),
     @product_price DECIMAL(10, 2)
)
AS
BEGIN
INSERT INTO PRODUCTS(
     product_id,
     product_name,
     descriptions,
	 images,
     product_price
)
VALUES(
    @product_id,
     @product_name,
     @descriptions,
	 @images,
     @product_price
)
END

exec insertProduct 1,'BMW','SUV','http://hegegyyef.com','9000'



use [E-Commerce]
go
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
exec insertProduct @product_id ='11',
     @product_name='mandazi'
	 ,
     @descriptions='mandaazi moto',
	 @images='link',
     @product_price=122
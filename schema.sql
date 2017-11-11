DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  prod_name VARCHAR(45) NOT NULL,
  dept_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_num INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mid-century Modern Sideboard", "Furniture", 1701.77, 25),
  ("Cat Sleeping Bag", "Pet Supplies", 16.99, 140),
  ("Google Cardboard", "Gadgets", 6.00, 3000),
  ("Lobster Claw Oven Mitt", "Kitchen & Dining", 6.69, 99),
  ("Platypus Tea Strainer", "Kitchen & Dining", 12.00, 666);
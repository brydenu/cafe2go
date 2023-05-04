-- Create database
CREATE DATABASE blfs_cafe;

-- Connect to database
\c blfs_cafe;

-- Create table for users
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  admin BOOLEAN NOT NULL DEFAULT false
);

-- Create table for ingredients
CREATE TABLE ingredients (
  ingredient_id SERIAL PRIMARY KEY,
  ingredient_name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true
);

-- Create table for menu
CREATE TABLE menu (
  drink_id SERIAL PRIMARY KEY,
  drink_name VARCHAR(100) NOT NULL,
  description TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true
);

-- Create table for orders
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  drink_id INTEGER NOT NULL,
  drink_type VARCHAR(50),
  milk_id INTEGER,
  number_of_shots INTEGER NOT NULL DEFAULT 1,
  hot_iced VARCHAR(10) NOT NULL,
  tea_type INTEGER,
  tea_amount VARCHAR(50),
  ice_amount VARCHAR(50),
  syrup1 INTEGER,
  syrup1_quantity VARCHAR(50),
  syrup2 INTEGER,
  syrup2_quantity VARCHAR(50),
  syrup3 INTEGER,
  syrup3_quantity VARCHAR(50),
  sauce1 INTEGER,
  sauce1_quantity VARCHAR(50),
  sauce2 INTEGER,
  sauce2_quantity VARCHAR(50),
  topping1 INTEGER,
  topping1_quantity VARCHAR(50),
  topping2 INTEGER,
  topping2_quantity VARCHAR(50),
  packet_sweetener1 INTEGER,
  packet_sweetener1_quantity VARCHAR(50),
  packet_sweetener2 INTEGER,
  packet_sweetener2_quantity VARCHAR(50),
  add_milk_id INTEGER,
  add_milk_amount VARCHAR(10),
  custom_temp VARCHAR(50),
  ordered_date TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (drink_id) REFERENCES menu (drink_id),
  FOREIGN KEY (milk_id) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (tea_type) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (syrup1) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (syrup2) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (syrup3) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (sauce1) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (sauce2) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (topping1) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (topping2) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (packet_sweetener1) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (packet_sweetener2) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (add_milk_id) REFERENCES ingredients (ingredient_id)
);

-- Create table for favorites
CREATE TABLE favorites (
  favorite_id SERIAL PRIMARY KEY,
  drink_id INTEGER NOT NULL,
  drink_type VARCHAR(50),
  milk_id INTEGER,
  number_of_shots INTEGER NOT NULL DEFAULT 1,
  hot_iced VARCHAR(10) NOT NULL,
  tea_type INTEGER,
  tea_amount VARCHAR(50),
  ice_amount VARCHAR(50),
  syrup1 INTEGER,
  syrup1_quantity VARCHAR(50),
  syrup2 INTEGER,
  syrup2_quantity VARCHAR(50),
  syrup3 INTEGER,
  syrup3_quantity VARCHAR(50),
  sauce1 INTEGER,
  sauce1_quantity VARCHAR(50),
  sauce2 INTEGER,
  sauce2_quantity VARCHAR(50),
  topping1 INTEGER,
  topping1_quantity VARCHAR(50),
  topping2 INTEGER,
  topping2_quantity VARCHAR(50),
  packet_sweetener1 INTEGER,
  packet_sweetener1_quantity VARCHAR(50),
  packet_sweetener2 INTEGER,
  packet_sweetener2_quantity VARCHAR(50),
  add_milk_id INTEGER,
  add_milk_amount VARCHAR(10),
  custom_temp VARCHAR(50),
  FOREIGN KEY (drink_id) REFERENCES menu (drink_id),
  FOREIGN KEY (milk_id) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (tea_type) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (syrup1) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (syrup2) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (syrup3) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (sauce1) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (sauce2) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (topping1) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (topping2) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (packet_sweetener1) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (packet_sweetener2) REFERENCES ingredients (ingredient_id),
  FOREIGN KEY (add_milk_id) REFERENCES ingredients (ingredient_id)
);

-- Create many-to-many table for users and favorites
CREATE TABLE user_favorites (
  user_id INTEGER NOT NULL,
  favorite_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, favorite_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (favorite_id) REFERENCES favorites (favorite_id)
);

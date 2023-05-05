-- Drop the database if it already exists
DROP DATABASE IF EXISTS blfs_cafe;

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
  drink_id INT NOT NULL REFERENCES menu(drink_id),
  milk_id INT NOT NULL REFERENCES ingredients(ingredient_id),
  num_shots INT NOT NULL,
  hot_iced VARCHAR(50) NOT NULL,
  syrup1_id INT REFERENCES ingredients(ingredient_id),
  syrup1_pumps VARCHAR(50),
  syrup2_id INT REFERENCES ingredients(ingredient_id),
  syrup2_pumps VARCHAR(50),
  syrup3_id INT REFERENCES ingredients(ingredient_id),
  syrup3_pumps VARCHAR(50),
  topping1_id INT REFERENCES ingredients(ingredient_id),
  topping1_quantity VARCHAR(50),
  topping2_id INT REFERENCES ingredients(ingredient_id),
  topping2_quantity VARCHAR(50),
  topping3_id INT REFERENCES ingredients(ingredient_id),
  topping3_quantity VARCHAR(50),
  topping4_id INT REFERENCES ingredients(ingredient_id),
  topping4_quantity VARCHAR(50),
  add_milk_id INT REFERENCES ingredients(ingredient_id),
  add_milk_amount VARCHAR(50),
  custom_temp VARCHAR(50) NOT NULL,
  tea_type_id INT REFERENCES ingredients(ingredient_id),
  tea_amount VARCHAR(50),
  ice_amount VARCHAR(50),
  packet_sweetener1_id INT REFERENCES ingredients(ingredient_id),
  packet_sweetener1_quantity VARCHAR(50),
  packet_sweetener2_id INT REFERENCES ingredients(ingredient_id),
  packet_sweetener2_quantity VARCHAR(50),
  in_progress BOOLEAN NOT NULL DEFAULT true,
  ordered_date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create table for favorites
CREATE TABLE favorites (
  favorite_id SERIAL PRIMARY KEY,
  drink_id INT NOT NULL REFERENCES menu(drink_id),
  milk_id INT NOT NULL REFERENCES ingredients(ingredient_id),
  num_shots INT NOT NULL,
  hot_iced VARCHAR(50) NOT NULL,
  syrup1_id INT REFERENCES ingredients(ingredient_id),
  syrup1_pumps VARCHAR(50),
  syrup2_id INT REFERENCES ingredients(ingredient_id),
  syrup2_pumps VARCHAR(50),
  syrup3_id INT REFERENCES ingredients(ingredient_id),
  syrup3_pumps VARCHAR(50),
  topping1_id INT REFERENCES ingredients(ingredient_id),
  topping1_quantity VARCHAR(50),
  topping2_id INT REFERENCES ingredients(ingredient_id),
  topping2_quantity VARCHAR(50),
  topping3_id INT REFERENCES ingredients(ingredient_id),
  topping3_quantity VARCHAR(50),
  topping4_id INT REFERENCES ingredients(ingredient_id),
  topping4_quantity VARCHAR(50),
  add_milk_id INT REFERENCES ingredients(ingredient_id),
  add_milk_amount VARCHAR(50),
  custom_temp VARCHAR(50) NOT NULL,
  tea_type_id INT REFERENCES ingredients(ingredient_id),
  tea_amount VARCHAR(50),
  ice_amount VARCHAR(50),
  packet_sweetener1_id INT REFERENCES ingredients(ingredient_id),
  packet_sweetener1_quantity VARCHAR(50),
  packet_sweetener2_id INT REFERENCES ingredients(ingredient_id),
  packet_sweetener2_quantity VARCHAR(50),
  in_progress BOOLEAN NOT NULL DEFAULT true
);

-- Create many-to-many table between users and favorites
CREATE TABLE user_favorites (
  user_id INT NOT NULL REFERENCES users(user_id),
  favorite_id INT NOT NULL REFERENCES favorites(favorite_id),
  PRIMARY KEY (user_id, favorite_id)
);


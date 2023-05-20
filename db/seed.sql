-- Add milk ingredients
INSERT INTO ingredients (ingredient_name, type) VALUES 
  ('Whole', 'milk'),
  ('Nonfat', 'milk'),
  ('2%', 'milk'),
  ('Half and Half (Breve)', 'milk'),
  ('Oat', 'milk'),
  ('Almond', 'milk'),
  ('Macadamia', 'milk');

-- Add syrup ingredients
INSERT INTO ingredients (ingredient_name, type) VALUES 
  ('Vanilla', 'syrup'),
  ('Caramel', 'syrup'),
  ('Hazelnut', 'syrup'),
  ('Mocha', 'syrup'),
  ('White Mocha', 'syrup'),
  ('English Toffee', 'syrup'),
  ('Brown Sugar Cinnamon', 'syrup'),
  ('Lavender', 'syrup'),
  ('Pistachio', 'syrup'),
  ('Peppermint', 'syrup'),
  ('Pumpkin Spice', 'syrup'),
  ('Cardamom', 'syrup'),
  ('Cane Sugar', 'syrup'),
  ('Coconut', 'syrup'),
  ('Blackberry', 'syrup'),
  ('Cherry', 'syrup'),
  ('Strawberry', 'syrup'),
  ('Peach', 'syrup'),
  ('Raspberry', 'syrup'),
  ('Passion Fruit', 'syrup'),
  ('Mango', 'syrup'),
  ('Sugar Free Vanilla', 'syrup'),
  ('Sugar Free Caramel', 'syrup'),
  ('Sugar Free Hazelnut', 'syrup'),
  ('Sugar Free Chocolate', 'syrup'),
  ('Sugar Free White Chocolate', 'syrup'),
  ('Sugar Free Peppermint', 'syrup'),
  ('Sugar Free Cinnamon Dolce', 'syrup');

-- Add topping ingredients
INSERT INTO ingredients (ingredient_name, type) VALUES 
  ('Caramel Drizzle', 'topping'),
  ('Chocolate Drizzle', 'topping'),
  ('Cinnamon', 'topping'),
  ('Nutmeg', 'topping'),
  ('Salt', 'topping');

-- Add tea ingredients
INSERT INTO ingredients (ingredient_name, type) VALUES 
  ('Matcha', 'tea'),
  ('Earl Grey', 'tea'),
  ('Decaf Earl Grey', 'tea'),
  ('Green', 'tea'),
  ('Assam (Black Tea)', 'tea'),
  ('Peach (Herbal)', 'tea'),
  ('Spiced Peach (Herbal)', 'tea'),
  ('Ginger Peach (Herbal)', 'tea'),
  ('Tazo Zen', 'tea'),
  ('Tazo Refresh Mint', 'tea'),
  ('Tazo Wild Sweet Orange', 'tea'),
  ('Bengal Spice', 'tea'),
  ('Peppermint', 'tea'),
  ('Blueberry Superfruit', 'tea');

-- Add packet sweetener ingredients
INSERT INTO ingredients (ingredient_name, type) VALUES 
  ('Sugar in the Raw', 'packet_sweetener'),
  ('White Sugar', 'packet_sweetener'),
  ('Stevia', 'packet_sweetener'),
  ('Splenda', 'packet_sweetener');

-- Create menu options
INSERT INTO menu (drink_name, description, drink_type) VALUES
('Americano', 'Espresso shots and water', 'coffee'),
('Latte', 'Espresso shots with milk', 'coffee'),
('Cappuccino', 'Similar to a latte, but the milk is steamed to have extra foam (only served hot)', 'coffee'),
('Espresso', 'Straight shots of espresso', 'coffee'),
('Mocha', 'Espresso shots and milk with mocha sauce', 'coffee'),
('White Mocha', 'Espresso shots and milk with white mocha sauce', 'coffee'),
('Cortado', 'Equal parts espresso and milk', 'coffee'),
('Caramel Macchiato', 'Vanilla and milk topped with shots of espresso and caramel drizzle', 'coffee'),
('London Fog Tea Latte', 'Earl grey tea with vanilla syrup and milk', 'tea'),
('Matcha Latte', 'Matcha tea and milk', 'tea'),
('Tea', 'Tea steeped hot or iced with whatever additions you want', 'tea'),
('Italian Soda', 'Flavored syrup and sparkling water', 'other'),
('Hot Chocolate', 'Mocha syrup and steamed milk (can also be iced)', 'other'),
('White Hot Chocolate', 'White mocha syrup and steamed milk (can also be iced)', 'other'),
('Steamer', 'Steamed milk and syrup (no espresso shots)', 'other');

-- Create customization options
INSERT INTO customizations (customization_label, customization_name, description, customization_ingredient) VALUES
('Milk', 'milk_id', 'Type of milk to add to the drink', 'milk'),
('Add milk', 'add_milk_id', 'Add a milk (or another type of milk) to the drink', 'milk'),
('Syrup', 'syrup1_id', 'Add flavor syrup to the drink', 'syrup'),
('Syrup pumps', 'syrup1_pumps', 'Number of pumps of syrup', 'number'),
('Additional syrup', 'syrup2_id', 'Add another flavor syrup to the drink', 'syrup'),
('Additional syrup pumps', 'syrup2_pumps', 'Number of pumps for additional syrup', 'number'),
('Additioal syrup 2', 'syrup3_id', 'Add another flavor syrup to the drink', 'syrup'),
('Additional syrup 2 pumps', 'syrup3_pumps', 'Number of pumps for other additional syrup', 'number'),
('Topping', 'topping1_id', 'Topping to add to the drink', 'topping'),
('Topping amount', 'topping1_quantity', 'Amount of topping to add', 'amount'),
('Additional topping', 'topping2_id', 'Additional topping to add', 'topping'),
('Additional topping amount', 'topping2_quantity', 'Amount of additional topping to add', 'amount'),
('Additional topping 2', 'topping3_id', 'Another additional topping to add', 'topping'),
('Additional topping 2 amount', 'topping3_quantity', 'Amount of additional topping to add', 'topping'),
('Packet sweetener', 'packet_sweetener1_id', 'Add packet sweetener (Splenda, Stevia, Raw Sugar)', 'packet_sweetener'),
('Packet sweetener amount', 'packet_sweetener1_quantity', 'Amount of packet sweetener to add', 'packet_amount'),
('Additional packet sweetener', 'packet_sweetener2_id', 'Add an additional type of packet sweetener', 'packet_sweetener'),
('Additional packet sweetener amount', 'packet_sweetener2_quantity', 'Amount of additional packet sweetener to add', 'packet_amount');

-- Create menu-customization relationships
INSERT INTO menu_customizations (menu_id, customization_id) VALUES
-- 1: Americano
(1, 2),
(1, 3),
(1, 4),
(1, 15),
(1, 16),
-- 2: Latte
(2, 1),
(2, 3),
(2, 4),
-- 3: Cappuccino
(3, 1),
(3, 3),
(3, 4),
-- 4: Espresso
(4, 2),
(4, 3),
(4, 4),
(4, 15),
(4, 16),
-- 5: Mocha
(5, 1),
-- 6: White Mocha
(6, 1),
-- 7: Cortado
(7, 1),
(7, 3),
(7, 4),
-- 8: Caramel Macchiato
(8, 1),
(8, 3),
(8, 4),
-- 9: London Fog Tea Latte
(9, 1),
(9, 3),
(9, 4),
-- 10: Matcha Latte
(10, 1),
(10, 3),
(10, 4),
-- 11: Tea
(11, 2),
(11, 3),
(11, 4),
-- 12: Italian Soda
(12, 3),
(12, 4),
-- 13: Hot Chocolate
(13, 1),
(13, 3),
(13, 4),
-- 14: White Hot Chocolate
(14, 1),
(14, 3),
(14, 4),
-- 15: Steamer
(15, 1),
(15, 3),
(15, 4);
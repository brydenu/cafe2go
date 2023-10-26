-- Add 2 base users
INSERT INTO users (first_name, last_name, email, password, admin) VALUES
  ('Guest', '', '', 'guestPassword123',false),
  ('Bryden', 'Uyehara', 'brydenu@gmail.com', '$2b$10$ebJy8A0mcsP9z.fBB6ThKOPlP7n26Ojfw5M4vLrxSiGKhIb4bsfOC',true);

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
('Cortado', 'Equal parts espresso and milk', 'coffee'),
('Caramel Macchiato', 'Vanilla and milk topped with shots of espresso and caramel drizzle', 'coffee'),
('London Fog Tea Latte', 'Earl grey tea with vanilla syrup and milk', 'tea'),
('Matcha Latte', 'Matcha tea and milk', 'tea'),
('Tea', 'Tea steeped hot or iced with whatever additions you want', 'tea'),
('Italian Soda', 'Flavored syrup and sparkling water', 'other'),
('Hot Chocolate', 'Mocha syrup and steamed milk (can also be iced)', 'other'),
('White Hot Chocolate', 'White mocha syrup and steamed milk (can also be iced)', 'other'),
('Steamer', 'Steamed milk and syrup (no espresso shots)', 'other'),
('Chai Latte', 'Chai with milk', 'tea');

-- Create customization options
INSERT INTO customizations (customization_label, customization_name, description, customization_ingredient) VALUES
('Milk', 'milk_id', 'Type of milk to add to the drink', 'milk'),
('Add milk', 'add_milk_id', 'Add a milk (or another type of milk) to the drink', 'milk'),
('Syrup', 'syrup1_id', 'Add flavor syrup to the drink', 'syrup'),
('Additional syrup', 'syrup2_id', 'Add another flavor syrup to the drink', 'syrup'),
('Additional syrup 2', 'syrup3_id', 'Add another flavor syrup to the drink', 'syrup'),
('Topping', 'topping1_id', 'Topping to add to the drink', 'topping'),
('Topping amount', 'topping1_quantity', 'Amount of topping to add', 'amount'),
('Additional topping', 'topping2_id', 'Additional topping to add', 'topping'),
('Additional topping 2', 'topping3_id', 'Another additional topping to add', 'topping'),
('Packet sweetener', 'packet_sweetener1_id', 'Add packet sweetener (Splenda, Stevia, Raw Sugar)', 'packet_sweetener'),
('Additional packet sweetener', 'packet_sweetener2_id', 'Add an additional type of packet sweetener', 'packet_sweetener'),
('Tea', 'tea_type', 'Type of tea to use', 'tea');
-- Create menu-customization relationships
INSERT INTO menu_customizations (menu_id, customization_id) VALUES
-- 1: Americano
(1, 2),
(1, 3),
-- 2: Latte
(2, 1),
(2, 3),
-- 3: Cappuccino
(3, 1),
(3, 3),
-- 4: Espresso
(4, 2),
(4, 3),
-- 5: Cortado
(5, 1),
(5, 3),
-- 6: Caramel Macchiato
(6, 1),
(6, 3),
-- 7: London Fog Tea Latte
(7, 1),
(7, 3),
-- 8: Matcha Latte
(8, 1),
(8, 3),
-- 9: Tea
(9, 2),
(9, 3),
(9, 12),
-- 10: Italian Soda
(10, 2),
(10, 3),
-- 11: Hot Chocolate
(11, 1),
(11, 3),
-- 12: White Hot Chocolate
(12, 1),
(12, 3),
-- 13: Steamer
(13, 1),
(13, 3),
--14: Chai Latte
(14, 1),
(14, 3);
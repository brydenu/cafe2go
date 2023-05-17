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
INSERT INTO customizations (customization_label, customization_name, description, customization_ingredient, coffee_optional, tea_optional, other_optional) VALUES
('Milk', 'milk_id', 'Type of milk to add to the drink', 'milk', true, true, true),
('Add milk', 'add_milk_id', 'Add a milk (or another type of milk) to the drink', 'milk', true, true, true),
('Syrup', 'syrup1_id', 'Add flavor syrup to the drink', 'syrup', false, false, false),
('Syrup amount', 'syrup1_pumps', 'Number of pumps of syrup', 'number', false, false, false),
('Additional syrup', 'syrup2_id', 'Add another flavor syrup to the drink', 'syrup', true, true, true),
('Additional syrup amount', 'syrup2_pumps', 'Number of pumps for additional syrup', 'number', true, true, true),
('Additioal syrup 2', 'syrup3_id', 'Add another flavor syrup to the drink', 'syrup', true, true ,true),
('Additional syrup 2 amount', 'syrup3_pumps', 'Number of pumps for other additional syrup', 'number', true, true, true),
('Topping', 'topping1_id', 'Topping to add to the drink', 'topping', false, false, false),
('Topping amount', 'topping1_quantity', 'Amount of topping to add', 'amount', false, false, false),
('Additional topping', 'topping2_id', 'Additional topping to add', 'topping', true, true, true),
('Additional topping amount', 'topping2_quantity', 'Amount of additional topping to add', 'amount', true, true, true),
('Additional topping 2', 'topping3_id', 'Another additional topping to add', 'topping', true, true, true),
('Additional topping 2 amount', 'topping3_quantity', 'Amount of additional topping to add', 'topping', true, true, true),
('Packet sweetener', 'packet_sweetener1_id', 'Add packet sweetener (Splenda, Stevia, Raw Sugar)', 'packet_sweetener', true, true, true),
('Packet sweetener amount', 'packet_sweetener1_quantity', 'Amount of packet sweetener to add', 'packet_amount', true, true, true),
('Additional packet sweetener', 'packet_sweetener2_id', 'Add an additional type of packet sweetener', 'packet_sweetener', true, true, true),
('Additional packet sweetener amount', 'packet_sweetener2_quantity', 'Amount of additional packet sweetener to add', 'packet_amount', true, true, true);


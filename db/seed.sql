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
INSERT INTO menu (drink_name, description) VALUES
('Americano', 'Espresso shots and water'),
('Latte', 'Espresso shots with milk'),
('Cappuccino', 'Similar to a latte, but the milk is steamed to have extra foam (only served hot)'),
('Espresso', 'Straight shots of espresso'),
('Mocha', 'Espresso shots and milk with mocha sauce'),
('White Mocha', 'Espresso shots and milk with white mocha sauce'),
('Cortado', 'Equal parts espresso and milk'),
('Caramel Macchiato', 'Vanilla and milk topped with shots of espresso and caramel drizzle');
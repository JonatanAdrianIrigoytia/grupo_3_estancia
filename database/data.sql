-- BORRANDO DATOS DE LAS TABLAS --
DELETE FROM categories;
ALTER TABLE categories AUTO_INCREMENT = 1;

DELETE FROM productsServices;
ALTER TABLE productsServices AUTO_INCREMENT = 1;

DELETE FROM productsAmenities;
ALTER TABLE productsAmenities AUTO_INCREMENT = 1;

DELETE FROM products;
ALTER TABLE products AUTO_INCREMENT = 1;

DELETE FROM amenities;
ALTER TABLE amenities AUTO_INCREMENT = 1;

DELETE FROM services;
ALTER TABLE services AUTO_INCREMENT = 1;

DELETE FROM users;
ALTER TABLE users AUTO_INCREMENT = 1;

DELETE FROM roles;
ALTER TABLE roles AUTO_INCREMENT = 1;


-- INSERTANDO DATOS EN LAS TABLAS --
INSERT INTO categories (name) VALUES ("room"), ("activity");

INSERT INTO products 
(name, description, longDescription, price, categoryId, capacity, duration, discount, image, createdAt, updatedAt) 
values 
("Las Lavandas", 
 "Habitación con cama Queen de 25m2", 
 "Las Lavandas es una pequeña habitación de 25m2 con una cama matrimonial y baño privado. Posee un hall de entrada decorado en estilo clásico",
 30000,
 1,
 2,
 0,
 0,
 "/products/rooms/lavandas.jpg",
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP
 ), 
 ("Los Lirios", 
 "Habitación de 30m2 con cama King y 2 camas twin", 
 "Los Lirios es una habitación de 30m2, con mobiliario de época, hidromasaje, frigobar y servicio de café/té, es la unica habitación con balcón de la estancia",
 45000,
 1,
 4,
 0,
 5,
 "/products/rooms/lirios.jpg",
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP
 ),
 ("Las Glicinas", 
 "Habitación de 40m2 con cama King", 
 "Las Glicinas es una habitación de 40m2 con una cama King y bañera con hidromasaje, al reservar esta habitación incluye 1 hora de cabalgata por noche y bebidas con y sin alcohol libres",
 60000,
 1,
 2,
 0,
 0,
 "/products/rooms/glicinas.jpg",
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP
 ),
 ("Las Petunias", 
 "Habitación doble de 45m2", 
 "Las Petunias es una habitación doble de 45m² con cama Queen, 2 camas twin y baño privado. Decorada en estilo clásico, poseee un gran ventanal colonial con vista a los jardines internos",
 65000,
 1,
 4,
 0,
 0,
 "/products/rooms/petunias.jpg",
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP
 ),
("Los Azafranes", 
 "Habitación de 50m2 con sala de estar y Hogar", 
 "Los Azafranes es una habitación espaciosa de 50 m2, con grandes ventanales y una fantástica sala de estar con hogar. Su estilo clásico y decoración evocan al cuarto principal del dueño de una estancia.",
 70000,
 1,
 2,
 0,
 0,
"/products/rooms/azafranes.jpg",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
 ),
 ("Las Pasionarias", 
 "Habitación de 65m2 con galeria propia y jardín interno", 
 "Las Pasionarias es una habitación de 65 m2 con una cama king size enfrentada a un hogar. La habitación combina muebles en estilo clásico con modernas esculturas en metal. Posee su propia galeria y un pequeño jardin lo que la convierten en la joya de la estancia.",
 85000,
 1,
 2,
 0,
 0,
"/products/rooms/pasionarias.jpg",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
 ),
("Cabalgatas",
"Cabalgata de 1 hora",
"Cabalgue por 1 hora por nuestro prado de flores",
1250,
2,
0,
60,
0,
"/products/activities/cabalgata.jpg",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
),
("Clases de Polo",
"Clase de Polo de 1 hora",
"Esta actividad lo introduce al deporte del polo, debe saber andar a caballo, se le proveerá de todo el equipamento necesario",
2500,
2,
0,
60,
0,
"/products/activities/polo.jpg",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
),
("Masajes",
"45 minutos de masajes relajantes o descontracturantes",
"Disfruta un masaje en todo tu cuerpo que te devolverá a la vida relajado y feliz! 45 minutos de masajes realizados por un masajista profesional. Podes elegir entre un masaje descontracturante o relajante.",
3000,
2,
0,
45,
0,
"/products/activities/masaje.jpg",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
),
("Limpieza de cutis",
"Limpieza facial con ceniza volcánica",
"Un facial totalmente energizante que utiliza el poder de la roca volcánica por su rico contenido de magnesio para estimular y desintoxicar la piel . Este tratamiento combina relajación y eficacia para una piel más resistente y una tez impecable.",
3500,
2,
0,
50,
0,
"/products/activities/cutis.jpg",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
),
("Clases de Yoga",
"Clases para principiantes y avanzados",
"Esta es una excelente oportunidad para los principiantes del yoga, así como para los que desean mejorar su práctica con sólidos fundamentos de alineación en las posturas y fortaleza en la respiración. Intensifique su respiración, recurra a su fuerza interior y gane mayor conciencia de la relación entre su mente y su cuerpo.",
800,
2,
0,
60,
0,
"/products/activities/yoga.jpg",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
),
("Clases de empanadas",
"Aprenda a hacer empanadas",
"Nuestro chef le enseñará su receta tradicional para elaborar las clásicas empanadas criollas, no se requiere experiencia previa, y por su puesto lo que cocines se te servira en tu próxima comida.",
1000,
2,
0,
60,
0,
"/products/activities/empanadas.jpg",
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP
);

INSERT INTO services (name) VALUES ("Aire acondicionado"),
   ("WiFi"),
   ("Calefacción"),
   ("Frigobar"),
   ("Desayuno"),
   ("Bañera con Hidromasaje"),
   ("Pension completa"),
   ("Balcon"),
   ("1 hora de Cabalgata"),
   ("Bebidas sin alcohol"),
   ("Bebidas alcohólicas"),
   ("Hogar"),
   ("Jardín");

INSERT INTO amenities (name, icon) VALUES 
("Jardín", "garden.png"),
("Hogar", "fireplace.png"),
("Sala de estar", "sofa.png"),
("Cama King", "bed.png"),
("Bebidas sin alcohol", "soda.png"),
("Bebidas con alcohol", "cocktail.png"),
("Balcón", "balcony.png"),
("Hidromasaje", "jacuzzi.png");

INSERT INTO productsServices (productId, serviceId) 
VALUES 
(1, 1), (1, 2), (1, 3),(1, 12),
(2, 1), (2, 2), (2, 3),(2, 12), (2, 4), (2, 5), (2, 13),
(3, 1), (3, 2), (3, 3),(3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9),
(4, 1), (4, 2), (4, 3),(4, 4), (4, 5), (4, 6), (4, 7),
(5, 1), (5, 2), (5, 3),(5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10),
(6, 1), (6, 2), (6, 3),(6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10), (6, 11);

INSERT INTO productsAmenities (productId, amenityId) 
VALUES 
(1, 4),
(2, 4), (2, 7), (2, 8),
(3, 4), (3, 5), (3, 6),
(5, 4), (5, 2), (5, 3),
(6, 1), (6, 2), (6, 3);

INSERT INTO roles (name) VALUES ("user"), ("admin");

INSERT INTO users (firstName, lastName, email, password, roleId, image, createdAt, updatedAt)
VALUES 
("admin", "admin", "admin@admin.com", "$2a$10$XU9F2sBZ7qO7cksLFOu7m.g1hiGJSKt2nONlGSIMeYg6qhfgjsH3i", 2, "default-user-image.png", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- La contraseña es 123456
("User", "1", "user1@user.com", "$2a$10$1nURDFTo6bZ7Jxg16yPtY.s/7qSbE6NIKCUbaBZHRd9KXPwbBpT3y", 1, "default-user-image.png", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- La contraseña es 123456
("User", "2", "user2@user.com", "$2a$10$Yx79o3IJYWdEaaLY8Att6ey/azpH5dPlHUWu6gWt414TbalBJdKku", 1, "/users/img-user2_1656610501191.png", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- La contraseña es 123456

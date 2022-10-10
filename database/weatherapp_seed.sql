

DELETE FROM users;
DELETE FROM weathers;

ALTER SEQUENCE users_id_seq RESTART WITH 1;

INSERT INTO users (username,first_name,password,last_name,email,is_admin)
VALUES 
('m.mcfly','Marty','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q','McFly', 'hello.mcfly@okta.com','f'),
('doc','Emmet','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q','Brown','great.scott@okta.com','f'),
('jerk','Biff5','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q','Tannen','biff.tannen@okta.com','f'),
('hills.mayor','Marvin','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q','Berry','marvin4mayor@okta.com','f'),
('einstein.bark','Einstein','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q','Brown','einstein.brown@okta.com','t');

ALTER SEQUENCE weathers_id_seq RESTART WITH 1;
INSERT INTO weathers (user_id,city_name,utc_offset,latitude,longitude)
VALUES 
(1,'madrid',2,null,null),
(2,'london',1,null,null),
(3,'ottawa',-4,null,null),
(4,null,-4,56,47)





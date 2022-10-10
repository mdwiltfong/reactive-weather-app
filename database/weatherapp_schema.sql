CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   username TEXT NOT NULL,
   password TEXT NOT NULL,
   first_name TEXT NOT NULL,
   last_name TEXT NOT NULL,
   email TEXT NOT NULL,
   is_admin BOOLEAN NOT NULL DEFAULT false
   );

CREATE TABLE IF NOT EXISTS weathers(
   id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   city_name TEXT,
   utc_offset INTEGER NOT NULL,
   latitude INTEGER,
   longitude INTEGER,
   CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
   ON DELETE CASCADE
);

ALTER TABLE weathers
ADD CONSTRAINT CK_null
CHECK (city_name IS NOT NULL OR latitude IS NOT NULL AND longitude IS NOT NULL)

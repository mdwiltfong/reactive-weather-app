CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   username TEXT NOT NULL,
   password TEXT NOT NULL,
   first_name TEXT NOT NULL,
   last_name TEXT NOT NULL,
   email TEXT NOT NULL,
   is_admin BOOLEAN NOT NULL DEFAULT false
   );
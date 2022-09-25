CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   username TEXT NOT NULL,
   hashed_pw TEXT NOT NULL,
   first_name TEXT NOT NULL,
   last_name TEXT NOT NULL,
   email TEXT NOT NULL);
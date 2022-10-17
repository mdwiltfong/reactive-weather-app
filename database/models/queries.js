class WeatherQueries {
  getWeatherInstancesByUser = `  
  SELECT user_id as "userId",
        city_name as "cityName",
        utc_offset AS "utcOffset",
        latitude,
        longitude 
           FROM weathers
           where user_id=$1
           ORDER BY city_name`;

  getAWeatherInstance = `
  SELECT * FROM weathers
  WHERE id = $1 
  
  `;

  removeWeather = `
DELETE FROM weathers
WHERE id = $1
RETURNING id
`;

  insertWeather = `
INSERT INTO weathers (user_id,city_name,utc_offset,latitude,longitude)
VALUES 
($1,$2,$3,$4,$5)
RETURNING id as "weatherId", user_id as "userId",city_name as "cityName",utc_offset as "utcOffset",latitude,longitude
`;
}

class UserQueries {
  getUser = `SELECT 
                  id,
                  username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin",
                  password
           FROM users
           WHERE username = $1`;
  deleteUser = `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`;
  findAllUsers = `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY username`;
  selectUsername = `SELECT username
           FROM users
           WHERE username = $1`;
  insertUser = `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            is_admin)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`;
}

const weatherQueries = new WeatherQueries();
const userQueries = new UserQueries();

module.exports = {
  weatherQueries,
  userQueries,
};

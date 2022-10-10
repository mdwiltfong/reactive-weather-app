class WeatherQueries {
  getWeatherInstances = `SELECT city_name,
                  utc_offset AS "utcOffset",
                  city_name AS "cityName",
                  latitude,
                  longitude 
           FROM weathers
           where user_id=$1
           ORDER BY city_name`;

  removeWeather = `
DELETE FROM weathers
WHERE id = $1
RETURNING id
`;

  insertWeather = `
INSERT INTO weathers (user_id,city_name,utc_offset,latitude,longitude)
VALUES 
($1,$2,$3,$4,$5)
`;
}

class UserQueries {}

const weatherQueries = new WeatherQueries();
const userQueries = new UserQueries();

module.exports = {
  weatherQueries,
  userQueries,
};

"use strict";

const queries = require("../models/queries");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../../server/ExpressError");
const db = require("../db.js");
const Weather = require("../models/weathers.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");
process.env.NODE_ENV = "test";

beforeAll(async () => {
  await commonBeforeAll("users");
  await commonBeforeAll("weathers");
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Weather model", () => {
  // User 2 will have multiple records
  test("can retrieve all weather instances of a user", async () => {
    const weather = await Weather.getAll(2);
    expect(weather.length).toEqual(2);
    expect(weather[0]).toEqual(
      expect.objectContaining({
        utcOffset: expect.any(Number),
        cityName: expect.any(String),
        latitude: null,
        longitude: null,
      })
    );
  });
  test("can save a weather instance", async () => {
    const newWeather = {
      userId: 1,
      cityName: "madrid",
      utcOffset: -4,
      latitude: null,
      longitude: null,
    };
    const weather = await Weather.save(newWeather);
    console.debug("Weather instance", weather);
    expect(weather).toEqual(newWeather);
  });
  test("can delete a weather instance", async () => {
    await Weather.remove(1);
    const result = await db.query(queries.weatherQueries.getAWeatherInstance, [
      1,
    ]);
    expect(result.rows.length).toEqual(0);
  });
});

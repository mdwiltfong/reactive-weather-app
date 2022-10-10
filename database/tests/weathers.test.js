"use strict";

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
    const weather = await Weather.getAll("2");
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
});

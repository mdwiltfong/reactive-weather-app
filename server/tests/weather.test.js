const request = require("supertest");
const app = require("../app");

describe("CRUD Operations", () => {
  test("Server is able to return current weather when provided a city", async () => {
    const { body } = await request(app).get("/weather?q=ottawa");
    expect(body.data).toStrictEqual(
      expect.objectContaining({
        coord: expect.any(Object),
        weather: expect.any(Array),
        base: expect.any(String),
        main: expect.any(Object),
        visibility: expect.any(Number),
        wind: expect.any(Object),
        clouds: expect.any(Object),
        dt: expect.any(Number),
        sys: expect.any(Object),
        timezone: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        cod: expect.any(Number),
      })
    );
  });
  test("Server is able to return current weather when provided coordinates", async () => {
    const { body } = await request(app).get("/weather?lat=56&lon=78");
    expect(body.data).toStrictEqual(
      expect.objectContaining({
        coord: expect.any(Object),
        weather: expect.any(Array),
        base: expect.any(String),
        main: expect.any(Object),
        visibility: expect.any(Number),
        wind: expect.any(Object),
        clouds: expect.any(Object),
        dt: expect.any(Number),
        sys: expect.any(Object),
        timezone: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        cod: expect.any(Number),
      })
    );
  });
  test("Server is able to return data from onecall api route", async () => {
    const { body } = await request(app).get(
      "/weather/dailyForecast?lat=56&long=78"
    );
    console.log(body);
    expect(body.data).toStrictEqual({
      lat: expect.any(Number),
      lon: expect.any(Number),
      timezone: expect.any(String),
      timezone_offset: expect.any(Number),
      current: expect.any(Object),
      daily: expect.any(Array),
    });
  });
});

describe("Database Tests", () => {
  //Only admins can retrieve this list
  test.todo("Retrieve a list of all users");
});

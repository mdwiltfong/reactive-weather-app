const request = require("supertest");
const app = require("../app");

describe("CRUD Operations", () => {
  test("Server is able to return current weather", async () => {
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
});

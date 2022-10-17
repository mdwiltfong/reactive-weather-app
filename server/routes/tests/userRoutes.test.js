const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../database/config");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  adminToken,
  u1Token,
} = require("./_testCommon");
const { token } = require("morgan");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("CRUD Operations for user routes", () => {
  test("Admin users can access an entire list of users", async () => {
    const resp = await request(app)
      .get("/users/all")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body.users).toStrictEqual(expect.any(Array));
  });
  test("Non-admin users can't access list of users", async () => {
    const resp = await request(app)
      .get("/users/all")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body.users).toBeUndefined();
  });
  test("A user can register", async () => {
    const resp = await request(app).post("/users/register").send({
      username: "u-new",
      firstName: "First-new",
      lastName: "Last-newL",
      password: "password-new",
      email: "new@email.com",
      isAdmin: false,
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      user: {
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        email: "new@email.com",
        isAdmin: false,
      },
      token: expect.any(String),
    });
  });

  test("A logged in user can save a weather instance", async () => {
    const weatherData = {
      cityName: "madrid",
      utcOffset: -4,
      latitude: null,
      longitude: null,
    };
    const resp = await request(app)
      .post("/users/weather/u1")
      .send(weatherData)
      .set("authorization", `Bearer ${u1Token}`);
    const { data } = resp.body;
    expect(data).toEqual({
      weatherId: 1,
      userId: 1,
      cityName: "madrid",
      utcOffset: -4,
      latitude: null,
      longitude: null,
    });
  });
});

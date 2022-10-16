const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ path: "../../../.env" });
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");
const { SECRET_KEY } = require("../../../database/config");
const { UnauthorizedError } = require("../../ExpressError");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Login route", () => {
  test("Registered users can login", async () => {
    const data = {
      username: "u1",
      password: "password",
    };
    const resp = await request(app).post("/login").send(data);
    const { token } = resp.body;
    expect(resp.statusCode).toBe(200);
    expect(jwt.verify(token, SECRET_KEY)).toBeTruthy();
  });
  test("Unregistered users can't login", async () => {
    try {
      const data = {
        username: "u1",
        password: "password",
      };
      const resp = await request(app).post("/login").send(data);
      const { token } = resp.body;
    } catch (error) {
      expect(token).toBeUndefined();
      expect(error instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

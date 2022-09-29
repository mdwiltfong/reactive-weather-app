const request = require("supertest");
const app = require("../../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  adminToken,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("CRUD Operations for user routes", () => {
  test.only("Admin users can access an entire list of users", async () => {
    const resp = await request(app)
      .get("/users/all")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body.users).toStrictEqual(expect.any(Array));
  });
  test.only("Non-admin users can't access list of users", async () => {
    const resp = await request(app)
      .get("/users/all")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body.users).toBeUndefined();
  });
  test.only("A user can register", async () => {
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
});

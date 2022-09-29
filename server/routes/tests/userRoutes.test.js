const request = require("supertest");
const app = require("../../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  adminToken,
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
  test.todo("Non-admin users can't access list of users");
  test.todo("A user can register");
});

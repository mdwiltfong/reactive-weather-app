// src/mocks/handlers.js
import { rest } from "msw";
import { SECRET_KEY } from "../../database/config";
import { createToken } from "../../server/helpers/token";
import MockData from "../helpers/mocks/mocks";
const BASE_URL = process.env.REACT_APP_MOCK || "http://localhost:3001";
console.log(BASE_URL);
//TODO: #21 Now that the API routes have been made, these handlers need to be updated to enable testing
export const handlers = [
  // Handles a GET /weather request. This will return the weather for madrid
  rest.get(`${BASE_URL}/weather`, (req, res, ctx) => {
    const { q, appid } = req.params;
    console.log(q, appid);
    return res(
      ctx.status(200),
      ctx.json(MockData.MockWeatherData.mockCurrentWeatherData)
    );
  }),
  // Handles a GET /forecast request. This will return the weather for madrid for 5 days.
  rest.get(`${BASE_URL}/weather/dailyForecast`, (req, res, ctx) => {
    const { lat, long } = req.params;
    console.debug("Forecast API Call", lat, long);
    return res(
      ctx.status(200),
      ctx.json(MockData.MockWeatherData.mockOneCallAPIForecast)
    );
  }),
  rest.get(`${BASE_URL}/badRoute`, (req, res, ctx) => {
    console.debug("Hits bad route handler");
    return res(
      ctx.status(500),
      ctx.json({
        error: {
          message: "Internal Server Error",
        },
      })
    );
  }),
  rest.get("/users/all", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: MockData.MockUserData.users,
      })
    );
  }),
  rest.post("/users/register", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: MockData.MockUserData.users[0],
        token: createToken(MockData.MockUserData.users[0], SECRET_KEY),
      })
    );
  }),
  rest.post("/users/weather", (req, res, ctx) => {
    ctx.status(201),
      ctx.json({
        data: MockData.MockWeatherData.mockSavedWeatherInstance,
      });
  }),
  rest.post(`${BASE_URL}/login`, (req, res, ctx) => {
    ctx.status(200),
      ctx.json({
        token: createToken(MockData.MockUserData.users[0], SECRET_KEY),
      });
  }),
  rest.get(`${BASE_URL}/users/:username`, (req, res, ctx) => {
    const userName = req.params.username;
    console.debug("User from MSW handler", userName);
    const foundUser = MockData.MockUserData.users.find(
      (user) => user.username == userName
    );
    return res(ctx.status(200), ctx.json({ user: foundUser }));
  }),
];

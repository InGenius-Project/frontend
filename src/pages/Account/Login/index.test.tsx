import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import Login from ".";
import { renderWithProviders } from "utils/test";
import { waitFor, screen } from "@testing-library/react";

const baseUrl = process.env.REACT_APP_SERVER_ENDPOINT;

const server = setupServer();

describe("LoginPage test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("LoginPage should redirect to /Account/User if login() success", async () => {
    server.use(
      http.get(`${baseUrl}/api/user/login`, () => {
        return HttpResponse.json({
          Success: true,
          StatusCode: 200,
          Message: "OK",
          Data: {
            id: "738bf4bb-e70c-4581-5348-08dbf09f56ca",
            email: "test@gmail.com",
            username: "test",
            resumes: [],
          },
        });
      })
    );
  });
});

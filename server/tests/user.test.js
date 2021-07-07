const request = require("supertest");
const app = require("../app");

describe("GET /users/all unauthenticated", () => {
  test("should respond with 403 status code", async () => {
    const response = await request(app).get("/users/all");
    expect(response.statusCode).toBe(403);
  });
});

describe("POST /auth/refresh no token to refresh", () => {
  test("should respond with 401 status code", async () => {
    const response = await request(app).post("/auth/refresh");

    expect(response.statusCode).toBe(401);
  });
});

describe("POST /auth/register", () => {
  test("should respond with 201 status code", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "testuser",
        password: "12345",
        email: "test@test.pl",
      })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);
  });
});

// describe("GET /users/all authenticated", () => {
//   test("should send list of users", async () => {
//     await request(app).post("auth/register").send({
//       name: "testuser",
//       email: "test@test.pl",
//       password: "12345",
//     });
//     await request(app).post("auth/login").send({
//       name: "testuser",
//       password: "12345",
//     });
//     const response = await request(app).get("/users/all");
//     expect(response.statusCode).toBe(200);
//   });
// });

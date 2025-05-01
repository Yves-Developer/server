import { describe, beforeAll, afterAll, beforeEach, it, expect } from "vitest";
import request from "supertest";
import app from "../app";
import User from "../models/User";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "testdb" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe("User API", () => {
  it("POST /api/user should create a user", async () => {
    const res = await request(app)
      .post("/api/user") // ✅ fixed leading slash
      .send({ name: "Alice", email: "alice@tx.com" });

    expect(res.status).toBe(201); // You can check this if your route sets correct status
    expect(res.body.name).toBe("Alice");
  });

  it("GET /users should return users", async () => {
    await User.create({ name: "Bob", email: "bob@tx.com" }); // ✅ added email

    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe("Bob");
  });
});
describe("GET /api/welcome", () => {
  it("should return a welcome message", async () => {
    const response = await request(app).get("/api/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to the API" });
  });
});
describe("GET /api/health", () => {
  it("should return health status", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "OK" });
  });
});

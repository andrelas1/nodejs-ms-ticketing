import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "arst";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

declare global {
  // namespace NodeJS {
  //   export interface Global {
  //     signin(): Promise<string[]>;
  //   }
  // }

  var signup: () => Promise<string[]>;
}

global.signup = async () => {
  const email = "test@test.com";
  const password = "password";

  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  return authResponse.get("Set-Cookie");
};

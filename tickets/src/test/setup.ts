import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { app } from "../app";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "arst";
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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

  var signin: () => string[];
}

global.signin = () => {
  // build a JWT payloag { id, email }
  const payload = {
    email: "test@test.com",
    id: "1esntsre12",
  };

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build the session object { jwt: jwt_val }
  const session = { jwt: token };

  // create JSON from session
  const sessionJSON = JSON.stringify(session);

  // encode json as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string that's the cookie with the encoded data
  return [`express:sess=${base64}`];
};

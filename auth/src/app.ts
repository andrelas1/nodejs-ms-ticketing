import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from "./routes";
import { errorHandler, NotFoundError } from "@as1/ticketing-common";

const app = express();
app.set("trust proxy", true); // because we use nginx as a proxy
app.use(json());
app.use(
  cookieSession({
    signed: false, // no encryption
    secure: process.env.NODE_ENV !== "test", // only https
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

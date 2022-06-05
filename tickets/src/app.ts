import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  NotFoundError,
  errorHandler,
  currentUser,
} from "@as1/ticketing-common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true); // because we use nginx as a proxy
app.use(json());
app.use(
  cookieSession({
    signed: false, // no encryption
    secure: process.env.NODE_ENV !== "test", // only https
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

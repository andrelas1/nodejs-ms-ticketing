import { Router } from "express";
// import { currentUser } from "../middlewares/current-user";
import { requireAuth, currentUser } from "@as1/ticketing-common";

const router = Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

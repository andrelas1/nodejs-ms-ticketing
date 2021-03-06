import { validateRequest, BadRequestError } from "@as1/ticketing-common";
import { Router, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("EMAIL IN USE");
      throw new BadRequestError("Email already exists.");
    }

    const user = User.build({ email, password });
    await user.save();

    // gen JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // store it in a session
    req.session = { jwt: userJwt };

    res.status(201).send(user);

    console.log("Creating a user....");
  }
);

export { router as signUpRouter };

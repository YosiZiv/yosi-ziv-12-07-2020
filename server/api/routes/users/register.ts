import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../../errors/bad-request-error";
import { validateRequest } from "../../../middlewares/validate-request";

import { User } from "../../../models/user";

const router = express.Router();

router.post(
  "/",
  [
    body("firstName")
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("first name must be between 6 - 15 char"),
    body("lastName")
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("last name must be between 6 - 15 char"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 256 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ firstName, lastName, email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as registerRouter };

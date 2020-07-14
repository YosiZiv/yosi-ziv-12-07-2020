import express, { Request, Response } from "express";
import { body } from "express-validator";

import { requireAuth } from "../../../middlewares/require-auth";
import { validateRequest } from "../../../middlewares/validate-request";
import { DatabaseConnectionError } from "../../../errors/database-connection-error";
import { Task } from "../../../models/task";
import { currentUser } from "../../../middlewares/current-user";

const router = express.Router();

router.post(
  "/",
  currentUser,
  [
    body("userName")
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("User Name Must be between 2 - 30"),
    body("email").isEmail().withMessage("email must be valid"),
    body("phone")
      .isString()
      .isLength({ min: 6, max: 15 })
      .withMessage("phone must be between 6 - 15 char"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userName, email, phone } = req.body;
    try {
      const task = Task.build({
        userId: req.currentUser!.id,
        userName,
        email,
        phone,
      });
      await task.save();
      res.status(201).send(task);
    } catch (err) {
      console.log(err);

      throw new DatabaseConnectionError();
    }
  }
);

export { router as newTaskRouter };

import express, { Request, Response } from "express";
import { body } from "express-validator";

import { DatabaseConnectionError } from "../../../errors/database-connection-error";
import { Task } from "../../../models/task";
import { NotFoundError } from "../../../errors/not-found-error";
import { currentUser } from "../../../middlewares/current-user";
import { NotAuthorizedError } from "../../../errors/not-authorized-error";
import { validateRequest } from "../../../middlewares/validate-request";

const router = express.Router();

router.put(
  "/:id",
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
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new NotFoundError();
    }
    if (
      task.userId.toString() !== req.currentUser?.id.toString() &&
      req.currentUser?.role !== "admin"
    ) {
      throw new NotAuthorizedError();
    }

    task.set({
      ...req.body,
    });
    await task.save();
    res.status(201).send(task);
  }
);

export { router as editTasksRouter };

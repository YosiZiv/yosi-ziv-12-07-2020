import express, { Request, Response } from "express";
import { requireAuth } from "../../../middlewares/require-auth";
import { DatabaseConnectionError } from "../../../errors/database-connection-error";
import { Task } from "../../../models/task";
import { NotFoundError } from "../../../errors/not-found-error";
import { currentUser } from "../../../middlewares/current-user";

const router = express.Router();

router.get("/", currentUser, async (req: Request, res: Response) => {
  try {
    let tasks;
    if (req.currentUser?.role === "admin") {
      console.log("admin catch");

      tasks = await Task.find();
    } else {
      console.log("user catch");
      tasks = await Task.find({ userId: req.currentUser?.id });
    }
    console.log(tasks);

    if (!tasks) {
      throw new NotFoundError();
    }
    res.status(200).send(tasks);
  } catch (err) {
    throw new DatabaseConnectionError();
  }
});

export { router as getTasksRouter };

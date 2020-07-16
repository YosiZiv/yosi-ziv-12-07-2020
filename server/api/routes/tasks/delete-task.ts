import express, { Request, Response } from "express";
import { Task } from "../../../models/task";
import { NotFoundError } from "../../../errors/not-found-error";
import { currentUser } from "../../../middlewares/current-user";
import { NotAuthorizedError } from "../../../errors/not-authorized-error";

const router = express.Router();
router.delete("/:id", currentUser, async (req: Request, res: Response) => {
  const { id } = req.params;

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
  const deleteTask = await Task.findByIdAndRemove(task.id);
  res.status(204).send(deleteTask);
});

export { router as deleteTasksRouter };

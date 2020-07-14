import express from "express";
import { usersRouter } from "./routes/users/index";
import { tasksRouter } from "./routes/tasks/index";
const router = express.Router();
router.use("/tasks", tasksRouter);
router.use("/users", usersRouter);
export default router;

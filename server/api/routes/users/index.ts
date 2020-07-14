import express from "express";
import { currentUserRouter } from "./current-user";
import { registerRouter } from "./register";
import { loginRouter } from "./login";
import { logoutRouter } from "./logout";

const router = express.Router();
router.use("/currentuser", currentUserRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/logout", logoutRouter);
export { router as usersRouter };

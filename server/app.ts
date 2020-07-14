import express from "express";
import cors from "cors";
import path from "path";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import router from "./api/api";
const app = express();
app.use(express.static("public/build"));
app.use(cors());
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use("/api", router);
app.get("*", (req, res, next) => {
  if (req.path === "/api") {
    next();
  }
  res.sendFile(path.join(__dirname, "public", "build", "index.html"));
});
app.use(errorHandler);

export { app };

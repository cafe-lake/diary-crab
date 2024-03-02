import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();
const PORT = 4000;

const auth_route = require("./routes/auth");
const post_route = require("./routes/post");
const user_route = require("./routes/user");
const canvas_item_route = require("./routes/canvas-item");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use("/auth", auth_route);
app.use("/posts", post_route);
app.use("/users", user_route);
app.use("/canvas-items", canvas_item_route);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

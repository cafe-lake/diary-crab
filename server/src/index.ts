import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 4000;

const auth = require("./routes/auth");
const post = require("./routes/post");

app.use(express.json());
app.use("/auth", auth);
app.use("/posts", post);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello JWT");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
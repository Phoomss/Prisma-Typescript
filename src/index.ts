import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";

const app: Express = express();

app.use(express.json())
app.use("/api", rootRouter);


app.get("/", (req: Request, res: Response) => {
  res.send("test");
});

app.listen(PORT, () => {
  console.log("server starting on port" + PORT);
});

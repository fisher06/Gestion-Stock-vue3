// "use strict";

import express from "express";
import serveIndex from "serve-index";
import api from "./api.js";

const publicDir = ".";

const app = express();
const port = 3000;

const log = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log("req: ", req.method, req.url);
  next();
};

app.use(log);

app.use("/api", api);

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//export default {};

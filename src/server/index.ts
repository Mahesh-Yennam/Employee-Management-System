import express, { Express } from "express";
import { router } from "../router";
import http, { Server } from "http";

function serverConnect() {
  let app!: Express;
  let server!: Server;

  app = express();
  server = http.createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use("/", router);

  server.listen(3000, () => {
    console.log("server running on port 3000");
  });
}

export { serverConnect };

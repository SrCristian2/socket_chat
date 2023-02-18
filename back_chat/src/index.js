import express from "express";
import { chatSocket } from "./socket/chat.socket.js";

const app = express();

app.set("port", 4000);

const server=app.listen(app.get("port"), () => {
  console.log("servidor escuchando port", app.get("port"));
});

chatSocket(server)

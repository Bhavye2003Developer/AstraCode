const cors = require("cors");
const express = require("express");
const utils = require("./utils/utils");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const app = express();
const server = createServer(app);
const io = new Server(server);

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const port = 3000;

io.on("connection", (socket) => {
  console.log(`${socket.id} id - user connected`);

  socket.on("user-command", (cmd) => {
    console.log(`id: ${cmd.id}, command: ${cmd.command}`);
    const commandOutput = utils.executeCommand(cmd.command);
    io.emit("user-command-output", {
      id: cmd.id,
      command: cmd.command,
      output: commandOutput,
    });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} id - user disconnected!`);
  });
});

app.options("/", cors());
app.post("/", cors(), (req, res) => {
  console.log("/");
  const code = req.body.code;
  const langId = Number(req.body.langId);
  if (!code) {
    res.send({ output: "No output" });
    return;
  }
  const output = utils.executeCode(code, langId);
  res.send({ output });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}...`);
});

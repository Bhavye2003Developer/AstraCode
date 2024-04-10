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

const users = [];

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
  const containerId = req.body.containerId;
  if (!containerId) return res.send({ output: "no containerId passed" });

  if (!code) return res.send({ output: "No output" });

  console.log("passed: ", containerId);
  const output = utils.executeCode(code, langId, containerId);
  return res.send({ output });
});

// app.options("/", cors());
app.get("/", cors(), (req, res) => {
  const containerId = utils.spin_container();
  if (containerId.message) {
    res.send({ message: containerId.message, err: true });
    return;
  }
  console.log(containerId);
  return res.send({ containerId, err: false });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}...`);
});

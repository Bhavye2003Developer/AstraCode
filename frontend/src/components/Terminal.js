import { useEffect, useRef, useState } from "react";
import socket from "../utils/socket";
import "../../styles/Terminal.css";

const Terminal = () => {
  const [command, setCommand] = useState("");
  const [allCommands, setAllCommands] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const divRef = useRef(null);

  const handleCommandOutput = (cmd_output_obj) => {
    if (cmd_output_obj) {
      const allCommandsCopy = [...allCommands];
      console.log(allCommandsCopy);
      allCommandsCopy.push({
        command: cmd_output_obj.command,
        output: cmd_output_obj.output,
      });
      setAllCommands(allCommandsCopy);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("connected");
    });

    return () => {
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    };
  }, []);

  useEffect(() => {
    if (allCommands.length === 0) {
      divRef.current.scrollTop = 0;
    } else {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
    socket.on("user-command-output", handleCommandOutput);
    return () => {
      socket.off("user-command-output", handleCommandOutput);
    };
  }, [socket, allCommands]);

  return (
    <div className="terminal">
      <h1>
        terminal:
        {
          <span
            style={{
              color: isConnected ? "green" : "red",
            }}
          >
            {isConnected ? " Connected" : " not connected"}
          </span>
        }
      </h1>
      {allCommands.map((u_c_o) => (
        <pre>
          <pre>
            {`user@${socket.id}$`} <span id="command">{u_c_o.command}</span>
          </pre>
          <pre> {u_c_o.output}</pre>
          <br />
        </pre>
      ))}
      <br />
      <div className="prompt-container">
        <span className="prompt">{`user@${socket.id}`}$</span>
        <input
          type="text"
          placeholder="command"
          value={command}
          onChange={(e) => {
            setCommand(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              socket.emit("user-command", {
                id: socket.id,
                command,
              });
              setCommand("");
            }
          }}
        />
      </div>
      <div ref={divRef}></div>
    </div>
  );
};

export default Terminal;

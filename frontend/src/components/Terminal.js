import { useEffect, useRef, useState } from "react";
import socket from "../utils/socket";

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
    <div className="flex flex-col bg-black text-white font-mono p-5 rounded-md h-full">
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
        <pre className="whitespace-pre-wrap m-0">
          <pre className="whitespace-pre-wrap m-0">
            {`user@${socket.id}$`}{" "}
            <span id="command" className="text-blue-500">
              {u_c_o.command}
            </span>
          </pre>
          <pre className="whitespace-pre-wrap m-0"> {u_c_o.output}</pre>
          <br />
        </pre>
      ))}
      <br />
      <div>
        <span
          // className="prompt"
          className="text-green-500 inline-block mr-1 whitespace-nowrap"
        >
          {`user@${socket.id}`}$
        </span>
        <input
          type="text"
          className="bg-transparent text-white border-none border-b border-black outline-none p-1 font-mono flex-1 focus:border-black"
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

import Editor from "@monaco-editor/react";
import { useState } from "react";
import DarkLightToggleButton from "./DarkLightToggleButton";

const CodeWriter = ({
  setUserCode,
  userCode,
  langId,
  openTerminal,
  setOpenTerminal,
}) => {
  const [style, setStyle] = useState({
    darkTheme: true,
    fontSize: 15,
  });

  const language = langId == 0 ? "python" : langId == 1 ? "cpp" : "java";
  return (
    <div className="code-writer">
      <div className="tools">
        <DarkLightToggleButton setStyle={setStyle} style={style} />
        <div className="vl"></div>
        <label className="switch">Font Size:</label>
        <input
          className="font-setter"
          value={style.fontSize}
          onChange={(e) => {
            const fontSize = e.target.value;
            setStyle({ ...style, fontSize });
          }}
        />
        <div className="vl"></div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png"
          alt="Terminal"
          className="terminal-img"
          onClick={() => setOpenTerminal(!openTerminal)}
        />
      </div>
      <div className="editor-container">
        <Editor
          width={800}
          language={language}
          theme={style.darkTheme ? "vs-dark" : "vs-light"}
          options={{
            fontSize: style.fontSize,
          }}
          value={userCode}
          onChange={(e) => {
            setUserCode(e);
          }}
        />
      </div>
    </div>
  );
};

export default CodeWriter;

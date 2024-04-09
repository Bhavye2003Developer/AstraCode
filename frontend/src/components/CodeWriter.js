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
    fontSize: 20,
  });

  const language = langId == 0 ? "python" : langId == 1 ? "cpp" : "java";
  return (
    <div className="flex-1 flex flex-col animate-slideLeft items-center">
      <div className="align-self-start border border-black w-full h-13 m-[2px] p-2 flex items-start align-middle">
        {/* tools */}
        <DarkLightToggleButton setStyle={setStyle} style={style} />
        <div className="border-l-2 border-black h-full mx-5"></div>
        <div className="flex items-center pt-4">
          <label className="relative inline-block">Font Size:</label>
          <input
            // className="font-setter"
            className="w-10 h-8 mb-1 px-1 py-2  ml-3 border-2 border-black text-black bg-white rounded-md "
            value={style.fontSize}
            onChange={(e) => {
              const fontSize = e.target.value;
              setStyle({ ...style, fontSize });
            }}
          />
        </div>
        <div className="border-l-2 border-black h-full mx-5"></div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png"
          alt="Terminal"
          className="h-[40px] cursor-pointer mt-2 hover:animate-zoomOut"
          onClick={() => setOpenTerminal(!openTerminal)}
        />
      </div>
      <div
        //  className="editor-container"
        className="flex-1"
      >
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

import { useEffect, useState } from "react";
import CodeWriter from "./CodeWriter";
import getCodeOutput from "../utils/executeCode";
import CodeOutput from "./CodeOutput";
import userLocalStorage from "../utils/useLocalStorage";
import { SUPPORTED_LANGAUGES } from "../utils/constants";
import Terminal from "./Terminal";

const Home = () => {
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState(null);
  const [openTerminal, setOpenTerminal] = useState(false);

  // 0 -> Python, 1 -> c++, 2 -> Java
  const [langId, setLangId] = useState(0);

  userLocalStorage(userCode, langId, setUserCode, setLangId);

  return (
    <div className="home">
      <div className="code-header">
        <h1 className="heading">AstraCode</h1>

        <select
          name="lang"
          id="lang"
          onChange={(e) => {
            const id = e.target.value;
            setLangId(id);
          }}
          value={langId}
        >
          {SUPPORTED_LANGAUGES.map((lang, id) => (
            <option value={id}>{lang}</option>
          ))}
        </select>

        <button
          className="run-btn"
          onClick={(e) => {
            const buttonText = e.target.innerText;
            if (buttonText == "CANCEL") window.stop();
            setOutput(null);
            const response = getCodeOutput(userCode, langId);
            response
              .then((res) => {
                setOutput(res.output);
              })
              .catch((err) => {
                setOutput("");
                window.stop();
              });
          }}
        >
          {output === null ? "CANCEL" : "RUN"}
        </button>
      </div>
      <div className="code-editor-container">
        <CodeWriter
          userCode={userCode}
          setUserCode={setUserCode}
          langId={langId}
          openTerminal={openTerminal}
          setOpenTerminal={setOpenTerminal}
        />
        <CodeOutput output={output} />
      </div>

      {openTerminal ? (
        <div className="terminal-container">
          <Terminal />
        </div>
      ) : null}
    </div>
  );
};
export default Home;

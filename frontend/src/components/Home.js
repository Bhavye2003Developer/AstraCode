import { useEffect, useState } from "react";
import CodeWriter from "./CodeWriter";
import { getCodeOutput, getContainerId } from "../utils/executeCode";
import CodeOutput from "./CodeOutput";
import userLocalStorage from "../utils/useLocalStorage";
import { SUPPORTED_LANGAUGES } from "../utils/constants";
import Terminal from "./Terminal";

const Home = () => {
  const [output, setOutput] = useState("");
  const [userCode, setUserCode] = useState(null);
  const [openTerminal, setOpenTerminal] = useState(false);
  const [containerId, setContainerId] = useState(null);

  // 0 -> Python, 1 -> c++, 2 -> Java
  const [langId, setLangId] = useState(0);

  userLocalStorage(userCode, langId, setUserCode, setLangId);

  useEffect(() => {
    getContainerId()
      .then((res) => {
        if (!res.err) setContainerId(res.containerId);
        else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log("error occured");
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between px-[15px] py-[20px] bg-dark-black text-white mb-5 w-1/2 animate-slideDown shadow-md rounded-xl mt-2">
        <h1 className="font-custom-sans text-4xl tracking-wide text-[#007bff] text-center">
          ASTRACODE
        </h1>

        <select
          className="p-2 pl-4 pr-10 rounded-lg outline-none transition border-2 border-gray-300 text-base bg-white text-gray-700 hover:border-blue-500 focus:border-blue-500 w-min"
          name="lang"
          id="lang"
          onChange={(e) => {
            const id = e.target.value;
            setLangId(id);
          }}
          value={langId}
        >
          {SUPPORTED_LANGAUGES.map((lang, id) => (
            <option key={id} value={id}>
              {lang}
            </option>
          ))}
        </select>

        <button
          className="px-6 py-3 bg-blue-500 text-white border-2 border-blue-500 rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:border-blue-700 hover:text-white"
          onClick={(e) => {
            const buttonText = e.target.innerText;
            if (buttonText == "CANCEL") window.stop();
            setOutput(null);
            const response = getCodeOutput(userCode, langId, containerId);
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
      <div className="flex w-full h-[690px]">
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
        <div className="fixed bottom-0 w-full h-[300px] overflow-y-auto bg-black">
          <Terminal />
        </div>
      ) : null}
    </div>
  );
};
export default Home;

const CodeOutput = ({ output }) => {
  return (
    <div className="w-full bg-[#f8f9fa] p-5 border border-[#ccc] rounded-md animate-slideRight overflow-y-auto overflow-x-auto">
      <h3 className="text-[#333] text-center mb-[10px]">OUTPUT</h3>
      <hr />
      <div>
        {output === null ? (
          <div className="executing-animation animate-slideUp">
            <div className="dot-animation text-xl">
              Executing
              <span className="animate-appear">.</span>
              <span className="animate-appear">.</span>
              <span className="animate-appear">.</span>
            </div>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap break-words text-[20px] p-2 rounded-md overflow-x-hidden bg-[#f8f9fa]">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeOutput;

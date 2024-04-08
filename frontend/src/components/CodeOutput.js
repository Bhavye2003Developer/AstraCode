const CodeOutput = ({ output }) => {
  return (
    <div className="output">
      <h3 className="output-heading">OUTPUT</h3>
      <hr />
      <div className="output-content">
        {output === null ? (
          <div className="executing-animation">
            <div className="dot-animation">
              Executing
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <span className="dot dot3"></span>
            </div>
          </div>
        ) : (
          <pre
            className="output-text"
            style={{ whiteSpace: "pre-wrap", overflow: "hidden" }}
          >
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeOutput;

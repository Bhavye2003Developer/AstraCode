const fs = require("fs");
var child_process = require("child_process");

const PYTHON_CODE_FILE_PATH = "code/python";
const CPP_CODE_FILE_PATH = "code/cppLang";
const JAVA_CODE_FILE_PATH = "code/java";

const writeCode = (code, langId) => {
  if (langId > 3 || langId < 0) return;
  if (langId === 0)
    fs.writeFileSync(PYTHON_CODE_FILE_PATH + "/user1.py", code, {
      encoding: "utf-8",
    });
  if (langId === 1)
    fs.writeFileSync(CPP_CODE_FILE_PATH + "/user1.cpp", code, {
      encoding: "utf-8",
    });
  if (langId === 2)
    fs.writeFileSync(JAVA_CODE_FILE_PATH + "/user1.java", code, {
      encoding: "utf-8",
    });
};

function executeCode(code, langId) {
  writeCode(code, langId);
  try {
    if (langId === 0) {
      const output = child_process
        .execSync(`python ./${PYTHON_CODE_FILE_PATH}/user1.py`)
        .toString();
      return output;
    }
    if (langId === 1) {
      child_process.execSync(
        `g++ ./${CPP_CODE_FILE_PATH}/user1.cpp -o user1 & mv user1.* ./${CPP_CODE_FILE_PATH}`
      );
      const output = child_process
        .execFileSync(`${CPP_CODE_FILE_PATH}/user1.exe`)
        .toString();
      return output;
    }
    if (langId === 2) {
      child_process.execSync(`javac ./${JAVA_CODE_FILE_PATH}/user1.java`);
      const output = child_process
        .execSync(`java ${JAVA_CODE_FILE_PATH}/User1.java`)
        .toString();
      return output;
    }
  } catch (error) {
    return error.message;
  }
}

const executeCommand = (command) => {
  if (command === "netstat") return "can't execute netstat";
  try {
    const output = child_process.execSync(command);
    return output.toString();
  } catch (err) {
    console.log("error occured");
    return err.stderr.toString();
  }
};

module.exports = { executeCode, executeCommand };

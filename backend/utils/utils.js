const fs = require("fs");
var child_process = require("child_process");

const spin_container = () => {
  try {
    const spin_up_command = "docker run -d -t user-env"; // spining up new container
    return child_process.execSync(spin_up_command).toString();
  } catch (err) {
    return err;
  }
};

const writeCodeToContainer = (code, langId, containerId) => {
  fs.writeFileSync("code.txt", code, { encoding: "utf-8" });

  const DOCKER_USER_FILE_PATH =
    langId === 0
      ? "/home/user/python/user1.py"
      : langId === 1
      ? "/home/user/cppLang/user1.cpp"
      : langId === 2
      ? "/home/user/java/user1.java"
      : "";

  if (langId > 3 || langId < 0) return;
  child_process.execSync(
    `docker cp code.txt ${containerId}:${DOCKER_USER_FILE_PATH}`
  );
};

function executeCode(code, langId, containerId) {
  const formatedContainerId = containerId.slice(0, 12);
  writeCodeToContainer(code, langId, formatedContainerId);
  try {
    if (langId === 0) {
      const output = child_process
        .execSync(
          `docker exec -i ${formatedContainerId} python3 python/user1.py`
        )
        .toString();
      return output;
    }
    if (langId === 1) {
      // compiling c++ program
      child_process.execSync(
        `docker exec -i ${formatedContainerId} g++ cppLang/user1.cpp -o cppLang/a.out`
      );
      const output = child_process
        .execSync(`docker exec -i ${formatedContainerId} ./cppLang/a.out`)
        .toString();
      return output;
    }
    if (langId === 2) {
      const output = child_process
        .execSync(`docker exec -i ${formatedContainerId} java java/user1.java`)
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

module.exports = { executeCode, executeCommand, spin_container };

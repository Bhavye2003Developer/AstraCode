import { SERVER_API } from "./constants";

const getCodeOutput = async (code, langId, containerId) => {
  console.log(langId);
  const body = JSON.stringify({ code, langId, containerId });
  try {
    const response = await fetch(SERVER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const json = response.json();
    return json;
  } catch (err) {
    return null;
  }
};

const getContainerId = async () => {
  try {
    const response = await fetch(SERVER_API, { method: "GET" });
    const containerId = await response.json();

    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // userInfo.containerInfo = {
    //   containerId: containerId.containerId,
    //   expiry: new Date().toString(),
    // };

    return containerId;
  } catch (err) {
    return null;
  }
};

export { getCodeOutput, getContainerId };

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

const getContainerId = () => {
  try {
    return fetch(SERVER_API, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        return {
          containerId: json.containerId,
          expiry: new Date().toString(),
          err: false,
        };
      });
  } catch (err) {
    return null;
  }
};

export { getCodeOutput, getContainerId };

import { SERVER_API } from "./constants";

const getCodeOutput = async (code, langId) => {
  console.log(langId);
  const body = JSON.stringify({ code, langId });
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

export default getCodeOutput;

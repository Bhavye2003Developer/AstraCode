import { useEffect, useState } from "react";
import useIsMount from "../utils/useIsMount";

const userLocalStorage = (userCode, langId, setUserCode, setLangId) => {
  const isMount = useIsMount();

  useEffect(() => {
    console.log("executed"); // first render
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.userCode) {
      setUserCode(userInfo.userCode);
      setLangId(userInfo.langId);
    }
  }, []);

  useEffect(() => {
    if (!isMount) {
      // subsequent renders
      console.log("executed - local");
      localStorage.setItem("userInfo", JSON.stringify({ userCode, langId }));
    }
  }, [userCode, langId]);
  return null;
};

export default userLocalStorage;

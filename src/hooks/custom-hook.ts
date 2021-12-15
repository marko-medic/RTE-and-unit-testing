import { useState } from "react";

export function useCheckInfo() {
  const [state, setState] = useState("");

  const setUserInfo = (username: string, password: string) => {
    if (username.length > 3 && password.length > 5) {
      setState("User info ok");
      return;
    }
    setState("User info not secured");
  };

  return {
    infoState: state,
    setUserInfo,
  };
}

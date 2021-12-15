import { FormEvent, useEffect, useState } from "react";
import { useCheckInfo } from "../hooks/custom-hook";

export const CustomForm = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmited(true);
    if (password.length <= 3) {
      setMsg("Invalid password");
      return;
    }
    setMsg("");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submited, setSubmited] = useState(false);
  const [msg, setMsg] = useState("");
  const [someStr, setSomeStr] = useState("");
  const { infoState, setUserInfo } = useCheckInfo();

  useEffect(() => {
    if (submited) {
      setUserInfo(username, password);
    }
    setUsername("");
    setPassword("");
  }, [submited]);

  useEffect(() => {
    setSubmited(false);
  }, [username, password]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSomeStr("Some new rand str");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          data-testid="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="submit" type="submit">
          Click
        </button>
      </form>
      {username ? `Username is: ${username}` : "No username set"}
      {submited && <p>Form submited</p>}
      <br />
      {msg && <p>{msg}</p>}

      {infoState && <h5 data-testid="info-string">{infoState}</h5>}
      {someStr ? <p>{someStr}</p> : <p>no str</p>}
    </div>
  );
};

import React, { useState } from "react";
import { useCustom } from "../hooks/useCustom";

function Navbar() {
  const [name, setName] = useState("Marko");
  const myFunction = useCustom(name);
  return (
    <div>
      <ul>
        <li>Home</li>
      </ul>
      <ul>
        <li>About</li>
      </ul>
      <ul>
        <li>Info</li>
      </ul>
      <button onClick={() => setName("Marko " + Math.random() * 11)}>
        Change name
      </button>
      <button onClick={(e) => myFunction(e.target)}>Show result</button>
    </div>
  );
}

export { Navbar };

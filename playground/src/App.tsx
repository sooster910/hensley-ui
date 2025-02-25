import { createElement, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button, Text } from "@hensley-ui/ui";
import "@hensley-ui/ui/styles.css";

function App() {
  const [count, setCount] = useState(0);
  const Comp = createElement("h1", null, "hihi");
  console.log("comp", Comp);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card first-letter text-lg">
        <Button animated>count is {count}</Button>
        <p className="text-5xl">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div></div>
      <Text as={"h1"} color="yellow">
        This is a text component
      </Text>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

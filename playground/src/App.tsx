import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [, setFn] = useState<() => void | null>();
  const handleClick = () => {
    setFn(() => () => console.log("hi"));
  };

  return (
    <>
      <button onClick={handleClick}>button</button>
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
        <p className="text-5xl">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div></div>
      This is a text component
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

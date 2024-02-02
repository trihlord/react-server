// @deno-types="@types/react"
import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  function incrementCount() {
    setCount((count) => count + 1);
  }

  return (
    <div>
      <button onClick={incrementCount}>
        Count is {count}
      </button>
    </div>
  );
}

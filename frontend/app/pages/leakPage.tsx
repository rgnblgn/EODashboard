"use client";

import { useEffect, useState } from "react";

export default function LeakDemo() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow((prev) => !prev)}>Toggle Child</button>

      {show && <LeakyChild />}
    </div>
  );
}

function LeakyChild() {
  useEffect(() => {
    const handler = () => {
      console.log("resize");
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return <div>Leaky child</div>;
}

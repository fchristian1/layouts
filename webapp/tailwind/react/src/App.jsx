import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "./layouts/Layout";

function App() {
  return (
    <>
      <Layout
        nav={<span>nav</span>}
        aside={<span>aside</span>}
        main={<span>main</span>}
        footer={<span>footer</span>}
        helpContent={<span>Hilfe</span>}
      ></Layout>
    </>
  );
}

export default App;

import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  console.log("root");
  return (
    <div className="mx-auto py-5 px-10 ">
      <Outlet />
    </div>
  );
}

export default App;

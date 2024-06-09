import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="mx-auto py-5 px-10 ">
      <Outlet />
    </div>
  );
}

export default App;

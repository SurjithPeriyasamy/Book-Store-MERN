import { Outlet } from "react-router-dom";
import { useCurrentUser } from "./utils/hooks/useCurrentUser";

function App() {
  useCurrentUser();
  return (
    <div className="mx-auto py-5 px-10 ">
      <Outlet />
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import CreateBook from "./components/CreateBook.jsx";
import EditBook from "./components/EditBook.jsx";
import DeleteBook from "./components/DeleteBook.jsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShowBook from "./components/ShowBook.jsx";
import appStore from "./utils/appStore.js";
import SignUp from "./components/signUp/SignUp.jsx";
const appRouter = createBrowserRouter([
  { path: "/", element: <SignUp /> },
  {
    path: "/books",
    element: <App />,
    children: [
      {
        path: "/books",
        element: <Home />,
      },
      {
        path: "/books/create",
        element: <CreateBook />,
      },
      {
        path: "/books/edit/:id",
        element: <EditBook />,
      },
      {
        path: "/books/details/:id",
        element: <ShowBook />,
      },
      {
        path: "/books/delete/:id",
        element: <DeleteBook />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);

import KanbanBoard from "./Components/KanbanBoard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,

      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
        {
          path: "board",
          element: <KanbanBoard />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

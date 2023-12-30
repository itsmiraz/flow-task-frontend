import KanbanBoard from "./Components/KanbanBoard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Root from "./Layout/Root";
import Login from "./Pages/Auth/Login";

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

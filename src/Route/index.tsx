import KanbanBoard from "@/components/KanbanBoard";
import RootLayout from "@/Layout/Root";
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import { createBrowserRouter } from "react-router-dom";
import Private from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

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
        element: (
          <Private>
            {" "}
            <KanbanBoard />
          </Private>
        ),
      },
    ],
  },
]);

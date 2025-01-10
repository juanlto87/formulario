import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css";
import LandingForm from "../pages/LandingForm";
import Pedidos from "../pages/Pedidos";
import Ventas from "../pages/Ventas";
import RootLayout from "../pages/Root";

const router = createBrowserRouter([
  {path: "/", element: <LandingForm />},
  {
    path: "/menu",
    element: <RootLayout />,
    children: [
      {path: "pedidos", element: <Pedidos />},
      {path: "ventas", element: <Ventas />},
    ],
  },
  {path: "/pedidos", element: <Pedidos />},
  {path: "/ventas", element: <Ventas />},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

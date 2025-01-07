import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css";
import LandingForm from "../pages/LandingForm";
import Pedidos from "../pages/Pedidos";
import RootLayout from "../pages/Root";

const router = createBrowserRouter([
  {path: "/", element: <LandingForm />},
  {
    path: "/menu",
    element: <RootLayout />,
    children: [{path: "pedidos", element: <Pedidos />}],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

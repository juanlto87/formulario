import reacImag from "../assets/logo-8.png";
import {Link} from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src={reacImag} alt="Logo_Blackbox" />
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/menu">Inicio</Link>
          </li>
          <li>
            <Link to="/menu/pedidos">Pedidos</Link>
          </li>
          <li>
            <Link to="/menu/ventas">Ventas</Link>
          </li>
          <li>
            <Link to="/">Reservas</Link>
          </li>
        </ul>
      </nav>
      <button>Login</button>
    </header>
  );
}

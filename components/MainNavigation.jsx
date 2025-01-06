import {Link} from "react-router-dom";
import classes from "./MainNavigation.module.css";
export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/pedidos">Pedidos</Link>
          </li>
          <li>
            <Link to="/reserva">Reservas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

import reacImag from "../assets/logo-8.png";
import "./header.css";

export default function Header() {
  return (
    <header>
      <img src={reacImag} alt="Logo-Blackbox" />
      <p className="header">
        TRANSFORMA
        <br /> TU CUERPO, <br />
        <span style={{ color: "#00A2C6" }}>
          RETA
          <br /> TU MENTE
        </span>
      </p>
    </header>
  );
}

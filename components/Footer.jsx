import "./Footer.css";
import reloj from "../assets/reloj.png";
import insta from "../assets/Insta.png";
import whats from "../assets/Whatsapp.png";
export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <center>
          <img src={reloj} alt="Reloj" />
          <br />
          Horarios:
          <br /> Lunes a Viernes: 05am - 09am / 16pm - 21pm
          <br /> Sábados: 08am - 10am
          <br /> Domingos: 08am - 10am
        </center>
      </div>
      <div className="footer">
        <center>
          <a href="https://wa.me/+593981896493">
            <img src={whats} alt="Whatsapp" />
            <br />
            WhatsApp: <br />
            0981896493
          </a>
        </center>
      </div>
      <div className="footer">
        <center>
          <img src={insta} alt="Instagram" />
          <br />
          Instagram:
          <a href="https://www.instagram.com/blackbox_crosstraining_condado">
            <br /> @blackbox_crosstraining_condado
          </a>
          <a href="https://www.instagram.com/blackbox.crosstraining/">
            <br /> @blackbox.crosstrainig
          </a>
        </center>
      </div>
    </footer>
  );
}

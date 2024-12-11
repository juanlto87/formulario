import "./Footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <center>
          Horarios:
          <br /> Lunes a Viernes: 05am - 09am / 16pm - 21pm
          <br /> Sábados: 08am - 10am
          <br /> Domingos: 08am - 10am
        </center>
      </div>
      <div className="footer">
        <center>
          <a href="https://wa.me/0981896493">WhatsApp: 0981896493</a>
        </center>
      </div>
      <div className="footer">
        <center>
          <img src="../assets/instagram_2111463.png" />
          Instagram:
          <br /> @blackbox_crosstraining_condado
          <br /> @blackbox.crosstrainig
        </center>
      </div>
    </footer>
  );
}

import Header from "../components/Header";
import Formulario from "../components/Formulario";
import Informacion from "../components/Informacion";
import Footer from "../components/Footer";
import "./LandingForm.css";
export default function LandingForm() {
  return (
    <>
      <Header />
      <section className="contenedor">
        <div className="izquierda">
          <Formulario />
        </div>
        <div className="derecha">
          <Informacion />
        </div>
      </section>
      <Footer />
    </>
  );
}

import Header from "../components/header";
import Formulario from "../components/Formulario";
import Footer from "../components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <section className="contenedor">
        <div className="izquierda">
          <Formulario />
        </div>
        <div className="derecha">
          <div></div>
          <p className="texto">
            CrossFit es un programa de entrenamiento funcional, constantemente
            variado, ejecutado a alta intensidad. Combina movimientos de
            disciplinas como halterofilia, gimnasia y ejercicios
            cardiovasculares para mejorar fuerza, resistencia, flexibilidad,
            agilidad y más.
            <br />
            Es apto a todos los niveles, ya que los ejercicios se adaptan según
            la capacidad de cada persona. ¡Ideal para quienes buscan un estilo
            de vida activo, comunidad y resultados!
          </p>
          <div className="condado">Condado</div>
          <div className="calderon">Calderon</div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;

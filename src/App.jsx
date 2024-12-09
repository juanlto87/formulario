import Header from "../components/header";
import Formulario from "../components/Formulario";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div id="contenedor">
        <div id="izquierda">
          <Formulario />
        </div>
        <div id="derecha">
          <br />
          <br />
          <br />
          CrossFit es un programa de entrenamiento funcional, constantemente
          variado, ejecutado a alta intensidad. Combina movimientos de
          disciplinas como halterofilia, gimnasia y ejercicios cardiovasculares
          para mejorar fuerza, resistencia, flexibilidad, agilidad y más.
          <br />
          Es apto a todos los niveles, ya que los ejercicios se adaptan según la
          capacidad de cada persona. ¡Ideal para quienes buscan un estilo de
          vida activo, comunidad y resultados!
        </div>
      </div>
    </>
  );
}

export default App;

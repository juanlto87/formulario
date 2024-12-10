import Header from "../components/header";
import Formulario from "../components/Formulario";
import Informacion from "../components/Informacion";
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
          <Informacion />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;

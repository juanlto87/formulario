import "./informacion.css";
import ubicacion from "../assets/ubicacion.png";

export default function Informacion() {
  return (
    <>
      <p className="texto">
        CrossFit es un programa de entrenamiento funcional, constantemente
        variado, ejecutado a alta intensidad. Combina movimientos de disciplinas
        como halterofilia, gimnasia y ejercicios cardiovasculares para mejorar
        fuerza, resistencia, flexibilidad, agilidad y más.
        <br />
        Es apto a todos los niveles, ya que los ejercicios se adaptan según la
        capacidad de cada persona. ¡Ideal para quienes buscan un estilo de vida
        activo, comunidad y resultados!
      </p>
      <div className="calderon">
        <a href="https://maps.app.goo.gl/4fXvHZSgLNWDSXMC6">
          <h3>Sede Calderón</h3>
          <img src={ubicacion} alt="Ubicacion" />
          <br />
          Capitán Giovanni Calles entre
          <br />
          Caran y Av. Cacha
        </a>
      </div>
      <div className="condado">
        <a href="https://maps.app.goo.gl/1r6Qd8PEHWUpVR7F8">
          <h3>Sede Condado</h3>
          <img src={ubicacion} alt="Ubicacion" />
          <br /> Tomasa Mideros y Juana Terrazas,
          <br /> esquina(entrada a General Norte <br />
          del Estadio LDU)
        </a>
      </div>
    </>
  );
}

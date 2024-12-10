import "./informacion.css";

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
      <div className="condado">
        Sede Condado
        <br />
        <br /> Tomasa Mideros y Juana Terrazas,
        <br /> esquina(entrada a General Norte <br />
        del Estadio LDU)
      </div>
      <div className="calderon">
        Sede Calderon
        <br />
        <br />
        Capitán Giovanni Calles entre
        <br />
        Caran y Av. Cacha
      </div>
    </>
  );
}

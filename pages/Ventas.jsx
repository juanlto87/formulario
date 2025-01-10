import classes from "./Ventas.module.css";
import {useState, useEffect} from "react";

export default function Ventas() {
  //const servicio = "https://blackbox--blackbox-abeb3.us-central1.hosted.app/";
  const servicio = "http://localhost:1234/";
  function guardarVenta() {}
  const [productos, setProductos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`${servicio}productos/`)
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => setError("Error al cargar los productos"));
  }, []);
  const options = ["Active", "Agua", "Gatorade", "Monster"];

  // Manejar cambios en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtrar opciones basadas en el input
    if (value) {
      const filteredSuggestions = options.filter((option) =>
        option.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Manejar selección de una sugerencia
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <>
      <div style={{position: "relative", width: "300px"}}>
        <h2>Lista de Ventas</h2>
        <form onSubmit={guardarVenta}>
          <p>
            <label>Nombre: </label>
            <input placeholder="Nombre " type="text"></input>
          </p>
          <p>
            <label>Proucto:</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Buscar artículo..."
              style={{width: "80%", padding: "8px"}}
            />
            {suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "36px",
                  left: "36px",
                  width: "80%",
                  background: "#fff",
                  border: "1px solid #ccc",
                  listStyle: "none",
                  padding: "0",
                  margin: "0",
                  maxHeight: "150px",
                  overflowY: "auto",
                  zIndex: 1000,
                  color: "#000",
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </p>
          <p>
            <button>Guardar</button>
          </p>
        </form>
      </div>
    </>
  );
}

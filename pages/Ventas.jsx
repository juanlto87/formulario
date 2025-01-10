import classes from "./Ventas.module.css";
import {useState, useEffect, useRef} from "react";

export default function Ventas() {
  //const servicio = "https://blackbox--blackbox-abeb3.us-central1.hosted.app/";
  const servicio = "http://localhost:1234/";
  function guardarVenta() {}
  const [productos, setProductos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const cantidad = useRef();
  const precio = useRef();
  const subtotal = useRef();
  const total = useRef();

  useEffect(() => {
    fetch(`${servicio}productos/`)
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => setError("Error al cargar los productos"));
  }, []);

  // Manejar cambios en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtrar opciones basadas en el input
    if (value) {
      const filteredSuggestions = productos.filter((option) =>
        option.nombre.toLowerCase().startsWith(value.toLowerCase())
      );
      setSugerencias(filteredSuggestions);
    } else {
      setSugerencias([]);
    }
  };

  // Manejar selección de una sugerencia
  const handleSuggestionClick = (suggestion) => {
    setInputValue("");
    setSugerencias([]);
    suggestion.cantidad = 1;
    suggestion.subtotal = suggestion.precio * suggestion.cantidad;
    setPedidos((prev) => {
      const productoExistente = prev.some(
        (item) => item.nombre === suggestion.nombre
      );
      if (productoExistente) return prev;
      return [suggestion, ...prev];
    });
  };

  function handleAgregar() {
    console.log("Agregar");
  }
  function handleSubtotal(pedid, campo, valor) {
    pedid[campo] = valor;
    setPedidos((prev) => {
      const nuevosPedidos = prev.map((pedido) =>
        pedido.id === pedid.id
          ? {
              ...pedido,
              [campo]: +valor,
              subtotal: pedid.cantidad * pedid.precio,
            }
          : pedido
      );

      total.current.value = nuevosPedidos.reduce(
        (acumulador, producto) => acumulador + producto.subtotal,
        0
      );
      return nuevosPedidos;
    });
  }

  useEffect(() => {
    total.current.value = pedidos
      .reduce((acumulador, producto) => acumulador + producto.subtotal, 0)
      .toFixed(2);
  }, [pedidos]);

  return (
    <>
      <div className={classes.ventas}>
        <h2>Lista de Ventas</h2>

        <p>
          <label>Nombre: </label>
          <input placeholder="Nombre " type="text" />
        </p>
        <p>
          <label>Producto:</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Buscar artículo..."
          />
          <label onClick={handleAgregar}>Agregar</label>
        </p>
        {sugerencias.length > 0 && (
          <ul className={classes.ul}>
            {sugerencias.map((suggestion, index) => (
              <li
                key={index}
                className={classes.li}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.nombre}: ${suggestion.precio}
              </li>
            ))}
          </ul>
        )}
        <div>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>$Precio</th>
                <th>$Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.nombre}</td>
                  <td>
                    <input
                      type="number"
                      value={pedido.cantidad}
                      onChange={(e) =>
                        handleSubtotal(pedido, "cantidad", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleSubtotal(pedido, "precio", e.target.value)
                      }
                      min="1"
                      step="0.01"
                      value={pedido.precio.toFixed(2)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={pedido.subtotal.toFixed(2)}
                      disabled
                    />
                  </td>
                </tr>
              ))}
              {total && (
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td>
                    <input type="number" ref={total} disabled />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p>
          <button>Guardar</button>
        </p>
      </div>
    </>
  );
}

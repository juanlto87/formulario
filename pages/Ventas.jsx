import classes from "./Ventas.module.css";
import {useState, useEffect, useRef} from "react";

const inicialVenta = {
  formaPago: "Efectivo",
  total: 0,
  efectivo: 0,
  cambio: 0,
  pedidos: [],
  cliente: "",
};

export default function Ventas() {
  const servicio = "https://blackbox--blackbox-abeb3.us-central1.hosted.app/";
  //const servicio = "http://localhost:1234/";
  const [productos, setProductos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [venta, setVenta] = useState(inicialVenta);
  const [sugerencias, setSugerencias] = useState([]);

  function guardarVenta() {
    const pedidos = venta.pedidos.filter((producto) => producto.cantidad !== 0);

    const pedidoData = {
      fecha: new Date().toISOString().slice(0, 10),
      coach: "Juan",
      ubicacion: "Condado",
      productos: pedidos,
      cliente: venta.cliente,
      formaPago: 1,
      total: +venta.total,
      efectivo: +venta.efectivo,
      cambio: +venta.cambio,
      descuento: 0,
    };
    console.log(pedidoData);
    creaBDD(pedidoData);
  }

  async function creaBDD(pedidoData) {
    try {
      const response = await fetch(`${servicio}ventas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        alert("Formulario enviado con éxito.");
        setVenta(inicialVenta);
      } else {
        alert("Error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Error al crear el pedido");
    }
  }

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

    if (e.key === "Enter") {
      handleAgregar();
      setInputValue("");
      setSugerencias([]);
      return;
    }

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

  function handleAgregar() {
    const producto = productos.find(
      (producto) => producto.nombre.toLowerCase() === inputValue.toLowerCase(9)
    );
    const sugerencia = {...producto};
    sugerencia.cantidad = 1;
    sugerencia.precio = +producto.precio;
    sugerencia.subtotal = +producto.precio * sugerencia.cantidad;

    setVenta((prev) => {
      const productoExistente = prev.pedidos.some(
        (item) => item.nombre === sugerencia.nombre
      );
      if (productoExistente) return prev;
      return {...prev, pedidos: [sugerencia, ...prev.pedidos]};
    });
  }
  // Manejar selección de una sugerencia
  const handleSuggestionClick = (sugerencia) => {
    setInputValue("");
    setSugerencias([]);
    sugerencia.cantidad = 1;
    sugerencia.precio = +sugerencia.precio;
    sugerencia.subtotal = +sugerencia.precio * sugerencia.cantidad;
    setVenta((prev) => {
      const productoExistente = prev.pedidos.some(
        (item) => item.nombre === sugerencia.nombre
      );
      if (productoExistente) return prev;
      return {...prev, pedidos: [sugerencia, ...prev.pedidos]};
    });
  };

  function handleSubtotal(pedid, campo, valor) {
    pedid[campo] = +valor;
    setVenta((prev) => {
      const nuevosPedidos = prev.pedidos.map((pedido) =>
        pedido.id === pedid.id
          ? {
              ...pedido,
              [campo]: +valor,
              subtotal: pedid.cantidad * pedid.precio,
            }
          : pedido
      );

      return {...prev, pedidos: nuevosPedidos};
    });
  }
  function handleFormaPago({target}) {
    setVenta({
      ...venta,
      efectivo: 0,
      [target.name]: target.value,
      cambio: !isNaN(target.value)
        ? +target.value > +venta.total
          ? +target.value - venta.total
          : 0
        : 0,
    });
  }

  function eliminaProducto(id) {
    setVenta((prev) => {
      const pedidosFiltrados = prev.pedidos.filter(
        (pedido) => pedido.id !== id
      );
      return {...prev, pedidos: pedidosFiltrados};
    });
  }

  function handleCancel() {
    setVenta(inicialVenta);
  }

  useEffect(() => {
    const valorTotal = venta.pedidos
      .reduce((acumulador, producto) => acumulador + producto.subtotal, 0)
      .toFixed(2);

    setVenta({
      ...venta,
      total: valorTotal,
      efectivo: 0,
      cambio: 0,
    });
  }, [venta.pedidos]);

  return (
    <>
      <div className={classes.ventas}>
        <h2>Ventas</h2>

        <p style={{display: "flex", alignItems: "left", gap: "10px"}}>
          <label style={{width: "180px"}}>Cliente: </label>
          <input
            name="cliente"
            placeholder="Nombre "
            type="text"
            value={venta.cliente}
            onChange={handleFormaPago}
          />
        </p>
        <p style={{display: "flex", alignItems: "left", gap: "10px"}}>
          <label style={{width: "180px"}}>Producto:</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputChange}
            placeholder="Buscar artículo..."
          />
          <a onClick={handleAgregar}>Añadir</a>
        </p>
        {sugerencias.length > 0 && (
          <ul className={classes.ul}>
            {sugerencias.map((sugerencia, index) => (
              <li
                key={index}
                className={classes.li}
                onClick={() => handleSuggestionClick(sugerencia)}
              >
                {sugerencia.nombre}: ${sugerencia.precio}
              </li>
            ))}
          </ul>
        )}
        <div>
          <table>
            <thead>
              {venta.total > 0 && (
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>$Precio</th>
                  <th>$Subtotal</th>
                </tr>
              )}
            </thead>
            <tbody>
              {venta.pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.nombre}</td>
                  <td>
                    <input
                      type="number"
                      value={pedido.cantidad}
                      min="0"
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
                  <td>
                    <span onClick={() => eliminaProducto(pedido.id)}>
                      Remover
                    </span>
                  </td>
                </tr>
              ))}
              {venta.total > 0 && (
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td>
                    <input type="number" value={venta.total} disabled />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {venta.total > 0 && (
            <>
              <label>Elige la forma de pago: </label>
              <select name="formaPago" onChange={handleFormaPago}>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Credito">Crédito</option>
              </select>
            </>
          )}
          {venta.formaPago === "Efectivo" && venta.total > 0 && (
            <div>
              <label>Efectivo recibido: </label>
              <input
                type="number"
                name="efectivo"
                min="0"
                step="0.01"
                value={venta.efectivo}
                onChange={handleFormaPago}
              />
              <label>Cambio: </label>
              <input type="number" value={venta.cambio.toFixed(2)} disabled />
            </div>
          )}
        </div>
        <p>
          <button className={classes.boton} onClick={guardarVenta}>
            Guardar
          </button>
          <button className={classes.boton} onClick={handleCancel}>
            Cancelar
          </button>
        </p>
      </div>
    </>
  );
}

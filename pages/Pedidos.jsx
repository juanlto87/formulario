import {useState, useRef, useEffect} from "react";
import React from "react";
import html2canvas from "html2canvas";
import classes from "./Pedidos.module.css";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  const prods = useRef([]);
  const servicio = "https://blackbox--blackbox-abeb3.us-central1.hosted.app/";
  //const servicio = "http://localhost:1234/";

  const obtenerValoresProductos = () => {
    return prods.current.map((ref, index) => ({
      id: index,
      cantidad: parseFloat(ref?.value) || 0,
    }));
  };

  const validarPrecios = () => {
    return prods.current.every((ref) => ref && ref.value >= 0);
  };

  const handleKeyDown = (e, nextInputRef) => {
    if (e.key === "Enter" && prods.current[nextInputRef]) {
      e.preventDefault(); // Evitar que se envíe el formulario
      prods.current[nextInputRef].focus(); // Enfocar el siguiente input
    }
  };
  function creaCierre() {
    const products = obtenerValoresProductos().filter(
      (producto) => producto.id !== 0
    );

    const pedidoData = {
      fecha: new Date().toISOString().slice(0, 10),
      caja: +prods.current[0].value,
      coach: "Juan",
      ubicacion: "Condado",
      productos: products,
    };

    if (validarPrecios()) {
      setPedidos([...pedidos, pedidoData]);
      creaBDD(pedidoData);
    }
  }

  async function creaBDD(pedidoData) {
    try {
      const response = await fetch(`${servicio}pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        alert("Formulario enviado con éxito.");
      } else {
        alert("Error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Error al crear el pedido");
    }
  }

  function actualizaCierre(id) {
    const products = obtenerValoresProductos().filter(
      (producto) => producto.id !== 0
    );

    const pedidoData = {
      id: id,
      caja: +prods.current[0].value,
      productos: products,
    };

    if (validarPrecios()) {
      actualizaBDD(pedidoData);
    }
  }

  async function actualizaBDD(pedidoData) {
    try {
      const response = await fetch(`${servicio}pedidos/${pedidoData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        alert("Formulario actualizado con éxito.");
      } else {
        alert("Error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Error al crear el pedido");
    }
  }

  function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas to Blob conversion failed"));
          }
        },
        "image/jpeg",
        0.9
      );
    });
  }

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toISOString().slice(0, 10);
  };

  async function handleCaptureAndSend() {
    const table = document.querySelector("table");

    try {
      const canvas = await html2canvas(table, {
        backgroundColor: "#555",
        color: "#fff",
        font: "40px Arial",
      });
      const blob = await canvasToBlob(canvas);

      //const image = canvas.toDataURL("image/png");
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer EAAInQ2vX53gBOZCyy0ZA6j2a1aDLb6nZBPBAW0xV8nCEW3lXb8fN3SSQ2pM5PIAaPbd9mENZCsPkw1zOINtVhvKHlJFklHwUms6G2Ch5pn073hZB9lIRNCYexjiAyQBokMTijEqPPXJE2HgFcrZAr7LzCEAlup5ewKnKkHsxZBdZAjkvJOiXTo0S96arqNRv1jVwQ6ZBqlC3qrkBc5E1e"
      );

      const formdata = new FormData();

      formdata.append("messaging_product", "whatsapp");
      formdata.append("file", blob, "cierre_caja.jpg");

      const requestOptionsUp = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        "https://graph.facebook.com/v21.0/514787545052714/media",
        requestOptionsUp
      );

      const result = await response.json();
      const mediaId = result.id;

      if (mediaId) {
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          messaging_product: "whatsapp",
          to: "593981896493",
          type: "template",
          template: {
            name: "cierre_caja",
            language: {
              code: "es",
            },
            components: [
              {
                type: "header",
                parameters: [
                  {
                    type: "image",
                    image: {
                      id: mediaId,
                    },
                  },
                ],
              },
            ],
          },
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "https://graph.facebook.com/v21.0/514787545052714/messages",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => alert("Mensaje enviado"))
          .catch((error) => console.error(error));
      } else {
        console.error("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al convertir Canvas:", error);
    }
  }
  useEffect(() => {
    fetch(`${servicio}productos/`)
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => setError("Error al cargar los pedidos"));

    fetch(`${servicio}pedidos/`)
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => setError("Error al cargar los pedidos"));
  }, []);

  if (error) return <div className="error">{error}</div>;

  //const hoy = isToday("2025-01-04");
  let renderizaHoy = true,
    idPedido;
  return (
    <div>
      <h2>Lista de Cierres</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Caja</th>
            {productos.map((producto) => (
              <th
                key={producto.id}
              >{`${producto.nombre} $${producto.precio}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => {
            if (
              new Date(pedido.fecha).toISOString().slice(0, 10) ===
              new Date().toISOString().slice(0, 10)
            ) {
              renderizaHoy = false;
              idPedido = pedido.id;
            }
            return (
              <tr key={pedido.id}>
                <td>
                  <input
                    type="date"
                    defaultValue={formatearFecha(pedido.fecha)}
                    onChange={actualizaCierre}
                    disabled={true}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    defaultValue={pedido.caja}
                    ref={(el) => (prods.current[0] = el)}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                    disabled={
                      new Date(pedido.fecha).toISOString().slice(0, 10) ===
                      new Date().toISOString().slice(0, 10)
                        ? false
                        : true
                    }
                  />
                </td>
                {pedido.productos.map((prod) => {
                  return (
                    <td key={prod.id}>
                      <input
                        key={prod.id}
                        type="number"
                        defaultValue={prod.cantidad}
                        ref={(el) => (prods.current[prod.id] = el)}
                        onKeyDown={(e) => handleKeyDown(e, prod.id + 1)}
                        disabled={
                          new Date(pedido.fecha).toISOString().slice(0, 10) ===
                          new Date().toISOString().slice(0, 10)
                            ? false
                            : true
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {renderizaHoy && (
            <tr>
              <td>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  disabled={true}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  step="0.01"
                  onKeyDown={(e) => handleKeyDown(e, 1)}
                  ref={(el) => (prods.current[0] = el)}
                />
              </td>

              {productos.map((prod) => {
                return (
                  <td key={prod.id}>
                    <input
                      key={prod.id}
                      type="number"
                      defaultValue="0"
                      min="0"
                      onKeyDown={(e) => handleKeyDown(e, prod.id + 1)}
                      ref={(el) => (prods.current[prod.id] = el)}
                    />
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>

      <button
        className={classes.button}
        onClick={renderizaHoy ? creaCierre : () => actualizaCierre(idPedido)}
      >
        Guardar
      </button>
      <button className={classes.button} onClick={handleCaptureAndSend}>
        Enviar a WhatsApp
      </button>
    </div>
  );
}

export default Pedidos;

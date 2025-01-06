import {useState, useEffect, useRef} from "react";
import React from "react";
import html2canvas from "html2canvas";
import axios from "axios";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [fechaHoy, setFechaHoy] = useState({});
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  function actualizaCierre(tipo, id, event) {
    console.log(event.target.value, id, tipo);
  }

  const enviarPedido = async (pedidoData) => {
    try {
      const response = await axios.post(
        "http://localhost:1235/pedidos",
        pedidoData
      );
      if (response.status === 201) {
        alert("Pedido creado exitosamente");
        // Recargar los pedidos
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Error al crear el pedido");
    }
  };

  function creaCierre(tipo, event) {
    const pedidoData = {
      fecha: new Date().toISOString(),
      caja: 0,
      active: 0,
      agua: 0,
      gatorade: 0,
      monster: 0,
    };

    // Actualizar el valor correspondiente según el tipo
    pedidoData[tipo] = parseFloat(event.target.value) || 0;

    enviarPedido(pedidoData);
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
        font: "10px Arial",
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
          to: "593981810401",
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
  /* fetch("http://localhost:1234/productos/")
    .then((response) => response.json())
    .then((data) => setProductos(data))
    .catch((error) => setError("Error al cargar los pedidos")); */

  useEffect(() => {
    fetch("http://localhost:1234/pedidos/")
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => setError("Error al cargar los pedidos"));
  }, []);

  if (error) return <div className="error">{error}</div>;

  //const hoy = isToday("2025-01-04");
  let renderizaHoy = true;
  return (
    <div>
      <h2>Lista de Cierres</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Caja</th>
            <th>Caja</th>
            <th>Caja</th>
            <th>Caja</th>
            <th>Caja</th>
            {/* {productos.map((producto) => (
              <th
                key={producto.id}
              >{`${producto.nombre} $${producto.precio}`}</th>
            ))} */}
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => {
            if (
              new Date(pedido.fecha).toISOString().slice(0, 10) ===
              new Date().toISOString().slice(0, 10)
            ) {
              renderizaHoy = false;
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
                    onChange={(event) =>
                      actualizaCierre("Caja", pedido.id, event)
                    }
                    disabled={
                      new Date(pedido.fecha).toISOString().slice(0, 10) ===
                      new Date().toISOString().slice(0, 10)
                        ? false
                        : true
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    defaultValue={pedido.active}
                    onChange={actualizaCierre}
                    disabled={
                      new Date(pedido.fecha).toISOString().slice(0, 10) ===
                      new Date().toISOString().slice(0, 10)
                        ? false
                        : true
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    defaultValue={pedido.agua}
                    onChange={actualizaCierre}
                    disabled={
                      new Date(pedido.fecha).toISOString().slice(0, 10) ===
                      new Date().toISOString().slice(0, 10)
                        ? false
                        : true
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    defaultValue={pedido.gatorade}
                    onChange={actualizaCierre}
                    disabled={
                      new Date(pedido.fecha).toISOString().slice(0, 10) ===
                      new Date().toISOString().slice(0, 10)
                        ? false
                        : true
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    defaultValue={pedido.monster}
                    onChange={actualizaCierre}
                    disabled={
                      new Date(pedido.fecha).toISOString().slice(0, 10) ===
                      new Date().toISOString().slice(0, 10)
                        ? false
                        : true
                    }
                  />
                </td>
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
                  onChange={(event) => creaCierre("caja", event)}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  onChange={creaCierre}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  onChange={creaCierre}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  onChange={creaCierre}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  onChange={creaCierre}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleCaptureAndSend}>Enviar a WhatsApp</button>
    </div>
  );
}

export default Pedidos;

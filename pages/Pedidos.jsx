import {useState, useEffect, useRef} from "react";
import React from "react";
import html2canvas from "html2canvas";
import axios from "axios";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  function actualiza() {
    console.log("Actualiza");
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
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      } else {
        console.error("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al convertir Canvas:", error);
    }
  }
  fetch("http://localhost:1234/productos/")
    .then((response) => response.json())
    .then((data) => setProductos(data))
    .catch((error) => setError("Error al cargar los pedidos"));

  useEffect(() => {
    fetch("http://localhost:1234/pedidos/")
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => setError("Error al cargar los pedidos"));
  }, []);

  if (error) return <div className="error">{error}</div>;

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  //const hoy = isToday("2025-01-04");

  return (
    <div>
      <h2>Lista de Cierres</h2>
      <table>
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
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>
                <input
                  type="date"
                  value={formatearFecha(pedido.fecha)}
                  onChange={actualiza}
                  disabled={!isToday(pedido.fecha)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={pedido.caja}
                  onChange={actualiza}
                  disabled={!isToday(pedido.fecha)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={pedido.active}
                  onChange={actualiza}
                  disabled={!isToday(pedido.fecha)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={pedido.agua}
                  onChange={actualiza}
                  disabled={!isToday(pedido.fecha)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={pedido.gatorade}
                  onChange={actualiza}
                  disabled={!isToday(pedido.fecha)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={pedido.monster}
                  onChange={actualiza}
                  disabled={!isToday(pedido.fecha)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCaptureAndSend}>Enviar a WhatsApp</button>
    </div>
  );
}

export default Pedidos;

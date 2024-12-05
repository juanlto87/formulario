import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";

function App() {
  let fechaHoy = new Date();
  let fechaSieteDias = new Date();
  fechaSieteDias.setDate(fechaHoy.getDate() + 6);
  fechaSieteDias =
    fechaSieteDias.getFullYear() +
    "-" +
    String(fechaSieteDias.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(fechaSieteDias.getDate()).padStart(2, "0") +
    "T" +
    String(fechaSieteDias.getHours()).padStart(2, "0") +
    ":" +
    String(fechaSieteDias.getMinutes()).padStart(2, "0");
  fechaHoy =
    fechaHoy.getFullYear() +
    "-" +
    String(fechaHoy.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(fechaHoy.getDate()).padStart(2, "0") +
    "T" +
    String(fechaHoy.getHours()).padStart(2, "0") +
    ":" +
    String(fechaHoy.getMinutes()).padStart(2, "0");

  const [fecha, setFecha] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateTime: "",
  });

  function handleChangeDate(newValue) {
    setFecha(newValue); // Actualizar el estado con la fecha seleccionada
    formData.dateTime = newValue;
    console.log("Fecha seleccionada:", newValue);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const deshabilitarDomingos = (date) => {
    // El domingo es el día 0 en JavaScript
    return date.getDay() === 0; // Retorna true si es domingo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Formulario enviado con éxito.");
        setFormData({ name: "", phone: "", dateTime: "" });
      } else {
        alert("Error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo enviar el formulario.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ingresa los datos para tu reserva</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              label="Selecciona una fecha"
              orientation="portrait"
              value={fecha}
              onChange={handleChangeDate}
              minDate={dayjs(fechaHoy)}
              maxDate={dayjs(fechaSieteDias)}
              slotProps={{
                actionBar: {
                  actions: ["today"],
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <button type="submit">Reservar</button>
      </form>
    </div>
  );
}

export default App;

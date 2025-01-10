import React, {useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {StaticDateTimePicker} from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";
import "./Formulario.css";

export default function Formulario() {
  let fechaHoy = new Date();
  let fechaSieteDias = new Date();
  const isSunday = (date) => {
    const day = date.day();

    return day === 0;
  };

  fechaSieteDias.setDate(fechaHoy.getDate() + 6);
  fechaSieteDias =
    fechaSieteDias.getFullYear() +
    "-" +
    String(fechaSieteDias.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(fechaSieteDias.getDate()).padStart(2, "0") +
    "T20:00";
  fechaHoy =
    fechaHoy.getFullYear() +
    "-" +
    String(fechaHoy.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(fechaHoy.getDate()).padStart(2, "0") +
    "T05:00";

  const [fecha, setFecha] = useState(null);
  const [sedeSeleccionada, setSedeSeleccionada] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    sede: "",
    dateTime: "",
  });

  function handleChangeDate(newValue) {
    setFecha(newValue); // Actualizar el estado con la fecha seleccionada
    formData.dateTime = newValue;
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };
  const handleChangeSede = (event) => {
    setSedeSeleccionada(event.target.value); // Actualiza el valor seleccionado
    formData.sede = event.target.value;
  };
  const deshabilitarDomingos = (date) => {
    // El domingo es el día 0 en JavaScript
    return date.getDay() === 0; // Retorna true si es domingo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://us-central1-blackbox-abeb3.cloudfunctions.net/submitFormu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Formulario enviado con éxito.");
        setFormData({name: "", phone: "", dateTime: ""});
        setFecha(null);
        setSedeSeleccionada("");
      } else {
        alert("Error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo enviar el formulario.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>
          Reserva tu primera clase <strong>GRATIS</strong>
        </h3>
        <div>
          <label>Nombre Completo: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono: </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Selecciona una Sede:</h3>
        <div>
          <label>
            <input
              type="radio"
              name="sede" // El mismo nombre para agrupar los botones
              value="condado"
              checked={sedeSeleccionada === "condado"}
              onChange={handleChangeSede}
              required
            />
            Condado
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="sede"
              value="calderon"
              checked={sedeSeleccionada === "calderon"}
              onChange={handleChangeSede}
              required
            />
            Calderón
          </label>
        </div>
        <h3>Selecciona la fecha y hora:</h3>
        <center>
          <div className="fecha">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDateTimePicker
                orientation="portrait"
                value={fecha}
                onChange={handleChangeDate}
                minDate={dayjs(fechaHoy)}
                maxDate={dayjs(fechaSieteDias)}
                minTime={dayjs(fechaHoy)}
                maxTime={dayjs(fechaSieteDias)}
                shouldDisableDate={isSunday}
                views={["year", "month", "day", "hours"]}
                ampm={false}
                components={{
                  Toolbar: null, // Deshabilitar la Toolbar
                }}
                slotProps={{
                  actionBar: {
                    actions: [],
                  },
                  toolbar: {},
                }}
                required
              />
            </LocalizationProvider>
          </div>
        </center>
        <center>
          <button className="button" type="submit">
            Reservar
          </button>
        </center>
      </form>
    </>
  );
}

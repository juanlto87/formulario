import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    dateTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        setFormData({ name: "", dateTime: "" });
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
      <h1>Formulario con Fecha y Hora</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha y Hora:</label>
          <input
            type="datetime-local"
            name="dateTime"
            min="2024-11-27T05:00" 
            max="2024-11-28T20:00" 
            step="3600"
            value={formData.dateTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { ClipLoader } from "react-spinners"; // Importamos el loader

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Componente
const Costos2: React.FC = () => {
  const [climateRisk, setClimateRisk] = useState<string>("Mercado");
  const [variable, setVariable] = useState<string>("Precio del café");
  const [mensaje, setMensaje] = useState<string>("");
  const [grafico, setGrafico] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Nuevo estado para "cargando"

  // Función para manejar el cambio en los filtros y ajustar las variables disponibles
  const handleClimateRiskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClimateRisk(e.target.value);
    // Resetea la variable cuando cambie el tipo de riesgo
    setVariable(getDefaultVariable(e.target.value));
  };

  // Función que devuelve las opciones de variable según el riesgo climático seleccionado
  const getVariablesForRisk = (risk: string) => {
    switch (risk) {
      case "Mercado":
        return [
          "Precio de la electricidad",
          "Precio del combustible diesel en flota logística",
          "Precio del café",
          "Precio del cacao",
          "Precio de la carne de res",
          "Precio de la carne de cerdo",
          "Precio GLP pdn",
          "Precio diesel pdn",
          "Precio gas pdn",
          "Precio carbón pdn",
          "Consumo de café",
          "Consumo de cacao",
          "Consumo de carne de res",
          "Consumo de carne de cerdo",
        ];
      case "Regulatorio":
        return [
          "Inflación e impuestos al carbono",
          "Energía térmica",
          "Electricidad",
          "Emisiones",
        ];
      case "Tecnológico":
        return [
          "Precio flota logística diesel",
          "Precio medio flota logística diesel",
        ];
      default:
        return [];
    }
  };

  // Función para obtener la variable por defecto según el tipo de riesgo
  const getDefaultVariable = (risk: string) => {
    if (risk === "Mercado") return "Precio del café";
    if (risk === "Regulatorio") return "Inflación e impuestos al carbono";
    if (risk === "Tecnológico") return "Precio flota logística diesel";
    return "";
  };

  // Función para manejar la actualización y mostrar el gráfico
  const handleUpdate = async () => {
    if (variable === "Precio del café") {
      try {
        setLoading(true); // Empieza a cargar

        // Hacer la solicitud al backend
        const response = await fetch(
          `${backendUrl}/coffee_cost_analysis_plot`
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del gráfico");
        }

        // Obtener la respuesta como texto
        const plotHtml = await response.text(); // Usamos .text() en lugar de .json()

        // Mostrar el gráfico si se obtuvo
        setGrafico(plotHtml);
        setMensaje(""); // Limpiar el mensaje si la variable es correcta
      } catch (error) {
        setMensaje("Error al obtener los datos del gráfico");
        setGrafico(null);
        console.error("Error en la llamada a la API:", error);
      } finally {
        setLoading(false); // Termina de cargar
      }
    } else {
      setMensaje("Modelo no implementado todavía");
      setGrafico(null); // Limpiar el gráfico si la variable no es correcta
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-black">
          Análisis de costos
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Seleccione las visualizaciones del análisis de costos generados de la
          lista que se despliega a continuación
        </p>

        {/* Filtro para el pronóstico */}
        <h2 className="text-xl font-semibold mb-4 text-black">
          Seleccione la variable que desea visualizar
        </h2>

        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center">
            <label htmlFor="climateRisk" className="mr-4 text-black">
              Tipo de riesgo climático
            </label>
            <select
              id="climateRisk"
              value={climateRisk}
              onChange={handleClimateRiskChange}
              className="p-3 border-2 border-blue-300 rounded-md text-blue-500 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Mercado">Mercado</option>
              <option value="Regulatorio">Regulatorio</option>
              <option value="Tecnológico">Tecnológico</option>
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="variable" className="mr-4 text-black">
              Variable a visualizar
            </label>
            <select
              id="variable"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              className="p-3 border-2 border-blue-300 rounded-md text-blue-500 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {getVariablesForRisk(climateRisk).map((varOption, index) => (
                <option key={index} value={varOption}>
                  {varOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón de actualización */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white py-3 px-10 rounded-md text-xl font-semibold hover:bg-blue-500 transition duration-300"
          >
            Actualizar
          </button>
        </div>

        {/* Mensaje si no se implementa el modelo */}
        {mensaje && <p className="text-red-500">{mensaje}</p>}

        {/* Mostrar el gráfico si se obtuvo */}
        {loading ? (
          <div className="flex justify-center mt-6">
            <ClipLoader color="#4f46e5" loading={loading} size={50} />
            {/* Usamos ClipLoader, que es más animado y elegante */}
          </div>
        ) : (
          grafico && (
            <div
              style={{ height: "", width: "100%" }} // Asegura que haya espacio suficiente
              className="p-6 mt-6 rounded-md" // Eliminé el borde azul de aquí
            >
              <iframe
                srcDoc={grafico} // Usamos srcDoc para insertar el HTML directamente
                width="100%" // El iframe ocupa el 100% del ancho del contenedor
                height="600px" // Mantén la altura fija (o puedes ajustarlo si quieres)
                frameBorder="0"
                style={{ border: "none" }} // Sin borde en el iframe
              ></iframe>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Costos2;

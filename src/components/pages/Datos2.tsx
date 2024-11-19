import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const FileDetails: React.FC = () => {
  const { fileName } = useParams<{ fileName: string }>(); // Extraer el nombre del archivo de los parámetros de la URL
  const navigate = useNavigate(); // Añadir esto para manejar la navegación
  const [data, setData] = useState<any[]>([]); // Almacena los datos del archivo
  const [headers, setHeaders] = useState<string[]>([]); // Almacena los encabezados del archivo

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/file-data/${fileName}` // Cambié NEXT_PUBLIC_ a REACT_APP_
        );
        setHeaders(response.data.headers); // Asignar encabezados a la variable de estado
        setData(response.data.data); // Asignar datos a la variable de estado
      } catch (error) {
        console.error("Error al obtener los datos del archivo:", error);
      }
    };

    fetchFileData();
  }, [fileName]);

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-2">Datos de {fileName}</h2>
      <button onClick={() => navigate(-1)} className="text-red-500">
        Cerrar
      </button>
    
      {/* Contenedor con desplazamiento */}
      <div
        className="overflow-auto"
        style={{ maxHeight: "400px", maxWidth: "1000px", marginTop: "16px" }}
      >
        <table className="min-w-full">
          <thead>
            <tr>
              {headers.length > 0 &&
                headers.map((header) => (
                  <th key={header} className="border px-4 py-2">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header} className="border px-4 py-2">
                    {String(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

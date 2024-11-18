import { useEffect, useState } from "react";
import axios from "axios";
import { ModuleLayout } from "../ModuleLayout";
import { useNavigate } from "react-router-dom";

export const Costos = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Función para obtener los archivos del DataBank
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/`
      );
      setFiles(response.data.files || []);
    } catch (error) {
      console.error("Error al obtener los archivos:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar los archivos al cargar el componente
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileClick = (fileName: string) => {
    navigate(`/costos2/${fileName}`); // Redirigir a la ruta de detalles para el pronóstico
  };

  return (
    <ModuleLayout>
      <h1 className="text-2xl font-bold">Banco de Costos</h1>
      <p>Aquí puedes visualizar los datos cargados en la plataforma...</p>
      {loading ? (
        <p>Cargando archivos...</p>
      ) : files.length === 0 ? (
        <p>No hay archivos disponibles en el DataBank.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {files.map((file, index) => {
            // Formatear el nombre del archivo
            const formattedName = file
              .replace(/_/g, " ")
              .replace(/\.(csv|xlsx)$/, "");
            return (
              <div
                style={{ cursor: "pointer" }}
                key={index}
                className="p-4 border rounded shadow hover:shadow-lg transition"
                onClick={() => handleFileClick(file)}
              >
                <h2 className="text-lg font-semibold">{formattedName}</h2>
                <p className="text-sm text-gray-500">
                  Click aquí para revisar.
                </p>
              </div>
            );
          })}
        </div>
      )}
    </ModuleLayout>
  );
};

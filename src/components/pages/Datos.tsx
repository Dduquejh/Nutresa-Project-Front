import React, { useState, useEffect } from "react";
import { ModuleLayout } from "../ModuleLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export const Datos = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [fileToDelete, setFileToDelete] = useState<string>("");
  const [deletAll, setDeleteAll] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert("Por favor, selecciona al menos un archivo");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      alert(response.data.message);
      fetchUploadedFiles();
    } catch (error) {
      console.error("Error al subir archivos:", error);
      alert("Error al subir archivos");
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/`
      );
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error("Error al obtener archivos:", error);
    }
  };

  const handleFileClick = (fileName: string) => {
    navigate(`/file/${fileName}`); // Redirigir a la ruta de detalles
  };

  const handleDelete = async () => {
    if (!fileToDelete) {
      alert("Por favor, introduce el nombre del archivo a eliminar");
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${fileToDelete}`
      );
      alert(`Archivo '${fileToDelete}' eliminado correctamente`);
      fetchUploadedFiles(); // Actualizar la lista de archivos
      setFileToDelete(""); // Limpiar el input
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
      alert("Error al eliminar el archivo");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files`);
      alert("Todos los archivos han sido eliminados correctamente");
      fetchUploadedFiles(); // Actualizar la lista de archivos
      setDeleteAll(false); // Limpiar el input
    } catch (error) {
      console.error("Error al eliminar los archivos:", error);
      alert("Error al eliminar los archivos");
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <ModuleLayout>
      <div className="w-full max-w-md mx-auto text-center">
        <label className="flex flex-col items-center cursor-pointer border-2 border-dashed border-blue-400 rounded-lg p-2 bg-blue-100 hover:bg-blue-200 transition mt-40">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-blue-500 text-2xl">📄</span>
          <span className="text-gray-700 mt-1 text-sm">Cargar datos</span>
        </label>

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
        >
          Subir archivos
        </button>

        {/* Mostrar archivos subidos */}
        <div className="mt-5">
          {uploadedFiles.length > 0 && (
            <h3 className="text-lg font-semibold">Archivos Subidos:</h3>
          )}
          <ul>
            {uploadedFiles.map((fileName) => (
              <li
                key={fileName}
                className="bg-gray-100 p-2 rounded mt-1 cursor-pointer hover:bg-gray-200"
                onClick={() => handleFileClick(fileName)}
              >
                {fileName}
              </li>
            ))}
          </ul>
        </div>

        {/* Input para eliminar archivo */}
        <div className="mt-28">
          <input
            type="text"
            value={fileToDelete}
            onChange={(e) => setFileToDelete(e.target.value)}
            placeholder="Nombre del archivo a eliminar"
            className="border p-2 rounded w-full text-center"
          />
          <button
            onClick={handleDelete}
            className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
          >
            Eliminar archivo
          </button>
        </div>

        {/* Botón para eliminar todos los archivos */}
        <div className="-mt-2">
          <button
            onClick={handleDeleteAll}
            className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
          >
            Eliminar todos los archivos
          </button>
        </div>
      </div>
    </ModuleLayout>
  );
};

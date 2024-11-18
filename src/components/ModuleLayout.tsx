import React from "react";
import { modules } from "../components/pages/Inicio";
import { useNavigate, useLocation } from "react-router-dom";

export const ModuleLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sección Izquierda: Módulos */}
      <div className="w-3/4 p-8 bg-white flex flex-col justify-start">
        {/* Imagen Logo encima de Mis Módulos */}
        <img
          src="src/Images/Logo2.png"
          className="w-60 mb-4 mx-auto"
          style={{ marginTop: "-21px" }}
          draggable={false}
        />
        <h2 className="text-2xl font-bold mb-4 text-center my-12">
          Mis Módulos
        </h2>
        <div className="relative">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`p-4 mb-4 rounded-xl shadow-md cursor-pointer ${module.bgColor} relative flex items-center`}
              onClick={() => navigate(module.url)}
            >
              <div className="text-3xl mr-4">{module.icon}</div>
              <div className="flex-1 max-w-xs p-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {module.title}
                </h2>
                <p className="text-gray-600 line-clamp-2">
                  {module.description}
                </p>
              </div>

              {/* Flecha fuera del módulo */}
              {location.pathname === module.url && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Línea de separación */}
      <div
        className="w-px bg-gray-300 mx-4"
        style={{
          height: "calc(100vh - 64px)",
          position: "relative",
          top: "32px",
        }}
      ></div>

      {/* Sección Derecha: Contenido dinámico */}
      <div className="w-2/3 p-8">{children}</div>
    </div>
  );
};

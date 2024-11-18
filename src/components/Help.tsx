import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Cambia el estado al hacer clic en el botón
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Botón principal */}
      <button
        onClick={toggleMenu}
        className="bg-blue-100 text-black rounded-full p-3 shadow-sm hover:bg-blue-200 transition-all focus:outline-none"
      >
        {isOpen ? "✕" : "❔"}{" "}
        {/* Cambia el ícono del botón cuando se abre/cierra */}
      </button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg p-4 mt-2 w-56 shadow-sm text-left"
          >
            <h3 className="text-sm font-medium mb-2 text-gray-700">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Contáctanos si tienes alguna duda:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>
                <strong>Email:</strong> juan.perez50@eia.edu.co
              </li>
              <li>
                <strong>Teléfono:</strong> 312-883-14-75
              </li>
              <li>
                <strong>Horario:</strong> Lunes a Viernes, 9 AM - 5 PM
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

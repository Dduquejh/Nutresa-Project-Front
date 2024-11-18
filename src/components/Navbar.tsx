import { useState } from "react";
import { FaUserCircle, FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import CriskAiLogo from "../Images/Logo2.png"; // Ruta de la imagen del logo
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-lg h-16 flex items-center justify-between px-4 relative">
      <div className="flex items-center justify-center p-4">
        <img
          src={CriskAiLogo}
          alt="Crisk AI"
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="flex items-center">
        <div className="ml-4 relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
          >
            <FaUserCircle className="text-gray-700 w-8 h-8" />
            <FaCaretDown className="text-gray-700 w-4 h-4 ml-1" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <Link to="/">
                <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FaSignOutAlt className="w-5 h-5 mr-2" />
                  Cerrar sesión
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

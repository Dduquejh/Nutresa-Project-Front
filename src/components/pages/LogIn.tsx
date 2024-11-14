import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobeGraphic from "../../Images/PlanetLogin.png";
import EIALogo from "../../Images/Logo.png";
import CriskAi from "../../Images/Logo2.png";

export const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false); // Modo de registro

  // Validaciones
  const validateEmail = (email: string) => {
    // Expresión regular para validar un correo
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    // Contraseña mínima de 6 caracteres, con al menos un número y un carácter especial
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{6,}$/;
    return regex.test(password);
  };

  // Función para manejar el inicio de sesión o registro
  const handleAuth = async () => {
    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 6 caracteres, incluir un número y un carácter especial.");
      return;
    }

    const url = isRegisterMode
      ? "http://localhost:8000/register" // Ruta de registro
      : "http://localhost:8000/login";    // Ruta de login

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Asegúrate de enviar el tipo de contenido como JSON
        },
        body: JSON.stringify({
          username: email, // Enviar el correo electrónico como "username"
          password: password, // Enviar la contraseña tal cual
        }),
      });

      if (response.ok) {
        navigate("/inicio"); // Redirigir si tiene éxito
      } else {
        const result = await response.json();
        setError(result.detail || (isRegisterMode ? "Error al registrarse" : "Error al iniciar sesión"));
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex h-screen items-center">
      {/* Contenedor de la parte izquierda */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          <img src={EIALogo} alt="EIA Logo" className="mb-8 w-32" />
          <h2 className="text-2xl font-semibold mb-6">{isRegisterMode ? "Registrarse" : "Iniciar sesión"}</h2>

          {/* Campos de entrada */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          {/* Mostrar error */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Botón de Autenticación */}
          <button
            onClick={handleAuth}
            className="bg-teal-800 text-white px-4 py-2 rounded-md w-full hover:bg-teal-900 transition"
          >
            {isRegisterMode ? "Registrar" : "Inicia sesión"}
          </button>

          {/* Enlace para alternar entre Iniciar Sesión y Registrarse */}
          <button
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setError(null);
            }}
            className="mt-4 text-blue-500 hover:underline"
          >
            {isRegisterMode ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </button>
        </div>
      </div>

      {/* Contenedor de la parte derecha */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <img src={GlobeGraphic} alt="Planet Graphic" className="w-4/5 max-w-xs mb-12" />
        <img src={CriskAi} alt="CriskAI Logo" className="w-1/3 max-w-xs" />
      </div>
    </div>
  );
};

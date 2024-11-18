import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { ErrorComponent } from "./components/ErrorComponent";
import { Inicio } from "./components/pages/Inicio";
import { LogIn } from "./components/pages/LogIn";
import { Datos } from "./components/pages/Datos";
import { HelpButton } from "./components/Help";
import { FileDetails } from "./components/pages/Datos2";
import { Pronosticos } from "./components/pages/Pronosticos";
import { Costos } from "./components/pages/Costos";
import { Escenarios } from "./components/pages/Escenarios";
import { Navbar } from "./components/Navbar";
import Pronosticos2 from "./components/pages/Pronosticos2";
import Costos2 from "./components/pages/Costos2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        {/* Rutas con la Sidebar y Navbar */}
        <Route
          path="/file/:fileName"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <HelpButton />
              <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-4">
                  <FileDetails />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/inicio"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <HelpButton />
              <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-4">
                  <Inicio />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/datos"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-4">
                  <Datos />
                </div>
              </div>
              <HelpButton />
            </div>
          }
        />
        <Route
          path="/pronosticos"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-4">
                  <Pronosticos />
                </div>
              </div>
              <HelpButton />
            </div>
          }
        />
        <Route
          path="/pronosticos2/:fileName"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <HelpButton />
              <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-4">
                  <Pronosticos2 />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/costos"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-4">
                  <Costos />
                </div>
              </div>
              <HelpButton />
            </div>
          }
        />
        <Route
          path="/costos2/:fileName"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <HelpButton />
              <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-4">
                  <Costos2 />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/escenarios"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex flex-col flex-1">
                <Navbar />
                <div className="flex-1 p-4">
                  <Escenarios />
                </div>
              </div>
              <HelpButton />
            </div>
          }
        />
        {/* Página de error sin Sidebar */}
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

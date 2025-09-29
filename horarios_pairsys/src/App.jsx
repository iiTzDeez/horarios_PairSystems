import { Routes, Route, Link } from "react-router-dom";
import InserirHorario from "./pages/InserirHorario.jsx";
import VerHorario from "./pages/VerHorario.jsx";
import { useState } from "react";

export default function App() {
  const [horarios, setHorarios] = useState({});

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-center gap-6 shadow-lg">
        <Link to="/" className="hover:text-green-400 font-medium">
          Inserir Horário
        </Link>
        <Link to="/ver" className="hover:text-green-400 font-medium">
          Ver Horários
        </Link>
      </nav>

      {/* Conteúdo central */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Routes>
          <Route
            path="/"
            element={<InserirHorario horarios={horarios} setHorarios={setHorarios} />}
          />
          <Route path="/ver" element={<VerHorario horarios={horarios} />} />
        </Routes>
      </div>
    </div>
  );
}

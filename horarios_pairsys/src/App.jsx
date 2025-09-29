import { Routes, Route, Link } from "react-router-dom";
import InserirHorario from "./pages/InserirHorario";
import VerHorario from "./pages/VerHorario";
import { useEffect, useState } from "react";

const STORAGE_KEY = "pairsystems_horarios_v1";

export default function App() {
  // Carregar do localStorage na inicialização
  const [horarios, setHorarios] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Guardar no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(horarios));
    } catch {
      /* se o utilizador estiver em modo privado ou storage cheio, ignorar */
    }
  }, [horarios]);

  // (Opcional) limpar tudo rapidamente
  const resetAll = () => {
    setHorarios({});
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex justify-center gap-6 shadow-lg">
        <Link to="/inserir" className="hover:text-green-400 font-medium">
          Inserir Horário
        </Link>
        <Link to="/ver" className="hover:text-green-400 font-medium">
          Ver Horários
        </Link>
        {/* Opcional: botão para limpar tudo */}
        {/* <button onClick={resetAll} className="ml-4 text-sm text-red-400 hover:text-red-500">Limpar tudo</button> */}
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <Routes>
          <Route
            path="/inserir"
            element={<InserirHorario horarios={horarios} setHorarios={setHorarios} />}
          />
          <Route
            path="/ver"
            element={<VerHorario horarios={horarios} setHorarios={setHorarios} />}
          />
          {/* Página inicial = Ver Horários */}
          <Route
            path="/"
            element={<VerHorario horarios={horarios} setHorarios={setHorarios} />}
          />
        </Routes>
      </div>
    </div>
  );
}

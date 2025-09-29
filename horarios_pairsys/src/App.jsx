import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import InserirHorario from "./pages/InserirHorario";
import VerHorario from "./pages/VerHorario";
import { supabase } from "./lib/supabase";

export default function App() {
  const [horarios, setHorarios] = useState({});

  // Carregar horários do Supabase ao iniciar
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("horarios").select("*");
      if (error) {
        console.error("Erro a carregar horários:", error);
        return;
      }
      const porDia = {};
      (data || []).forEach((h) => {
        if (!porDia[h.dia]) porDia[h.dia] = [];
        porDia[h.dia].push({ inicio: h.inicio, fim: h.fim });
      });
      setHorarios(porDia);
    };
    fetchData();
  }, []);

  // Adicionar horário (DB -> estado)
  const adicionarHorario = async (dia, inicio, fim) => {
    const { data, error } = await supabase
      .from("horarios")
      .insert({ dia, inicio, fim })
      .select();

    if (error) {
      console.error("Erro ao inserir:", error);
      return;
    }

    // atualiza estado local
    setHorarios((prev) => ({
      ...prev,
      [dia]: [...(prev[dia] || []), { inicio, fim }],
    }));
  };

  // Remover horário (DB -> estado)
  const removerHorario = async (dia, index) => {
    const alvo = horarios[dia]?.[index]; // { inicio, fim }
    if (!alvo) return;

    const { error } = await supabase
      .from("horarios")
      .delete()
      .match({ dia, inicio: alvo.inicio, fim: alvo.fim });

    if (error) {
      console.error("Erro ao remover na DB:", error);
      alert("❌ Não foi possível remover na base de dados.");
      return;
    }

    setHorarios((prev) => {
      const c = { ...prev };
      c[dia] = (c[dia] || []).filter((_, i) => i !== index);
      return c;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-center gap-6 shadow-lg">
        <Link to="/inserir" className="hover:text-green-400 font-medium">
          Inserir Horário
        </Link>
        <Link to="/ver" className="hover:text-green-400 font-medium">
          Ver Horários
        </Link>
      </nav>

      {/* Conteúdo */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Routes>
          <Route
            path="/inserir"
            element={
              <InserirHorario
                horarios={horarios}
                setHorarios={setHorarios}
                adicionarHorario={adicionarHorario}
              />
            }
          />
          <Route
            path="/ver"
            element={
              <VerHorario
                horarios={horarios}
                removerHorario={removerHorario}
              />
            }
          />
          {/* Página inicial → Ver Horários */}
          <Route
            path="/"
            element={
              <VerHorario
                horarios={horarios}
                removerHorario={removerHorario}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

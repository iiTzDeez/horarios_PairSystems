import { useState } from "react";
import { supabase } from "../lib/supabase";
import TimePicker from "../components/TimePicker";

export default function InserirHorario({ horarios, setHorarios }) {
  const [dia, setDia] = useState("Segunda");
  const [inicio, setInicio] = useState("09:00");
  const [fim, setFim] = useState("17:00");
  const [mensagem, setMensagem] = useState("");

  const handleAdd = async () => {
    if (!inicio || !fim) return;

    // opcional: guarda local evita piscadelas
    if (horarios[dia]?.some(h => h.inicio === inicio && h.fim === fim)) {
      setMensagem(`⚠️ O horário ${inicio}-${fim} já existe para ${dia}.`);
      return;
    }

    const { data, error } = await supabase
      .from("horarios")
      .upsert({ dia, inicio, fim }, { onConflict: "dia,inicio,fim" })
      .select();

    if (error) {
      setMensagem("❌ Erro ao adicionar horário.");
      console.error(error);
      return;
    }

    // se já existia, o upsert não cria duplicado; data pode vir vazia
    if (!data || data.length === 0) {
      setMensagem(`⚠️ O horário ${inicio}-${fim} já existe para ${dia}.`);
      return;
    }

    setHorarios(prev => ({
      ...prev,
      [dia]: [...(prev[dia] || []), { inicio, fim }],
    }));
    setMensagem("✅ Horário adicionado com sucesso!");
  };


  return (
    <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Inserir Horário</h2>

      <label className="block mb-2 font-medium">Dia da semana</label>
      <select
        value={dia}
        onChange={(e) => setDia(e.target.value)}
        className="w-full mb-6 p-2 rounded bg-gray-700 text-white"
      >
        <option>Segunda</option>
        <option>Terça</option>
        <option>Quarta</option>
        <option>Quinta</option>
        <option>Sexta</option>
        <option>Sábado</option>
        <option>Domingo</option>
      </select>

      {/* 🔹 stack vertical: Início em cima, Fim abaixo */}
      <div className="space-y-4 mb-6">
        <TimePicker label="Início" value={inicio} onChange={setInicio} />
        <TimePicker label="Fim" value={fim} onChange={setFim} />
      </div>

      <button
        onClick={handleAdd}
        className="w-full py-2 bg-green-600 rounded-lg hover:bg-green-500 transition"
      >
        Adicionar
      </button>

      {mensagem && (
        <p className="mt-4 text-center text-sm text-gray-300">{mensagem}</p>
      )}
    </div>
  );
}

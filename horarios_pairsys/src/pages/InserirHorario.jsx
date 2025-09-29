import { useState } from "react";
import TimeSelector from "../components/TimeSelector";

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export default function InserirHorario({ horarios, setHorarios }) {
  const [dia, setDia] = useState("Segunda");
  const [inicio, setInicio] = useState("15:00");
  const [fim, setFim] = useState("19:00");

  const adicionarHorario = () => {
    if (!inicio || !fim) return;
    setHorarios((prev) => ({
      ...prev,
      [dia]: [...(prev[dia] || []), { inicio, fim }],
    }));
    setInicio("15:00");
    setFim("19:00");
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-400">
        Inserir Horário
      </h2>

      <label className="block mb-2 font-semibold">Dia da semana</label>
      <select
        value={dia}
        onChange={(e) => setDia(e.target.value)}
        className="border rounded p-2 w-full mb-4 bg-gray-700 text-white"
      >
        {diasSemana.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <div className="flex flex-col gap-4 mb-6">
        <TimeSelector label="Início" value={inicio} onChange={setInicio} />
        <TimeSelector label="Fim" value={fim} onChange={setFim} />
      </div>

      <button
        onClick={adicionarHorario}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full font-semibold transition"
      >
        Adicionar
      </button>
    </div>
  );
}

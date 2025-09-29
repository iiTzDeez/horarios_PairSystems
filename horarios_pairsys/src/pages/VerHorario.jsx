import HorarioCard from "../components/HorarioCard.jsx";

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export default function VerHorario({ horarios }) {
  return (
    <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
        Horários da Semana
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {diasSemana.map((dia) => (
          <HorarioCard key={dia} dia={dia} lista={horarios[dia] || []} />
        ))}
      </div>
    </div>
  );
}

import HorarioCard from "../components/HorarioCard";

const diasSemana = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export default function VerHorario({ horarios, removerHorario }) {
  // (opcional) ordenar por hora de início
  const ordena = (lista = []) =>
    [...lista].sort((a, b) => (a.inicio > b.inicio ? 1 : -1));

  const totalItens = Object.values(horarios || {}).reduce(
    (acc, arr) => acc + (arr?.length || 0),
    0
  );

  return (
    <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
        Horários da Semana
      </h2>

      {totalItens === 0 && (
        <p className="text-center text-sm text-gray-400 mb-4">
          Ainda não há horários inseridos.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {diasSemana.map((dia) => (
          <HorarioCard
            key={dia}
            dia={dia}
            lista={ordena(horarios?.[dia] || [])}
            onRemove={removerHorario}
          />
        ))}
      </div>
    </div>
  );
}

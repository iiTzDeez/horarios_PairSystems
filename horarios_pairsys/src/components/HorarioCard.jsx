export default function HorarioCard({ dia, lista }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-green-500/30 transition">
      <h3 className="text-lg font-bold text-green-300 mb-2">{dia}</h3>
      {lista.length === 0 ? (
        <p className="text-gray-400 text-sm">Sem horários</p>
      ) : (
        <ul className="space-y-1">
          {lista.map((h, i) => (
            <li
              key={i}
              className="bg-green-500/20 text-green-200 px-3 py-1 rounded text-sm"
            >
              {h.inicio} - {h.fim}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

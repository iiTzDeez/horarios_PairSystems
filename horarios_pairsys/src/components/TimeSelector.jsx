import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimeSelector({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "00:00");
  const wrapperRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

  // Fechar ao clicar fora
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  const clampTime = (h, m) => {
    let hh = Math.min(Math.max(parseInt(h || "0", 10) || 0, 0), 23);
    let mm = Math.min(Math.max(parseInt(m || "0", 10) || 0, 0), 59);
    return { hh: String(hh).padStart(2, "0"), mm: String(mm).padStart(2, "0") };
  };

  // Converte "830" -> "08:30", "9" -> "09:00", etc.
  const formatFreeform = (v) => {
    const digits = v.replace(/[^\d]/g, "");
    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits.padStart(2, "0") + ":00";
    if (digits.length === 3) return digits.slice(0, 1).padStart(2, "0") + ":" + digits.slice(1).padEnd(2, "0").slice(0, 2);
    return digits.slice(0, 2) + ":" + digits.slice(2, 4).padEnd(2, "0").slice(0, 2);
  };

  const commitTime = (raw) => {
    const str = raw.includes(":") ? raw : formatFreeform(raw);
    const [h = "00", m = "00"] = (str || "").split(":");
    const { hh, mm } = clampTime(h, m);
    const finalVal = `${hh}:${mm}`;
    setInputValue(finalVal);
    onChange(finalVal);
  };

  const handleSelect = (h, m) => {
    commitTime(`${h}:${m}`);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9:]/g, "");
    setInputValue(val);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitTime(inputValue);
      setOpen(false);
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setOpen(false);
      e.currentTarget.blur();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  // Valores atuais para destacar botões
  const [curH, curM] = (inputValue.includes(":") ? inputValue : formatFreeform(inputValue) || "00:00").split(":");
  const hourSel = (curH || "00").padStart(2, "0");
  const minuteSel = (curM || "00").padStart(2, "0");

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label className="block text-sm font-medium mb-1">{label}</label>

      <input
        type="text"
        inputMode="numeric"
        placeholder="HH:MM"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18 }}
            className="absolute z-10 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 grid grid-cols-2 gap-4 w-full max-h-60 overflow-y-auto"
          >
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Horas</h4>
              <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-2">
            {hours.map((h) => (
                <button
                key={h}
                onClick={() => handleSelect(h, minuteSel)}
                className={`px-2 py-1 rounded text-sm sm:text-base ${
                    h === hourSel ? "bg-green-500 text-white" : "bg-gray-700 hover:bg-gray-600"
                }`}
                >
                {h}
                </button>
            ))}
            </div>

            </div>

            <div>
              <h4 className="text-green-400 font-semibold mb-2">Minutos</h4>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-2">
                {minutes.map((m) => (
                    <button
                    key={m}
                    onClick={() => handleSelect(hourSel, m)}
                    className={`px-2 py-1 rounded text-sm sm:text-base ${
                        m === minuteSel ? "bg-green-500 text-white" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    >
                    {m}
                    </button>
                ))}
                </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Calendar, Users, Search, MapPin } from "lucide-react";

export default function FlightSearch({ onSearch }) {
  const [from, setFrom] = useState("Delhi (DEL)");
  const [to, setTo] = useState("Bangalore (BLR)");
  const [date, setDate] = useState("2026-10-15");
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="mx-auto max-w-full rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_1fr] md:items-center">
        
        {/* From City */}
        <div className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition focus-within:border-amber-500">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">From</label>
          <div className="mt-1 flex items-center gap-2">
            <MapPin size={17} className="text-amber-600" />
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-transparent font-black text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <motion.button
            type="button"
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwap}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-amber-400 hover:text-amber-600"
          >
            <ArrowLeftRight size={17} />
          </motion.button>
        </div>

        {/* To City */}
        <div className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition focus-within:border-amber-500">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">To</label>
          <div className="mt-1 flex items-center gap-2">
            <MapPin size={17} className="text-orange-600" />
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-transparent font-black text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition focus-within:border-amber-500">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Departure Date</label>
          <div className="mt-1 flex items-center gap-2">
            <Calendar size={17} className="text-amber-600" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent font-black text-slate-900 outline-none"
            />
          </div>
        </div>

      </div>

      {/* Passenger & Class Dropdown Trigger */}
      <div className="relative mt-4">
        <button
          type="button"
          onClick={() => setIsPassengerOpen(!isPassengerOpen)}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-left transition hover:border-slate-300"
        >
          <div className="flex items-center gap-3">
            <Users size={18} className="text-amber-600" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Passengers & Cabin</p>
              <p className="mt-0.5 text-sm font-black text-slate-800">{passengers} Passenger(s) • {travelClass}</p>
            </div>
          </div>
        </button>

        {/* Animated Dropdown Expansion */}
        <AnimatePresence>
          {isPassengerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-sm font-black text-slate-700">Passengers</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 font-bold hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="font-black w-4 text-center">{passengers}</span>
                  <button
                    onClick={() => setPassengers(passengers + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 font-bold hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <span className="text-sm font-black text-slate-700">Class</span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {["Economy", "Business", "First Class"].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setTravelClass(cls)}
                      className={`rounded-xl py-2 text-xs font-black transition ${
                        travelClass === cls
                          ? "bg-slate-950 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSearch?.({ from, to, date, passengers, travelClass })}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 py-4 font-black text-white shadow-lg shadow-amber-500/25"
      >
        <Search size={18} />
        Search Flights
      </motion.button>
    </div>
  );
}
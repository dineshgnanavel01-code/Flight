import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check,Plane,ShieldCheck, Sparkles,Users,Armchair,CreditCard,Info,Crown,Compass,} from "lucide-react";

const rows = Array.from({ length: 10 }, (_, index) => index + 1);
const letters = ["A", "B", "C", "D", "E", "F"];


const unavailable = [
  "1C", "2B", "2E", "3A", "3F", "4D", 
  "5B", "6A", "6F", "7C", "8E", "9A", "9D", "10F"
];

const seatPrices = {
  A: 5599,
  B: 1349,
  C: 1249,
  D: 5249,
  E: 7349,
  F: 2599,
};

export default function SeatSelection({ onContinue = () => {} }) {
  const [selected, setSelected] = useState([]);

  const selectSeat = (seat) => {
    if (unavailable.includes(seat)) return;

    setSelected((current) => {
      if (current.includes(seat)) {
        return current.filter((item) => item !== seat);
      }
      return [...current, seat];
    });
  };

  const total = useMemo(() => {
    return selected.reduce((sum, seat) => {
      const letter = seat.slice(-1);
      return sum + seatPrices[letter];
    }, 0);
  }, [selected]);

  const availableCount = rows.length * letters.length - unavailable.length;

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:py-12">
    
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-orange-600/10 blur-[140px]"
        />
      </div>

      <div className="relative mx-auto max-w-full">
       
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-amber-400 shadow-lg shadow-amber-500/5">
            <Crown size={15} className="text-amber-400 animate-pulse" />
            First Class Experience
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Reserve your
            <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              exclusive seating
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Upgrade your journey with stunning panoramic window views or extra legroom aisle selections tailored for maximum comfort.
          </p>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <StatCard icon={<Users size={17} />} label="Total Seats" value="60" />
          <StatCard icon={<Check size={17} />} label="Available" value={availableCount} />
          <StatCard icon={<Armchair size={17} />} label="Selected" value={selected.length} />
          <StatCard icon={<CreditCard size={17} />} label="Seat Fee" value={`₹${total.toLocaleString("en-IN")}`} />
        </motion.div>

     
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          
       
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="rounded-[2.5rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            <div className="relative mx-auto mb-8 max-w-xl">
              <div className="h-24 rounded-t-[4rem] bg-gradient-to-b from-slate-800/80 to-slate-900/40 border-t border-x border-slate-700/50 shadow-inner flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/20"
                >
                  <Plane size={24} className="rotate-90" />
                </motion.div>
              </div>
              <div className="absolute left-1/2 top-3 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                Flight Deck / Cockpit
              </div>
            </div>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold text-slate-400">
              <LegendItem className="bg-slate-800 border border-slate-700" text="Available" />
              <LegendItem className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30" text="Selected" />
              <LegendItem className="bg-slate-950 border border-slate-800 opacity-50" text="Occupied" />
              <LegendItem className="bg-amber-500/20 border border-amber-500/40 text-amber-300" text="VIP Premium" />
            </div>

            <div className="mx-auto max-w-xl">
              <div className="mb-3 grid grid-cols-[28px_repeat(6,1fr)] gap-2 px-1 text-center text-[10px] font-black uppercase tracking-wider text-slate-500">
                <span />
                <span>A<small className="block font-medium normal-case text-slate-400">Window</small></span>
                <span>B<small className="block font-medium normal-case text-slate-400">Middle</small></span>
                <span>C<small className="block font-medium normal-case text-slate-400">Aisle</small></span>
                <span>D<small className="block font-medium normal-case text-slate-400">Aisle</small></span>
                <span>E<small className="block font-medium normal-case text-slate-400">Middle</small></span>
                <span>F<small className="block font-medium normal-case text-slate-400">Window</small></span>
              </div>

              <div className="space-y-2.5">
                {rows.map((row) => (
                  <motion.div
                    key={row}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + row * 0.03 }}
                    className="grid grid-cols-[28px_repeat(6,1fr)] items-center gap-2"
                  >
                    <span className="text-center text-[11px] font-black text-slate-500">
                      {row}
                    </span>

                    {letters.map((letter, index) => {
                      const seat = `${row}${letter}`;
                      const isUnavailable = unavailable.includes(seat);
                      const isSelected = selected.includes(seat);
                      const isPremium = row <= 2;

                      return (
                        <SeatNode
                          key={seat}
                          seat={seat}
                          price={seatPrices[letter]}
                          isUnavailable={isUnavailable}
                          isSelected={isSelected}
                          isPremium={isPremium}
                          onClick={() => selectSeat(seat)}
                          gap={index === 2}
                        />
                      );
                    })}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-xl border-t border-dashed border-slate-800 pt-5 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Aft Cabin / Exit
              </span>
            </div>
          </motion.div>

          <div className="lg:sticky lg:top-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900 shadow-2xl backdrop-blur-xl"
            >
              <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200">
                      Itinerary Manifest
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-white">
                      Seat Summary
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/25 backdrop-blur-md shadow-inner border border-white/20">
                    <Armchair className="text-amber-200" size={22} />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Chosen Manifest
                    </p>
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-black text-amber-400">
                      {selected.length} {selected.length === 1 ? "Seat" : "Seats"}
                    </span>
                  </div>

                  <AnimatePresence mode="popLayout">
                    {selected.length > 0 ? (
                      <div className="mt-4 space-y-2.5 max-h-60 overflow-y-auto pr-1">
                        {selected.map((seat) => (
                          <motion.div
                            key={seat}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3.5 backdrop-blur-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 font-black text-white shadow-md shadow-amber-500/30">
                                {seat}
                              </div>
                              <div>
                                <p className="text-sm font-black text-white">
                                  Seat {seat}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {getSeatType(seat)}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm font-black text-amber-400">
                              ₹{seatPrices[seat.slice(-1)].toLocaleString("en-IN")}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-6 text-center"
                      >
                        <Armchair size={30} className="mx-auto text-slate-700" />
                        <p className="mt-2 text-sm font-bold text-slate-400">
                          No seats selected yet
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          Select your desired seats from the aircraft cabin map
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="my-6 border-t border-slate-800 pt-5">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Seat reservation fees</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <span className="font-black text-slate-200">Grand Total</span>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-black text-white"
                    >
                      ₹{total.toLocaleString("en-IN")}
                    </motion.span>
                  </div>
                </div>

                <motion.button
                  disabled={selected.length === 0}
                  whileHover={selected.length ? { scale: 1.02, y: -2 } : {}}
                  whileTap={selected.length ? { scale: 0.98 } : {}}
                  onClick={() => selected.length > 0 && onContinue(selected)}
                  className={`group flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-black shadow-xl transition-all duration-300 ${
                    selected.length
                      ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-amber-500/25 hover:shadow-amber-500/40"
                      : "cursor-not-allowed bg-slate-800 text-slate-500 shadow-none border border-slate-700/50"
                  }`}
                >
                  Proceed to Secure Checkout
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
                </motion.button>

                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 backdrop-blur-sm">
                  <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-xs font-black text-emerald-300">
                      Guaranteed Instant Allocation
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-emerald-400/80">
                      Your chosen seat options are securely held in real-time during your active session.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-2">
                <Info size={16} className="text-amber-400" />
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Fare Class Tiers
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <PriceTag label="Window View" price="₹599" />
                <PriceTag label="Middle Space" price="₹349" />
                <PriceTag label="Aisle Access" price="₹249" />
                <PriceTag label="VIP Row 1-2" price="₹599+" />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3"
        >
          <FeatureBadge icon={<Sparkles size={18} />} title="VIP Comfort" text="Ample legroom choices" />
          <FeatureBadge icon={<Compass size={18} />} title="Panoramic Scenery" text="Unobstructed horizon views" />
          <FeatureBadge icon={<ShieldCheck size={18} />} title="Encrypted Booking" text="Fully secure transactions" />
        </motion.div>
      </div>
    </section>
  );
}



function SeatNode({ seat, price, isUnavailable, isSelected, isPremium, onClick, gap }) {
  return (
    <motion.button
      type="button"
      disabled={isUnavailable}
      whileHover={!isUnavailable ? { scale: 1.08, y: -2 } : {}}
      whileTap={!isUnavailable ? { scale: 0.93 } : {}}
      animate={{ scale: isSelected ? 1.08 : 1 }}
      onClick={onClick}
      title={isUnavailable ? `${seat} - Occupied` : `${seat} - ₹${price}`}
      className={`relative h-11 rounded-xl border text-xs font-black transition-all sm:h-12 ${
        gap ? "mr-4" : ""
      } ${
        isUnavailable
          ? "cursor-not-allowed border-slate-800 bg-slate-950 text-slate-700 opacity-40 shadow-inner"
          : isSelected
          ? "border-amber-400 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_10px_30px_rgba(245,158,11,0.4)]"
          : isPremium
          ? "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:border-amber-400 hover:bg-amber-500/20 shadow-sm"
          : "border-slate-800 bg-slate-900 text-slate-300 hover:border-amber-500/50 hover:bg-slate-800/80 shadow-sm"
      }`}
    >
      <span className="flex h-full flex-col items-center justify-center">
        {isSelected ? (
          <Check size={16} strokeWidth={3} className="text-white drop-shadow" />
        ) : (
          <span>{seat.slice(1)}</span>
        )}

        {!isUnavailable && !isSelected && (
          <span className="mt-0.5 text-[7px] font-extrabold opacity-60 tracking-tighter">
            ₹{price}
          </span>
        )}
      </span>

      {isPremium && !isUnavailable && !isSelected && (
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50 animate-pulse" />
      )}
    </motion.button>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 text-amber-400">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>
      <p className="mt-1 text-2xl font-black text-white tracking-tight">
        {value}
      </p>
    </div>
  );
}

function LegendItem({ className, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3.5 w-3.5 rounded-md ${className}`} />
      <span className="text-slate-300">{text}</span>
    </div>
  );
}

function FeatureBadge({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
        {icon}
      </div>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="text-xs text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function PriceTag({ label, price }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2.5">
      <p className="text-[10px] font-bold text-slate-400">{label}</p>
      <p className="mt-0.5 text-xs font-black text-amber-400">{price}</p>
    </div>
  );
}

function getSeatType(seat) {
  const letter = seat.slice(-1);
  if (letter === "A" || letter === "F") return "Window Seat";
  if (letter === "C" || letter === "D") return "Aisle Seat";
  return "Middle Seat";
}
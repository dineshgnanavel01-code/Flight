import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plane, Search, X, Ticket, Compass, UserRound, Armchair, CreditCard, CheckCircle2 } from "lucide-react";

const items = [
  { key: "search", label: "Search", icon: Search },
  { key: "results", label: "Flights", icon: Compass },
  { key: "details", label: "Details", icon: Ticket },
  { key: "passenger", label: "Passenger", icon: UserRound },
  { key: "seats", label: "Seats", icon: Armchair },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "confirmation", label: "Confirmation", icon: CheckCircle2 },
];

export default function Navbar({ page, selectedFlight, searched, confirmed, onNavigate }) {
  const [open, setOpen] = useState(false);

  const available = (key) => {
    if (key === "search") return true;
    if (key === "results") return searched;
    if (key === "details" || key === "passenger" || key === "seats" || key === "payment") return !!selectedFlight;
    if (key === "confirmation") return confirmed;
    return true;
  };

  const go = (key) => {
    if (!available(key)) return;
    onNavigate?.(key);
    setOpen(false);
    document.getElementById(key)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const journeyActive = ["details", "passenger", "seats", "payment", "confirmation"].includes(page);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="app-navbar fixed inset-x-0 top-0 z-[200] border-b border-amber-400/15 bg-[#0d0f17]/90 px-4 py-3 backdrop-blur-2xl sm:px-6"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <button type="button" onClick={() => go("search")} className="group flex items-center gap-3 text-left" aria-label="Go to flight search">
          <motion.span whileHover={{ rotate: -8, scale: 1.06 }} whileTap={{ scale: 0.96 }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20">
            <Plane size={20} className="-rotate-12" />
          </motion.span>
          <span>
            <span className="block text-lg font-black tracking-[0.1em] text-white">SKY<span className="text-amber-400">BOOK</span></span>
            <span className="hidden font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-amber-500/75 sm:block">travel_beyond</span>
          </span>
        </button>

        <nav className="hidden max-w-[72vw] items-center gap-1 overflow-x-auto no-scrollbar md:flex" aria-label="Flight booking sections">
          {items.map(({ key, label, icon: Icon }) => (
            <NavButton key={key} active={page === key || (key === "details" && journeyActive)} icon={<Icon size={15} />} label={label} onClick={() => go(key)} disabled={!available(key)} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-2 rounded-full border border-amber-400/15 bg-slate-900/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" /> Live
          </span>
          <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => go("search")} className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-amber-300">
            Book a flight
          </motion.button>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-xl border border-amber-400/15 bg-slate-900/70 p-2 text-slate-100 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
            <div className="mx-auto grid max-w-[1600px] gap-2 pt-3">
              {items.map(({ key, label, icon: Icon }) => (
                <MobileNavButton key={key} active={page === key} icon={<Icon size={17} />} label={label} disabled={!available(key)} onClick={() => go(key)} />
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavButton({ active, icon, label, onClick, disabled }) {
  return (
    <motion.button type="button" whileHover={!disabled ? { y: -1 } : undefined} whileTap={!disabled ? { scale: 0.97 } : undefined} disabled={disabled} onClick={onClick} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
      active ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/15" : "text-slate-300 hover:bg-white/5 hover:text-white"
    } disabled:cursor-not-allowed disabled:opacity-30`}>
      {icon}{label}
    </motion.button>
  );
}

function MobileNavButton({ active, icon, label, onClick, disabled }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
      active ? "bg-amber-400 text-slate-950" : "bg-white/5 text-slate-200"
    } disabled:cursor-not-allowed disabled:opacity-30`}>
      {icon}{label}
    </button>
  );
}

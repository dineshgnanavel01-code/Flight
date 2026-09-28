import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Search,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Ticket,
} from "lucide-react";

export default function Navbar({
  page = "search",
  selectedFlight,
  searched,
  confirmed,
  onNavigate,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  /*
    Navigation steps used by the booking flow.
  */
  const navItems = [
    {
      id: "search",
      label: "Search Flights",
      icon: Search,
    },
    {
      id: "results",
      label: "Flights",
      icon: Plane,
      disabled: !searched,
    },
    {
      id: "details",
      label: "Details",
      icon: MapPin,
      disabled: !selectedFlight,
    },
    {
      id: "passenger",
      label: "Passenger",
      icon: Ticket,
      disabled: !selectedFlight,
    },
    {
      id: "seats",
      label: "Seats",
      icon: Plane,
      disabled: !selectedFlight,
    },
    {
      id: "payment",
      label: "Payment",
      icon: Ticket,
      disabled: !selectedFlight,
    },
  ];

const handleNavigation = (id, disabled) => {
  if (disabled) return;

  onNavigate?.(id);

  setMobileOpen(false);
  setBookingOpen(false);

  requestAnimationFrame(() => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  });
};

  const getCurrentStep = () => {
    const order = [
      "search",
      "results",
      "details",
      "passenger",
      "seats",
      "payment",
      "confirmation",
    ];

    return order.indexOf(page);
  };

  const currentStep = getCurrentStep();

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-slate-950/90 text-white shadow-2xl backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =========================================================
            LOGO
        ========================================================== */}
        <motion.button
          type="button"
          onClick={() => handleNavigation("search", false)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="group flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 8 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 shadow-lg shadow-amber-500/20"
          >
            <Plane
              size={21}
              className="rotate-[-35deg] text-slate-950"
            />

            <motion.span
              className="absolute inset-0 rounded-xl border border-amber-300/40"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          <div className="hidden sm:block text-left">
            <div className="text-lg font-bold tracking-tight">
              Sky<span className="text-amber-400">Book</span>
            </div>

            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
              Fly. Explore. Enjoy.
            </div>
          </div>
        </motion.button>

        {/* =========================================================
            DESKTOP NAVIGATION
        ========================================================== */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = page === item.id;
            const completed =
              currentStep > index && !item.disabled;

            return (
              <motion.button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() =>
                  handleNavigation(item.id, item.disabled)
                }
                whileHover={!item.disabled ? { y: -1 } : {}}
                whileTap={!item.disabled ? { scale: 0.96 } : {}}
                className={`
                  relative flex items-center gap-2 rounded-xl px-3 py-2.5
                  text-sm font-medium transition-all duration-300
                  ${
                    item.disabled
                      ? "cursor-not-allowed text-slate-600"
                      : active
                      ? "text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {/* Active background */}
                {active && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-white/10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className={`
                      flex h-7 w-7 items-center justify-center rounded-lg
                      transition-all duration-300
                      ${
                        active
                          ? "bg-amber-500/20 text-amber-400"
                          : completed
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-white/5"
                      }
                    `}
                  >
                    {completed ? (
                      <CheckCircle2 size={15} />
                    ) : (
                      <Icon size={15} />
                    )}
                  </span>

                  <span className="hidden xl:block">
                    {item.label}
                  </span>
                </span>

                {/* Active underline */}
                {active && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-amber-400"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* =========================================================
            RIGHT SIDE
        ========================================================== */}
        <div className="flex items-center gap-2">

          {/* Booking status */}
          <div className="relative hidden md:block">
            <motion.button
              type="button"
              onClick={() => setBookingOpen((value) => !value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition-colors hover:bg-white/10"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  confirmed
                    ? "bg-emerald-400"
                    : selectedFlight
                    ? "bg-amber-400"
                    : "bg-slate-500"
                }`}
              />

              <span className="hidden xl:block">
                {confirmed
                  ? "Booking Confirmed"
                  : selectedFlight
                  ? "Booking in Progress"
                  : "Ready to Search"}
              </span>

              <ChevronDown
                size={14}
                className={`transition-transform ${
                  bookingOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {bookingOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl"
                >
                  <div className="mb-3 border-b border-white/10 pb-3">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Booking Status
                    </p>

                    <p className="mt-1 font-semibold">
                      {confirmed
                        ? "Your booking is confirmed"
                        : selectedFlight
                        ? "Complete your booking"
                        : "Start a new journey"}
                    </p>
                  </div>

                  {selectedFlight ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">
                          Flight
                        </span>

                        <span className="font-medium">
                          {selectedFlight.airline ||
                            "Selected Flight"}
                        </span>
                      </div>

                      {selectedFlight.from &&
                        selectedFlight.to && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">
                              Route
                            </span>

                            <span className="font-medium">
                              {selectedFlight.from} →{" "}
                              {selectedFlight.to}
                            </span>
                          </div>
                        )}

                      <div className="mt-3 rounded-xl bg-white/5 p-3">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2
                            size={14}
                            className={
                              confirmed
                                ? "text-emerald-400"
                                : "text-amber-400"
                            }
                          />

                          {confirmed
                            ? "Payment completed"
                            : "Booking information saved"}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleNavigation("search", false)
                      }
                      className="w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                    >
                      Search Flights
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="overflow-hidden border-t border-white/10 bg-slate-950 lg:hidden"
          >
            <motion.nav
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="mx-auto max-w-[1600px] space-y-1 px-4 py-4 sm:px-6"
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = page === item.id;
                const completed =
                  currentStep > index && !item.disabled;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    disabled={item.disabled}
                    onClick={() =>
                      handleNavigation(
                        item.id,
                        item.disabled
                      )
                    }
                    whileTap={
                      !item.disabled
                        ? { scale: 0.98 }
                        : {}
                    }
                    className={`
                      relative flex w-full items-center gap-3
                      rounded-xl px-4 py-3 text-left
                      transition-all duration-300
                      ${
                        item.disabled
                          ? "cursor-not-allowed text-slate-600"
                          : active
                          ? "bg-amber-500/10 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex h-9 w-9 items-center justify-center
                        rounded-xl
                        ${
                          active
                            ? "bg-amber-500/20 text-amber-400"
                            : completed
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-white/5"
                        }
                      `}
                    >
                      {completed ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <Icon size={17} />
                      )}
                    </span>

                    <span className="flex-1">
                      <span className="block text-sm font-semibold">
                        {item.label}
                      </span>

                      <span className="block text-xs text-slate-500">
                        {item.id === "search" &&
                          "Find your perfect flight"}

                        {item.id === "results" &&
                          "Compare available flights"}

                        {item.id === "details" &&
                          "Review flight information"}

                        {item.id === "passenger" &&
                          "Enter passenger information"}

                        {item.id === "seats" &&
                          "Choose your preferred seat"}

                        {item.id === "payment" &&
                          "Complete secure payment"}
                      </span>
                    </span>

                    {active && (
                      <motion.span
                        layoutId="mobileActive"
                        className="h-2 w-2 rounded-full bg-amber-400"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Mobile booking status */}
              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        confirmed
                          ? "bg-emerald-400"
                          : selectedFlight
                          ? "bg-amber-400"
                          : "bg-slate-500"
                      }`}
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        {confirmed
                          ? "Booking Confirmed"
                          : selectedFlight
                          ? "Booking in Progress"
                          : "Ready to Search"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {confirmed
                          ? "Your ticket is ready."
                          : selectedFlight
                          ? "Continue your booking journey."
                          : "Find your next destination."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight,BadgeCheck,BriefcaseBusiness,CalendarDays,CheckCircle2, Clock3, Coffee, CreditCard, Luggage,Plane, ShieldCheck, Sparkles,X,} from "lucide-react";

export default function FlightDetails({
  flight,
  onClose,
  onContinue,
}) {
  if (!flight) return null;

  const handleContinue = () => {
    onContinue?.(flight);
  };

  return (
    <AnimatePresence>
      {flight && isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-slate-950/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 27,
            }}
            className="
              fixed right-0 top-0 z-[100]
              flex h-screen w-full max-w-full flex-col
              overflow-hidden
              bg-[#fafaf9] text-slate-900
              shadow-[-30px_0_100px_rgba(15,23,42,0.22)]
            "
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/20 blur-[100px]"
                animate={{
                  scale: [1, 1.18, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-400/15 blur-[110px]"
                animate={{
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              />
            </div>

            <header className="relative z-20 flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/85 px-5 py-4 backdrop-blur-xl sm:px-7">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 shadow-lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <Plane
                    size={20}
                    className="relative z-10 rotate-[-12deg] text-white"
                  />
                </motion.div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-amber-600">
                    SKYBOOK PREMIER
                  </p>

                  <h2 className="text-lg font-black tracking-tight text-slate-900">
                    Flight Details
                  </h2>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ rotate: 90, scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                <X size={19} />
              </motion.button>
            </header>

            <div
              className="
                relative z-10 flex-1
                overflow-y-auto overflow-x-hidden
                scroll-smooth
                px-4 py-5
                sm:px-7 sm:py-7

                [scrollbar-width:none]
                [-ms-overflow-style:none]
              "
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              <style>
                {`
                  .flight-details-scroll::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                  }
                `}
              </style>

              <div className="flight-details-scroll">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Your selected flight
                    </p>

                    <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                      {flight.airline}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                      <span className="relative h-2 w-2 rounded-full bg-amber-500" />
                    </span>

                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                      Available
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="mt-5 flex items-center justify-between rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.05 }}
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${
                        flight.color || "from-amber-500 to-orange-600"
                      } text-xl shadow-lg`}
                    >
                      ✈️
                    </motion.div>

                    <div>
                      <p className="text-sm font-black">
                        {flight.airline}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Flight {flight.code}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Cabin
                    </p>

                    <p className="mt-1 text-sm font-black text-amber-600">
                      {flight.class || "Economy Class"}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{ delay: 0.15 }}
                  className="relative mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]"
                >
                  <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600" />

                  <div className="p-5 sm:p-7">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                          Departure
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-500">
                          {flight.fromCity ||
                            flight.from ||
                            "Delhi"}
                        </p>
                      </div>

                      <div className="rounded-full bg-amber-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-amber-700">
                        {flight.stops}
                      </div>

                      <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                          Arrival
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-500">
                          {flight.toCity ||
                            flight.to ||
                            "Bangalore"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                      <div>
                        <motion.p
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
                        >
                          {flight.departure}
                        </motion.p>

                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500" />

                          <span className="text-sm font-black text-amber-700">
                            {flight.from}
                          </span>
                        </div>
                      </div>

                      {/* Plane Animation */}
                      <div className="flex min-w-[100px] flex-col items-center">
                        <div className="relative h-10 w-full">
                          <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200" />

                          <motion.div
                            className="absolute left-0 right-0 top-1/2 h-px"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(to right, #f59e0b 0, #f59e0b 5px, transparent 5px, transparent 10px)",
                            }}
                            animate={{
                              backgroundPositionX: [
                                "0px",
                                "20px",
                              ],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />

                          <motion.div
                            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-200 bg-white shadow-lg"
                            animate={{
                              y: [-2, 2, -2],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          >
                            <Plane
                              size={17}
                              className="rotate-90 text-amber-600"
                            />
                          </motion.div>
                        </div>

                        <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Clock3 size={13} />
                          {flight.duration}
                        </div>
                      </div>

                      <div className="text-right">
                        <motion.p
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
                        >
                          {flight.arrival}
                        </motion.p>

                        <div className="mt-2 flex items-center justify-end gap-2">
                          <span className="text-sm font-black text-orange-600">
                            {flight.to}
                          </span>

                          <div className="h-2 w-2 rounded-full bg-orange-500" />
                        </div>
                      </div>
                    </div>

                    <div className="relative my-7 border-t border-dashed border-slate-200">
                      <span className="absolute -left-8 -top-3 hidden h-6 w-6 rounded-full bg-[#fafaf9] sm:block" />
                      <span className="absolute -right-8 -top-3 hidden h-6 w-6 rounded-full bg-[#fafaf9] sm:block" />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <InfoMini
                        icon={<CalendarDays size={15} />}
                        label="Travel date"
                        value={
                          flight.date ||
                          flight.travelDate ||
                          "Selected date"
                        }
                      />

                      <InfoMini
                        icon={<Plane size={15} />}
                        label="Flight"
                        value={`${flight.code} • ${
                          flight.stops || "Direct"
                        }`}
                      />

                      <InfoMini
                        icon={<ShieldCheck size={15} />}
                        label="Status"
                        value="Available"
                      />
                    </div>
                  </div>
                </motion.div>

              
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-5 flex items-center gap-3 rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-black text-slate-800">
                      Premium booking experience
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      Continue to passenger details and complete
                      your booking.
                    </p>
                  </div>
                </motion.div>

                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Included perks
                      </p>

                      <h3 className="mt-1 text-lg font-black">
                        Flight Amenities
                      </h3>
                    </div>

                    <BadgeCheck
                      size={20}
                      className="text-amber-600"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Feature
                      icon={<Luggage size={17} />}
                      title="Cabin baggage"
                      value="7 kg included"
                    />

                    <Feature
                      icon={<BriefcaseBusiness size={17} />}
                      title="Check-in baggage"
                      value="15 kg included"
                    />

                    <Feature
                      icon={<Coffee size={17} />}
                      title="In-flight meals"
                      value="Complimentary"
                    />

                    <Feature
                      icon={<CreditCard size={17} />}
                      title="Payment protection"
                      value="Secure payment"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="relative mt-5 overflow-hidden rounded-[1.8rem] border border-slate-800 bg-slate-950 p-5 text-white shadow-xl"
                >
                  <motion.div
                    className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />

                  <div className="relative flex items-center justify-between gap-5">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Total fare
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Taxes & standard fees included
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-black tracking-tight text-amber-400">
                        ₹
                        {Number(
                          flight.price || 0
                        ).toLocaleString("en-IN")}
                      </p>

                      <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Per passenger
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom spacing */}
                <div className="h-5" />
              </div>
            </div>

          
            <div className="relative z-30 shrink-0 border-t border-slate-200 bg-white/95 p-4 backdrop-blur-xl sm:p-5">
              <div className="mx-auto flex max-w-full items-center gap-3">
                <div className="hidden flex-1 sm:block">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Ready to book?
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-800">
                    Enter passenger details
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{
                    y: -3,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={handleContinue}
                  className="group relative flex min-h-[58px] flex-1 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 px-5 font-black text-white shadow-[0_15px_35px_rgba(245,158,11,0.28)]"
                >
                  <motion.span
                    className="absolute inset-y-0 -left-24 w-20 skew-x-[-20deg] bg-white/30 blur-md"
                    animate={{
                      x: ["0%", "650%"],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

                  <span className="relative">
                    Continue Booking
                  </span>

                  <motion.span
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                    }}
                  >
                    <ArrowRight size={17} />
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}


function Feature({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-amber-300 hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-semibold text-slate-400">
          {title}
        </p>

        <div className="mt-1 flex items-center gap-1.5">
          <CheckCircle2
            size={12}
            className="text-amber-500"
          />

          <p className="text-sm font-black text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}



function InfoMini({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-amber-600">
        {icon}

        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xs font-black text-slate-700">
        {value}
      </p>
    </div>
  );
}

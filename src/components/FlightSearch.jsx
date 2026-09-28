import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowRightLeft,
  CalendarDays,
  Check,
  ChevronDown,
  Globe2,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  Star,
} from "lucide-react";

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Dubai",
  "Singapore",
];

const classes = [
  "Economy",
  "Premium Economy",
  "Business",
  "First Class",
];

const cityInfo = {
  Delhi: {
    code: "DEL",
    country: "India",
    airport: "Indira Gandhi International Airport",
    terminal: "T3",
  },
  Mumbai: {
    code: "BOM",
    country: "India",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    terminal: "T2",
  },
  Bangalore: {
    code: "BLR",
    country: "India",
    airport: "Kempegowda International Airport",
    terminal: "T2",
  },
  Hyderabad: {
    code: "HYD",
    country: "India",
    airport: "Rajiv Gandhi International Airport",
    terminal: "T1",
  },
  Chennai: {
    code: "MAA",
    country: "India",
    airport: "Chennai International Airport",
    terminal: "T1",
  },
  Kolkata: {
    code: "CCU",
    country: "India",
    airport: "Netaji Subhas Chandra Bose International Airport",
    terminal: "T2",
  },
  Dubai: {
    code: "DXB",
    country: "UAE",
    airport: "Dubai International Airport",
    terminal: "T3",
  },
  Singapore: {
    code: "SIN",
    country: "Singapore",
    airport: "Singapore Changi Airport",
    terminal: "T1",
  },
};

export default function FlightSearch({ onSearch }) {
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Bangalore");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const [passengerOpen, setPassengerOpen] = useState(false);
  const [classOpen, setClassOpen] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [searching, setSearching] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const swapCities = () => {
    setFrom(to);
    setTo(from);

    setErrors((prev) => ({
      ...prev,
      from: "",
      to: "",
    }));
  };

  const closeAllDropdowns = () => {
    setFromOpen(false);
    setToOpen(false);
    setPassengerOpen(false);
    setClassOpen(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!from) {
      newErrors.from = "Choose departure";
    }

    if (!to) {
      newErrors.to = "Choose destination";
    }

    if (from === to) {
      newErrors.to = "Choose a different destination";
    }

    if (!date) {
      newErrors.date = "Choose travel date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    closeAllDropdowns();
    setFocused(null);
    setSearching(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setSearching(false);

    onSearch?.({
      from,
      to,
      fromCode: cityInfo[from].code,
      toCode: cityInfo[to].code,
      fromCountry: cityInfo[from].country,
      toCountry: cityInfo[to].country,
      fromAirport: cityInfo[from].airport,
      toAirport: cityInfo[to].airport,
      fromTerminal: cityInfo[from].terminal,
      toTerminal: cityInfo[to].terminal,
      date,
      passengers,
      travelClass,
    });
  };

  const openDatePicker = () => {
    const input = document.getElementById("travel-date");

    if (!input) return;

    closeAllDropdowns();
    setFocused("date");

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.focus();
        input.click();
      }
    } catch {
      input.focus();
      input.click();
    }
  };

  const selectFromCity = (city) => {
    setFrom(city);

    setErrors((prev) => ({
      ...prev,
      from: "",
    }));

    setFromOpen(false);
    setFocused(null);
  };

  const selectToCity = (city) => {
    setTo(city);

    setErrors((prev) => ({
      ...prev,
      to: "",
    }));

    setToOpen(false);
    setFocused(null);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0d0f17] font-sans text-slate-100">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity brightness-75"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f17]/90 via-[#0d0f17]/80 to-[#0d0f17]" />

        <div className="absolute -left-44 -top-44 h-[520px] w-[520px] rounded-full bg-amber-500/20 blur-[130px]" />

        <div className="absolute -bottom-52 -right-44 h-[600px] w-[600px] rounded-full bg-orange-600/15 blur-[140px]" />

        <motion.div
          className="absolute left-[45%] top-[18%] h-32 w-32 rounded-full bg-amber-400/10 blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* FULL WIDTH CONTAINER */}
      <div className="relative z-10 w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.header
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="fixed left-0 right-0 top-0 z-[100] border-b border-amber-500/20 bg-[#0d0f17]/85 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8"
        >
          <div className="mx-auto flex max-w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{
                  rotate: -10,
                  scale: 1.08,
                }}
                className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-900 shadow-2xl"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600"
                  animate={{
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <Plane
                  size={21}
                  className="relative z-10 rotate-[-10deg] text-slate-950"
                />
              </motion.div>

              <div>
                <p className="text-xl font-black tracking-[0.12em] text-white">
                  SKY<span className="text-amber-400">BOOK</span>
                </p>

                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-amber-500/80">
                  &lt;travel_beyond/&gt;
                </p>
              </div>
            </div>

            <motion.div
              whileHover={{
                y: -2,
              }}
              className="hidden items-center gap-2 rounded-full border border-amber-500/20 bg-slate-900/80 px-4 py-2 shadow-sm backdrop-blur-xl sm:flex"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
              </span>

              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300/90">
                status: [operational]
              </span>
            </motion.div>
          </div>
        </motion.header>

        {/* HERO */}
        <div className="grid w-full items-center gap-12 pb-10 pt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:pb-14 lg:pt-24">
          {/* HERO CONTENT */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-slate-900/80 px-4 py-2 font-mono shadow-sm backdrop-blur-xl"
            >
              <Sparkles size={14} className="text-amber-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                &gt; explore_destinations
              </span>
            </motion.div>

            <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[0.92] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              The world is

              <span className="relative block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                waiting

                <motion.span
                  className="absolute -bottom-2 left-0 h-2 rounded-full bg-amber-500/50"
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "55%",
                  }}
                  transition={{
                    delay: 0.8,
                    duration: 0.8,
                  }}
                />
              </span>

              <span className="mt-2 block font-mono text-3xl text-slate-400 sm:text-4xl">
                Take_Flight_Wait_Flight
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Find the perfect route, compare fares and build your journey in
              just a few clicks with hyper-speed precision.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Benefit
                icon={<Zap size={14} />}
                text="Instant search"
              />

              <Benefit
                icon={<ShieldCheck size={14} />}
                text="Secure booking"
              />

              <Benefit
                icon={<Globe2 size={14} />}
                text="Global routes"
              />
            </div>
          </motion.div>

          {/* GLOBE / ROUTE */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: 4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 70,
            }}
            className="relative mx-auto h-[360px] w-full max-w-full"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-[4rem] border border-amber-500/20 bg-slate-900/60 shadow-[0_30px_80px_rgba(245,158,11,.15)] backdrop-blur-xl"
            >
              <div className="absolute inset-8 rounded-full border border-amber-500/10" />

              <motion.div
                className="absolute inset-12 rounded-full border border-dashed border-amber-500/20"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotateY: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Globe2
                    size={145}
                    strokeWidth={0.6}
                    className="text-amber-500/30"
                  />
                </motion.div>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_25px_rgba(251,191,36,.9)]"
              />
            </motion.div>

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 760 360"
              fill="none"
            >
              <motion.path
                d="M65 250 C200 40 500 50 695 215"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="8 9"
                strokeOpacity=".4"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 2,
                }}
              />
            </svg>

            <motion.div
              className="absolute left-1/2 top-1/2 z-20"
              animate={{
                x: [-150, 150, -150],
                y: [70, -55, 70],
                rotate: [-25, 10, -25],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <div className="absolute inset-[-20px] rounded-full bg-amber-500/20 blur-xl" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/40 bg-slate-900 shadow-xl backdrop-blur-xl">
                  <Plane
                    size={27}
                    className="rotate-[-15deg] text-amber-400"
                  />
                </div>
              </div>
            </motion.div>

            <Airport
              code={cityInfo[from].code}
              city={from}
              country={cityInfo[from].country}
              airport={cityInfo[from].airport}
              terminal={cityInfo[from].terminal}
              position="left"
            />

            <Airport
              code={cityInfo[to].code}
              city={to}
              country={cityInfo[to].country}
              airport={cityInfo[to].airport}
              terminal={cityInfo[to].terminal}
              position="right"
            />

            <motion.div
              animate={{
                y: [0, -7, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute bottom-1 left-1/2 hidden -translate-x-1/2 rounded-2xl border border-amber-500/30 bg-slate-900/90 px-5 py-3 font-mono shadow-xl backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/20">
                  <Plane size={16} className="text-amber-400" />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white">
                    Active route
                  </p>

                  <p className="text-sm font-black text-amber-300">
                    {cityInfo[from].code} → {cityInfo[to].code}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* SEARCH FORM - FULL WIDTH */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.8,
          }}
          className="relative w-full"
        >
          <div className="absolute -left-3 top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-amber-500/20 bg-[#0d0f17] lg:block" />

          <div className="absolute -right-3 top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-amber-500/20 bg-[#0d0f17] lg:block" />

          <div className="w-full overflow-visible rounded-[2.5rem] border border-amber-500/20 bg-slate-900/90 shadow-[0_30px_100px_rgba(245,158,11,.12)] backdrop-blur-2xl">
            {/* SEARCH HEADER */}
            <div className="border-b border-dashed border-slate-800 px-5 py-5 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 font-black text-slate-950 shadow-lg shadow-amber-500/30">
                    <Search size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-black text-white">
                      Find your flight
                    </p>

                    <p className="font-mono text-[10px] text-slate-400">
                      Query available flight routes &amp; pricing
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-2 font-mono sm:flex">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400/90">
                    [SKYBOOK]
                  </span>

                  <span className="h-1 w-1 rounded-full bg-amber-400" />

                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    ENGINE_V2
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full p-4 sm:p-6 lg:p-7">
              {/* FROM / SWAP / TO / DATE */}
              <div className="grid w-full gap-3 lg:grid-cols-[minmax(0,1fr)_62px_minmax(0,1fr)_minmax(0,1fr)]">
                {/* FROM */}
                <div className="relative min-w-0">
                  <SearchField
                    label="From"
                    value={cityInfo[from].code}
                    subtitle={`${from} · ${cityInfo[from].country}`}
                    details={`${cityInfo[from].airport} · ${cityInfo[from].terminal}`}
                    icon={<MapPin size={17} />}
                    focused={focused === "from"}
                    error={errors.from}
                    onClick={() => {
                      closeAllDropdowns();
                      setFromOpen(!fromOpen);
                      setFocused("from");
                    }}
                  />

                  <AnimatePresence>
                    {fromOpen && (
                      <CityDropdown
                        cities={cities}
                        selected={from}
                        onSelect={selectFromCity}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* SWAP */}
                <div className="flex items-center justify-center">
                  <motion.button
                    type="button"
                    whileHover={{
                      scale: 1.12,
                      rotate: 180,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={swapCities}
                    className="relative flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 font-bold text-slate-950 shadow-xl shadow-amber-500/20"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border border-amber-300"
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    <ArrowRightLeft size={17} />
                  </motion.button>
                </div>

                {/* TO */}
                <div className="relative min-w-0">
                  <SearchField
                    label="To"
                    value={cityInfo[to].code}
                    subtitle={`${to} · ${cityInfo[to].country}`}
                    details={`${cityInfo[to].airport} · ${cityInfo[to].terminal}`}
                    icon={<MapPin size={17} />}
                    focused={focused === "to"}
                    error={errors.to}
                    onClick={() => {
                      closeAllDropdowns();
                      setToOpen(!toOpen);
                      setFocused("to");
                    }}
                  />

                  <AnimatePresence>
                    {toOpen && (
                      <CityDropdown
                        cities={cities}
                        selected={to}
                        onSelect={selectToCity}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* DATE */}
                <SearchField
                  label="Travel date"
                  value={
                    date
                      ? new Date(`${date}T00:00:00`).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Choose date"
                  }
                  subtitle={date ? "Departure date" : "Select your journey date"}
                  details={date ? "One-way journey" : "Flexible travel planning"}
                  icon={<CalendarDays size={17} />}
                  focused={focused === "date"}
                  error={errors.date}
                  onClick={openDatePicker}
                >
                  <input
                    id="travel-date"
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        date: "",
                      }));

                      setFocused(null);
                    }}
                    className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
                    tabIndex={-1}
                  />
                </SearchField>
              </div>

              {/* PASSENGERS / CLASS / SEARCH */}
              <div className="mt-3 grid w-full gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)]">
                {/* PASSENGERS */}
                <DropdownField
                  icon={<Users size={17} />}
                  label="Travelers"
                  value={`${passengers} ${
                    passengers === 1 ? "Passenger" : "Passengers"
                  }`}
                  detail="Maximum 9 travelers"
                  open={passengerOpen}
                  onClick={() => {
                    setPassengerOpen(!passengerOpen);
                    setClassOpen(false);
                    setFromOpen(false);
                    setToOpen(false);
                    setFocused(null);
                  }}
                >
                  <AnimatePresence>
                    {passengerOpen && (
                      <DropdownPanel>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-black text-white">
                              Travelers
                            </p>

                            <p className="mt-1 font-mono text-[10px] text-slate-400">
                              max_limit: 9 seats
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <CounterButton
                              onClick={() =>
                                setPassengers(Math.max(1, passengers - 1))
                              }
                            >
                              −
                            </CounterButton>

                            <motion.span
                              key={passengers}
                              initial={{
                                scale: 1.4,
                                opacity: 0,
                              }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                              }}
                              className="w-6 text-center font-mono text-lg font-black text-amber-400"
                            >
                              {passengers}
                            </motion.span>

                            <CounterButton
                              onClick={() =>
                                setPassengers(Math.min(9, passengers + 1))
                              }
                            >
                              +
                            </CounterButton>
                          </div>
                        </div>
                      </DropdownPanel>
                    )}
                  </AnimatePresence>
                </DropdownField>

                {/* CLASS */}
                <DropdownField
                  label="Cabin class"
                  value={travelClass}
                  detail="Select preferred cabin"
                  open={classOpen}
                  onClick={() => {
                    setClassOpen(!classOpen);
                    setPassengerOpen(false);
                    setFromOpen(false);
                    setToOpen(false);
                    setFocused(null);
                  }}
                >
                  <AnimatePresence>
                    {classOpen && (
                      <DropdownPanel>
                        <div className="space-y-1">
                          {classes.map((item) => (
                            <motion.button
                              key={item}
                              type="button"
                              whileHover={{
                                x: 5,
                              }}
                              onClick={() => {
                                setTravelClass(item);
                                setClassOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                                travelClass === item
                                  ? "border border-amber-500/30 bg-amber-500/20 font-mono text-amber-300"
                                  : "text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              {item}

                              {travelClass === item && (
                                <Check
                                  size={15}
                                  className="text-amber-400"
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </DropdownPanel>
                    )}
                  </AnimatePresence>
                </DropdownField>

                {/* SEARCH BUTTON */}
                <motion.button
                  type="button"
                  whileHover={{
                    y: -3,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={handleSubmit}
                  disabled={searching}
                  className="group relative min-h-[72px] overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 font-black text-slate-950 shadow-xl shadow-amber-500/25 disabled:cursor-wait"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative flex items-center justify-center gap-3">
                    <motion.div
                      animate={
                        searching
                          ? {
                              rotate: 360,
                            }
                          : {
                              rotate: [0, -8, 0],
                            }
                      }
                      transition={
                        searching
                          ? {
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }
                          : {
                              duration: 2,
                              repeat: Infinity,
                            }
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 font-bold text-amber-400 shadow-md"
                    >
                      <Search size={18} />
                    </motion.div>

                    <div className="text-left">
                      <p className="text-sm font-black text-slate-950">
                        {searching ? "Searching..." : "Search Flights"}
                      </p>

                      <p className="font-mono text-[9px] font-bold text-slate-900 opacity-80">
                        {searching
                          ? "executing_query..."
                          : "execute_search();"}
                      </p>
                    </div>

                    {!searching && (
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 1.3,
                          repeat: Infinity,
                        }}
                      >
                        <ArrowRight
                          size={18}
                          className="text-slate-950"
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              </div>

              {/* SEARCH SUMMARY */}
              <div className="mt-5 grid gap-3 border-t border-slate-800 pt-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoItem
                  label="Departure"
                  value={`${cityInfo[from].code} · ${from}`}
                  detail={cityInfo[from].airport}
                />

                <InfoItem
                  label="Arrival"
                  value={`${cityInfo[to].code} · ${to}`}
                  detail={cityInfo[to].airport}
                />

                <InfoItem
                  label="Travelers"
                  value={`${passengers} ${
                    passengers === 1 ? "Passenger" : "Passengers"
                  }`}
                  detail={travelClass}
                />

                <InfoItem
                  label="Journey date"
                  value={
                    date
                      ? new Date(`${date}T00:00:00`).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Not selected"
                  }
                  detail={date ? "Departure date" : "Choose a date"}
                />
              </div>

              {/* SECURITY FOOTER */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="text-[10px] font-medium text-slate-400">
                    encryption: [secure]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe2
                    size={14}
                    className="text-amber-400"
                  />

                  <span className="text-[10px] font-medium text-slate-400">
                    nodes: [500+ active]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                  <span className="text-[10px] font-medium text-slate-400">
                    sync: [live]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* POPULAR DESTINATIONS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
          }}
          className="mt-7 w-full"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-amber-400">
                &gt; featured_routes
              </p>

              <h2 className="mt-1 text-lg font-black text-white">
                Popular destinations
              </h2>
            </div>

            <div className="hidden items-center gap-2 font-mono text-[10px] font-semibold text-slate-400 sm:flex">
              <span>Trending network</span>

              <Sparkles
                size={13}
                className="text-amber-400"
              />
            </div>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-3">
            <DestinationCard
              city="Dubai"
              code="DXB"
              country="UAE"
              price="₹11,999"
              rating="4.9"
              airline="Emirates"
              gradient="from-amber-500/20 to-orange-600/10"
              accentColor="group-hover:border-amber-500/50"
              bgImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
            />

            <DestinationCard
              city="Singapore"
              code="SIN"
              country="Singapore"
              price="₹14,999"
              rating="4.9"
              airline="Vistara"
              gradient="from-amber-400/20 to-yellow-600/10"
              accentColor="group-hover:border-yellow-500/50"
              bgImage="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80"
            />

            <DestinationCard
              city="Mumbai"
              code="BOM"
              country="India"
              price="₹4,299"
              rating="4.7"
              airline="Akasa Air"
              gradient="from-orange-500/20 to-amber-700/10"
              accentColor="group-hover:border-orange-500/50"
              bgImage="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
   SEARCH FIELD
========================= */

function SearchField({
  label,
  value,
  subtitle,
  details,
  icon,
  focused,
  error,
  onClick,
  children,
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      whileHover={{
        y: -3,
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group relative min-h-[108px] w-full cursor-pointer rounded-2xl border p-4 text-left transition-all duration-300 ${
        error
          ? "border-red-400 bg-red-50"
          : focused
            ? "border-amber-400 bg-amber-50 shadow-lg shadow-amber-500/10"
            : "border-slate-200 bg-white shadow-sm hover:border-amber-400 hover:bg-slate-50"
      }`}
    >
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            exit={{
              opacity: 0,
              scaleX: 0,
            }}
            className="absolute bottom-0 left-5 right-5 h-0.5 origin-center bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
            focused
              ? "bg-amber-400 font-bold text-slate-950"
              : "border border-slate-200 bg-slate-100 text-amber-600 shadow-sm"
          }`}
        >
          {icon}
        </div>

        <span className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
          {label}
        </span>

        <ChevronDown
          size={14}
          className={`ml-auto transition ${
            focused
              ? "rotate-180 text-amber-600"
              : "text-slate-400"
          }`}
        />
      </div>

      <div className="ml-10 mt-1 min-w-0">
        <p className="font-mono text-xl font-black tracking-tight text-slate-950">
          {value}
        </p>

        <p className="truncate text-[11px] font-bold text-black">
          {subtitle}
        </p>

        {details && (
          <p className="mt-0.5 truncate text-[9px] font-medium text-slate-500">
            {details}
          </p>
        )}
      </div>

      {children}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="absolute left-2 top-full z-30 mt-1 font-mono text-[10px] font-bold text-red-500"
          >
            &gt; error: {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* =========================
   CITY DROPDOWN
========================= */

function CityDropdown({
  cities,
  selected,
  onSelect,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -8,
        scale: 0.97,
      }}
      transition={{
        duration: 0.18,
      }}
      className="absolute left-0 right-0 top-full z-[200] mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-700 shadow-[0_25px_70px_rgba(0,0,0,.35)]"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
          Select airport
        </p>

        <p className="mt-1 text-[10px] font-medium text-slate-400">
          Choose city, airport and terminal
        </p>
      </div>

      <div className="max-h-[350px] overflow-y-auto p-2">
        {cities.map((city) => {
          const active = selected === city;
          const info = cityInfo[city];

          return (
            <motion.button
              key={city}
              type="button"
              whileHover={{
                x: 3,
              }}
              onClick={() => onSelect(city)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-black hover:bg-slate-100"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    active ? "bg-white/20" : "bg-slate-100"
                  }`}
                >
                  <MapPin
                    size={16}
                    className={
                      active
                        ? "text-white"
                        : "text-slate-700"
                    }
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-black ${
                        active ? "text-white" : "text-black"
                      }`}
                    >
                      {city}
                    </p>

                    <span
                      className={`rounded-md px-1.5 py-0.5 font-mono text-[9px] font-black ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {info.code}
                    </span>
                  </div>

                  <p
                    className={`mt-0.5 truncate text-[10px] font-semibold ${
                      active
                        ? "text-blue-100"
                        : "text-slate-600"
                    }`}
                  >
                    {info.airport}
                  </p>

                  <p
                    className={`mt-0.5 font-mono text-[9px] font-bold ${
                      active
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {info.country} · Terminal {info.terminal}
                  </p>
                </div>
              </div>

              {active && (
                <Check
                  size={17}
                  className="ml-2 shrink-0 text-white"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* =========================
   DROPDOWN FIELD
========================= */

function DropdownField({
  icon,
  label,
  value,
  detail,
  open,
  onClick,
  children,
}) {
  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.99,
        }}
        onClick={onClick}
        className={`flex min-h-[72px] w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
          open
            ? "border-amber-400 bg-amber-950/20 shadow-[0_10px_30px_rgba(245,158,11,.1)]"
            : "border-slate-800 bg-slate-950/50 hover:border-amber-500/40 hover:bg-slate-900/80"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          {icon && (
            <motion.div
              animate={{
                rotate: open ? 8 : 0,
              }}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                open
                  ? "border-amber-300 bg-amber-400 font-bold text-slate-950"
                  : "border-slate-800 bg-slate-900 text-amber-400 shadow-sm"
              }`}
            >
              {icon}
            </motion.div>
          )}

          <div className="min-w-0">
            <p className="font-mono text-[9px] font-black uppercase tracking-wider text-slate-400">
              {label}
            </p>

            <p className="mt-1 truncate font-mono text-sm font-black text-white">
              {value}
            </p>

            {detail && (
              <p className="mt-0.5 truncate text-[9px] font-medium text-slate-500">
                {detail}
              </p>
            )}
          </div>
        </div>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown
            size={17}
            className="text-slate-400"
          />
        </motion.div>
      </motion.button>

      {children}
    </div>
  );
}

/* =========================
   DROPDOWN PANEL
========================= */

function DropdownPanel({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -10,
        scale: 0.96,
      }}
      transition={{
        duration: 0.2,
      }}
      className="absolute left-0 right-0 top-full z-[100] mt-2 rounded-2xl border border-amber-500/20 bg-slate-900 p-3 shadow-[0_20px_60px_rgba(0,0,0,.6)] backdrop-blur-2xl"
    >
      {children}
    </motion.div>
  );
}

/* =========================
   COUNTER BUTTON
========================= */

function CounterButton({
  children,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 font-mono text-lg font-black text-slate-300 hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-300"
    >
      {children}
    </motion.button>
  );
}

/* =========================
   AIRPORT
========================= */

function Airport({
  code,
  city,
  country,
  airport,
  terminal,
  position,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -7, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute z-30 ${
        position === "left"
          ? "left-[2%] top-[61%]"
          : "right-[2%] top-[48%]"
      }`}
    >
      <div
        className={`flex max-w-[240px] items-center gap-3 ${
          position === "right"
            ? "flex-row-reverse text-right"
            : ""
        }`}
      >
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-slate-900 shadow-lg backdrop-blur-xl">
          <motion.div
            className="absolute inset-0 rounded-2xl border border-amber-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          <MapPin
            size={17}
            className="relative z-10 text-amber-400"
          />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-xl font-black text-white">
            {code}
          </p>

          <p className="font-mono text-[9px] font-bold text-slate-300">
            {city} · {country}
          </p>

          <p className="truncate font-mono text-[8px] font-medium text-slate-500">
            {airport}
          </p>

          <p className="font-mono text-[8px] font-bold text-amber-400/80">
            Terminal {terminal}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   BENEFIT
========================= */

function Benefit({
  icon,
  text,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-slate-900/80 px-4 py-2 font-mono shadow-sm backdrop-blur-xl"
    >
      <span className="text-amber-400">
        {icon}
      </span>

      <span className="text-[10px] font-bold text-slate-300">
        {text}
      </span>
    </motion.div>
  );
}

/* =========================
   INFO ITEM
========================= */

function InfoItem({
  label,
  value,
  detail,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2.5">
      <p className="font-mono text-[8px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate font-mono text-xs font-black text-amber-300">
        {value}
      </p>

      <p className="mt-0.5 truncate text-[9px] font-medium text-slate-500">
        {detail}
      </p>
    </div>
  );
}

/* =========================
   DESTINATION CARD
========================= */

function DestinationCard({
  city,
  code,
  country,
  price,
  rating,
  airline,
  gradient,
  accentColor,
  bgImage,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        rotateX: 3,
        rotateY: -3,
      }}
      whileTap={{
        scale: 0.98,
      }}
      style={{
        perspective: 1000,
      }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 ${accentColor}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-40 transition-opacity duration-500 group-hover:opacity-80`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />

      <div className="relative z-10 flex h-40 flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="mb-2 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
              {airline}
            </span>

            <h3 className="text-2xl font-black tracking-tight text-white">
              {city}
            </h3>

            <p className="text-xs font-semibold text-slate-400">
              {country} ({code})
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/90 px-2.5 py-1">
            <Star
              size={12}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-xs font-black text-white">
              {rating}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-slate-800/80 pt-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
              Starting from
            </p>

            <p className="font-mono text-lg font-black text-amber-300">
              {price}
            </p>
          </div>

          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30"
            whileHover={{
              scale: 1.15,
            }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
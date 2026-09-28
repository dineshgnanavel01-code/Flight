import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Download,
  Plane,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  Armchair,
  CreditCard,
  Clock3,
  MapPin,
  Ticket,
} from "lucide-react";

export default function BookingConfirmation({
  flight,
  passenger,
  seat,
  payment,
  travelDate,
  onNewBooking,
}) {
  // Generate booking reference once
  const bookingId = useMemo(() => {
    return `SB-${Math.floor(1000 + Math.random() * 9000)}-AX91`;
  }, []);

  // -----------------------------------
  // Flight Data
  // -----------------------------------

  const departure = flight?.departure || "06:30";
  const arrival = flight?.arrival || "09:15";

  const from = flight?.from || "DEL";
  const to = flight?.to || "BLR";

  const fromCity = flight?.fromCity || getCity(from);
  const toCity = flight?.toCity || getCity(to);

  const duration = flight?.duration || "2h 45m";
  const stops = flight?.stops || "Non-stop";

  const airline = flight?.airline || "IndiGo";
  const flightCode = flight?.code || "6E";

  // -----------------------------------
  // Passenger Data
  // -----------------------------------

  const passengerName =
    `${passenger?.firstName || ""} ${
      passenger?.lastName || ""
    }`.trim() || "Passenger";

  // -----------------------------------
  // Price
  // Payment amount takes priority
  // if your payment page calculates
  // the final amount.
  // -----------------------------------

  const rawPrice =
    payment?.amount ?? flight?.price ?? 5499;

  const price = Number(rawPrice) || 5499;

  // -----------------------------------
  // Payment Method
  // -----------------------------------

  const paymentMethod =
    payment?.method === "upi"
      ? "UPI"
      : payment?.method === "cash"
      ? "Cash"
      : "Card";

  // -----------------------------------
  // Travel Date
  // -----------------------------------

  const formattedTravelDate = formatTravelDate(
    travelDate
  );

  // -----------------------------------
  // Travel Class
  // -----------------------------------

  const travelClass =
    flight?.travelClass ||
    flight?.class ||
    "Economy";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf7f2] px-4 py-10 text-slate-900 sm:py-16">
      {/* =========================================
          BACKGROUND ANIMATION
      ========================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 35, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-orange-300/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-yellow-200/20 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
        />

        {[...Array(18)].map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-amber-400/40"
            style={{
              left: `${(index * 19) % 96}%`,
              top: `${(index * 31) % 95}%`,
            }}
            animate={{
              opacity: [0.15, 0.7, 0.15],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2.5 + index * 0.1,
              repeat: Infinity,
              delay: index * 0.12,
            }}
          />
        ))}
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* =======================================
            SUCCESS HEADER
        ======================================= */}

        <div className="text-center">
          <motion.div
            initial={{
              scale: 0,
              rotate: -90,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 13,
            }}
            className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_20px_60px_rgba(245,158,11,0.32)]"
          >
            <motion.div
              className="absolute inset-0 rounded-[2rem] border-2 border-amber-300"
              animate={{
                scale: [1, 1.35],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
              }}
            />

            <Check
              size={46}
              strokeWidth={3.2}
            />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
            }}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-600 shadow-sm"
          >
            <Sparkles size={15} />
            Booking Confirmed
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
            className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl"
          >
            Your journey is{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              booked!
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.7,
            }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
          >
            Everything is ready for your trip. Your seat has
            been reserved and your booking reference has been
            generated.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.85,
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg"
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            {passengerName}
          </motion.div>
        </div>

        {/* =======================================
            BOARDING PASS
        ======================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="mt-12"
        >
          <div className="overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-[0_30px_80px_rgba(245,158,11,0.08)]">
            {/* =================================
                TICKET HEADER
            ================================= */}

            <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-zinc-900 to-amber-950 px-6 py-7 text-white sm:px-10">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />

              <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-orange-600/20 blur-3xl" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 backdrop-blur-md">
                      <Plane
                        size={23}
                        className="text-amber-400"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
                        SKYBOOK AIR
                      </p>

                      <p className="mt-1 text-xl font-black">
                        Digital Boarding Pass
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-black text-amber-300">
                    ✓ CONFIRMED
                  </div>

                  <motion.div
                    animate={{
                      y: [-4, 4, -4],
                      rotate: [-4, 4, -4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="hidden rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 sm:block"
                  >
                    <Plane
                      size={24}
                      className="text-amber-400"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* =================================
                BOOKING REFERENCE
            ================================= */}

            <div className="flex flex-col gap-3 border-b border-dashed border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Booking Reference
                </p>

                <p className="mt-1 text-xl font-black tracking-[0.15em] text-slate-950">
                  {bookingId}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <ShieldCheck
                  size={17}
                  className="text-amber-500"
                />
                Secure booking
              </div>
            </div>

            {/* =================================
                ROUTE
            ================================= */}

            <div className="px-6 py-9 sm:px-10 sm:py-12">
              <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
                {/* FROM */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 1.2,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <MapPin size={13} />
                    Departure
                  </div>

                  <p className="mt-2 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                    {from}
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {fromCity}
                  </p>

                  <p className="mt-5 text-2xl font-black text-amber-600">
                    {formatTime(departure)}
                  </p>
                </motion.div>

                {/* ROUTE LINE */}

                <div className="hidden w-52 sm:block">
                  <div className="relative flex items-center">
                    <div className="h-[2px] w-full bg-slate-200" />

                    <motion.div
                      className="absolute left-0 h-[3px] w-1/3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                      animate={{
                        x: ["0%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <motion.div
                      className="absolute left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-amber-200 bg-white shadow-lg shadow-amber-500/10"
                      animate={{
                        y: [-4, 4, -4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Plane
                        size={19}
                        className="text-amber-600"
                      />
                    </motion.div>
                  </div>

                  <p className="mt-7 text-center text-sm font-black text-slate-700">
                    {duration}
                  </p>

                  <div className="mt-1 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
                    {stops}
                  </div>
                </div>

                {/* MOBILE ROUTE */}

                <div className="flex items-center gap-4 sm:hidden">
                  <div className="h-px flex-1 bg-slate-200" />

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                    <Plane
                      size={18}
                      className="text-amber-600"
                    />
                  </div>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* TO */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 1.2,
                  }}
                  className="sm:text-right"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 sm:justify-end">
                    <MapPin size={13} />
                    Arrival
                  </div>

                  <p className="mt-2 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                    {to}
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {toCity}
                  </p>

                  <p className="mt-5 text-2xl font-black text-amber-600">
                    {formatTime(arrival)}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* =================================
                TICKET INFORMATION
            ================================= */}

            <div className="border-t border-slate-100 bg-[#fffdfa] px-6 py-7 sm:px-10">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <TicketInfo
                  icon={<CalendarDays size={17} />}
                  title="Travel Date"
                  value={formattedTravelDate}
                  delay={1.25}
                />

                <TicketInfo
                  icon={<Armchair size={17} />}
                  title="Seat"
                  value={seat || "12A"}
                  delay={1.3}
                />

                <TicketInfo
                  icon={<Ticket size={17} />}
                  title="Class"
                  value={travelClass}
                  delay={1.35}
                />

                <TicketInfo
                  icon={<CreditCard size={17} />}
                  title="Payment"
                  value={paymentMethod}
                  delay={1.4}
                />
              </div>
            </div>

            {/* =================================
                AMOUNT
            ================================= */}

            <div className="flex flex-col gap-5 border-t border-slate-100 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Amount Paid
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm font-bold text-amber-600">
                  <ShieldCheck size={16} />
                  Payment verified successfully
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  ₹{price.toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Total booking amount
                </p>
              </div>
            </div>

            {/* =================================
                TICKET CUT
            ================================= */}

            <div className="relative h-5 bg-slate-50">
              <span className="absolute -left-3 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-[#faf7f2]" />

              <span className="absolute -right-3 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-[#faf7f2]" />

              <div className="mx-10 border-t border-dashed border-slate-200" />
            </div>

            {/* =================================
                AIRLINE INFORMATION
            ================================= */}

            <div className="flex flex-col gap-4 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                  <Clock3
                    size={18}
                    className="text-amber-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Flight
                  </p>

                  <p className="text-sm font-bold text-slate-700">
                    {airline} • {flightCode}
                  </p>
                </div>
              </div>

              <p className="text-xs font-medium text-slate-400">
                Please carry a valid government ID.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =======================================
            ACTION BUTTONS
        ======================================= */}

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
            delay: 1.5,
          }}
          className="mt-7 grid gap-3 sm:grid-cols-2"
        >
          {/* DOWNLOAD */}

          <motion.button
            type="button"
            whileHover={{
              y: -4,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => window.print()}
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 py-4 font-black text-white shadow-xl shadow-amber-500/20 transition hover:from-amber-600 hover:to-orange-700"
          >
            <Download
              size={19}
              className="transition-transform group-hover:-translate-y-0.5"
            />

            Download Ticket
          </motion.button>

          {/* NEW BOOKING */}

          <motion.button
            type="button"
            whileHover={{
              y: -4,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={onNewBooking}
            className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-4 font-black text-slate-800 shadow-lg shadow-slate-900/5 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            Book Another Flight

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.button>
        </motion.div>

        {/* =======================================
            FOOTER
        ======================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.7,
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold text-slate-400"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck
              size={15}
              className="text-amber-500"
            />

            Secure booking
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <span>SKYBOOK</span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <span>
            Have a wonderful journey ✈️
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================
   TICKET INFO COMPONENT
========================================= */

function TicketInfo({
  icon,
  title,
  value,
  delay,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
    >
      <div className="flex items-center gap-2 text-amber-600">
        {icon}

        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
          {title}
        </span>
      </div>

      <p className="mt-3 truncate text-sm font-black text-slate-900">
        {value}
      </p>
    </motion.div>
  );
}

/* =========================================
   CITY LOOKUP
========================================= */

function getCity(code) {
  const cities = {
    DEL: "Delhi",
    BLR: "Bangalore",
    BOM: "Mumbai",
    HYD: "Hyderabad",
    MAA: "Chennai",
    GOI: "Goa",
    DXB: "Dubai",
    CCU: "Kolkata",
    PNQ: "Pune",
    COK: "Kochi",
    AUH: "Abu Dhabi",
    SIN: "Singapore",
    DOH: "Doha",
    NRT: "Tokyo",
  };

  return cities[code] || code;
}

/* =========================================
   TIME FORMATTER
========================================= */

function formatTime(time) {
  if (!time) return "--";

  const [hours, minutes] = String(time).split(":");

  const hour = Number(hours);

  if (Number.isNaN(hour)) {
    return time;
  }

  const suffix = hour >= 12 ? "PM" : "AM";

  const displayHour = hour % 12 || 12;

  return `${String(displayHour).padStart(
    2,
    "0"
  )}:${minutes || "00"} ${suffix}`;
}

/* =========================================
   DATE FORMATTER
========================================= */

function formatTravelDate(date) {
  if (!date) {
    return "28 Sep 2026";
  }

  // Already formatted date
  if (
    typeof date === "string" &&
    date.includes(" ")
  ) {
    return date;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(date);
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
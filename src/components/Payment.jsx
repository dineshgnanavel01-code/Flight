import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CreditCard,
  IndianRupee,
  Lock,
  Smartphone,
  Crown,
  ArrowRight,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
  Plane,
  Clock3,
  Users,
  MapPin,
  CalendarDays,
  Ticket,
  ReceiptText,
  WalletCards,
} from "lucide-react";

export default function Payment({
  flight,
  passenger,
  seat,
  onPayment,
}) {
  const [method, setMethod] = useState("card");
  const [flipped, setFlipped] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upi, setUpi] = useState("");

  // ---------------------------------------------
  // BOOKING DATA
  // ---------------------------------------------

  const price = Number(flight?.price || 5499);

  const baseFare = Math.round(price * 0.88);
  const taxes = Math.round(price * 0.08);
  const convenienceFee = price - baseFare - taxes;

  const airline = flight?.airline || "SkyBook Priority";
  const flightCode = flight?.code || flight?.flightNumber || "SKY-204";

  const fromCode = flight?.from || "DEL";
  const toCode = flight?.to || "BLR";

  const fromCity = flight?.fromCity || "Delhi";
  const toCity = flight?.toCity || "Bangalore";

  const departure = flight?.departure || "08:30";
  const arrival = flight?.arrival || "11:15";

  const duration = flight?.duration || "2h 45m";
  const stops =
    flight?.stops !== undefined
      ? flight.stops === 0
        ? "Non-stop"
        : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""}`
      : "Non-stop";

  const travelClass =
    flight?.travelClass || flight?.class || "Economy";

  const passengerName = passenger
    ? `${passenger.firstName || ""} ${passenger.lastName || ""}`.trim()
    : "Alex Wright";

  const passengerEmail =
    passenger?.email || "Passenger email";

  const passengerPhone =
    passenger?.phone ||
    passenger?.mobile ||
    "Passenger contact";

  const selectedSeat = seat || "12A";

  const travelDate =
    flight?.date ||
    flight?.travelDate ||
    passenger?.date ||
    "Travel date selected";

  const paymentMethods = [
    {
      id: "card",
      label: "Credit Card",
      shortLabel: "Card",
      icon: CreditCard,
    },
    {
      id: "upi",
      label: "UPI Transfer",
      shortLabel: "UPI",
      icon: Smartphone,
    },
    {
      id: "cash",
      label: "Counter Cash",
      shortLabel: "Cash",
      icon: IndianRupee,
    },
  ];

  // ---------------------------------------------
  // CARD FORMATTERS
  // ---------------------------------------------

  const formatCard = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 16);

    return numbers
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 4);

    if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return numbers;
  };

  // ---------------------------------------------
  // VALIDATION
  // ---------------------------------------------

  const validatePayment = () => {
    if (method === "card") {
      const cardNumber = card.number.replace(/\s/g, "");

      if (cardNumber.length < 16) {
        return "Please enter a valid 16-digit card number.";
      }

      if (!card.name.trim()) {
        return "Please enter the cardholder name.";
      }

      if (card.expiry.length !== 5) {
        return "Please enter a valid expiry date.";
      }

      if (card.cvv.length !== 3) {
        return "Please enter a valid 3-digit CVV.";
      }
    }

    if (method === "upi") {
      if (!upi.trim() || !upi.includes("@")) {
        return "Please enter a valid UPI ID.";
      }
    }

    return "";
  };

  // ---------------------------------------------
  // PAYMENT HANDLER
  // ---------------------------------------------

  const handlePay = () => {
    if (processing || success) return;

    const validationError = validatePayment();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        const transactionId =
          "TXN" +
          Math.floor(100000 + Math.random() * 900000);

        onPayment?.({
          method,
          status: "Paid",
          amount: price,
          transactionId,

          flight: {
            id: flight?.id,
            airline,
            code: flightCode,
            from: fromCode,
            fromCity,
            to: toCode,
            toCity,
            departure,
            arrival,
            duration,
            stops,
            travelClass,
            date: travelDate,
          },

          passenger: {
            ...passenger,
            fullName: passengerName,
            email: passengerEmail,
            phone: passengerPhone,
          },

          seat: selectedSeat,

          paymentDetails: {
            method,
            amount: price,
            baseFare,
            taxes,
            convenienceFee,
            transactionId,
          },
        });
      }, 1800);
    }, 1800);
  };

  // ---------------------------------------------
  // SUCCESS SCREEN
  // ---------------------------------------------

  if (success) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6">
        {/* Background Glow */}
        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[140px]"
          animate={{
            scale: [0.8, 1.15, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Celebration Particles */}
        {[...Array(14)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-2 w-2 rounded-full bg-amber-400/70"
            style={{
              left: `${8 + ((index * 17) % 85)}%`,
              top: `${12 + ((index * 29) % 75)}%`,
            }}
            animate={{
              y: [-25, 30, -25],
              opacity: [0, 1, 0],
              scale: [0.4, 1.3, 0.4],
            }}
            transition={{
              duration: 2.2 + index * 0.1,
              repeat: Infinity,
              delay: index * 0.07,
            }}
          />
        ))}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
          }}
          className="relative z-10 w-full max-w-2xl rounded-[2.5rem] border border-amber-500/30 bg-slate-900/90 p-6 text-center shadow-2xl backdrop-blur-2xl sm:p-10"
        >
          {/* Success Icon */}
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
              damping: 12,
            }}
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-[0_0_60px_rgba(245,158,11,0.4)]"
          >
            <Check
              size={52}
              strokeWidth={3}
            />
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-amber-400"
          >
            Payment Secured
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
            }}
            className="mt-3 text-3xl font-black text-white sm:text-4xl"
          >
            Booking{" "}
            <span className="text-amber-400">
              Confirmed!
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
              delay: 0.65,
            }}
            className="mt-3 text-sm leading-relaxed text-slate-400"
          >
            Your payment has been successfully processed.
            Your e-ticket is being prepared.
          </motion.p>

          {/* Confirmation Details */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
            }}
            className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-left"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <ConfirmationItem
                label="Passenger"
                value={passengerName}
              />

              <ConfirmationItem
                label="Seat"
                value={selectedSeat}
              />

              <ConfirmationItem
                label="Flight"
                value={`${airline} • ${flightCode}`}
              />

              <ConfirmationItem
                label="Route"
                value={`${fromCode} → ${toCode}`}
              />

              <ConfirmationItem
                label="Payment"
                value={
                  method === "card"
                    ? "Credit / Debit Card"
                    : method === "upi"
                    ? "UPI Transfer"
                    : "Counter Cash"
                }
              />

              <ConfirmationItem
                label="Transaction"
                value="Payment Successful"
              />
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Settlement
              </span>

              <span className="text-xl font-black text-amber-400">
                ₹{price.toLocaleString("en-IN")}
              </span>
            </div>
          </motion.div>

          <div className="mt-7 flex items-center justify-center gap-2.5 text-xs text-slate-400">
            <LoaderCircle
              size={15}
              className="animate-spin text-amber-400"
            />

            Preparing your e-ticket...
          </div>
        </motion.div>
      </section>
    );
  }

  // ---------------------------------------------
  // PAYMENT SCREEN
  // ---------------------------------------------

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-amber-500/10 blur-[130px]"
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[140px]"
          animate={{
            x: [0, -60, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1800px]">
        {/* -------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------- */}

        <motion.div
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
          className="mb-8 text-center sm:mb-10"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
            <Crown
              size={22}
              className="text-amber-400"
            />
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-400">
            Secure SkyBook Checkout
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Complete Your{" "}
            <span className="text-amber-400">
              Payment
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Review your complete flight reservation and
            select a secure payment method to confirm your
            journey.
          </p>
        </motion.div>

        {/* -------------------------------------- */}
        {/* BOOKING INFORMATION BAR */}
        {/* -------------------------------------- */}

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
            delay: 0.1,
          }}
          className="mb-8 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 shadow-xl backdrop-blur-xl"
        >
          <div className="grid divide-y divide-slate-800 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
            {/* Airline */}
            <InfoBlock
              icon={Plane}
              label="Flight"
              value={airline}
              detail={flightCode}
            />

            {/* Route */}
            <InfoBlock
              icon={MapPin}
              label="Route"
              value={`${fromCity} → ${toCity}`}
              detail={`${fromCode} → ${toCode}`}
            />

            {/* Schedule */}
            <InfoBlock
              icon={Clock3}
              label="Schedule"
              value={`${departure} → ${arrival}`}
              detail={duration}
            />

            {/* Passenger */}
            <InfoBlock
              icon={Users}
              label="Passenger"
              value={passengerName}
              detail={`Seat ${selectedSeat} • ${travelClass}`}
            />
          </div>
        </motion.div>

        {/* -------------------------------------- */}
        {/* MAIN GRID */}
        {/* -------------------------------------- */}

        <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          {/* ==================================== */}
          {/* MAIN CHECKOUT */}
          {/* ==================================== */}

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
              duration: 0.6,
            }}
            className="w-full rounded-[2.5rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            {/* Payment Method Header */}
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
                  Payment Gateway
                </p>

                <h2 className="mt-1 text-xl font-black text-white">
                  Select Payment Method
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock size={14} className="text-amber-400" />
                Secure Checkout
              </div>
            </div>

            {/* ---------------------------------- */}
            {/* PAYMENT METHOD CARDS */}
            {/* ---------------------------------- */}

            <div className="grid gap-3 sm:grid-cols-3">
              {paymentMethods.map((item) => {
                const Icon = item.icon;
                const active = method === item.id;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{
                      y: -3,
                      scale: 1.015,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={() => {
                      setMethod(item.id);
                      setError("");
                    }}
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-center transition-all ${
                      active
                        ? "border-amber-400/60 bg-amber-500/15 text-amber-300 shadow-lg shadow-amber-500/15"
                        : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="active-payment-indicator"
                        className="absolute inset-0 rounded-2xl border border-amber-400/40"
                      />
                    )}

                    <Icon
                      size={20}
                      className={`mx-auto transition-colors ${
                        active
                          ? "text-amber-400"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    />

                    <p className="mt-2.5 text-xs font-black tracking-wide">
                      <span className="hidden sm:inline">
                        {item.label}
                      </span>

                      <span className="sm:hidden">
                        {item.shortLabel}
                      </span>
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* ---------------------------------- */}
            {/* PAYMENT FORMS */}
            {/* ---------------------------------- */}

            <AnimatePresence mode="wait">
              {/* ================================= */}
              {/* CARD */}
              {/* ================================= */}

              {method === "card" && (
                <motion.div
                  key="card"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mt-8"
                >
                  {/* Card Preview */}
                  <div className="mx-auto mb-8 h-52 w-full max-w-sm [perspective:1000px]">
                    <motion.div
                      animate={{
                        rotateY: flipped ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="relative h-full w-full [transform-style:preserve-3d]"
                    >
                      {/* Front */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-6 text-white shadow-2xl [backface-visibility:hidden]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-widest opacity-90">
                            Elite SkyPass
                          </span>

                          <CreditCard
                            size={22}
                            className="opacity-90"
                          />
                        </div>

                        <div className="mt-8 text-xl font-bold tracking-[0.25em]">
                          {card.number ||
                            "•••• •••• •••• ••••"}
                        </div>

                        <div className="mt-6 flex justify-between text-xs">
                          <div className="min-w-0">
                            <p className="text-[9px] uppercase tracking-wider opacity-60">
                              Cardholder
                            </p>

                            <p className="mt-0.5 max-w-[170px] truncate font-bold tracking-wide">
                              {card.name ||
                                "YOUR NAME"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[9px] uppercase tracking-wider opacity-60">
                              Expires
                            </p>

                            <p className="mt-0.5 font-bold tracking-wide">
                              {card.expiry ||
                                "MM/YY"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Back */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="mt-7 h-10 bg-black/80" />

                        <div className="mx-6 mt-5 rounded-xl bg-slate-800 p-3 text-right">
                          <span className="text-[10px] font-bold uppercase text-slate-400">
                            CVV Code
                          </span>

                          <span className="ml-3 font-mono font-bold text-amber-400">
                            {card.cvv || "•••"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Card Information */}
                  <div className="grid gap-5 lg:grid-cols-2">
                    <InputField
                      label="Card Number"
                      value={card.number}
                      placeholder="4532 •••• •••• ••••"
                      mono
                      className="lg:col-span-2"
                      onChange={(value) =>
                        setCard({
                          ...card,
                          number: formatCard(value),
                        })
                      }
                    />

                    <InputField
                      label="Cardholder Name"
                      value={card.name}
                      placeholder="ALEXANDER WRIGHT"
                      uppercase
                      onChange={(value) =>
                        setCard({
                          ...card,
                          name: value.toUpperCase(),
                        })
                      }
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Expires"
                        value={card.expiry}
                        placeholder="MM/YY"
                        mono
                        onChange={(value) =>
                          setCard({
                            ...card,
                            expiry: formatExpiry(value),
                          })
                        }
                      />

                      <InputField
                        label="CVV"
                        value={card.cvv}
                        placeholder="123"
                        mono
                        onFocus={() => setFlipped(true)}
                        onBlur={() => setFlipped(false)}
                        onChange={(value) =>
                          setCard({
                            ...card,
                            cvv: value
                              .replace(/\D/g, "")
                              .slice(0, 3),
                          })
                        }
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ================================= */}
              {/* UPI */}
              {/* ================================= */}

              {method === "upi" && (
                <motion.div
                  key="upi"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mt-8"
                >
                  <div className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-slate-800 bg-slate-950/60 p-6 text-center backdrop-blur-sm sm:p-8">
                    <motion.div
                      animate={{
                        scale: [1, 1.06, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/15 text-amber-400 shadow-inner"
                    >
                      <Smartphone size={32} />
                    </motion.div>

                    <h3 className="mt-5 text-lg font-black text-white">
                      Instant UPI Transfer
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Enter your Virtual Payment Address
                    </p>

                    <input
                      value={upi}
                      onChange={(e) => {
                        setUpi(e.target.value);
                        setError("");
                      }}
                      placeholder="username@okhdfcbank"
                      className="mt-6 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-center text-sm font-medium text-white outline-none transition focus:border-amber-400 placeholder:text-slate-600"
                    />

                    <div className="mt-6 flex flex-wrap justify-center gap-3 text-[11px] font-bold text-slate-500">
                      <span className="text-slate-300">
                        Google Pay
                      </span>
                      <span>•</span>
                      <span className="text-slate-300">
                        PhonePe
                      </span>
                      <span>•</span>
                      <span className="text-slate-300">
                        Paytm
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ================================= */}
              {/* CASH */}
              {/* ================================= */}

              {method === "cash" && (
                <motion.div
                  key="cash"
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mt-8"
                >
                  <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 text-center backdrop-blur-sm sm:p-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/15 text-amber-400 shadow-inner">
                      <IndianRupee size={32} />
                    </div>

                    <h3 className="mt-5 text-lg font-black text-white">
                      Counter Settlement
                    </h3>

                    <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-400">
                      Reserve this seat configuration and
                      complete payment at the designated
                      airline counter according to the
                      reservation terms.
                    </p>

                    <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs font-bold text-amber-300">
                      Reservation remains locked after
                      confirmation.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="mt-5 overflow-hidden"
                >
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---------------------------------- */}
            {/* PAY BUTTON */}
            {/* ---------------------------------- */}

            <motion.button
              type="button"
              whileHover={{
                scale: 1.015,
                boxShadow:
                  "0 0 35px rgba(245,158,11,0.25)",
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handlePay}
              disabled={processing}
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 py-4 font-black text-white shadow-xl shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {processing ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />

                  Processing Secure Transaction...
                </>
              ) : (
                <>
                  <Lock size={17} />

                  Authorize & Pay ₹
                  {price.toLocaleString("en-IN")}

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-slate-500">
              <ShieldCheck
                size={16}
                className="text-amber-400"
              />

              <span>
                PCI-DSS Compliant • Secure Checkout •
                Encrypted Payment
              </span>
            </div>
          </motion.div>

          {/* ==================================== */}
          {/* RIGHT SIDEBAR */}
          {/* ==================================== */}

          <motion.aside
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className="h-fit w-full rounded-[2.5rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
          >
            {/* Sidebar Heading */}
            <div className="flex items-center gap-2 text-amber-400">
              <Sparkles size={15} />

              <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                Booking Summary
              </p>
            </div>

            <div className="mt-2 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">
                  {airline}
                </h2>

                <p className="mt-1 text-xs font-bold text-slate-500">
                  {flightCode}
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-right">
                <p className="text-[9px] font-black uppercase tracking-wider text-amber-400">
                  Class
                </p>

                <p className="mt-0.5 text-xs font-black text-white">
                  {travelClass}
                </p>
              </div>
            </div>

            {/* Route */}
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-white">
                    {fromCode}
                  </p>

                  <p className="mt-1 text-[10px] font-bold text-slate-500">
                    {fromCity}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
                    Departure
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={{
                      x: [-3, 3, -3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <ArrowRight
                      size={18}
                      className="text-amber-400"
                    />
                  </motion.div>

                  <span className="text-[9px] font-bold text-slate-600">
                    {duration}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black text-white">
                    {toCode}
                  </p>

                  <p className="mt-1 text-[10px] font-bold text-slate-500">
                    {toCity}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
                    Arrival
                  </p>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="mt-5 space-y-3 border-t border-slate-800/80 pt-5">
              <SummaryRow
                icon={CalendarDays}
                label="Travel Date"
                value={travelDate}
              />

              <SummaryRow
                icon={Clock3}
                label="Departure"
                value={`${departure} → ${arrival}`}
              />

              <SummaryRow
                icon={Plane}
                label="Flight Type"
                value={stops}
              />

              <SummaryRow
                icon={WalletCards}
                label="Travel Class"
                value={travelClass}
              />
            </div>

            {/* Passenger */}
            <div className="mt-5 border-t border-slate-800/80 pt-5">
              <div className="mb-3 flex items-center gap-2">
                <Users
                  size={15}
                  className="text-amber-400"
                />

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Passenger Details
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-sm font-black text-white">
                  {passengerName}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {passengerEmail}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {passengerPhone}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Selected Seat
                  </span>

                  <span className="rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-black text-amber-400">
                    {selectedSeat}
                  </span>
                </div>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="mt-5 border-t border-slate-800/80 pt-5">
              <div className="mb-3 flex items-center gap-2">
                <ReceiptText
                  size={15}
                  className="text-amber-400"
                />

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Fare Breakdown
                </p>
              </div>

              <div className="space-y-3">
                <FareRow
                  label="Base Fare"
                  value={baseFare}
                />

                <FareRow
                  label="Taxes & Fees"
                  value={taxes}
                />

                <FareRow
                  label="Convenience Fee"
                  value={convenienceFee}
                />
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 border-t border-slate-800/80 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total Due
                  </p>

                  <p className="mt-1 text-[10px] text-slate-600">
                    Inclusive of applicable taxes
                  </p>
                </div>

                <span className="text-2xl font-black text-amber-400">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Security */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-amber-400"
              />

              <div>
                <p className="text-xs font-black text-white">
                  Secure Payment
                </p>

                <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
                  Your payment information is protected
                  using encrypted checkout technology.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

/* ================================================= */
/* INFO BLOCK */
/* ================================================= */

function InfoBlock({
  icon: Icon,
  label,
  value,
  detail,
}) {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
        <Icon
          size={18}
          className="text-amber-400"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-600">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-black text-white">
          {value}
        </p>

        <p className="mt-0.5 truncate text-[10px] font-bold text-slate-500">
          {detail}
        </p>
      </div>
    </div>
  );
}

/* ================================================= */
/* INPUT FIELD */
/* ================================================= */

function InputField({
  label,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  mono = false,
  uppercase = false,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 placeholder:text-slate-600 ${
          mono ? "font-mono" : ""
        } ${uppercase ? "uppercase" : ""}`}
      />
    </div>
  );
}

/* ================================================= */
/* SUMMARY ROW */
/* ================================================= */

function SummaryRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-2">
        {Icon && (
          <Icon
            size={14}
            className="shrink-0 text-slate-600"
          />
        )}

        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>

      <span className="max-w-[55%] truncate text-right text-xs font-black text-white">
        {value}
      </span>
    </div>
  );
}

/* ================================================= */
/* FARE ROW */
/* ================================================= */

function FareRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-bold text-slate-300">
        ₹{Number(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

/* ================================================= */
/* CONFIRMATION ITEM */
/* ================================================= */

function ConfirmationItem({
  label,
  value,
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-black uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-black text-white">
        {value}
      </p>
    </div>
  );
}
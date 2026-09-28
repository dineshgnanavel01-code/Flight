import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CreditCard,IndianRupee,Lock,Smartphone,Crown,ArrowRight,LoaderCircle,ShieldCheck,Sparkles,} from "lucide-react";

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

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upi, setUpi] = useState("");

  const price = flight?.price || 5499;

  const paymentMethods = [
    {
      id: "card",
      label: "Credit Card",
      icon: CreditCard,
    },
    {
      id: "upi",
      label: "UPI Transfer",
      icon: Smartphone,
    },
    {
      id: "cash",
      label: "Counter Cash",
      icon: IndianRupee,
    },
  ];

  const formatCard = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 16);
    return numbers.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 4);
    if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }
    return numbers;
  };

  const handlePay = () => {
    if (processing || success) return;

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        onPayment?.({
          method,
          status: "Paid",
          amount: price,
          transactionId:
            "TXN" +
            Math.floor(100000 + Math.random() * 900000),
        });
      }, 1800);
    }, 1800);
  };

  if (success) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-16 text-white">
        {/* Amber Glow Background */}
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
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
          }}
          className="relative z-10 w-full max-w-xl rounded-[2.5rem] border border-amber-500/30 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12,
            }}
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-[0_0_60px_rgba(245,158,11,0.4)]"
          >
            <Check size={52} strokeWidth={3} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-amber-400"
          >
            Payment Secured
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-3 text-3xl font-black sm:text-4xl text-white"
          >
            Booking <span className="text-amber-400">Confirmed!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-3 text-sm text-slate-400 leading-relaxed"
          >
            Your luxury ticket is successfully reserved. Generating your boarding documents...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Payment Channel
              </span>
              <span className="text-sm font-black text-white">
                {method === "card"
                  ? "Credit / Debit Card"
                  : method === "upi"
                  ? "UPI Direct"
                  : "Counter Cash"}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-4">
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
            Redirecting to e-ticket manifest...
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      {/* Immersive Sunset Amber Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-amber-500/10 blur-[130px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[140px]"
          animate={{ x: [0, -60, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
            <Crown size={22} className="text-amber-400" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-400">
            First Class Suite Gateway
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Complete Your <span className="text-amber-400">Payment</span>
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400 leading-relaxed">
            Select your preferred secure channel to finalize your high-priority seat reservation.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Main Checkout Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            {/* Payment Method Selector Cards */}
            <div className="grid grid-cols-3 gap-3.5">
              {paymentMethods.map((item) => {
                const Icon = item.icon;
                const active = method === item.id;

                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ y: -3, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMethod(item.id)}
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
                        active ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    />
                    <p className="mt-2.5 text-xs font-black tracking-wide">
                      {item.label}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {method === "card" && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
               
                  <div className="mx-auto mb-8 h-52 max-w-sm [perspective:1000px]">
                    <motion.div
                      animate={{ rotateY: flipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="relative h-full w-full [transform-style:preserve-3d]"
                    >
                      {/* Front Side */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-6 text-white shadow-2xl [backface-visibility:hidden]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black tracking-widest uppercase opacity-90">
                            Elite SkyPass
                          </span>
                          <CreditCard size={22} className="opacity-90" />
                        </div>

                        <div className="mt-8 text-xl font-bold tracking-[0.25em]">
                          {card.number || "•••• •••• •••• ••••"}
                        </div>

                        <div className="mt-6 flex justify-between text-xs">
                          <div>
                            <p className="text-[9px] uppercase tracking-wider opacity-60">
                              Cardholder Name
                            </p>
                            <p className="mt-0.5 font-bold tracking-wide truncate max-w-[170px]">
                              {card.name || "YOUR NAME"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider opacity-60">
                              Expires
                            </p>
                            <p className="mt-0.5 font-bold tracking-wide">
                              {card.expiry || "MM/YY"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="mt-7 h-10 bg-black/80" />
                        <div className="mx-6 mt-5 rounded-xl bg-slate-800 p-3 text-right">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            CVV Code
                          </span>
                          <span className="ml-3 font-mono font-bold text-amber-400">
                            {card.cvv || "•••"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-400">
                        Card Number
                      </label>
                      <input
                        value={card.number}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            number: formatCard(e.target.value),
                          })
                        }
                        placeholder="4532 •••• •••• ••••"
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-sm text-white outline-none transition focus:border-amber-400 placeholder:text-slate-600 font-mono"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-400">
                        Cardholder Name
                      </label>
                      <input
                        value={card.name}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            name: e.target.value.toUpperCase(),
                          })
                        }
                        placeholder="ALEXANDER WRIGHT"
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-sm text-white uppercase outline-none transition focus:border-amber-400 placeholder:text-slate-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-400">
                          Expires
                        </label>
                        <input
                          value={card.expiry}
                          onChange={(e) =>
                            setCard({
                              ...card,
                              expiry: formatExpiry(e.target.value),
                            })
                          }
                          placeholder="MM/YY"
                          className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-sm text-white outline-none transition focus:border-amber-400 placeholder:text-slate-600 font-mono"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-400">
                          CVV
                        </label>
                        <input
                          value={card.cvv}
                          onFocus={() => setFlipped(true)}
                          onBlur={() => setFlipped(false)}
                          onChange={(e) =>
                            setCard({
                              ...card,
                              cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                            })
                          }
                          placeholder="123"
                          className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-sm text-white outline-none transition focus:border-amber-400 placeholder:text-slate-600 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* UPI FORM */}
              {method === "upi" && (
                <motion.div
                  key="upi"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-slate-800 bg-slate-950/60 p-8 text-center backdrop-blur-sm">
                    <motion.div
                      animate={{ scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-inner"
                    >
                      <Smartphone size={32} />
                    </motion.div>

                    <h3 className="mt-5 text-lg font-black text-white">
                      Instant UPI Transfer
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Enter your virtual payment address (VPA)
                    </p>

                    <input
                      value={upi}
                      onChange={(e) => setUpi(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="mt-6 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-center text-sm font-medium text-white outline-none transition focus:border-amber-400 placeholder:text-slate-600"
                    />

                    <div className="mt-6 flex flex-wrap justify-center gap-3 text-[11px] font-bold text-slate-500">
                      <span className="text-slate-300">Google Pay</span>
                      <span>•</span>
                      <span className="text-slate-300">PhonePe</span>
                      <span>•</span>
                      <span className="text-slate-300">Paytm</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CASH FORM */}
              {method === "cash" && (
                <motion.div
                  key="cash"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 text-center backdrop-blur-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-inner">
                      <IndianRupee size={32} />
                    </div>

                    <h3 className="mt-5 text-lg font-black text-white">
                      Counter Settlement
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-400">
                      Reserve this seat configuration now and remit payment directly at the priority airline lounge desk within 2 hours.
                    </p>

                    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs font-bold text-amber-300">
                      Reservation remains locked upon clicking confirm.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pay Action Button */}
            <motion.button
              whileHover={{ scale: 1.015, boxShadow: "0 0 35px rgba(245,158,11,0.25)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePay}
              disabled={processing}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 py-4 font-black text-white shadow-xl shadow-amber-500/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {processing ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Processing Secure Transaction...
                </>
              ) : (
                <>
                  <Lock size={17} />
                  Authorize & Pay ₹{price.toLocaleString("en-IN")}
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-amber-400" />
              <span>PCI-DSS Compliant & End-to-End Encrypted</span>
            </div>
          </motion.div>

          {/* Sidebar Summary Card */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-fit rounded-[2.5rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-amber-400">
              <Sparkles size={15} />
              <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                Manifest Summary
              </p>
            </div>

            <h2 className="mt-2 text-xl font-black text-white">
              {flight?.airline || "SkyBook Priority"}
            </h2>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div>
                <p className="text-2xl font-black text-white">
                  {flight?.from || "DEL"}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Origin
                </p>
              </div>

              <motion.div
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight size={18} className="text-amber-400" />
              </motion.div>

              <div className="text-right">
                <p className="text-2xl font-black text-white">
                  {flight?.to || "BLR"}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Arrival
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3.5 border-t border-slate-800/80 pt-5">
              <SummaryRow
                label="Passenger"
                value={
                  passenger
                    ? `${passenger.firstName || ""} ${passenger.lastName || ""}`.trim() || "Alex Wright"
                    : "Alex Wright"
                }
              />
              <SummaryRow label="Selected Seat" value={seat || "12A"} />
              <SummaryRow label="Service Class" value="First Suite" />
              <SummaryRow
                label="Payment Method"
                value={
                  method === "card"
                    ? "Credit Card"
                    : method === "upi"
                    ? "UPI Transfer"
                    : "Counter Cash"
                }
              />
            </div>

            <div className="mt-6 border-t border-slate-800/80 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Due
                </span>
                <span className="text-2xl font-black text-amber-400">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <span className="font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="font-black text-white truncate">{value}</span>
    </div>
  );
}
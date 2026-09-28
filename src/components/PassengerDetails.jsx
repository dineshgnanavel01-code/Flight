import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight,Check, Mail, Phone,Plane,ShieldCheck,Sparkles,User,Crown,Compass,} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Passenger",
    subtitle: "Personal details",
    icon: User,
  },
  {
    number: 2,
    title: "Contact",
    subtitle: "Reach you",
    icon: Phone,
  },
  {
    number: 3,
    title: "Review",
    subtitle: "Confirm",
    icon: Check,
  },
];

export default function PassengerDetails({ onContinue = () => {} }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validatePassenger = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContact = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    const cleanPhone = form.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (step === 1 && validatePassenger()) setStep(2);
    if (step === 2 && validateContact()) setStep(3);
  };

  const back = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const finish = () => {
    onContinue?.(form);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-10%] top-[5%] h-[450px] w-[450px] rounded-full bg-amber-500/10 blur-[130px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[140px]"
          animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,158,11,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3.5">
            <motion.div
              animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10"
            >
              <Crown size={22} className="text-amber-400" />
            </motion.div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-400">
                First Class Suite
              </p>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl text-white">
                Passenger Manifest
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            Please register official passport and contact details to secure your priority booking status.
          </p>
        </motion.div>

        <div className="relative mb-10">
          <div className="absolute left-[10%] right-[10%] top-7 h-px bg-slate-800 sm:left-[12%] sm:right-[12%]" />
          <motion.div
            className="absolute left-[10%] top-7 h-px bg-gradient-to-r from-amber-500 to-orange-500 sm:left-[12%]"
            animate={{
              width: step === 1 ? "0%" : step === 2 ? "38%" : "76%",
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <div className="relative grid grid-cols-3">
            {steps.map((item) => {
              const Icon = item.icon;
              const active = step >= item.number;
              const current = step === item.number;

              return (
                <motion.div
                  key={item.number}
                  className="flex flex-col items-center"
                  animate={{ y: current ? -2 : 0 }}
                >
                  <motion.div
                    animate={active && current ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 1.8, repeat: current ? Infinity : 0 }}
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all ${
                      active
                        ? "border-amber-400/50 bg-amber-500/15 text-amber-400 shadow-lg shadow-amber-500/25"
                        : "border-slate-800 bg-slate-900/60 text-slate-600"
                    }`}
                  >
                    {step > item.number ? <Check size={20} className="text-amber-400" /> : <Icon size={20} />}
                  </motion.div>

                  <p className={`mt-3 text-xs font-black sm:text-sm ${active ? "text-white" : "text-slate-600"}`}>
                    {item.title}
                  </p>
                  <p className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:block">
                    {item.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl"
          >
            <div className="border-b border-slate-800 px-6 py-6 sm:px-8 bg-slate-900/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
                    Phase 0{step} of 03
                  </p>
                  <h2 className="mt-1.5 text-2xl font-black text-white sm:text-3xl">
                    {step === 1 && "Who will be traveling?"}
                    {step === 2 && "Where can we send updates?"}
                    {step === 3 && "Review your manifests"}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                
                {step === 1 && (
                  <motion.div
                    key="passenger"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 backdrop-blur-sm">
                      <div className="flex gap-3.5 items-center">
                        <ShieldCheck size={22} className="shrink-0 text-amber-400" />
                        <div>
                          <p className="text-xs font-black text-amber-300">
                            Passport Matching Requirement
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
                            Ensure names match government-issued identification cards for hassle-free check-in.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="First Name"
                        placeholder="e.g. Alexander"
                        value={form.firstName}
                        error={errors.firstName}
                        onChange={(val) => updateField("firstName", val)}
                      />
                      <Input
                        label="Last Name"
                        placeholder="e.g. Wright"
                        value={form.lastName}
                        error={errors.lastName}
                        onChange={(val) => updateField("lastName", val)}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="mb-8 grid gap-4 sm:grid-cols-2">
                      <InfoBadge
                        icon={<Mail size={16} />}
                        title="Instant E-Ticket"
                        text="Boarding passes sent straight to inbox"
                      />
                      <InfoBadge
                        icon={<Phone size={16} />}
                        title="SMS Gate Alerts"
                        text="Live gate changes & notifications"
                      />
                    </div>

                    <div className="space-y-5">
                      <Input
                        label="Email Address"
                        placeholder="alexander@example.com"
                        type="email"
                        value={form.email}
                        error={errors.email}
                        onChange={(val) => updateField("email", val)}
                        icon={<Mail size={17} />}
                      />
                      <Input
                        label="Phone Number"
                        placeholder="+91 98765 43210"
                        type="tel"
                        value={form.phone}
                        error={errors.phone}
                        onChange={(val) => updateField("phone", val)}
                        icon={<Phone size={17} />}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-600/5 to-transparent p-5 sm:p-6 backdrop-blur-md">
                      <div className="relative">
                        <div className="mb-6 flex items-center gap-3.5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-inner">
                            <Check size={22} />
                          </div>
                          <div>
                            <p className="text-base font-black text-white">
                              Manifest Verified
                            </p>
                            <p className="text-xs text-slate-400">
                              Please review your registration info below.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <ReviewItem
                            title="Full Passenger Name"
                            value={`${form.firstName} ${form.lastName}`}
                            icon={<User size={16} />}
                          />
                          <ReviewItem
                            title="Email Destination"
                            value={form.email}
                            icon={<Mail size={16} />}
                          />
                          <ReviewItem
                            title="Contact Telephone"
                            value={form.phone}
                            icon={<Phone size={16} />}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex gap-3.5">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={back}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:border-amber-500/40 hover:text-white"
                  >
                    <ArrowLeft size={19} />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.015, boxShadow: "0 0 35px rgba(245,158,11,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={step < 3 ? next : finish}
                  className="group relative flex h-14 flex-1 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 font-black text-white shadow-xl shadow-amber-500/25"
                >
                  <span className="relative">
                    {step === 1 && "Proceed to Contact Information"}
                    {step === 2 && "Review Final Manifest"}
                    {step === 3 && "Continue to Seat Selection"}
                  </span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="sticky top-6 overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl">
              <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-600/5 to-transparent border border-slate-800/80">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute left-0 top-1/2 h-px w-full border-t border-dashed border-amber-400" />
                </div>

                <motion.div
                  animate={{ x: [-45, 45, -45], y: [8, -8, 8], rotate: [6, -6, 6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl" />
                  <Plane size={32} className="relative text-amber-400" />
                </motion.div>

                <div className="absolute bottom-4 left-5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Origin</p>
                  <p className="mt-0.5 text-lg font-black text-white">DEL</p>
                </div>

                <div className="absolute bottom-4 right-5 text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Destination</p>
                  <p className="mt-0.5 text-lg font-black text-white">BLR</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sparkles size={15} />
                  <span className="text-xs font-black uppercase tracking-widest">VIP Process</span>
                </div>
                <h3 className="mt-1.5 text-xl font-black text-white">Flight Check-In</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Provide your passenger profile to secure customized seating and priority luggage service.
                </p>
              </div>

              <div className="mt-6 space-y-2.5">
                <JourneyItem number="01" title="Passenger Registration" active={step >= 1} />
                <JourneyItem number="02" title="Aircraft Seat Choice" active={false} />
                <JourneyItem number="03" title="Secure Payment" active={false} />
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 backdrop-blur-sm">
                <ShieldCheck size={18} className="shrink-0 text-emerald-400" />
                <span className="text-[11px] text-emerald-300 leading-relaxed">
                  Military-grade encryption safeguards your personal identification details.
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



function Input({ label, placeholder, value, error, onChange, type = "text", icon }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="group relative">
        {icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-amber-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl border bg-slate-950/60 py-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 ${
            icon ? "pl-12 pr-4" : "px-4"
          } ${
            error
              ? "border-red-500/50 focus:border-red-400"
              : "border-slate-800 focus:border-amber-400 focus:bg-slate-900/90 shadow-sm"
          }`}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-xs font-bold text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoBadge({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 text-amber-400">
        {icon}
        <span className="text-xs font-black">{title}</span>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{text}</p>
    </motion.div>
  );
}

function ReviewItem({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">{title}</p>
        <p className="mt-0.5 truncate text-sm font-black text-white">{value}</p>
      </div>
      <Check size={18} className="ml-auto shrink-0 text-amber-400" />
    </motion.div>
  );
}

function JourneyItem({ number, title, active }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-all ${
        active
          ? "border-amber-500/30 bg-amber-500/10 shadow-sm"
          : "border-slate-800/80 bg-slate-950/40"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl text-[10px] font-black ${
          active
            ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30"
            : "bg-slate-900 text-slate-600 border border-slate-800"
        }`}
      >
        {number}
      </div>
      <span className={`text-xs font-black ${active ? "text-white" : "text-slate-500"}`}>
        {title}
      </span>
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto h-2 w-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50 animate-pulse"
        />
      )}
    </div>
  );
}
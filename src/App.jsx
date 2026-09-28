import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import FlightSearch from "./components/FlightSearch";
import FlightResults from "./components/FlightResults";
import FlightDetails from "./components/FlightDetails";
import PassengerDetails from "./components/PassengerDetails";
import SeatSelection from "./components/SeatSelection";
import Payment from "./components/Payment";
import BookingConfirmation from "./components/BookingConfirmation";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("search");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [seat, setSeat] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => navigate("results");
  const handleDetails = (flight) => { setSelectedFlight(flight); navigate("details"); };
  const handleContinueBooking = (flight) => { if (flight) setSelectedFlight(flight); navigate("passenger"); };
  const handlePassenger = (data) => { setPassenger(data); navigate("seats"); };
  const handleSeat = (selectedSeat) => { setSeat(selectedSeat); navigate("payment"); };
  const handlePayment = (paymentData) => { setPayment(paymentData); navigate("confirmation"); };
  const handleNewBooking = () => {
    setSelectedFlight(null); setPassenger(null); setSeat(null); setPayment(null); navigate("search");
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Navbar page={page} selectedFlight={selectedFlight} onNavigate={navigate} />
      <main className="min-h-screen pt-[72px]">
        <AnimatePresence mode="wait">
          {page === "search" && <PageTransition key="search" direction="up"><FlightSearch onSearch={handleSearch} /></PageTransition>}
          {page === "results" && <PageTransition key="results" direction="right"><FlightResults onDetails={handleDetails} /></PageTransition>}
          {page === "details" && selectedFlight && <PageTransition key="details" direction="right"><FlightDetails flight={selectedFlight} onClose={() => navigate("results")} onContinue={handleContinueBooking} /></PageTransition>}
          {page === "passenger" && <PageTransition key="passenger" direction="right"><PassengerDetails flight={selectedFlight} onContinue={handlePassenger} onBack={() => navigate("details")} /></PageTransition>}
          {page === "seats" && <PageTransition key="seats" direction="scale"><SeatSelection flight={selectedFlight} passenger={passenger} onContinue={handleSeat} onBack={() => navigate("passenger")} /></PageTransition>}
          {page === "payment" && <PageTransition key="payment" direction="up"><Payment flight={selectedFlight} passenger={passenger} seat={seat} onPayment={handlePayment} /></PageTransition>}
          {page === "confirmation" && <PageTransition key="confirmation" direction="scale"><BookingConfirmation flight={selectedFlight} passenger={passenger} seat={seat} payment={payment} onNewBooking={handleNewBooking} /></PageTransition>}
        </AnimatePresence>
      </main>
    </div>
  );
}

function PageTransition({ children, direction }) {
  const variants = {
    up: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -24 } },
    right: { initial: { opacity: 0, x: 48 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -48 } },
    scale: { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 } },
  };
  const v = variants[direction];
  return <motion.div initial={v.initial} animate={v.animate} exit={v.exit} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

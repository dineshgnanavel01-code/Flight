import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import FlightSearch from "./components/FlightSearch";
import FlightResults from "./components/FlightResults";
import FlightDetails from "./components/FlightDetails";
import PassengerDetails from "./components/PassengerDetails";
import SeatSelection from "./components/SeatSelection";
import Payment from "./components/Payment";
import BookingConfirmation from "./components/BookingConfirmation";

const emptyState = (title, message) => (
  <div className="flex min-h-[420px] items-center justify-center bg-slate-950 px-4 py-16">
    <div className="w-full max-w-2xl rounded-3xl border border-amber-400/15 bg-white/[0.03] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400">
        <span className="text-2xl">✈</span>
      </div>
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">{message}</p>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("search");
  const [searched, setSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);\n  const [detailsOpen, setDetailsOpen] = useState(false);
  const [passenger, setPassenger] = useState(null);
  const [seat, setSeat] = useState(null);
  const [payment, setPayment] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    });
  };

  const navigate = (nextPage) => {
    setPage(nextPage);
    scrollToSection(nextPage);
  };

  const handleSearch = () => {
    setSearched(true);
    navigate("results");
  };

  const handleDetails = (flight) => {
    setSelectedFlight(flight);
    navigate("details");
  };

  const handlePassenger = (data) => {
    setPassenger(data);
    navigate("seats");
  };

  const handleSeat = (selectedSeat) => {
    setSeat(selectedSeat);
    navigate("payment");
  };

  const handlePayment = (data) => {
    setPayment(data);
    setConfirmed(true);
    navigate("confirmation");
  };

  const handleNewBooking = () => {
    setSearched(false);
    setSelectedFlight(null);
    setPassenger(null);
    setSeat(null);
    setPayment(null);
    setConfirmed(false);
    navigate("search");
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Navbar page={page} onNavigate={navigate} />
      <main className="pt-[72px]">
        <section id="search" className="scroll-mt-24">
          <FlightSearch onSearch={handleSearch} />
        </section>

        <section id="results" className="scroll-mt-24">
          {searched ? <FlightResults onDetails={handleDetails} /> : emptyState("Flight Results", "Search for a flight first. This section is available from the navbar.")}
        </section>

        <section id="details" className="scroll-mt-24">
          {selectedFlight ? (
            <FlightDetails flight={selectedFlight} onClose={() => navigate("results")} onContinue={() => navigate("passenger")} />
          ) : emptyState("Flight Details", "Select a flight from Flights to see complete flight details here.")}
        </section>

        <section id="passenger" className="scroll-mt-24">
          {selectedFlight ? (
            <PassengerDetails flight={selectedFlight} onContinue={handlePassenger} onBack={() => navigate("details")} />
          ) : emptyState("Passenger Details", "Select a flight first. Your passenger form will appear here.")}
        </section>

        <section id="seats" className="scroll-mt-24">
          {selectedFlight ? (
            <SeatSelection flight={selectedFlight} passenger={passenger} onContinue={handleSeat} onBack={() => navigate("passenger")} />
          ) : emptyState("Seat Selection", "Select a flight first. Your interactive seat map will appear here.")}
        </section>

        <section id="payment" className="scroll-mt-24">
          {selectedFlight ? (
            <Payment flight={selectedFlight} passenger={passenger} seat={seat} onPayment={handlePayment} />
          ) : emptyState("Payment", "Complete flight selection first. Your payment section will appear here.")}
        </section>

        <section id="confirmation" className="scroll-mt-24">
          {confirmed ? (
            <BookingConfirmation flight={selectedFlight} passenger={passenger} seat={seat} payment={payment} onNewBooking={handleNewBooking} />
          ) : emptyState("Booking Confirmation", "Your ticket confirmation will appear here after successful payment.")}
        </section>
      </main>
    </div>
  );
}
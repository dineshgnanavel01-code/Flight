import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  const [searched, setSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [seat, setSeat] = useState(null);
  const [payment, setPayment] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (nextPage) => setPage(nextPage);

  const handleSearch = () => {
    setSearched(true);
    setPage("results");
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleDetails = (flight) => {
    setSelectedFlight(flight);
    setPage("details");
    setTimeout(() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handlePassenger = (data) => {
    setPassenger(data);
    setPage("seats");
    setTimeout(() => document.getElementById("seats")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleSeat = (selectedSeat) => {
    setSeat(selectedSeat);
    setPage("payment");
    setTimeout(() => document.getElementById("payment")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handlePayment = (data) => {
    setPayment(data);
    setConfirmed(true);
    setPage("confirmation");
    setTimeout(() => document.getElementById("confirmation")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleNewBooking = () => {
    setSearched(false);
    setSelectedFlight(null);
    setPassenger(null);
    setSeat(null);
    setPayment(null);
    setConfirmed(false);
    setPage("search");
    setTimeout(() => document.getElementById("search")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Navbar page={page} selectedFlight={selectedFlight} searched={searched} confirmed={confirmed} onNavigate={navigate} />

      <main className="pt-[72px]">
        <section id="search" className="scroll-mt-24">
          <FlightSearch onSearch={handleSearch} />
        </section>

        {searched && (
          <section id="results" className="scroll-mt-24">
            <FlightResults onDetails={handleDetails} />
          </section>
        )}

        {selectedFlight && (
          <>
            <section id="details" className="scroll-mt-24">
              <FlightDetails flight={selectedFlight} onClose={() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })} onContinue={() => { setPage("passenger"); document.getElementById("passenger")?.scrollIntoView({ behavior: "smooth" }); }} />
            </section>

            <section id="passenger" className="scroll-mt-24">
              <PassengerDetails flight={selectedFlight} onContinue={handlePassenger} onBack={() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })} />
            </section>

            <section id="seats" className="scroll-mt-24">
              <SeatSelection flight={selectedFlight} passenger={passenger} onContinue={handleSeat} onBack={() => document.getElementById("passenger")?.scrollIntoView({ behavior: "smooth" })} />
            </section>

            <section id="payment" className="scroll-mt-24">
              <Payment flight={selectedFlight} passenger={passenger} seat={seat} onPayment={handlePayment} />
            </section>

            {confirmed && (
              <section id="confirmation" className="scroll-mt-24">
                <BookingConfirmation flight={selectedFlight} passenger={passenger} seat={seat} payment={payment} onNewBooking={handleNewBooking} />
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

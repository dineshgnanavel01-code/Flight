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

  const scrollToSection = (id) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const navigate = (nextPage) => {
    setPage(nextPage);
    scrollToSection(nextPage);
  };

  const handleSearch = () => {
    setSearched(true);
    setPage("results");
    scrollToSection("results");
  };

  const handleDetails = (flight) => {
    setSelectedFlight(flight);
    setPage("details");
    scrollToSection("details");
  };

  const handlePassenger = (data) => {
    setPassenger(data);
    setPage("seats");
    scrollToSection("seats");
  };

  const handleSeat = (selectedSeat) => {
    setSeat(selectedSeat);
    setPage("payment");
    scrollToSection("payment");
  };

  const handlePayment = (data) => {
    setPayment(data);
    setConfirmed(true);
    setPage("confirmation");
    scrollToSection("confirmation");
  };

  const handleNewBooking = () => {
    setSearched(false);
    setSelectedFlight(null);
    setPassenger(null);
    setSeat(null);
    setPayment(null);
    setConfirmed(false);
    setPage("search");
    scrollToSection("search");
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Navbar
        page={page}
        selectedFlight={selectedFlight}
        searched={searched}
        confirmed={confirmed}
        onNavigate={navigate}
      />

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
              <FlightDetails
                flight={selectedFlight}
                onClose={() => {
                  setPage("results");
                  scrollToSection("results");
                }}
                onContinue={() => {
                  setPage("passenger");
                  scrollToSection("passenger");
                }}
              />
            </section>

            <section id="passenger" className="scroll-mt-24">
              <PassengerDetails
                flight={selectedFlight}
                onContinue={handlePassenger}
                onBack={() => {
                  setPage("details");
                  scrollToSection("details");
                }}
              />
            </section>

            <section id="seats" className="scroll-mt-24">
              <SeatSelection
                flight={selectedFlight}
                passenger={passenger}
                onContinue={handleSeat}
                onBack={() => {
                  setPage("passenger");
                  scrollToSection("passenger");
                }}
              />
            </section>

            <section id="payment" className="scroll-mt-24">
              <Payment
                flight={selectedFlight}
                passenger={passenger}
                seat={seat}
                onPayment={handlePayment}
              />
            </section>

            {confirmed && (
              <section id="confirmation" className="scroll-mt-24">
                <BookingConfirmation
                  flight={selectedFlight}
                  passenger={passenger}
                  seat={seat}
                  payment={payment}
                  onNewBooking={handleNewBooking}
                />
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

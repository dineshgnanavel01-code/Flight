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

      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
        {message}
      </p>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("search");

  const [searched, setSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [passenger, setPassenger] = useState(null);
  const [seat, setSeat] = useState(null);
  const [payment, setPayment] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to section after DOM/state update
  const scrollToSection = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);

      if (!element) {
        console.warn(`Section #${id} not found`);
        return;
      }

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  // Navbar navigation
  const navigate = (nextPage) => {
    // Close details drawer when navigating away
    if (nextPage !== "details") {
      setDetailsOpen(false);
    }

    setPage(nextPage);
    scrollToSection(nextPage);
  };

  // Search flights
  const handleSearch = (searchData) => {
    console.log("Search data:", searchData);

    setSearched(true);
    setPage("results");
    setDetailsOpen(false);

    scrollToSection("results");
  };

  // Select flight
  const handleDetails = (flight) => {
    console.log("Selected flight:", flight);

    setSelectedFlight(flight);
    setDetailsOpen(true);
    setPage("details");

    scrollToSection("details");
  };

  // Continue Booking:
  // Details -> Passenger
  const handleContinueBooking = (flight) => {
    console.log("Continue Booking:", flight);

    if (flight) {
      setSelectedFlight(flight);
    }

    // Close the fixed FlightDetails drawer first
    setDetailsOpen(false);

    // Move to passenger section
    setPage("passenger");

    // Wait for drawer/state update, then scroll
    setTimeout(() => {
      const passengerSection =
        document.getElementById("passenger");

      if (passengerSection) {
        passengerSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 250);
  };

  // Passenger -> Seats
  const handlePassenger = (data) => {
    console.log("Passenger data:", data);

    setPassenger(data);
    setPage("seats");

    scrollToSection("seats");
  };

  // Seats -> Payment
  const handleSeat = (selectedSeat) => {
    console.log("Selected seat:", selectedSeat);

    setSeat(selectedSeat);
    setPage("payment");

    scrollToSection("payment");
  };

  // Payment -> Confirmation
  const handlePayment = (paymentData) => {
    console.log("Payment:", paymentData);

    setPayment(paymentData);
    setConfirmed(true);
    setPage("confirmation");

    scrollToSection("confirmation");
  };

  // Back: Details -> Results
  const handleBackToResults = () => {
    setDetailsOpen(false);
    setPage("results");

    scrollToSection("results");
  };

  // Back: Passenger -> Details
  const handleBackToDetails = () => {
    setDetailsOpen(true);
    setPage("details");

    scrollToSection("details");
  };

  // Back: Seats -> Passenger
  const handleBackToPassenger = () => {
    setPage("passenger");

    scrollToSection("passenger");
  };

  // Start a new booking
  const handleNewBooking = () => {
    setSearched(false);
    setSelectedFlight(null);
    setDetailsOpen(false);
    setPassenger(null);
    setSeat(null);
    setPayment(null);
    setConfirmed(false);
    setPage("search");

    scrollToSection("search");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">

      {/* Navbar */}
      <Navbar
        page={page}
        selectedFlight={selectedFlight}
        searched={searched}
        confirmed={confirmed}
        onNavigate={navigate}
      />

      <main className="pt-[72px]">

        {/* =========================================
            SEARCH
        ========================================= */}
        <section
          id="search"
          className="scroll-mt-24"
        >
          <FlightSearch
            onSearch={handleSearch}
          />
        </section>

        {/* =========================================
            RESULTS
        ========================================= */}
        <section
          id="results"
          className="scroll-mt-24"
        >
          {searched ? (
            <FlightResults
              onDetails={handleDetails}
            />
          ) : (
            emptyState(
              "Flight Results",
              "Search for a flight first. Your available flights will appear here."
            )
          )}
        </section>

        {/* =========================================
            DETAILS
        ========================================= */}
        <section
          id="details"
          className="scroll-mt-24"
        >
          {selectedFlight ? (
            detailsOpen && (
              <FlightDetails
                flight={selectedFlight}
                onClose={handleBackToResults}
                onContinue={handleContinueBooking}
              />
            )
          ) : (
            emptyState(
              "Flight Details",
              "Select a flight from Flights to view complete flight details."
            )
          )}
        </section>

        {/* =========================================
            PASSENGER
        ========================================= */}
        <section
          id="passenger"
          className="min-h-screen scroll-mt-24"
        >
          {selectedFlight ? (
            <PassengerDetails
              flight={selectedFlight}
              onContinue={handlePassenger}
              onBack={handleBackToDetails}
            />
          ) : (
            emptyState(
              "Passenger Details",
              "Select a flight first. Passenger information will appear here."
            )
          )}
        </section>

        {/* =========================================
            SEATS
        ========================================= */}
        <section
          id="seats"
          className="min-h-screen scroll-mt-24"
        >
          {selectedFlight ? (
            <SeatSelection
              flight={selectedFlight}
              passenger={passenger}
              onContinue={handleSeat}
              onBack={handleBackToPassenger}
            />
          ) : (
            emptyState(
              "Seat Selection",
              "Select a flight first. Your interactive seat map will appear here."
            )
          )}
        </section>

        {/* =========================================
            PAYMENT
        ========================================= */}
        <section
          id="payment"
          className="min-h-screen scroll-mt-24"
        >
          {selectedFlight ? (
            <Payment
              flight={selectedFlight}
              passenger={passenger}
              seat={seat}
              onPayment={handlePayment}
            />
          ) : (
            emptyState(
              "Payment",
              "Complete your flight selection first. Payment will appear here."
            )
          )}
        </section>

        {/* =========================================
            CONFIRMATION
        ========================================= */}
        <section
          id="confirmation"
          className="min-h-screen scroll-mt-24"
        >
          {confirmed ? (
            <BookingConfirmation
              flight={selectedFlight}
              passenger={passenger}
              seat={seat}
              payment={payment}
              onNewBooking={handleNewBooking}
            />
          ) : (
            emptyState(
              "Booking Confirmation",
              "Your ticket confirmation will appear here after successful payment."
            )
          )}
        </section>

      </main>
    </div>
  );
}
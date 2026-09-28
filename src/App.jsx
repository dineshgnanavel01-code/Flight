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

  // ------------------------------------------
  // Initial loading
  // ------------------------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // ------------------------------------------
  // Scroll to section
  // ------------------------------------------
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
    }, 150);
  };

  // ------------------------------------------
  // Navbar navigation
  // ------------------------------------------
  const navigate = (nextPage) => {
    setPage(nextPage);

    scrollToSection(nextPage);
  };

  // ------------------------------------------
  // Search
  // ------------------------------------------
  const handleSearch = (searchData) => {
    console.log("Search data:", searchData);

    setSearched(true);
    setPage("results");

    scrollToSection("results");
  };

  // ------------------------------------------
  // Select flight
  // ------------------------------------------
  const handleDetails = (flight) => {
    console.log("Selected flight:", flight);

    setSelectedFlight(flight);
    setPage("details");

    scrollToSection("details");
  };

  // ------------------------------------------
  // CONTINUE BOOKING
  // Details -> Passenger
  // ------------------------------------------
  const handleContinueBooking = (flight) => {
    console.log("Continue Booking:", flight);

    if (flight) {
      setSelectedFlight(flight);
    }

    // IMPORTANT:
    // Change page FIRST.
    // This removes FlightDetails drawer.
    setPage("passenger");

    // Then scroll after React updates DOM.
    setTimeout(() => {
      const passengerSection =
        document.getElementById("passenger");

      if (passengerSection) {
        passengerSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200);
  };

  // ------------------------------------------
  // Passenger -> Seats
  // ------------------------------------------
  const handlePassenger = (data) => {
    console.log("Passenger data:", data);

    setPassenger(data);
    setPage("seats");

    scrollToSection("seats");
  };

  // ------------------------------------------
  // Seats -> Payment
  // ------------------------------------------
  const handleSeat = (selectedSeat) => {
    console.log("Selected seat:", selectedSeat);

    setSeat(selectedSeat);
    setPage("payment");

    scrollToSection("payment");
  };

  // ------------------------------------------
  // Payment -> Confirmation
  // ------------------------------------------
  const handlePayment = (paymentData) => {
    console.log("Payment:", paymentData);

    setPayment(paymentData);
    setConfirmed(true);
    setPage("confirmation");

    setTimeout(() => {
      document
        .getElementById("confirmation")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 200);
  };

  // ------------------------------------------
  // Back: Passenger -> Details
  // ------------------------------------------
  const handleBackToDetails = () => {
    setPage("details");

    scrollToSection("details");
  };

  // ------------------------------------------
  // Back: Seats -> Passenger
  // ------------------------------------------
  const handleBackToPassenger = () => {
    setPage("passenger");

    scrollToSection("passenger");
  };

  // ------------------------------------------
  // Back: Details -> Results
  // ------------------------------------------
  const handleBackToResults = () => {
    setPage("results");

    scrollToSection("results");
  };

  // ------------------------------------------
  // New booking
  // ------------------------------------------
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

  // ------------------------------------------
  // Loading
  // ------------------------------------------
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">

      {/* =========================================
          NAVBAR
      ========================================= */}
      <Navbar
        page={page}
        selectedFlight={selectedFlight}
        searched={searched}
        confirmed={confirmed}
        onNavigate={navigate}
      />

      {/* =========================================
          SINGLE PAGE CONTENT
      ========================================= */}
      <main className="pt-[72px]">

        {/* =======================================
            1. SEARCH
        ======================================= */}
        <section
          id="search"
          className="scroll-mt-24"
        >
          <FlightSearch
            onSearch={handleSearch}
          />
        </section>

        {/* =======================================
            2. RESULTS
        ======================================= */}
        {searched && (
          <section
            id="results"
            className="scroll-mt-24"
          >
            <FlightResults
              onDetails={handleDetails}
            />
          </section>
        )}

        {/* =======================================
            BOOKING FLOW
        ======================================= */}
        {selectedFlight && (
          <>

            {/* =====================================
                3. DETAILS

                IMPORTANT:
                Only render drawer while on details.
            ===================================== */}
            <section
              id="details"
              className="scroll-mt-24"
            >
              {page === "details" && (
                <FlightDetails
                  flight={selectedFlight}
                  onClose={handleBackToResults}
                  onContinue={handleContinueBooking}
                />
              )}
            </section>

            {/* =====================================
                4. PASSENGER
            ===================================== */}
            <section
              id="passenger"
              className="min-h-screen scroll-mt-24"
            >
              <PassengerDetails
                flight={selectedFlight}
                onContinue={handlePassenger}
                onBack={handleBackToDetails}
              />
            </section>

            {/* =====================================
                5. SEATS
            ===================================== */}
            <section
              id="seats"
              className="min-h-screen scroll-mt-24"
            >
              <SeatSelection
                flight={selectedFlight}
                passenger={passenger}
                onContinue={handleSeat}
                onBack={handleBackToPassenger}
              />
            </section>

            {/* =====================================
                6. PAYMENT
            ===================================== */}
            <section
              id="payment"
              className="min-h-screen scroll-mt-24"
            >
              <Payment
                flight={selectedFlight}
                passenger={passenger}
                seat={seat}
                onPayment={handlePayment}
              />
            </section>

            {/* =====================================
                7. CONFIRMATION
            ===================================== */}
            {confirmed && (
              <section
                id="confirmation"
                className="min-h-screen scroll-mt-24"
              >
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
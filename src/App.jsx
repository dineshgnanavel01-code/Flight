
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

  // --------------------------------------------------
  // INITIAL LOADING
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // --------------------------------------------------
  // SCROLL
  // --------------------------------------------------

  const scrollToSection = (id) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    });
  };

  // --------------------------------------------------
  // NAVBAR NAVIGATION
  // --------------------------------------------------

  const navigate = (nextPage) => {
    // Results cannot be opened until search is completed
    if (nextPage === "results" && !searched) {
      scrollToSection("search");
      return;
    }

    // Booking pages require selected flight
    const bookingPages = [
      "details",
      "passenger",
      "seats",
      "payment",
    ];

    if (
      bookingPages.includes(nextPage) &&
      !selectedFlight
    ) {
      scrollToSection("search");
      return;
    }

    setPage(nextPage);
    scrollToSection(nextPage);
  };

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const handleSearch = (searchData) => {
    console.log("Search:", searchData);

    setSearched(true);
    setPage("results");

    scrollToSection("results");
  };

  // --------------------------------------------------
  // SELECT FLIGHT
  // --------------------------------------------------

  const handleDetails = (flight) => {
    setSelectedFlight(flight);
    setPage("details");

    scrollToSection("details");
  };

  // --------------------------------------------------
  // CONTINUE TO PASSENGER
  // --------------------------------------------------

  const handleContinueBooking = (flight) => {
    if (flight) {
      setSelectedFlight(flight);
    }

    setPage("passenger");

    scrollToSection("passenger");
  };

  // --------------------------------------------------
  // PASSENGER
  // --------------------------------------------------

  const handlePassenger = (data) => {
    setPassenger(data);
    setPage("seats");

    scrollToSection("seats");
  };

  // --------------------------------------------------
  // SEAT
  // --------------------------------------------------

  const handleSeat = (selectedSeat) => {
    setSeat(selectedSeat);
    setPage("payment");

    scrollToSection("payment");
  };

  // --------------------------------------------------
  // PAYMENT
  // --------------------------------------------------

  const handlePayment = (paymentData) => {
    setPayment(paymentData);
    setConfirmed(true);
    setPage("confirmation");

    scrollToSection("confirmation");
  };

  // --------------------------------------------------
  // NEW BOOKING
  // --------------------------------------------------

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

  // --------------------------------------------------
  // BACK BUTTONS
  // --------------------------------------------------

  const handleBackToResults = () => {
    setPage("results");
    scrollToSection("results");
  };

  const handleBackToDetails = () => {
    setPage("details");
    scrollToSection("details");
  };

  const handleBackToPassenger = () => {
    setPage("passenger");
    scrollToSection("passenger");
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return <LoadingScreen />;
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">

      {/* ==================================================
          GLOBAL NAVBAR
      ================================================== */}

      <Navbar
        page={page}
        selectedFlight={selectedFlight}
        searched={searched}
        confirmed={confirmed}
        onNavigate={navigate}
      />

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="pt-[72px]">

        {/* ==================================================
            SEARCH
        ================================================== */}

        <section
          id="search"
          className="scroll-mt-24"
        >
          <FlightSearch
            onSearch={handleSearch}
          />
        </section>

        {/* ==================================================
            RESULTS
        ================================================== */}

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

        {/* ==================================================
            BOOKING FLOW
        ================================================== */}

        {selectedFlight && (
          <>

            {/* ----------------------------------------------
                DETAILS
            ---------------------------------------------- */}

            <section
              id="details"
              className="scroll-mt-24"
            >
              <FlightDetails
                flight={selectedFlight}
                onClose={handleBackToResults}
                onContinue={handleContinueBooking}
              />
            </section>

            {/* ----------------------------------------------
                PASSENGER
            ---------------------------------------------- */}

            <section
              id="passenger"
              className="scroll-mt-24"
            >
              <PassengerDetails
                flight={selectedFlight}
                onContinue={handlePassenger}
                onBack={handleBackToDetails}
              />
            </section>

            {/* ----------------------------------------------
                SEATS
            ---------------------------------------------- */}

            <section
              id="seats"
              className="scroll-mt-24"
            >
              <SeatSelection
                flight={selectedFlight}
                passenger={passenger}
                onContinue={handleSeat}
                onBack={handleBackToPassenger}
              />
            </section>

            {/* ----------------------------------------------
                PAYMENT
            ---------------------------------------------- */}

            <section
              id="payment"
              className="scroll-mt-24"
            >
              <Payment
                flight={selectedFlight}
                passenger={passenger}
                seat={seat}
                onPayment={handlePayment}
              />
            </section>

            {/* ----------------------------------------------
                CONFIRMATION
            ---------------------------------------------- */}

            {confirmed && (
              <section
                id="confirmation"
                className="scroll-mt-24"
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


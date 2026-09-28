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
<<<<<<< HEAD

  const [searched, setSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
=======
  const [searched, setSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);\n  const [detailsOpen, setDetailsOpen] = useState(false);
>>>>>>> 58eb18ed0a8ee8203b349dfabcf2f9d2d05711b0
  const [passenger, setPassenger] = useState(null);
  const [seat, setSeat] = useState(null);
  const [payment, setPayment] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

<<<<<<< HEAD
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
=======
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

>>>>>>> 58eb18ed0a8ee8203b349dfabcf2f9d2d05711b0
  const handleDetails = (flight) => {
    console.log("Selected flight:", flight);

    setSelectedFlight(flight);
<<<<<<< HEAD
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
=======
    navigate("details");
  };

>>>>>>> 58eb18ed0a8ee8203b349dfabcf2f9d2d05711b0
  const handlePassenger = (data) => {
    console.log("Passenger data:", data);

    setPassenger(data);
<<<<<<< HEAD
    setPage("seats");

    scrollToSection("seats");
=======
    navigate("seats");
>>>>>>> 58eb18ed0a8ee8203b349dfabcf2f9d2d05711b0
  };

  // ------------------------------------------
  // Seats -> Payment
  // ------------------------------------------
  const handleSeat = (selectedSeat) => {
    console.log("Selected seat:", selectedSeat);

    setSeat(selectedSeat);
<<<<<<< HEAD
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
=======
    navigate("payment");
  };

  const handlePayment = (data) => {
    setPayment(data);
    setConfirmed(true);
    navigate("confirmation");
  };

>>>>>>> 58eb18ed0a8ee8203b349dfabcf2f9d2d05711b0
  const handleNewBooking = () => {
    setSearched(false);
    setSelectedFlight(null);
    setPassenger(null);
    setSeat(null);
    setPayment(null);
    setConfirmed(false);
<<<<<<< HEAD

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

=======
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
>>>>>>> 58eb18ed0a8ee8203b349dfabcf2f9d2d05711b0
      </main>
    </div>
  );
}
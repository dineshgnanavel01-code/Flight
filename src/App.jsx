import React, { useState } from "react";

import Navbar from "./components/Navbar";
import FlightSearch from "./components/FlightSearch";
import FlightResults from "./components/FlightResults";
import FlightDetails from "./components/FlightDetails";
import PassengerDetails from "./components/PassengerDetails";
import SeatSelection from "./components/SeatSelection";
import Payment from "./components/Payment";
import BookingConfirmation from "./components/BookingConfirmation";

export default function App() {
  const [step, setStep] = useState("search");

  const [searchData, setSearchData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [payment, setPayment] = useState(null);

  // =========================================================
  // SEARCH FLIGHTS
  // Search -> Results
  // =========================================================

  const handleSearch = (data) => {
    console.log("Search data:", data);

    setSearchData(data);

    // Clear previous booking data
    setSelectedFlight(null);
    setPassenger(null);
    setSelectedSeat(null);
    setPayment(null);

    // Go to flight results
    setStep("results");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SELECT FLIGHT
  // Results -> Passenger Details
  // =========================================================

  const handleFlightSelect = (flight) => {
    console.log("Selected flight:", flight);

    setSelectedFlight(flight);

    // Skip FlightDetails
    setStep("passenger");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // PASSENGER DETAILS
  // Passenger -> Seat Selection
  // =========================================================

  const handlePassengerContinue = (data) => {
    console.log("Passenger details:", data);

    setPassenger(data);

    setStep("seats");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SEAT SELECTION
  // Seats -> Payment
  // =========================================================

  const handleSeatContinue = (seat) => {
    console.log("Selected seat:", seat);

    setSelectedSeat(seat);

    setStep("payment");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // PAYMENT
  // Payment -> Confirmation
  // =========================================================

  const handlePaymentComplete = (paymentData) => {
    console.log("Payment:", paymentData);

    setPayment(paymentData);

    setStep("confirmation");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // NAVBAR STEP NAVIGATION
  // =========================================================

  const handleStepChange = (nextStep) => {
    // -------------------------------------------------------
    // Details is skipped
    // -------------------------------------------------------

    if (nextStep === "details") {
      if (selectedFlight) {
        setStep("passenger");
      } else {
        setStep("results");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // -------------------------------------------------------
    // Passenger requires selected flight
    // -------------------------------------------------------

    if (nextStep === "passenger" && !selectedFlight) {
      setStep("results");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // -------------------------------------------------------
    // Seats requires passenger details
    // -------------------------------------------------------

    if (nextStep === "seats" && !passenger) {
      setStep("passenger");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // -------------------------------------------------------
    // Payment requires selected seat
    // -------------------------------------------------------

    if (nextStep === "payment" && !selectedSeat) {
      setStep("seats");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // -------------------------------------------------------
    // Confirmation requires payment
    // -------------------------------------------------------

    if (nextStep === "confirmation" && !payment) {
      setStep("payment");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setStep(nextStep);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // NEW BOOKING
  // =========================================================

  const handleNewBooking = () => {
    setStep("search");

    setSearchData(null);
    setSelectedFlight(null);
    setPassenger(null);
    setSelectedSeat(null);
    setPayment(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // APP UI
  // =========================================================

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar
        step={step}
        setStep={handleStepChange}
      />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="w-full pt-[68px]">

        {/* ===================================================
            1. FLIGHT SEARCH
            NO EXTRA TEXT
        =================================================== */}

        {step === "search" && (
          <section className="w-full min-h-[calc(100vh-68px)]">
            <FlightSearch
              onSearch={handleSearch}
            />
          </section>
        )}

        {/* ===================================================
            2. FLIGHT RESULTS
        =================================================== */}

        {step === "results" && (
          <FlightResults
            searchData={searchData}
            onDetails={handleFlightSelect}
          />
        )}

        {/* ===================================================
            3. FLIGHT DETAILS
            Normally skipped
        =================================================== */}

        {step === "details" && (
          <FlightDetails
            flight={selectedFlight}
            isOpen={true}
            onClose={() => {
              setStep("results");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            onContinue={() => {
              setStep("passenger");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        )}

        {/* ===================================================
            4. PASSENGER DETAILS
        =================================================== */}

        {step === "passenger" && selectedFlight && (
          <PassengerDetails
            flight={selectedFlight}
            onContinue={handlePassengerContinue}
          />
        )}

        {/* ===================================================
            5. SEAT SELECTION
        =================================================== */}

        {step === "seats" &&
          selectedFlight &&
          passenger && (
            <SeatSelection
              flight={selectedFlight}
              passenger={passenger}
              onContinue={handleSeatContinue}
            />
          )}

        {/* ===================================================
            6. PAYMENT
        =================================================== */}

        {step === "payment" &&
          selectedFlight &&
          passenger &&
          selectedSeat && (
            <Payment
              flight={selectedFlight}
              passenger={passenger}
              seat={selectedSeat}
              onPaymentComplete={handlePaymentComplete}
            />
          )}

        {/* ===================================================
            7. BOOKING CONFIRMATION
        =================================================== */}

        {step === "confirmation" && (
          <BookingConfirmation
            flight={selectedFlight}
            passenger={passenger}
            seat={selectedSeat}
            payment={payment}
            travelDate={searchData?.date}
            onNewBooking={handleNewBooking}
          />
        )}

      </main>
    </div>
  );
}
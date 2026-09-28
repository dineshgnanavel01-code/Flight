import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LoadingScreen from "./components/LoadingScreen";
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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);


  const handleSearch = () => {
    setPage("results");
  };

  
  const handleDetails = (flight) => {
    setSelectedFlight(flight);
    setPage("details");
  };

  const handleContinueBooking = (flight) => {
    if (flight) {
      setSelectedFlight(flight);
    }

    setPage("passenger");
  };

  
  const handlePassenger = (data) => {
    setPassenger(data);
    setPage("seats");
  };

  const handleSeat = (selectedSeat) => {
    setSeat(selectedSeat);
    setPage("payment");
  };

  
  const handlePayment = (paymentData) => {
    setPayment(paymentData);
    setPage("confirmation");
  };

 
  const handleNewBooking = () => {
    setSelectedFlight(null);
    setPassenger(null);
    setSeat(null);
    setPayment(null);
    setPage("search");
  };

  const handleBackToResults = () => {
    setPage("results");
  };

  const handleBackToDetails = () => {
    setPage("details");
  };

  const handleBackToPassenger = () => {
    setPage("passenger");
  };

 
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <AnimatePresence mode="wait">

        {page === "search" && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45 }}
          >
            <FlightSearch onSearch={handleSearch} />
          </motion.div>
        )}

       
        {page === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45 }}
          >
            <FlightResults onDetails={handleDetails} />
          </motion.div>
        )}

        {page === "details" && selectedFlight && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45 }}
          >
            <FlightDetails
              flight={selectedFlight}
              onClose={handleBackToResults}
              onContinue={handleContinueBooking}
            />
          </motion.div>
        )}

       
        {page === "passenger" && (
          <motion.div
            key="passenger"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45 }}
          >
            <PassengerDetails
              flight={selectedFlight}
              onContinue={handlePassenger}
              onBack={handleBackToDetails}
            />
          </motion.div>
        )}

        {page === "seats" && (
          <motion.div
            key="seats"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45 }}
          >
            <SeatSelection
              flight={selectedFlight}
              passenger={passenger}
              onContinue={handleSeat}
              onBack={handleBackToPassenger}
            />
          </motion.div>
        )}

     
        {page === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45 }}
          >
            <Payment
              flight={selectedFlight}
              passenger={passenger}
              seat={seat}
              onPayment={handlePayment}
            />
          </motion.div>
        )}

       
        {page === "confirmation" && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}>
            <BookingConfirmation
              flight={selectedFlight}
              passenger={passenger}
              seat={seat}
              payment={payment}
              onNewBooking={handleNewBooking}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
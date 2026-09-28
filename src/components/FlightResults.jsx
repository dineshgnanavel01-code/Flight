import { useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ArrowDownUp, ArrowRight, Clock3, Filter, Plane, ShieldCheck, Sparkles, Star, Sun,Zap, RotateCcw,} from "lucide-react";



import airindia from "../assets/air-india.jpg";

import emirates1 from "../assets/emirates1.jpg";

import vistara from "../assets/vistara.jpg";

import ethad from "../assets/ethad.jpg";

import singapore from "../assets/singapore.jpg";

import indigo from "../assets/indigo1.jpg";

import indigo2 from "../assets/indigo2.jpg";

import Ana from "../assets/Ana.jpg";

import Qatar from "../assets/Qatar.jpg";







const flights = [

  {

    id: 1,

    airline: "IndiGo",

    code: "6E",

    from: "DEL",

    fromCity: "Delhi",

    to: "BLR",

    toCity: "Bangalore",

    departure: "06:30",

    arrival: "09:15",

    duration: "2h 45m",

    durationMinutes: 165,

    stops: "Non-stop",

    price: 5499,

    rating: 4.8,

    reviews: 128,

    class: "Economy",

    color: "from-blue-500 to-indigo-600",

    image: indigo,

  },



  {

    id: 2,

    airline: "Air India",

    code: "AI",

    from: "DEL",

    fromCity: "Delhi",

    to: "BOM",

    toCity: "Mumbai",

    departure: "08:15",

    arrival: "10:25",

    duration: "2h 10m",

    durationMinutes: 130,

    stops: "Non-stop",

    price: 6799,

    rating: 4.7,

    reviews: 96,

    class: "Economy",

    color: "from-red-500 to-orange-500",

    image: airindia,

  },



  {

    id: 3,

    airline: "Vistara",

    code: "UK",

    from: "DEL",

    fromCity: "Delhi",

    to: "BLR",

    toCity: "Bangalore",

    departure: "11:30",

    arrival: "14:20",

    duration: "2h 50m",

    durationMinutes: 170,

    stops: "Non-stop",

    price: 7299,

    rating: 4.9,

    reviews: 142,

    class: "Premium Economy",

    color: "from-purple-500 to-fuchsia-600",

    image: vistara,

  },



  {

    id: 4,

    airline: "Emirates",

    code: "EK",

    from: "DEL",

    fromCity: "Delhi",

    to: "DXB",

    toCity: "Dubai",

    departure: "15:40",

    arrival: "18:25",

    duration: "2h 45m",

    durationMinutes: 165,

    stops: "Non-stop",

    price: 8999,

    rating: 4.9,

    reviews: 184,

    class: "Business",

    color: "from-red-600 to-red-800",

    image: emirates1,

  },



  {

    id: 5,

    airline: "Etihad",

    code: "EY",

    from: "BOM",

    fromCity: "Mumbai",

    to: "AUH",

    toCity: "Abu Dhabi",

    departure: "07:20",

    arrival: "09:30",

    duration: "2h 10m",

    durationMinutes: 130,

    stops: "Non-stop",

    price: 5999,

    rating: 4.6,

    reviews: 87,

    class: "Economy",

    color: "from-slate-700 to-slate-900",

    image: ethad,

  },



  {

    id: 6,

    airline: "Singapore Airlines",

    code: "SQ",

    from: "MAA",

    fromCity: "Chennai",

    to: "SIN",

    toCity: "Singapore",

    departure: "12:20",

    arrival: "15:15",

    duration: "2h 55m",

    durationMinutes: 175,

    stops: "Non-stop",

    price: 5899,

    rating: 4.8,

    reviews: 105,

    class: "Economy",

    color: "from-yellow-500 to-orange-600",

    image: singapore,

  },



  {

    id: 7,

    airline: "IndiGo",

    code: "6E",

    from: "HYD",

    fromCity: "Hyderabad",

    to: "BOM",

    toCity: "Mumbai",

    departure: "14:10",

    arrival: "15:50",

    duration: "1h 40m",

    durationMinutes: 100,

    stops: "Non-stop",

    price: 3899,

    rating: 4.6,

    reviews: 81,

    class: "Economy",

    color: "from-blue-500 to-indigo-600",

    image: indigo,

  },



  {

    id: 8,

    airline: "Qatar Airways",

    code: "QR",

    from: "DEL",

    fromCity: "Delhi",

    to: "DOH",

    toCity: "Doha",

    departure: "19:25",

    arrival: "21:55",

    duration: "4h 00m",

    durationMinutes: 240,

    stops: "Non-stop",

    price: 9499,

    rating: 4.9,

    reviews: 176,

    class: "Economy",

    color: "from-purple-700 to-rose-700",

    image: Qatar,

  },



  {

    id: 9,

    airline: "ANA",

    code: "NH",

    from: "DEL",

    fromCity: "Delhi",

    to: "NRT",

    toCity: "Tokyo",

    departure: "22:10",

    arrival: "07:05",

    duration: "7h 25m",

    durationMinutes: 445,

    stops: "Non-stop",

    price: 12499,

    rating: 4.8,

    reviews: 119,

    class: "Economy",

    color: "from-blue-600 to-cyan-600",

    image: Ana,

  },



  // Added new IndiGo flights below

  {

    id: 10,

    airline: "IndiGo",

    code: "6E",

    from: "BLR",

    fromCity: "Bangalore",

    to: "GOI",

    toCity: "Goa",

    departure: "09:45",

    arrival: "11:10",

    duration: "1h 25m",

    durationMinutes: 85,

    stops: "Non-stop",

    price: 3199,

    rating: 4.7,

    reviews: 94,

    class: "Economy",

    color: "from-blue-500 to-indigo-600",

    image: indigo,

  },



  {

    id: 11,

    airline: "IndiGo",

    code: "6E",

    from: "BOM",

    fromCity: "Mumbai",

    to: "CCU",

    toCity: "Kolkata",

    departure: "16:30",

    arrival: "19:20",

    duration: "2h 50m",

    durationMinutes: 170,

    stops: "Non-stop",

    price: 4899,

    rating: 4.8,

    reviews: 112,

    class: "Economy",

    color: "from-blue-500 to-indigo-600",

    image: indigo2,

  },

];





const airlineFilters = [

  {

    name: "All",

    label: "All Flights",

    icon: "✈️",

  },

  {

    name: "Air India",

    label: "Air India",

    icon: "🇮🇳",

  },

  {

    name: "IndiGo",

    label: "IndiGo",

    icon: "🔵",

  },

  {

    name: "Etihad",

    label: "Etihad",

    icon: "✦",

  },

  {

    name: "Singapore Airlines",

    label: "Singapore",

    icon: "🪽",

  },

  {

    name: "Vistara",

    label: "Vistara",

    icon: "🟣",

  },

  {

    name: "Emirates",

    label: "Emirates",

    icon: "🔴",

  },

  {

    name: "Qatar Airways",

    label: "Qatar",

    icon: "🟥",

  },

  {

    name: "ANA",

    label: "ANA",

    icon: "🔷",

  },

];







export default function FlightResults({ onDetails }) {

  const [loading, setLoading] = useState(true);

  const [airline, setAirline] = useState("All");

  const [maxPrice, setMaxPrice] = useState(15000);

  const [departure, setDeparture] = useState("All");

  const [sort, setSort] = useState("price");



 



  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 1200);



    return () => clearTimeout(timer);

  }, []);





  const filteredFlights = useMemo(() => {

    const result = flights.filter((flight) => {

      const airlineMatch =

        airline === "All" || flight.airline === airline;



      const priceMatch = flight.price <= maxPrice;



      let departureMatch = true;



      if (departure === "Morning") {

        departureMatch = flight.departure < "12:00";

      }



      if (departure === "Afternoon") {

        departureMatch =

          flight.departure >= "12:00" &&

          flight.departure < "18:00";

      }



      if (departure === "Evening") {

        departureMatch = flight.departure >= "18:00";

      }



      return (

        airlineMatch &&

        priceMatch &&

        departureMatch

      );

    });



    result.sort((a, b) => {

      if (sort === "price") {

        return a.price - b.price;

      }



      if (sort === "duration") {

        return a.durationMinutes - b.durationMinutes;

      }



      return a.departure.localeCompare(b.departure);

    });



    return result;

  }, [airline, maxPrice, departure, sort]);



 



  const cheapestFlight = useMemo(

    () =>

      [...flights].sort(

        (a, b) => a.price - b.price

      )[0],

    []

  );



  const fastestFlight = useMemo(

    () =>

      [...flights].sort(

        (a, b) =>

          a.durationMinutes - b.durationMinutes

      )[0],

    []

  );



 



  const resetFilters = () => {

    setAirline("All");

    setMaxPrice(15000);

    setDeparture("All");

    setSort("price");

  };



 

  return (

    <section className="relative min-h-screen overflow-hidden bg-[#fffaf0] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">



     



      <div className="pointer-events-none absolute inset-0 overflow-hidden">



        <motion.div

          className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-yellow-300/30 blur-[120px]"

          animate={{

            scale: [1, 1.15, 1],

            opacity: [0.35, 0.7, 0.35],

          }}

          transition={{

            duration: 7,

            repeat: Infinity,

            ease: "easeInOut",

          }}

        />



        <motion.div

          className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-amber-300/25 blur-[110px]"

          animate={{

            scale: [1.1, 1, 1.1],

            x: [0, -20, 0],

          }}

          transition={{

            duration: 8,

            repeat: Infinity,

            ease: "easeInOut",

          }}

        />



        <motion.div

          className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-orange-200/25 blur-[120px]"

          animate={{

            scale: [1, 1.12, 1],

          }}

          transition={{

            duration: 9,

            repeat: Infinity,

            ease: "easeInOut",

          }}

        />



        <div

          className="absolute inset-0 opacity-[0.3]"

          style={{

            backgroundImage:

              "linear-gradient(rgba(180,120,0,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(180,120,0,.045) 1px, transparent 1px)",

            backgroundSize: "45px 45px",

          }}

        />



        <div className="absolute left-[8%] top-[30%] h-3 w-3 rounded-full bg-yellow-400/50" />



        <div className="absolute right-[12%] top-[15%] h-2 w-2 rounded-full bg-amber-500/50" />



        <div className="absolute bottom-[25%] left-[15%] h-4 w-4 rounded-full bg-orange-300/40" />

      </div>



      <div className="relative z-10 mx-auto max-w-[1550px]">



       



        <motion.header

          initial={{

            opacity: 0,

            y: -25,

          }}

          animate={{

            opacity: 1,

            y: 0,

          }}

          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"

        >

          <div>



            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">



              <Sun

                size={14}

                className="text-amber-500"

              />



              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">

                SKYBOOK · Flight search

              </span>



            </div>



            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">



              Your journey.



              <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">

                Your way.

              </span>



            </h1>



            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">

              Discover comfortable routes, flexible fares

              and memorable journeys with SKYBOOK.

            </p>



          </div>



          <motion.div

            whileHover={{

              y: -5,

              rotate: 1,

            }}

            className="relative overflow-hidden rounded-[1.5rem] border border-amber-100 bg-white/85 px-5 py-4 shadow-[0_15px_50px_rgba(146,64,14,.08)] backdrop-blur-xl"

          >



            <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-yellow-300/20 blur-xl" />



            <div className="relative flex items-center gap-3">



              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-200">

                <Plane size={20} />

              </div>



              <div>



                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">

                  Available flights

                </p>



                <p className="mt-1 text-lg font-black text-slate-900">

                  {loading

                    ? "Searching..."

                    : `${filteredFlights.length} flights`}

                </p>



              </div>



            </div>



          </motion.div>



        </motion.header>



        {!loading && (

          <motion.div

            initial={{

              opacity: 0,

              y: 20,

            }}

            animate={{

              opacity: 1,

              y: 0,

            }}

            transition={{

              delay: 0.15,

            }}

            className="mt-8 grid gap-3 sm:grid-cols-3"

          >



            <QuickStat

              icon={<Zap size={18} />}

              title="Best price"

              value={`₹${cheapestFlight.price.toLocaleString(

                "en-IN"

              )}`}

              subtitle={`${cheapestFlight.airline} · ${cheapestFlight.from} → ${cheapestFlight.to}`}

              theme="amber"

            />



            <QuickStat

              icon={<Clock3 size={18} />}

              title="Fastest route"

              value={fastestFlight.duration}

              subtitle={`${fastestFlight.airline} · ${fastestFlight.from} → ${fastestFlight.to}`}

              theme="orange"

            />



            <QuickStat

              icon={<ShieldCheck size={18} />}

              title="Secure booking"

              value="100% protected"

              subtitle="Safe and encrypted booking"

              theme="yellow"

            />



          </motion.div>

        )}



      

        {!loading && (

          <motion.div

            initial={{

              opacity: 0,

              y: 25,

            }}

            animate={{

              opacity: 1,

              y: 0,

            }}

            transition={{

              delay: 0.25,

            }}

            className="mt-7 overflow-visible rounded-[2rem] border border-amber-100 bg-white/85 p-4 shadow-[0_25px_80px_rgba(146,64,14,.08)] backdrop-blur-2xl sm:p-5"

          >



            {/* FILTER HEADER */}



            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">



              <div className="flex items-center gap-3">



                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-md shadow-amber-200">

                  <Filter size={17} />

                </div>



                <div>



                  <p className="text-sm font-black text-slate-900">

                    Refine your journey

                  </p>



                  <p className="text-[10px] text-slate-400">

                    Choose your preferred flight options

                  </p>



                </div>



              </div>



              <button

                type="button"

                onClick={resetFilters}

                className="flex w-fit items-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold text-slate-400 transition hover:bg-amber-50 hover:text-amber-700"

              >

                <RotateCcw size={12} />

                Reset filters

              </button>



            </div>





            <div className="grid gap-4 lg:grid-cols-3">





              <FilterBox

                label="Maximum price"

                icon={<span>₹</span>}

              >



                <div className="rounded-xl border border-amber-100 bg-[#fffaf0] px-4 py-3">



                  <div className="mb-2 flex items-center justify-between">



                    <span className="text-[10px] font-medium text-slate-400">

                      Up to

                    </span>



                    <span className="text-sm font-black text-amber-600">

                      ₹{maxPrice.toLocaleString(

                        "en-IN"

                      )}

                    </span>



                  </div>



                  <input

                    type="range"

                    min="3000"

                    max="15000"

                    step="100"

                    value={maxPrice}

                    onChange={(e) =>

                      setMaxPrice(

                        Number(e.target.value)

                      )

                    }

                    className="w-full accent-amber-500"

                  />



                </div>



              </FilterBox>





              <FilterBox

                label="Departure time"

                icon={<Clock3 size={14} />}

              >



                <select

                  value={departure}

                  onChange={(e) =>

                    setDeparture(e.target.value)

                  }

                  className="w-full appearance-none rounded-xl border border-amber-100 bg-[#fffaf0] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"

                >



                  <option value="All">

                    Any time

                  </option>



                  <option value="Morning">

                    Morning · Before 12 PM

                  </option>



                  <option value="Afternoon">

                    Afternoon · 12–6 PM

                  </option>



                  <option value="Evening">

                    Evening · After 6 PM

                  </option>



                </select>



              </FilterBox>



              {/* SORT */}



              <FilterBox

                label="Sort flights"

                icon={<ArrowDownUp size={14} />}

              >



                <select

                  value={sort}

                  onChange={(e) =>

                    setSort(e.target.value)

                  }

                  className="w-full appearance-none rounded-xl border border-amber-100 bg-[#fffaf0] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"

                >



                  <option value="price">

                    Lowest price

                  </option>



                  <option value="duration">

                    Shortest duration

                  </option>



                  <option value="departure">

                    Earliest departure

                  </option>



                </select>



              </FilterBox>



            </div>



           



            <div className="mt-6 border-t border-amber-100 pt-5">



              <div className="mb-3 flex items-center justify-between">



                <div>



                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-600">

                    Choose airline

                  </p>



                  <p className="mt-1 text-xs text-slate-400">

                    Filter flights by airline

                  </p>



                </div>



                <div className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-700">

                  {filteredFlights.length} available

                </div>



              </div>



              <div className="flex gap-2 overflow-x-auto pb-2">



                {airlineFilters.map((item) => {



                  const active =

                    airline === item.name;



                  const count =

                    item.name === "All"

                      ? flights.length

                      : flights.filter(

                          (flight) =>

                            flight.airline ===

                            item.name

                        ).length;



                  return (

                    <motion.button

                      key={item.name}

                      type="button"

                      onClick={() =>

                        setAirline(item.name)

                      }

                      whileHover={{

                        y: -3,

                      }}

                      whileTap={{

                        scale: 0.96,

                      }}

                      className={`group flex min-w-max items-center gap-2 rounded-2xl border px-4 py-3 transition-all duration-300 ${

                        active

                          ? "border-amber-400 bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-200"

                          : "border-amber-100 bg-[#fffaf0] text-slate-600 hover:border-amber-300 hover:bg-white hover:text-amber-700"

                      }`}

                    >



                      <span

                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm ${

                          active

                            ? "bg-white/20"

                            : "bg-white shadow-sm"

                        }`}

                      >

                        {item.icon}

                      </span>



                      <span className="text-xs font-black">

                        {item.label}

                      </span>



                      <span

                        className={`rounded-full px-2 py-1 text-[9px] font-black ${

                          active

                            ? "bg-white/20 text-white"

                            : "bg-amber-100 text-amber-700"

                        }`}

                      >

                        {count}

                      </span>



                    </motion.button>

                  );

                })}



              </div>



            </div>



          </motion.div>

        )}





        {!loading && (

          <motion.div

            initial={{

              opacity: 0,

            }}

            animate={{

              opacity: 1,

            }}

            className="mt-8 flex flex-wrap items-center justify-between gap-3"

          >



            <div>



              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">

                Ready for takeoff

              </p>



              <h2 className="mt-1 text-2xl font-black text-slate-950">

                {filteredFlights.length} flight

                {filteredFlights.length !== 1

                  ? "s"

                  : ""}{" "}

                found

              </h2>



            </div>



            <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2">



              <span className="relative flex h-2 w-2">



                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />



                <span className="relative h-2 w-2 rounded-full bg-amber-500" />



              </span>



              <span className="text-[10px] font-bold text-amber-700">

                Live availability

              </span>



            </div>



          </motion.div>

        )}





        <div className="mt-6 space-y-5">



          {loading ? (

            [...Array(5)].map((_, index) => (

              <SkeletonCard key={index} />

            ))

          ) : filteredFlights.length === 0 ? (

            <EmptyState

              onReset={resetFilters}

            />

          ) : (

            <AnimatePresence mode="popLayout">



              {filteredFlights.map(

                (flight, index) => (

                  <FlightCard

                    key={flight.id}

                    flight={flight}

                    index={index}

                    onDetails={onDetails}

                    featured={index === 0}

                  />

                )

              )}



            </AnimatePresence>

          )}



        </div>



       



        {!loading && (

          <motion.div

            initial={{

              opacity: 0,

            }}

            animate={{

              opacity: 1,

            }}

            transition={{

              delay: 0.5,

            }}

            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-amber-200 pt-7"

          >



            <TrustItem

              icon={<ShieldCheck size={15} />}

              text="Secure booking"

            />



            <TrustItem

              icon={<Plane size={15} />}

              text="Verified flights"

            />



            <TrustItem

              icon={<Clock3 size={15} />}

              text="Live schedules"

            />



            <TrustItem

              icon={<Sparkles size={15} />}

              text="Flexible options"

            />



            <TrustItem

              icon={<Sun size={15} />}

              text="Golden journey"

            />



          </motion.div>

        )}



      </div>

    </section>

  );

}





function FlightCard({

  flight,

  index,

  onDetails,

  featured,

}) {

  return (

    <motion.article

      layout

      initial={{

        opacity: 0,

        y: 35,

        scale: 0.97,

      }}

      animate={{

        opacity: 1,

        y: 0,

        scale: 1,

      }}

      exit={{

        opacity: 0,

        scale: 0.95,

        y: -15,

      }}

      transition={{

        delay: index * 0.06,

        duration: 0.45,

      }}

      whileHover={{

        y: -7,

      }}

      className="group"

    >



      <div

        className={`relative overflow-hidden rounded-[2rem] border bg-white shadow-[0_18px_65px_rgba(146,64,14,.08)] transition-all duration-500 ${

          featured

            ? "border-amber-300 shadow-amber-200/50"

            : "border-amber-100 hover:border-amber-300"

        }`}

      >



        {/* TOP LINE */}



        <motion.div

          className="absolute left-0 right-0 top-0 z-30 h-1 origin-left bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"

          initial={{

            scaleX: 0,

          }}

          animate={{

            scaleX: 1,

          }}

          transition={{

            delay: index * 0.08 + 0.3,

            duration: 0.6,

          }}

        />



        {/* FEATURED */}



        {featured && (

          <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-amber-300/30">

            <Sparkles size={11} />

            Best match

          </div>

        )}



        {/* IMAGE */}



        <div className="relative h-52 overflow-hidden sm:h-60">



          <motion.img

            src={flight.image}

            alt={`${flight.airline} aircraft`}

            loading="lazy"

            initial={{

              scale: 1.04,

            }}

            whileHover={{

              scale: 1.1,

            }}

            transition={{

              duration: 0.8,

            }}

            className="h-full w-full object-cover"

          />



          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-orange-950/10 to-amber-950/10" />



          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-400/20" />



          {/* AIRLINE */}



          <div

            className={`absolute ${

              featured

                ? "left-5 top-14"

                : "left-5 top-5"

            } flex items-center gap-3 rounded-2xl border border-white/30 bg-black/20 px-3 py-2 backdrop-blur-xl`}

          >



            <div

              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${flight.color} text-white shadow-lg`}

            >

              <Plane size={18} />

            </div>



            <div>



              <p className="text-sm font-black text-white">

                {flight.airline}

              </p>



              <p className="text-[10px] font-medium text-white/65">

                {flight.code} · {flight.class}

              </p>



            </div>



          </div>



          {/* RATING */}



          <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/30 bg-black/20 px-3 py-2 backdrop-blur-xl">



            <Star

              size={13}

              fill="currentColor"

              className="text-yellow-300"

            />



            <span className="text-xs font-bold text-white">

              {flight.rating}

            </span>



            <span className="hidden text-[10px] text-white/60 sm:inline">

              ({flight.reviews})

            </span>



          </div>



          {/* ROUTE */}



          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">



            <div>



              <p className="text-3xl font-black tracking-tight text-white">

                {flight.from}

              </p>



              <p className="mt-1 text-[10px] font-medium text-white/65">

                {flight.fromCity}

              </p>



            </div>



            <div className="mb-2 flex flex-1 items-center justify-center px-5">



              <div className="relative w-full max-w-[150px]">



                <div className="h-px bg-white/30" />



                <motion.div

                  className="absolute -top-2 left-0"

                  animate={{

                    x: [0, 110, 0],

                  }}

                  transition={{

                    duration: 2.5,

                    repeat: Infinity,

                    ease: "easeInOut",

                  }}

                >



                  <Plane

                    size={16}

                    className="rotate-90 text-yellow-300"

                  />



                </motion.div>



              </div>



            </div>



            <div className="text-right">



              <p className="text-3xl font-black tracking-tight text-white">

                {flight.to}

              </p>



              <p className="mt-1 text-[10px] font-medium text-white/65">

                {flight.toCity}

              </p>



            </div>



          </div>



        </div>



        {/* BODY */}



        <div className="p-5 sm:p-6">



          <div className="grid gap-6 lg:grid-cols-[1fr_2fr_0.8fr] lg:items-center">



            {/* AIRLINE */}



            <div>



              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500">

                Airline

              </p>



              <div className="mt-2 flex items-center gap-3">



                <div

                  className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${flight.color} text-white shadow-sm`}

                >

                  <Plane size={15} />

                </div>



                <div>



                  <p className="text-sm font-black text-slate-800">

                    {flight.airline}

                  </p>



                  <p className="text-[10px] text-slate-400">

                    {flight.code} · {flight.class}

                  </p>



                </div>



              </div>



            </div>



            {/* TIMELINE */}



            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">



              <div>



                <p className="text-2xl font-black text-slate-950 sm:text-3xl">

                  {flight.departure}

                </p>



                <p className="mt-1 text-xs font-bold text-amber-600">

                  {flight.from}

                </p>



                <p className="mt-1 text-[10px] text-slate-400">

                  {flight.fromCity}

                </p>



              </div>



              <div className="min-w-[100px] sm:min-w-[140px]">



                <div className="relative flex items-center">



                  <div className="h-px w-full bg-amber-100" />



                  <motion.div

                    animate={{

                      scale: [1, 1.15, 1],

                    }}

                    transition={{

                      duration: 2,

                      repeat: Infinity,

                    }}

                    className="absolute left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-amber-200 bg-gradient-to-br from-yellow-50 to-amber-100 text-amber-500 shadow-sm"

                  >



                    <Plane

                      size={14}

                      className="rotate-90"

                    />



                  </motion.div>



                </div>



                <div className="mt-5 flex items-center justify-center gap-1.5">



                  <Clock3

                    size={11}

                    className="text-amber-500"

                  />



                  <span className="text-[10px] font-bold text-slate-400">

                    {flight.duration}

                  </span>



                </div>



                <p className="mt-1 text-center text-[9px] font-bold text-emerald-500">

                  {flight.stops}

                </p>



              </div>



              <div className="text-right">



                <p className="text-2xl font-black text-slate-950 sm:text-3xl">

                  {flight.arrival}

                </p>



                <p className="mt-1 text-xs font-bold text-amber-600">

                  {flight.to}

                </p>



                <p className="mt-1 text-[10px] text-slate-400">

                  {flight.toCity}

                </p>



              </div>



            </div>



            {/* PRICE */}



            <div className="lg:text-right">



              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500">

                Fare from

              </p>



              <motion.p

                whileHover={{

                  scale: 1.05,

                }}

                className="mt-1 text-2xl font-black text-slate-950"

              >

                ₹{flight.price.toLocaleString("en-IN")}

              </motion.p>



              <p className="mt-1 text-[10px] text-slate-400">

                per passenger

              </p>



            </div>



          </div>



          {/* BOTTOM */}



          <div className="mt-6 flex flex-col gap-3 border-t border-amber-100 pt-5 sm:flex-row sm:items-center sm:justify-between">



            <div className="flex flex-wrap gap-2">



              <Badge>

                <ShieldCheck size={11} />

                Secure

              </Badge>



              <Badge>

                <Clock3 size={11} />

                On-time

              </Badge>



              {flight.rating >= 4.8 && (

                <Badge green>

                  <Star

                    size={11}

                    fill="currentColor"

                  />

                  Highly rated

                </Badge>

              )}



            </div>



            <motion.button

              type="button"

              whileHover={{

                scale: 1.02,

                x: 3,

              }}

              whileTap={{

                scale: 0.97,

              }}

              onClick={() =>

                onDetails?.(flight)

              }

              className="group/btn flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-amber-200 transition hover:from-amber-500 hover:to-orange-500 sm:w-auto"

            >



              View details



              <motion.span

                animate={{

                  x: [0, 4, 0],

                }}

                transition={{

                  duration: 1.4,

                  repeat: Infinity,

                }}

              >

                <ArrowRight size={16} />

              </motion.span>



            </motion.button>



          </div>



        </div>



      </div>



    </motion.article>

  );

}





function QuickStat({

  icon,

  title,

  value,

  subtitle,

  theme,

}) {

  const themes = {

    amber: "bg-amber-50 text-amber-500",

    orange: "bg-orange-50 text-orange-500",

    yellow: "bg-yellow-50 text-yellow-500",

  };



  return (

    <motion.div

      whileHover={{

        y: -5,

      }}

      className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white/85 p-4 shadow-[0_12px_45px_rgba(146,64,14,.06)] backdrop-blur-xl"

    >



      <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-yellow-300/10 blur-xl" />



      <div className="relative flex items-center gap-3">



        <div

          className={`flex h-11 w-11 items-center justify-center rounded-xl ${themes[theme]}`}

        >

          {icon}

        </div>



        <div className="min-w-0">



          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">

            {title}

          </p>



          <p className="mt-1 truncate text-lg font-black text-slate-900">

            {value}

          </p>



        </div>



      </div>



      <p className="relative mt-3 truncate text-[10px] text-slate-400">

        {subtitle}

      </p>



    </motion.div>

  );

}





function FilterBox({

  label,

  icon,

  children,

}) {

  return (

    <div>



      <label className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">



        <span className="text-amber-500">

          {icon}

        </span>



        {label}



      </label>



      {children}



    </div>

  );

}





function Badge({

  children,

  green = false,

}) {

  return (

    <span

      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold ${

        green

          ? "bg-emerald-50 text-emerald-600"

          : "bg-amber-50 text-amber-700"

      }`}

    >

      {children}

    </span>

  );

}





function TrustItem({

  icon,

  text,

}) {

  return (

    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">



      <span className="text-amber-500">

        {icon}

      </span>



      {text}



    </div>

  );

}





function SkeletonCard() {

  return (

    <motion.div

      initial={{

        opacity: 0,

        y: 20,

      }}

      animate={{

        opacity: 1,

        y: 0,

      }}

      className="overflow-hidden rounded-[2rem] border border-amber-100 bg-white p-3 shadow-[0_15px_60px_rgba(146,64,14,.05)]"

    >



      <div className="relative h-52 overflow-hidden rounded-[1.6rem] bg-gradient-to-r from-yellow-50 via-amber-100 to-yellow-50 sm:h-60">



        <motion.div

          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"

          animate={{

            x: ["-100%", "100%"],

          }}

          transition={{

            duration: 1.4,

            repeat: Infinity,

            ease: "linear",

          }}

        />



      </div>



      <div className="space-y-5 p-4">



        <div className="grid gap-6 lg:grid-cols-[1fr_2fr_0.8fr]">



          <SkeletonLines />



          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">



            <SkeletonLines />



            <div className="h-2 w-24 rounded-full bg-amber-100" />



            <SkeletonLines />



          </div>



          <SkeletonLines />



        </div>



        <div className="h-12 w-full rounded-xl bg-amber-50" />



      </div>



    </motion.div>

  );

}



function SkeletonLines() {

  return (

    <div className="space-y-3">



      <div className="h-2.5 w-16 rounded-full bg-amber-100" />



      <div className="h-6 w-28 rounded-lg bg-amber-100" />



      <div className="h-2.5 w-20 rounded-full bg-amber-100" />



    </div>

  );

}





function EmptyState({

  onReset,

}) {

  return (

    <motion.div

      initial={{

        opacity: 0,

        scale: 0.96,

      }}

      animate={{

        opacity: 1,

        scale: 1,

      }}

      className="rounded-[2rem] border border-amber-100 bg-white px-6 py-16 text-center shadow-[0_20px_60px_rgba(146,64,14,.06)]"

    >



      <motion.div

        animate={{

          y: [0, -8, 0],

          rotate: [-3, 3, -3],

        }}

        transition={{

          duration: 3,

          repeat: Infinity,

        }}

        className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-500"

      >

        <Plane size={35} />

      </motion.div>



      <h3 className="mt-6 text-2xl font-black text-slate-900">

        No flights found

      </h3>



      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">

        We couldn't find flights matching those

        filters. Try increasing your price limit or

        selecting another departure time.

      </p>



      <button

        type="button"

        onClick={onReset}

        className="mt-6 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-amber-200 transition hover:from-amber-500 hover:to-orange-500"

      >

        Reset filters

      </button>



    </motion.div>

  );

}
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Plane,
  Menu,
  X,
  Ticket,
  Search,
  List,
  Users,
  Armchair,
  CreditCard,
} from "lucide-react";

const Navbar = ({ step, setStep }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      name: "Search",
      step: "search",
      icon: Search,
    },
    {
      name: "Flights",
      step: "results",
      icon: List,
    },
    {
      name: "Passenger",
      step: "passenger",
      icon: Users,
    },
    {
      name: "Seats",
      step: "seats",
      icon: Armchair,
    },
    {
      name: "Payment",
      step: "payment",
      icon: CreditCard,
    },
  ];

  const handleNavigation = (nextStep) => {
    setStep(nextStep);
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full border-b border-amber-100 bg-white shadow-md">

      {/* =====================================================
          NAVBAR CONTAINER
      ===================================================== */}

      <div className="mx-auto flex h-[68px] w-full max-w-[1600px] items-center px-4 sm:px-6 lg:px-8">

        {/* ===================================================
            LOGO
        =================================================== */}

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleNavigation("search")}
          className="flex shrink-0 items-center gap-2.5"
        >
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-amber-400
              to-yellow-500
              text-white
              shadow-md
              shadow-amber-200
            "
          >
            <Plane size={21} />
          </motion.div>

          <div className="text-left">
            <h1 className="text-lg font-black leading-none text-slate-900">
              Sky<span className="text-amber-500">Book</span>
            </h1>

            <p className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">
              Fly Beyond
            </p>
          </div>
        </motion.button>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav className="mx-auto hidden items-center lg:flex">
          {links.map((link, index) => {
            const Icon = link.icon;
            const isActive = step === link.step;

            return (
              <React.Fragment key={link.step}>

                {/* NAV ITEM */}

                <motion.button
                  type="button"
                  onClick={() => handleNavigation(link.step)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className={`
                    relative
                    flex
                    h-[42px]
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    text-sm
                    font-bold
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-amber-100 text-amber-700"
                        : "text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                    }
                  `}
                >
                  <Icon size={16} />

                  <span>{link.name}</span>

                  {/* ACTIVE INDICATOR */}

                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="
                        absolute
                        bottom-0
                        left-3
                        right-3
                        h-[3px]
                        rounded-full
                        bg-amber-500
                      "
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>

                {/* CONNECTOR */}

                {index < links.length - 1 && (
                  <div className="mx-1 h-px w-3 bg-slate-200" />
                )}

              </React.Fragment>
            );
          })}
        </nav>

        {/* ===================================================
            DESKTOP RIGHT SIDE
        =================================================== */}

        <div className="ml-auto hidden items-center gap-2 md:flex">

          {/* READY TO SEARCH */}

          <motion.button
            type="button"
            whileHover={{
              scale: 1.03,
              y: -1,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => handleNavigation("search")}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-gradient-to-r
              from-amber-400
              to-yellow-500
              px-4
              py-2.5
              text-sm
              font-black
              text-white
              shadow-sm
              shadow-amber-200
              transition-all
              hover:shadow-md
            "
          >
            <Search size={16} />

            Ready to Search
          </motion.button>

          {/* MY BOOKING */}

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleNavigation("confirmation")}
            className="
              rounded-lg
              p-2.5
              text-slate-500
              transition
              hover:bg-amber-50
              hover:text-amber-600
            "
            title="My Booking"
          >
            <Ticket size={19} />
          </motion.button>

          {/* SEARCH */}

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleNavigation("search")}
            className="
              rounded-lg
              p-2.5
              text-slate-500
              transition
              hover:bg-amber-50
              hover:text-amber-600
            "
            title="Search Flights"
          >
            <Search size={19} />
          </motion.button>

        </div>

        {/* ===================================================
            MOBILE MENU BUTTON
        =================================================== */}

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            ml-auto
            rounded-lg
            p-2.5
            text-slate-700
            hover:bg-amber-50
            hover:text-amber-600
            lg:hidden
          "
          aria-label="Toggle navigation"
        >
          <AnimatePresence mode="wait" initial={false}>

            {menuOpen ? (
              <motion.div
                key="close"
                initial={{
                  rotate: -90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                }}
              >
                <X size={23} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{
                  rotate: 90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: -90,
                  opacity: 0,
                }}
              >
                <Menu size={23} />
              </motion.div>
            )}

          </AnimatePresence>
        </motion.button>

      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              overflow-hidden
              border-t
              border-amber-100
              bg-white
              lg:hidden
            "
          >
            <div className="space-y-2 px-4 py-4">

              


              {/* NAVIGATION LINKS */}

              {links.map((link, index) => {
                const Icon = link.icon;
                const isActive = step === link.step;

                return (
                  <motion.button
                    key={link.step}
                    type="button"
                    initial={{
                      x: -15,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: index * 0.04,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() =>
                      handleNavigation(link.step)
                    }
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-bold
                      transition

                      ${
                        isActive
                          ? "bg-amber-100 text-amber-700"
                          : "text-slate-600 hover:bg-amber-50 hover:text-amber-600"
                      }
                    `}
                  >
                    <Icon size={18} />

                    <span>{link.name}</span>

                    {/* MOBILE ACTIVE DOT */}

                    {isActive && (
                      <motion.span
                        layoutId="mobile-active"
                        className="
                          ml-auto
                          h-2
                          w-2
                          rounded-full
                          bg-amber-500
                        "
                      />
                    )}
                  </motion.button>
                );
              })}

            

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CalendarCheck,
  ChevronRight,
  HeartPulse,
  Home,
  HouseHeart,
  Info,
  Menu,
  Phone,
  Stethoscope,
  Video,
  X,
} from "lucide-react";

import "./Navbar.css";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Info },
  { name: "Services", path: "/services", icon: Stethoscope },
  { name: "Home Care", path: "/home-care", icon: HouseHeart },
  {
    name: "Online Consultation",
    path: "/online-consultation",
    icon: Video,
  },
  { name: "Contact", path: "/contact", icon: Phone },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`royal-navbar-shell${isScrolled ? " is-scrolled" : ""}`}
    >
      <nav className="royal-navbar" aria-label="Primary navigation">
        <Link to="/" onClick={closeMenu} className="royal-brand">
          <span className="royal-brand-mark" aria-hidden="true">
            <HeartPulse size={27} strokeWidth={2.15} />
          </span>

          <span className="royal-brand-copy">
            <span className="royal-brand-name">Royal Health Care</span>
            <span className="royal-brand-tagline">Care you can trust</span>
          </span>
        </Link>

        <div className="royal-desktop-nav" aria-label="Main menu">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `royal-nav-link${isActive ? " is-active" : ""}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <Link to="/contact" className="royal-appointment-button">
          <CalendarCheck size={19} strokeWidth={1.9} aria-hidden="true" />
          <span>Book Appointment</span>
          <ChevronRight
            className="royal-appointment-arrow"
            size={17}
            aria-hidden="true"
          />
        </Link>

        <button
          type="button"
          className="royal-menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="royal-mobile-menu"
        >
          {isMenuOpen ? (
            <X size={23} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Menu size={23} strokeWidth={2} aria-hidden="true" />
          )}
        </button>

        <div
          id="royal-mobile-menu"
          className={`royal-mobile-menu${isMenuOpen ? " is-open" : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <div className="royal-mobile-links">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className={({ isActive }) =>
                    `royal-mobile-link${isActive ? " is-active" : ""}`
                  }
                >
                  <span className="royal-mobile-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2} />
                  </span>

                  <span>{item.name}</span>

                  <ChevronRight
                    className="royal-mobile-chevron"
                    size={17}
                    aria-hidden="true"
                  />
                </NavLink>
              );
            })}
          </div>

          <Link
            to="/contact"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
            className="royal-mobile-appointment"
          >
            <CalendarCheck size={18} aria-hidden="true" />
            <span>Book an Appointment</span>
            <ChevronRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
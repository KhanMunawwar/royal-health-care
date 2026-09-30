import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  HeartPulse,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video,
} from "lucide-react";

import heroImage from "../assets/images/Doctor-Hero.png";
import "./Hero.css";

// Add your actual business numbers with country codes.
// Empty values keep the contact buttons disabled.
const CALL_NUMBER = "+91 8087449425";
const WHATSAPP_NUMBER = "+91 8087449425";

const callNumber = CALL_NUMBER.replace(/[^\d+]/g, "");
const whatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

const callHref = callNumber ? `tel:${callNumber}` : undefined;

const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hello Royal Health Care, I would like to book an appointment."
    )}`
  : undefined;

const trustItems = [
  { icon: ShieldCheck, text: "Trusted Healthcare" },
  { icon: Stethoscope, text: "Professional Care" },
  { icon: Video, text: "Online Consultation" },
  { icon: HeartPulse, text: "Home Care Available" },
];

// Maximum parallax movement in pixels.
const parallaxLayers = [
  ["--doctor-parallax-x", "--doctor-parallax-y", 6, 4],
  ["--card-one-parallax-x", "--card-one-parallax-y", 10, 7],
  ["--card-two-parallax-x", "--card-two-parallax-y", 14, 9],
  ["--card-three-parallax-x", "--card-three-parallax-y", 8, 6],
  ["--shape-parallax-x", "--shape-parallax-y", -5, -3],
  ["--seal-parallax-x", "--seal-parallax-y", 11, 8],
];

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const desktopQuery = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let enabled = false;
    let frameId = null;
    let lastTime = null;

    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const writeParallax = () => {
      for (const [xProperty, yProperty, xDepth, yDepth] of parallaxLayers) {
        hero.style.setProperty(
          xProperty,
          `${(current.x * xDepth).toFixed(3)}px`
        );

        hero.style.setProperty(
          yProperty,
          `${(current.y * yDepth).toFixed(3)}px`
        );
      }
    };

    const stopAnimation = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = null;
      lastTime = null;
    };

    const resetImmediately = () => {
      stopAnimation();

      current.x = 0;
      current.y = 0;
      target.x = 0;
      target.y = 0;

      for (const [xProperty, yProperty] of parallaxLayers) {
        hero.style.removeProperty(xProperty);
        hero.style.removeProperty(yProperty);
      }
    };

    const animate = (time) => {
      frameId = null;

      if (!enabled || document.hidden) {
        resetImmediately();
        return;
      }

      // Time-based smoothing for different screen refresh rates.
      const elapsed =
        lastTime === null ? 1000 / 60 : Math.min(time - lastTime, 64);

      lastTime = time;

      const smoothing = 1 - Math.exp(-elapsed / 150);

      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;

      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001;

      if (settled) {
        current.x = target.x;
        current.y = target.y;
      }

      writeParallax();

      if (settled) {
        lastTime = null;
      } else {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const scheduleAnimation = () => {
      if (!enabled || document.hidden || frameId !== null) return;

      frameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      if (!enabled || event.pointerType !== "mouse") return;

      const bounds = hero.getBoundingClientRect();

      if (!bounds.width || !bounds.height) return;

      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

      target.x = Math.max(-1, Math.min(1, x));
      target.y = Math.max(-1, Math.min(1, y));

      scheduleAnimation();
    };

    const handlePointerLeave = () => {
      target.x = 0;
      target.y = 0;

      scheduleAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetImmediately();
      }
    };

    const addInteractionListeners = () => {
      hero.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      hero.addEventListener("pointerleave", handlePointerLeave);
      hero.addEventListener("pointercancel", handlePointerLeave);

      window.addEventListener("blur", resetImmediately);

      window.addEventListener("resize", resetImmediately, {
        passive: true,
      });

      window.addEventListener("scroll", resetImmediately, {
        passive: true,
        capture: true,
      });

      document.addEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };

    const removeInteractionListeners = () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      hero.removeEventListener("pointercancel", handlePointerLeave);

      window.removeEventListener("blur", resetImmediately);
      window.removeEventListener("resize", resetImmediately);
      window.removeEventListener("scroll", resetImmediately, true);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };

    const syncAvailability = () => {
      const shouldEnable =
        desktopQuery.matches && !reducedMotionQuery.matches;

      if (shouldEnable === enabled) return;

      enabled = shouldEnable;

      if (enabled) {
        addInteractionListeners();
      } else {
        removeInteractionListeners();
        resetImmediately();
      }
    };

    desktopQuery.addEventListener("change", syncAvailability);
    reducedMotionQuery.addEventListener("change", syncAvailability);

    syncAvailability();

    return () => {
      enabled = false;

      desktopQuery.removeEventListener("change", syncAvailability);
      reducedMotionQuery.removeEventListener("change", syncAvailability);

      removeInteractionListeners();
      resetImmediately();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section"
      aria-labelledby="hero-title"
    >
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-orbit hero-orbit-one" />
        <span className="hero-orbit hero-orbit-two" />
        <span className="hero-dot-field" />
        <span className="hero-pulse-line" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-icon" aria-hidden="true">
              <Sparkles size={14} strokeWidth={2.4} />
            </span>

            <span>Trusted Healthcare</span>
            <span className="hero-eyebrow-divider" aria-hidden="true" />
            <span>Professional Care</span>
          </div>

          <div className="hero-brand-line">
            <span className="hero-brand-name">Royal Health Care</span>

            <span className="hero-brand-divider" aria-hidden="true" />

            <span className="hero-brand-tagline">
              Care You Can Trust
            </span>
          </div>

          <h1 id="hero-title" className="hero-title">
            Your Health,
            <span>Our Priority.</span>
          </h1>

          <p className="hero-description">
            Access trusted healthcare services, experienced doctors, online
            consultations, and professional home care — all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="hero-primary-btn">
              <CalendarCheck
                size={19}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              <span>Book Appointment</span>

              <ArrowRight
                className="hero-button-arrow"
                size={18}
                aria-hidden="true"
              />
            </Link>

            <a
              className="hero-contact-btn hero-call-btn"
              href={callHref}
              role={callHref ? undefined : "link"}
              aria-disabled={callHref ? undefined : true}
              tabIndex={callHref ? undefined : -1}
            >
              <Phone
                className="hero-contact-icon"
                size={18}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              <span>Call Now</span>
            </a>

            <a
              className="hero-contact-btn hero-whatsapp-btn"
              href={whatsappHref}
              role={whatsappHref ? undefined : "link"}
              target={whatsappHref ? "_blank" : undefined}
              rel={whatsappHref ? "noopener noreferrer" : undefined}
              aria-disabled={whatsappHref ? undefined : true}
              tabIndex={whatsappHref ? undefined : -1}
            >
              <MessageCircle
                className="hero-contact-icon"
                size={19}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              <span>WhatsApp</span>
            </a>

            <Link to="/services" className="hero-secondary-btn">
              <Stethoscope
                size={19}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              <span>Explore Our Services</span>

              <ArrowRight
                className="hero-button-arrow"
                size={18}
                aria-hidden="true"
              />
            </Link>
          </div>

          <div
            className="hero-trust-grid"
            aria-label="Healthcare benefits"
          >
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div className="hero-trust-item" key={item.text}>
                  <span className="hero-trust-icon" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.85} />
                  </span>

                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-bg">
            <img
              className="hero-doctor-image"
              src={heroImage}
              alt="Professional male and female doctors representing Royal Health Care"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />

            <div className="hero-image-overlay" aria-hidden="true" />
            <div className="hero-media-sheen" aria-hidden="true" />
          </div>

          <div className="hero-visual-arc" aria-hidden="true" />

          <div className="hero-floating-card hero-card-one">
            <span className="hero-card-icon" aria-hidden="true">
              <ShieldCheck size={22} strokeWidth={1.9} />
            </span>

            <span className="hero-card-copy">
              <strong>Trusted Care</strong>
              <small>Professional Healthcare</small>
            </span>
          </div>

          <div className="hero-floating-card hero-card-two">
            <span className="hero-card-icon" aria-hidden="true">
              <CalendarCheck size={22} strokeWidth={1.9} />
            </span>

            <span className="hero-card-copy">
              <strong>Easy Booking</strong>
              <small>Book an Appointment</small>
            </span>
          </div>

          <div className="hero-floating-card hero-card-three">
            <span className="hero-card-icon" aria-hidden="true">
              <Video size={22} strokeWidth={1.9} />
            </span>

            <span className="hero-card-copy">
              <strong>Online Consultation</strong>
              <small>Consult from Anywhere</small>
            </span>
          </div>

          <div className="hero-mini-seal" aria-hidden="true">
            <HeartPulse size={22} strokeWidth={1.9} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
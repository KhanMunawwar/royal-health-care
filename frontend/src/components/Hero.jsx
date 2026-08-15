import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video,
} from "lucide-react";

import heroImage from "../assets/images/Doctor-Hero.png";
import "./Hero.css";

const trustItems = [
  { icon: ShieldCheck, text: "Trusted Healthcare" },
  { icon: Stethoscope, text: "Professional Care" },
  { icon: Video, text: "Online Consultation" },
  { icon: HeartPulse, text: "Home Care Available" },
];

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
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

              <span>Book an Appointment</span>

              <ArrowRight
                className="hero-button-arrow"
                size={18}
                aria-hidden="true"
              />
            </Link>

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
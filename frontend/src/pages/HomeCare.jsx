import { Link } from "react-router-dom";
import "./Home_Care.css";

// Images folder: frontend/src/assets/images/
import heroImage from "../assets/images/hero.png";
import doctorHomeVisitImage from "../assets/images/doctor-home-visit.png";
import nurseVisitImage from "../assets/images/nurse-visit.png";
import injectionImage from "../assets/images/injection.png";
import dressingImage from "../assets/images/dressing.png";
import elderCareImage from "../assets/images/elder-care.png";
import postHospitalCareImage from "../assets/images/post-hospital-care.png";
import careSupportImage from "../assets/images/care-support.png";
import bookingBackgroundImage from "../assets/images/home-care-cta-bg.png";

// Yahan apne BUSINESS ke actual numbers add karna.
const CONTACT = {
  whatsapp: "", // Country code + number, without spaces
  phone: "", // Country code + number
};

const SERVICES = [
  {
    title: "Doctor Home Visit",
    description: "Consult a doctor in the comfort of your home.",
    image: doctorHomeVisitImage,
    icon: "stethoscope",
  },
  {
    title: "Nurse Visit",
    description: "Professional nursing support for your care needs.",
    image: nurseVisitImage,
    icon: "nurse",
  },
  {
    title: "Injection",
    description: "At-home assistance with prescribed injections.",
    image: injectionImage,
    icon: "syringe",
  },
  {
    title: "Dressing",
    description: "Wound dressing support as advised by your clinician.",
    image: dressingImage,
    icon: "bandage",
  },
  {
    title: "Elder Care",
    description: "Thoughtful support for everyday comfort and care.",
    image: elderCareImage,
    icon: "person",
  },
  {
    title: "Post Hospital Care",
    description: "Support as you recover and settle back at home.",
    image: postHospitalCareImage,
    icon: "bed",
  },
];

const BENEFITS = [
  {
    icon: "home",
    title: "Home Visits",
    text: "Doctor and nursing support.",
  },
  {
    icon: "heart",
    title: "Recovery Support",
    text: "Help after a hospital stay.",
  },
  {
    icon: "users",
    title: "Everyday Care",
    text: "Thoughtful support at home.",
  },
];

const REASONS = [
  {
    icon: "home",
    title: "Familiar Surroundings",
    text: "Receive support where you feel comfortable.",
  },
  {
    icon: "person",
    title: "Personal Care Needs",
    text: "Talk through the assistance you require.",
  },
  {
    icon: "calendar",
    title: "Home Visit Options",
    text: "Explore doctor and nursing visits.",
  },
  {
    icon: "heart",
    title: "Continued Support",
    text: "Plan the next steps in your care.",
  },
];

const STEPS = [
  {
    icon: "stethoscope",
    title: "Choose a Service",
    text: "Explore our home care services.",
  },
  {
    icon: "chat",
    title: "Contact Our Team",
    text: "Get in touch to discuss your needs.",
  },
  {
    icon: "calendar",
    title: "Arrange Your Visit",
    text: "We'll plan a suitable time for your home visit.",
  },
  {
    icon: "home",
    title: "Receive Care at Home",
    text: "Get the support you need, at home.",
  },
];

// SVG icons — no external icon library required.
const ICON_PATHS = {
  home:
    "M3 10 12 3l9 7v11h-6v-7H9v7H3Z",

  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8ZM4 12h4l2-3 3 6 2-3h5",

  users:
    "M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM3 21v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m2 10v-2a6 6 0 0 0-3-5.2",

  stethoscope:
    "M5 3v8a5 5 0 0 0 10 0V3M3 3h4m6 0h4M10 16v1a5 5 0 0 0 10 0v-3m2-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",

  nurse:
    "M7 3h10l-1 5H8ZM10 5h4m-2 3v4M5 21v-2a7 7 0 0 1 14 0v2Z",

  syringe:
    "m18 2 4 4m-2-2-4 4M9 7l8 8M10 8l-6 6 6 6 6-6M7 17l-5 5m6-12 2 2m-4 0 2 2",

  bandage:
    "M4 13 13 4a5 5 0 0 1 7 7l-9 9a5 5 0 0 1-7-7ZM8 9l7 7m-6-1 6-6",

  person:
    "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM5 21v-2a7 7 0 0 1 14 0v2ZM8 13l4 2 4-2",

  bed:
    "M3 20V5m18 15V9M3 15h18v4H3ZM5 10h5a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Zm7 2h6a3 3 0 0 1 3 3h-9Z",

  calendar:
    "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5",

  chat:
    "M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-3.5-.7L3 21l1.7-5.6a8.5 8.5 0 1 1 16.3-3.9ZM8 11h8m-8 4h5",

  check:
    "m5 12 4 4L19 6",

  arrow:
    "M4 12h16m-6-6 6 6-6 6",

  phone:
    "M5 3h4l2 5-2 2a15 15 0 0 0 5 5l2-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z",
};

function Icon({ name, size = 27 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="hc-eyebrow">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

export default function HomeCare() {
  const whatsapp = CONTACT.whatsapp.replace(/\D/g, "");
  const phone = CONTACT.phone.replace(/[^\d+]/g, "");

  const message = encodeURIComponent(
    "Hello, I would like to enquire about Royal Health Care home care services."
  );

  return (
    <main className="home-care">
      {/* ================= HERO ================= */}
      <section className="hc-hero" aria-labelledby="hc-title">
        <div
          className="hc-hero-photo"
          style={{ backgroundImage: `url("${heroImage}")` }}
          aria-hidden="true"
        />

        <div className="hc-container hc-hero-inner">
          <nav className="hc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Home Care</span>
          </nav>

          <div className="hc-hero-copy">
            <Eyebrow>Care at your doorstep</Eyebrow>

            <h1 id="hc-title">
              Home Care
              <br />
              <span>Services</span>
            </h1>

            <p>
              Expert healthcare support at your doorstep for comfort,
              recovery, and peace of mind.
            </p>

            <div className="hc-actions">
              <a
                className="hc-button hc-button-white"
                href="#hc-services"
              >
                Explore Home Care
                <Icon name="arrow" size={18} />
              </a>

              <Link
                className="hc-button hc-button-outline"
                to="/contact"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="hc-hero-note">
            <Icon name="home" size={21} />
            Care in the comfort of home
          </div>
        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section
        className="hc-intro hc-container"
        aria-label="About home care"
      >
        <div>
          <Eyebrow>Home care, made personal</Eyebrow>

          <h2>
            Professional Care.
            <br />
            <span>Familiar Surroundings.</span>
          </h2>

          <p>
            Explore healthcare support at home, shaped around your care
            needs and everyday comfort.
          </p>
        </div>

        <div className="hc-benefits">
          {BENEFITS.map((item) => (
            <div className="hc-benefit" key={item.title}>
              <span className="hc-round-icon">
                <Icon name={item.icon} />
              </span>

              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICE CARDS ================= */}
      <section
        className="hc-services hc-container"
        id="hc-services"
        aria-labelledby="hc-services-title"
      >
        <div className="hc-section-heading">
          <Eyebrow>Explore home care</Eyebrow>

          <h2 id="hc-services-title">
            The Right Care, Right at Home.
          </h2>

          <p>Find the service that fits your needs.</p>
        </div>

        <div className="hc-service-grid">
          {SERVICES.map((service) => (
            <article
              className="hc-service-card"
              key={service.title}
              style={{
                "--hc-card-image": `url("${service.image}")`,
              }}
            >
              <span className="hc-card-icon">
                <Icon name={service.icon} />
              </span>

              <div className="hc-card-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <Link
                  to={`/contact?service=${encodeURIComponent(
                    service.title
                  )}`}
                  aria-label={`Enquire about ${service.title}`}
                >
                  Explore Service
                  <Icon name="arrow" size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="hc-help-strip">
          <span className="hc-help-icon">
            <Icon name="heart" size={34} />
          </span>

          <div>
            <strong>Not sure which service you need?</strong>
            <p>Talk to our team about your home care needs.</p>
          </div>

          <Link
            className="hc-button hc-button-white"
            to="/contact"
          >
            Get in Touch
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>

      {/* ================= CARE SUPPORT ================= */}
      <section
        className="hc-feature hc-container"
        aria-labelledby="hc-feature-title"
      >
        <div
          className="hc-feature-image"
          style={{ backgroundImage: `url("${careSupportImage}")` }}
          role="img"
          aria-label="Nurse supporting an older person at home"
        />

        <div className="hc-feature-copy">
          <Eyebrow>Care that comes to you</Eyebrow>

          <h2 id="hc-feature-title">
            Comfort at Home.
            <br />
            <span>Support Along the Way.</span>
          </h2>

          <p>
            Discuss the home care options that suit your needs and routine.
          </p>

          <ul>
            <li>
              <Icon name="check" />
              Doctor and nurse visits
            </li>

            <li>
              <Icon name="check" />
              Everyday care and recovery support
            </li>

            <li>
              <Icon name="check" />
              Care in familiar surroundings
            </li>
          </ul>

          <Link
            className="hc-button hc-button-primary"
            to="/contact"
          >
            Discuss Your Care
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section
        className="hc-values hc-container"
        aria-labelledby="hc-values-title"
      >
        <div>
          <Eyebrow>Why Royal Health Care</Eyebrow>

          <h2 id="hc-values-title">
            Care That Fits
            <br />
            <span>Your Life.</span>
          </h2>
        </div>

        <div className="hc-value-list">
          {REASONS.map((item) => (
            <div className="hc-value" key={item.title}>
              <Icon name={item.icon} size={23} />
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BOOKING STEPS ================= */}
      <section
        className="hc-steps hc-container"
        aria-labelledby="hc-steps-title"
      >
        <Eyebrow>How it works</Eyebrow>

        <h2 id="hc-steps-title">
          Arrange Care in a Few Simple Steps
        </h2>

        <div className="hc-step-grid">
          {STEPS.map((step, index) => (
            <div className="hc-step" key={step.title}>
              <span className="hc-step-icon">
                <Icon name={step.icon} />
              </span>

              <div>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT BANNER ================= */}
      <section
        className="hc-bottom-cta hc-container"
        style={{
          backgroundImage: `linear-gradient(90deg, #061b4233, #061b424d), url("${bookingBackgroundImage}")`,
        }}
        aria-labelledby="hc-cta-title"
      >
        <div>
          <h2 id="hc-cta-title">
            Book Trusted <span>Home Care Today</span>
          </h2>

          <p>
            Tell us what you need. Contact our team to discuss services
            and arrange a home visit.
          </p>
        </div>

        <div className="hc-cta-actions">
          {whatsapp ? (
            <a
              className="hc-button hc-button-white"
              href={`https://wa.me/${whatsapp}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Now
              <Icon name="arrow" size={18} />
            </a>
          ) : (
            <Link
              className="hc-button hc-button-white"
              to="/contact"
            >
              Contact Our Team
              <Icon name="arrow" size={18} />
            </Link>
          )}

          {phone ? (
            <a
              className="hc-button hc-button-outline"
              href={`tel:${phone}`}
            >
              <Icon name="phone" size={19} />
              Call Now
            </a>
          ) : (
            <Link
              className="hc-button hc-button-outline"
              to="/contact"
            >
              <Icon name="phone" size={19} />
              Request a Call
            </Link>
          )}

          <small>Enquire about availability</small>
        </div>
      </section>
    </main>
  );
}

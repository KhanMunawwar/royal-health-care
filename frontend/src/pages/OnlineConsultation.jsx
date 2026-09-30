import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  Headphones,
  Heart,
  HeartHandshake,
  HeartPulse,
  Home,
  MessageCircle,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Video,
} from "lucide-react";
import consultationHero from "../assets/images/online-consultation/online-consultation-hero.png";
import generalConsultation from "../assets/images/online-consultation/general-consultation.png";
import followUpConsultation from "../assets/images/online-consultation/follow-up-consultation.png";
import medicationGuidance from "../assets/images/online-consultation/medication-guidance.png";
import elderlyCareConsultation from "../assets/images/online-consultation/elderly-care-consultation.png";
import homeCareGuidance from "../assets/images/online-consultation/home-care-guidance.png";
import healthWellnessSupport from "../assets/images/online-consultation/health-wellness-support.png";
import consultationBenefits from "../assets/images/online-consultation/online-consultation-benefits.png";
import onlineCareSupport from "../assets/images/online-consultation/online-care-support.png";
import "./OnlineConsultation.css";

// Change these values to match your existing routes and BUSINESS numbers.
// Leave numbers empty until the clinic's real contact details are available.
// Empty numbers send visitors to your Contact page instead of a fake number.
const PAGE_CONFIG = {
  appointmentPath: "/appointment",
  contactPath: "/contact",
  phone: "", // International format, including country code.
  whatsapp: "", // International format, digits only, including country code.
};

// The nine photos above use direct imports. If a file is missing or has a
// different name, Vite points to that exact path instead of choosing another
// page's photo. Only the optional booking background is discovered below.
const bannerImages = import.meta.glob("../assets/images/*cta-bg.png", {
  eager: true,
  query: "?url",
  import: "default",
});

// Your 9 photos: keep these exact filenames inside src/assets/images.
const IMAGES = {
  hero: consultationHero,
  general: generalConsultation,
  followUp: followUpConsultation,
  medication: medicationGuidance,
  elderly: elderlyCareConsultation,
  homeCare: homeCareGuidance,
  wellness: healthWellnessSupport,
  benefits: consultationBenefits,
  support: onlineCareSupport,
  // Optional: reuse an existing banner. Otherwise the CSS gradient is used.
  banner:
    bannerImages["../assets/images/online-consultation-cta-bg.png"] ||
    bannerImages["../assets/images/home-care-cta-bg.png"] ||
    "",
};

const HIGHLIGHTS = [
  {
    icon: Home,
    title: "Easy access",
    description: "Speak with a doctor from a place where you feel comfortable.",
  },
  {
    icon: CalendarCheck,
    title: "Convenient care",
    description: "Request a time that works around your everyday routine.",
  },
  {
    icon: Heart,
    title: "Personal guidance",
    description: "Make time for your questions and understand your next steps.",
  },
];

const STEPS = [
  {
    icon: Stethoscope,
    title: "Choose your service",
    text: "Select the consultation that best suits your needs.",
  },
  {
    icon: CalendarDays,
    title: "Request an appointment",
    text: "Share your preferred date and contact details.",
  },
  {
    icon: Video,
    title: "Connect online",
    text: "Our team confirms the time and explains how to join.",
  },
  {
    icon: ClipboardList,
    title: "Receive guidance",
    text: "Discuss your concerns and the next steps in your care.",
  },
];

const SERVICES = [
  {
    key: "general",
    icon: Stethoscope,
    title: "General Consultation",
    text: "Discuss your health concerns and everyday care needs.",
    tone: "blue",
  },
  {
    key: "followUp",
    icon: ClipboardList,
    title: "Follow-up Consultation",
    text: "Continue the conversation about your existing care plan.",
    tone: "mint",
  },
  {
    key: "medication",
    icon: Pill,
    title: "Medication Guidance",
    text: "Ask a clinician questions about your prescribed medicines.",
    tone: "sand",
  },
  {
    key: "elderly",
    icon: UserRound,
    title: "Elderly Care Consultation",
    text: "Talk through the care needs of an older family member.",
    tone: "sand",
  },
  {
    key: "homeCare",
    icon: Home,
    title: "Home Care Guidance",
    text: "Understand the support available for care at home.",
    tone: "blue",
  },
  {
    key: "wellness",
    icon: Heart,
    title: "Health & Wellness Support",
    text: "Get guidance on healthy routines and everyday wellbeing.",
    tone: "mint",
  },
];

const BENEFITS = [
  "Less travel for consultations that can happen online",
  "Appointment requests around your daily routine",
  "A comfortable place to discuss your concerns",
  "Convenient follow-ups for ongoing care",
  "Help understanding what to do next",
];

const FAQS = [
  {
    question: "How does an online consultation work?",
    answer:
      "Choose a service and send an appointment request. Our care team will confirm availability, explain any consultation fee and share the instructions for connecting with a healthcare professional. Sending a request does not confirm an appointment.",
  },
  {
    question: "What information should I prepare before my consultation?",
    answer:
      "Keep a short description of your concern, your current medicines and any relevant reports ready. Our team will explain how to share information for your appointment. You will also need a device with a stable internet connection for a video consultation.",
  },
  {
    question: "Can I use online consultation for follow-up care?",
    answer:
      "You can request a follow-up consultation. The clinician will decide whether an online appointment is suitable or whether an in-person examination or further tests are needed.",
  },
  {
    question: "How will I connect with the healthcare professional?",
    answer:
      "After your appointment is confirmed, the care team will tell you which call or video platform to use and provide joining instructions. Contact the team if you need help connecting.",
  },
  {
    question: "What if I need an in-person or home visit instead?",
    answer:
      "Contact our care team to discuss available in-person and home care options. The appropriate type of consultation depends on your needs and the clinician's assessment.",
  },
];

function bookingDestination(service = "General Consultation") {
  return {
    pathname: PAGE_CONFIG.appointmentPath,
    search: `?${new URLSearchParams({ mode: "online", service }).toString()}`,
  };
}

function Eyebrow({ children, light = false }) {
  return (
    <p className={`oc-eyebrow${light ? " oc-eyebrow--light" : ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

function BookLink({
  children = "Book Online Consultation",
  className = "oc-button--primary",
  service,
}) {
  return (
    <Link className={`oc-button ${className}`} to={bookingDestination(service)}>
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}

function SupportLink({
  channel = "contact",
  className = "oc-button--outline",
  children,
}) {
  const phone = PAGE_CONFIG.phone.replace(/[^\d+]/g, "");
  const whatsapp = PAGE_CONFIG.whatsapp.replace(/\D/g, "");
  const phoneReady = /^\+?\d{7,15}$/.test(phone);
  const whatsappReady = /^\d{7,15}$/.test(whatsapp);
  let href = "";
  if (channel === "phone" && phoneReady) href = `tel:${phone}`;
  if (channel === "whatsapp" && whatsappReady) {
    const message =
      "Hello Royal Health Care, I would like help booking an online consultation.";
    href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  }
  const style = `oc-button ${className}`;
  if (!href)
    return (
      <Link to={PAGE_CONFIG.contactPath} className={style}>
        {children}
      </Link>
    );
  return (
    <a
      href={href}
      className={style}
      {...(channel === "whatsapp"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

// Purposeful artwork is shown when a photo is absent or fails to load.
function Photo({
  src,
  className = "",
  icon: Icon = HeartPulse,
  priority = false,
}) {
  const [failedSource, setFailedSource] = useState(null);
  const available = Boolean(src) && failedSource !== src;
  return (
    <div
      className={`oc-photo ${available ? "oc-photo--loaded" : "oc-photo--fallback"} ${className}`}
      aria-hidden="true"
    >
      {available ? (
        <img
          src={src}
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setFailedSource(src)}
        />
      ) : (
        <div className="oc-photo-art">
          <span />
          <span />
          <Icon strokeWidth={1.1} />
        </div>
      )}
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);
  const prefix = useId();
  return (
    <section className="oc-faq oc-section" aria-labelledby="oc-faq-title">
      <div className="oc-faq-intro">
        <Eyebrow>Online consultation FAQ</Eyebrow>
        <h2 id="oc-faq-title">
          Questions before
          <br />
          <span>you book?</span>
        </h2>
        <p>Find answers to common questions about your online consultation.</p>
        <Link to={PAGE_CONFIG.contactPath} className="oc-text-link">
          Ask our care team
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <div className="oc-faq-list">
        {FAQS.map((item, index) => {
          const open = openIndex === index;
          const buttonId = `${prefix}-question-${index}`;
          const panelId = `${prefix}-answer-${index}`;
          return (
            <article
              key={item.question}
              className={`oc-faq-item${open ? " oc-faq-item--open" : ""}`}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  {item.question}
                  <ChevronDown size={18} aria-hidden="true" />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className="oc-faq-answer"
              >
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function OnlineConsultation() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Online Consultation | Royal Health Care";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="oc-page">
      <section className="oc-hero" aria-labelledby="oc-page-title">
        <Photo
          src={IMAGES.hero}
          className="oc-hero-photo"
          icon={Video}
          priority
        />
        <div className="oc-hero-shade" aria-hidden="true" />
        <div className="oc-container oc-hero-inner">
          <nav className="oc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Online Consultation</span>
          </nav>
          <div className="oc-hero-copy">
            <Eyebrow light>Care from anywhere</Eyebrow>
            <h1 id="oc-page-title">
              Consult a doctor.
              <br />
              From the comfort
              <br />
              of <span>your home.</span>
            </h1>
            <p>
              Make room for your health. Connect with a doctor for guidance,
              support and the next steps in your care.
            </p>
            <div className="oc-actions">
              <BookLink className="oc-button--white" />
              <SupportLink className="oc-button--glass">
                Talk to Our Team
              </SupportLink>
            </div>
            <ul className="oc-hero-trust">
              {["Easy booking", "Personal guidance", "Care from home"].map(
                (item) => (
                  <li key={item}>
                    <Check size={13} aria-hidden="true" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="oc-online-badge">
            <span>
              <Video size={21} aria-hidden="true" />
            </span>
            <div>
              Doctor support<span>From wherever you are</span>
            </div>
          </div>
          <div className="oc-hero-caption">
            <HeartHandshake size={21} aria-hidden="true" />
            <span>A little closer to better care.</span>
          </div>
        </div>
      </section>

      <div className="oc-container">
        <section
          className="oc-intro oc-section"
          aria-labelledby="oc-intro-title"
        >
          <div className="oc-intro-copy">
            <Eyebrow>Online healthcare</Eyebrow>
            <h2 id="oc-intro-title">
              Quality healthcare.
              <br />
              <span>Wherever you are.</span>
            </h2>
            <p>
              A reassuring conversation can be the first step. Our online
              consultation service helps you discuss your concerns from the
              comfort of home.
            </p>
          </div>
          <div className="oc-highlight-grid">
            {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
              <article className="oc-highlight" key={title}>
                <span className="oc-round-icon">
                  <Icon size={29} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="oc-steps-section oc-section"
          aria-labelledby="oc-steps-title"
        >
          <Eyebrow>How it works</Eyebrow>
          <h2 id="oc-steps-title">
            Consult a doctor in <span>four simple steps.</span>
          </h2>
          <ol className="oc-steps">
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <li className="oc-step" key={title}>
                <span className="oc-round-icon">
                  <Icon size={29} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="oc-step-copy">
                  <span className="oc-step-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="oc-services-section oc-section"
          aria-labelledby="oc-services-title"
        >
          <div className="oc-section-heading">
            <div>
              <Eyebrow>Online services</Eyebrow>
              <h2 id="oc-services-title">
                Choose the care <span>you need.</span>
              </h2>
            </div>
            <p>
              Support for every stage
              <br className="oc-desktop-break" /> of your care journey.
            </p>
          </div>
          <div className="oc-services">
            {SERVICES.map(({ key, icon: Icon, title, text, tone }) => (
              <article className={`oc-service oc-service--${tone}`} key={key}>
                <Photo
                  src={IMAGES[key]}
                  className="oc-service-photo"
                  icon={Icon}
                />
                <div className="oc-service-shade" aria-hidden="true" />
                <div className="oc-service-copy">
                  <span className="oc-square-icon">
                    <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link
                    to={bookingDestination(title)}
                    className="oc-text-link"
                    aria-label={`Book ${title}`}
                  >
                    Book Consultation
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="oc-benefits oc-section"
          aria-labelledby="oc-benefits-title"
        >
          <div className="oc-benefits-visual">
            <Photo
              src={IMAGES.benefits}
              className="oc-benefits-photo"
              icon={Video}
            />
            <div className="oc-image-note">
              <span>
                <Clock3 size={22} aria-hidden="true" />
              </span>
              <div>
                Care that fits your day
                <small>More time for what matters.</small>
              </div>
            </div>
          </div>
          <div className="oc-benefits-copy">
            <Eyebrow>Why online consultation</Eyebrow>
            <h2 id="oc-benefits-title">
              Healthcare that fits
              <br />
              <span>your schedule.</span>
            </h2>
            <ul className="oc-check-list">
              {BENEFITS.map((item) => (
                <li key={item}>
                  <span>
                    <Check size={15} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <BookLink>Book Your Consultation</BookLink>
          </div>
        </section>

        <section className="oc-support" aria-labelledby="oc-support-title">
          <Photo
            src={IMAGES.support}
            className="oc-support-photo"
            icon={Stethoscope}
          />
          <div className="oc-support-copy">
            <Eyebrow>Care & support</Eyebrow>
            <h2 id="oc-support-title">
              Professional guidance.
              <br />
              <span>When you need it.</span>
            </h2>
            <p>
              Get help preparing for your consultation, asking the right
              questions and understanding your next steps.
            </p>
          </div>
          <div className="oc-support-details">
            <ul>
              <li>
                <UserRound size={19} aria-hidden="true" />
                Patient-focused support
              </li>
              <li>
                <MessageCircle size={19} aria-hidden="true" />
                Clear communication
              </li>
              <li>
                <CalendarCheck size={19} aria-hidden="true" />
                Help with your appointment
              </li>
            </ul>
            <SupportLink className="oc-button--primary">
              Talk to Our Care Team
              <ArrowRight size={17} aria-hidden="true" />
            </SupportLink>
          </div>
        </section>

        <aside className="oc-guidance" aria-label="Consultation guidance">
          <span className="oc-guidance-icon">
            <HeartHandshake size={33} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h3>Not sure if online consultation is right for you?</h3>
            <p>
              Talk to our team about the care options available for your needs.
            </p>
          </div>
          <SupportLink className="oc-button--white">
            Get Guidance
            <ArrowRight size={17} aria-hidden="true" />
          </SupportLink>
        </aside>

        <section className="oc-booking" aria-labelledby="oc-booking-title">
          {IMAGES.banner && (
            <Photo src={IMAGES.banner} className="oc-booking-background" />
          )}
          <div className="oc-booking-copy">
            <Eyebrow light>Ready to get started?</Eyebrow>
            <h2 id="oc-booking-title">
              Book your <span>online consultation.</span>
            </h2>
            <p>
              Start with a simple request. Our team will help you arrange the
              next step in your care.
            </p>
          </div>
          <div className="oc-booking-actions">
            <BookLink className="oc-button--white" />
            <SupportLink channel="phone" className="oc-button--glass">
              <Phone size={18} aria-hidden="true" />
              Call Our Team
            </SupportLink>
            <p>
              <CalendarCheck size={15} aria-hidden="true" />
              Appointment subject to confirmation
            </p>
          </div>
        </section>

        <aside className="oc-contact-strip" aria-label="Booking assistance">
          <span className="oc-contact-icon">
            <Headphones size={25} aria-hidden="true" />
          </span>
          <div>
            <h3>Need help booking your consultation?</h3>
            <p>We’re here to help with appointments and your questions.</p>
          </div>
          <div className="oc-actions">
            <SupportLink channel="whatsapp" className="oc-button--whatsapp">
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp Us
            </SupportLink>
            <SupportLink channel="phone" className="oc-button--primary">
              <Phone size={18} aria-hidden="true" />
              Call Our Team
            </SupportLink>
          </div>
        </aside>

        <FaqSection />

        <section className="oc-final" aria-labelledby="oc-final-title">
          <div>
            <h2 id="oc-final-title">
              Care should be <span>easy to access.</span>
            </h2>
            <p>
              Take the first step towards better health.
              <br />
              Let’s find the care that works for you.
            </p>
          </div>
          <HeartPulse
            className="oc-final-art"
            strokeWidth={0.8}
            aria-hidden="true"
          />
          <BookLink>Book Appointment</BookLink>
        </section>
        <p className="oc-care-note">
          <ShieldCheck size={17} aria-hidden="true" />
          <span>
            Online consultation is for non-emergency care. For an emergency,
            seek immediate in-person medical help.
          </span>
        </p>
      </div>
    </main>
  );
}

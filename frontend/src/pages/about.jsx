import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  Eye,
  Heart,
  House,
  LaptopMinimal,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";
import doctorsImage from "../assets/images/about-doctors.png";
import "./About.css";

const careServices = [
  { icon: Stethoscope, title: "Professional Care" },
  { icon: Heart, title: "Personal Attention" },
  { icon: LaptopMinimal, title: "Online Consultation" },
  { icon: House, title: "Home Care Available" },
];

const purposeCards = [
  {
    icon: Heart,
    title: "Our Mission",
    description:
      "To make professional, compassionate healthcare easier to access for individuals and families.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A more connected healthcare experience, where every person feels informed and supported.",
  },
];

const values = [
  { icon: Heart, title: "Compassion" },
  { icon: ShieldCheck, title: "Trust" },
  { icon: UsersRound, title: "Clarity" },
  { icon: UserRound, title: "Personal Attention" },
];

// Use your real business numbers in .env; ten-digit numbers use India's +91.
// Until configured, these actions open the existing Contact page.
function normalizePhone(value = "") {
  const digits = value.replace(/\D/g, "");
  const international = digits.length === 10 ? `91${digits}` : digits;
  return /^[1-9]\d{10,14}$/.test(international) ? international : "";
}

const phoneNumber = normalizePhone(import.meta.env.VITE_RHC_PHONE);
const whatsappNumber = normalizePhone(
  import.meta.env.VITE_RHC_WHATSAPP || import.meta.env.VITE_RHC_PHONE,
);

/** Reserve space only when the site's existing navigation is fixed. */
function useNavigationOffset(pageRef) {
  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    let resizeObserver;
    const observed = new Set();

    const measure = () => {
      let offset = 0;
      document.querySelectorAll("header, nav, [role='banner']").forEach((nav) => {
        if (page.contains(nav)) return;
        let element = nav;
        while (element && element !== document.body) {
          const styles = window.getComputedStyle(element);
          if (styles.position === "fixed") {
            const rect = element.getBoundingClientRect();
            if (rect.height > 0 && rect.bottom > 0 && rect.top < 80 && rect.bottom < window.innerHeight / 2) {
              offset = Math.max(offset, rect.bottom);
              if (resizeObserver && !observed.has(element)) {
                observed.add(element);
                resizeObserver.observe(element);
              }
            }
            break;
          }
          element = element.parentElement;
        }
      });
      page.style.setProperty("--rhc-about-nav-offset", `${Math.ceil(offset)}px`);
    };

    if ("ResizeObserver" in window) resizeObserver = new ResizeObserver(measure);
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
      page.style.removeProperty("--rhc-about-nav-offset");
    };
  }, [pageRef]);
}

/** Content remains visible without an observer or when motion is reduced. */
function usePageReveals(pageRef) {
  useEffect(() => {
    const page = pageRef.current;
    if (!page || !window.matchMedia) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;

    const sync = () => {
      observer?.disconnect();
      page.removeAttribute("data-rhc-motion");
      if (motion.matches || typeof window.IntersectionObserver !== "function") return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.07, rootMargin: "0px 0px -16px 0px" },
      );
      page.setAttribute("data-rhc-motion", "ready");
      page.querySelectorAll("[data-rhc-reveal]").forEach((element) => {
        if (!element.classList.contains("is-revealed")) observer.observe(element);
      });
    };

    sync();
    if (motion.addEventListener) motion.addEventListener("change", sync);
    else motion.addListener(sync);
    return () => {
      observer?.disconnect();
      page.removeAttribute("data-rhc-motion");
      if (motion.removeEventListener) motion.removeEventListener("change", sync);
      else motion.removeListener(sync);
    };
  }, [pageRef]);
}

function AppointmentButton({ light = false }) {
  return (
    <Link
      to="/contact"
      className={`rhc-about-page__button ${light ? "rhc-about-page__button--white" : "rhc-about-page__button--primary"}`}
    >
      <CalendarCheck size={21} strokeWidth={1.8} aria-hidden="true" />
      <span>Book Appointment</span>
      <ArrowRight className="rhc-about-page__button-arrow" size={19} aria-hidden="true" />
    </Link>
  );
}

function ContactButton({ whatsapp = false }) {
  const Icon = whatsapp ? MessageCircle : Phone;
  const text = whatsapp ? "WhatsApp" : "Call Now";
  const number = whatsapp ? whatsappNumber : phoneNumber;
  const className = `rhc-about-page__contact-button${whatsapp ? " rhc-about-page__contact-button--whatsapp" : ""}`;
  const content = <><Icon size={19} strokeWidth={1.8} aria-hidden="true" /><span>{text}</span></>;

  if (!number) {
    return <Link to="/contact" className={className} title="View Royal Health Care contact details">{content}</Link>;
  }

  return (
    <a
      className={className}
      href={whatsapp ? `https://wa.me/${number}?text=${encodeURIComponent("Hello Royal Health Care, I would like to know more about your services.")}` : `tel:+${number}`}
      target={whatsapp ? "_blank" : undefined}
      rel={whatsapp ? "noopener noreferrer" : undefined}
      aria-label={whatsapp ? "Contact Royal Health Care on WhatsApp (opens in a new tab)" : "Call Royal Health Care"}
    >
      {content}
    </a>
  );
}

export default function About() {
  const pageRef = useRef(null);
  const headingId = useId();
  useNavigationOffset(pageRef);
  usePageReveals(pageRef);

  return (
    <article ref={pageRef} className="rhc-about-page" aria-labelledby={headingId}>
      <section className="rhc-about-page__hero" aria-labelledby={headingId}>
        <div className="rhc-about-page__hero-media" aria-hidden="true">
          <img src={doctorsImage} alt="" width="1774" height="887" fetchPriority="high" />
          <div className="rhc-about-page__trust-badge">
            <span><Heart size={25} strokeWidth={1.6} /></span>
            <div><strong>Care You Can Trust</strong><small>People at the heart of care</small></div>
          </div>
        </div>

        <div className="rhc-about-page__container rhc-about-page__hero-inner">
          <nav className="rhc-about-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">About</span>
          </nav>

          <div className="rhc-about-page__hero-copy">
            <p className="rhc-about-page__eyebrow rhc-about-page__eyebrow--pill" data-rhc-reveal>
              <Heart size={17} strokeWidth={1.7} aria-hidden="true" />
              ABOUT ROYAL HEALTH CARE
            </p>
            <h1 id={headingId} className="rhc-about-page__title" data-rhc-reveal style={{ "--rhc-delay": "55ms" }}>
              Compassion at heart.<br />
              <span className="rhc-about-page__gradient">Excellence in care.</span>
            </h1>
            <p className="rhc-about-page__hero-description" data-rhc-reveal style={{ "--rhc-delay": "105ms" }}>
              Professional healthcare with a personal touch. We bring together
              consultations, online support and care at home to help you feel
              supported at every step.
            </p>
            <div className="rhc-about-page__hero-actions" data-rhc-reveal style={{ "--rhc-delay": "155ms" }}>
              <AppointmentButton />
              <Link to="/services" className="rhc-about-page__button rhc-about-page__button--outline">
                <span>Explore Services</span><ArrowRight size={19} aria-hidden="true" />
              </Link>
            </div>
            <p className="rhc-about-page__signature" data-rhc-reveal style={{ "--rhc-delay": "190ms" }}>Your Health, Our Priority.</p>
          </div>
        </div>
      </section>

      <div className="rhc-about-page__service-band">
        <ul className="rhc-about-page__container rhc-about-page__service-grid" aria-label="Our healthcare services">
          {careServices.map(({ icon: Icon, title }) => (
            <li key={title}><Icon size={35} strokeWidth={1.5} aria-hidden="true" /><span>{title}</span></li>
          ))}
        </ul>
      </div>

      <div className="rhc-about-page__container">
        <section className="rhc-about-page__story" aria-labelledby={`${headingId}-story`}>
          <figure className="rhc-about-page__portrait" data-rhc-reveal>
            <img src={doctorsImage} alt="Male and female healthcare professionals in white medical coats at a modern hospital." width="1774" height="887" loading="lazy" decoding="async" />
            <figcaption className="rhc-about-page__photo-caption">
              <span><Heart size={25} strokeWidth={1.7} aria-hidden="true" /></span>
              <strong>Care that puts you first.</strong>
            </figcaption>
          </figure>

          <div className="rhc-about-page__story-copy" data-rhc-reveal style={{ "--rhc-delay": "80ms" }}>
            <p className="rhc-about-page__eyebrow">WHO WE ARE</p>
            <h2 id={`${headingId}-story`} className="rhc-about-page__heading">
              Healthcare built<br /><span className="rhc-about-page__gradient">around you.</span>
            </h2>
            <p>At Royal Health Care, we believe good care begins with understanding you.</p>
            <p>From doctor consultations to professional home care, our approach brings attention, compassion and clear communication to your healthcare experience.</p>
            <ul className="rhc-about-page__care-points">
              <li><Check size={15} strokeWidth={2.5} aria-hidden="true" /><span>Care guided by your needs</span></li>
              <li><Check size={15} strokeWidth={2.5} aria-hidden="true" /><span>Clear guidance at every step</span></li>
            </ul>
            <Link to="/services" className="rhc-about-page__text-link">Explore Our Services<ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="rhc-about-page__purpose" aria-labelledby={`${headingId}-purpose`}>
          <header data-rhc-reveal>
            <p className="rhc-about-page__eyebrow">OUR PURPOSE</p>
            <h2 id={`${headingId}-purpose`} className="rhc-about-page__heading">
              One purpose. <span>Your <span className="rhc-about-page__gradient">wellbeing.</span></span>
            </h2>
          </header>
          <div className="rhc-about-page__purpose-grid">
            {purposeCards.map(({ icon: Icon, title, description }, index) => (
              <div key={title} data-rhc-reveal style={{ "--rhc-delay": `${index * 70}ms` }}>
                <article className="rhc-about-page__purpose-card">
                  <span className="rhc-about-page__purpose-icon"><Icon size={34} strokeWidth={1.65} aria-hidden="true" /></span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              </div>
            ))}
          </div>

          <ul className="rhc-about-page__values" aria-label="Why choose Royal Health Care" data-rhc-reveal>
            {values.map(({ icon: Icon, title }) => (
              <li key={title}><Icon size={29} strokeWidth={1.6} aria-hidden="true" /><span>{title}</span></li>
            ))}
          </ul>
        </section>

        <section className="rhc-about-page__contact-banner" aria-labelledby={`${headingId}-contact`} data-rhc-reveal>
          <div className="rhc-about-page__contact-copy">
            <h2 id={`${headingId}-contact`}>Let’s care for your<br /><span>health, together.</span></h2>
            <p>Take the next step with Royal Health Care.</p>
          </div>
          <div className="rhc-about-page__contact-actions">
            <AppointmentButton light />
            <div className="rhc-about-page__contact-options"><ContactButton /><ContactButton whatsapp /></div>
          </div>
        </section>
      </div>
    </article>
  );
}

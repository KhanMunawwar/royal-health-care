import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CalendarCheck, Check, ChevronRight, FlaskConical, HeartPulse,
  House, MessageCircle, Pill, Plus, Scissors, Sparkles, Stethoscope,
  UserRound, Video, Weight, X,
} from "lucide-react";

import heroImage from "../assets/images/services-hero.png";
import doctorImage from "../assets/images/doctor-consultation.png";
import onlineImage from "../assets/images/online-consultation.png";
import homeCareImage from "../assets/images/home-care.png";
import labImage from "../assets/images/lab-tests.png";
import pharmacyImage from "../assets/images/pharmacy.png";
import skinImage from "../assets/images/skin-care.png";
import hairImage from "../assets/images/hair-care.png";
import weightImage from "../assets/images/weight-loss.png";
import telehealthImage from "../assets/images/telehealth-banner.png";
import "./Services.css";
import "./Services_Polish.css";

const services = [
  {
    id: "doctor-consultation",
    image: doctorImage,
    title: "Doctor Consultation",
    category: "CONSULTATION",
    icon: Stethoscope,
    description: "Discuss your health concerns and next steps.",
    details: "Ask about consultation options for your concerns, follow-up needs or general health questions.",
    points: ["Discuss symptoms and health history", "Understand suggested next steps", "Ask about follow-up care"],
  },
  {
    id: "online-consultation",
    image: onlineImage,
    title: "Online Consultation",
    category: "CONSULTATION",
    icon: Video,
    description: "Explore consultation options from home.",
    details: "Ask about remote consultation options for your concerns. Our team can discuss availability, how to connect and whether an in-person visit may be needed.",
    points: ["Share your concerns and relevant history", "Check appointment availability", "Confirm how to join the consultation"],
  },
  {
    id: "home-care",
    image: homeCareImage,
    title: "Home Care",
    category: "CARE AT HOME",
    icon: House,
    description: "Care options in the comfort of familiar surroundings.",
    details: "Tell us what support you need at home. Our team can discuss suitability, available services and scheduling.",
    points: ["Discuss the care you need", "Check coverage in your area", "Ask about visit arrangements"],
  },
  {
    id: "lab-tests",
    image: labImage,
    title: "Lab Tests",
    category: "DIAGNOSTICS",
    icon: FlaskConical,
    description: "Ask about testing, preparation and reports.",
    details: "Share the test requested by your clinician and ask about availability, preparation, collection options and report timelines.",
    points: ["Check the requested test", "Confirm preparation instructions", "Ask how reports are shared"],
  },
  {
    id: "pharmacy",
    image: pharmacyImage,
    title: "Pharmacy",
    category: "PHARMACY",
    icon: Pill,
    description: "Enquire about medicines and availability.",
    details: "Contact us with your medicine enquiry. Ask about availability, any prescription required, and the next steps for your request.",
    points: ["Check medicine availability", "Confirm prescription requirements", "Ask about collection options"],
  },
  {
    id: "skin-care",
    image: skinImage,
    title: "Skin Care",
    category: "SKIN & WELLNESS",
    icon: Sparkles,
    description: "Consultation for your individual skin concerns.",
    details: "Discuss your skin concerns, current routine and previous treatments to understand appropriate assessment and care options.",
    points: ["Discuss your skin concerns", "Review your existing routine", "Explore appropriate care options"],
  },
  {
    id: "hair-care",
    image: hairImage,
    title: "Hair Care",
    category: "HAIR & SCALP",
    icon: Scissors,
    description: "Explore support for hair and scalp concerns.",
    details: "Ask about an assessment of hair or scalp concerns, including relevant history and possible next steps.",
    points: ["Discuss hair and scalp changes", "Share your health and care history", "Ask about assessment options"],
  },
  {
    id: "weight-loss",
    image: weightImage,
    title: "Weight Loss",
    category: "WELLBEING",
    icon: Weight,
    description: "Support around your health, habits and goals.",
    details: "Discuss your goals and health history to understand suitable support. Care should be tailored to your needs and circumstances.",
    points: ["Talk about your individual goals", "Discuss daily habits and health history", "Explore suitable support options"],
  },
];

/** Progressive enhancement: content is visible without animation support. */
function useServiceReveals(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.matchMedia || !("IntersectionObserver" in window)) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(section.querySelectorAll("[data-service-reveal]"));
    let observer;

    const sync = () => {
      observer?.disconnect();
      section.removeAttribute("data-service-motion");
      if (motion.matches) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          target.classList.add("is-visible");
          observer.unobserve(target);
        });
      }, { threshold: 0.08 });

      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        // Keep already-visible content visible when the component mounts.
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          element.classList.add("is-visible");
        }
        if (!element.classList.contains("is-visible")) observer.observe(element);
      });
      section.setAttribute("data-service-motion", "ready");
    };

    sync();
    if (motion.addEventListener) motion.addEventListener("change", sync);
    else motion.addListener(sync);

    return () => {
      observer?.disconnect();
      section.removeAttribute("data-service-motion");
      if (motion.removeEventListener) motion.removeEventListener("change", sync);
      else motion.removeListener(sync);
    };
  }, [sectionRef]);
}

const highlights = [
  { icon: Stethoscope, title: "Consultations", text: "A conversation about your health and your next steps." },
  { icon: House, title: "Home Care", text: "Explore support in the comfort of familiar surroundings." },
  { icon: HeartPulse, title: "Everyday Health", text: "Find options for your ongoing health and wellbeing." },
];

const reasons = [
  { icon: CalendarCheck, title: "Convenient access", text: "Explore your care options in one place." },
  { icon: UserRound, title: "Your needs come first", text: "Start with your questions, comfort and goals." },
  { icon: House, title: "Online & home care options", text: "Ask about care in a setting that suits you." },
  { icon: HeartPulse, title: "A connected approach", text: "Understand the next step in your care." },
];

const steps = [
  { icon: Stethoscope, title: "Choose a service", text: "Explore the care options that fit your needs." },
  { icon: CalendarCheck, title: "Request an appointment", text: "Contact our team to check availability." },
  { icon: MessageCircle, title: "Connect with care", text: "Confirm the details and discuss your concerns." },
  { icon: HeartPulse, title: "Plan your next step", text: "Ask about guidance and follow-up options." },
];

function Eyebrow({ children }) {
  return <p className="rhc-services__eyebrow"><span aria-hidden="true" />{children}</p>;
}

function HealthcareServiceCard({ service, onReadMore, dialogId }) {
  const Icon = service.icon;
  return (
    <article className={`rhc-services__card rhc-services__card--${service.id}`}>
      <img className="rhc-services__card-image" src={service.image} alt="" loading="lazy" decoding="async" />
      <div className="rhc-services__card-content">
        <span className="rhc-services__card-icon" aria-hidden="true"><Icon size={29} strokeWidth={1.65} /></span>
        <div className="rhc-services__card-copy">
          <p className="rhc-services__category">{service.category}</p>
          <h3>{service.title}</h3>
          <p className="rhc-services__description">{service.description}</p>
          <button
            type="button"
            className="rhc-services__read-more"
            onClick={(event) => onReadMore(service, event.currentTarget)}
            aria-haspopup="dialog"
            aria-controls={dialogId}
          >
            <span>Read More<span className="rhc-services__sr-only"> about {service.title}</span></span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ServicesSection({ headingLevel = 2 }) {
  const sectionRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const headingId = useId();
  const gridHeadingId = useId();
  const dialogId = useId();
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const Heading = headingLevel === 1 ? "h1" : "h2";
  useServiceReveals(sectionRef);

  useEffect(() => {
    if (!selectedService) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!dialog) return;

    const oldOverflow = document.body.style.overflow;
    const oldPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPadding = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;
    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = oldOverflow;
      document.body.style.paddingRight = oldPadding;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [selectedService]);

  const openDetails = (service, trigger) => {
    triggerRef.current = trigger;
    setSelectedService(service);
  };
  const closeDetails = () => setSelectedService(null);
  const SelectedIcon = selectedService?.icon;

  return (
    <section ref={sectionRef} className="rhc-services" aria-labelledby={headingId}>
      <header className="rhc-services__hero">
        <img className="rhc-services__hero-image" src={heroImage} alt="" fetchPriority="high" decoding="async" />
        <div className="rhc-services__container rhc-services__hero-inner">
          <nav className="rhc-services__breadcrumb" aria-label="Breadcrumb">
            <ol><li><Link to="/">Home</Link></li><li><ChevronRight size={12} aria-hidden="true" /><span aria-current="page">Services</span></li></ol>
          </nav>
          <div className="rhc-services__hero-copy" data-service-reveal>
            <Eyebrow>OUR SERVICES</Eyebrow>
            <Heading id={headingId}>Healthcare Designed<br /><span>Around You.</span></Heading>
            <p className="rhc-services__lead">Explore consultations, home care and everyday healthcare in one convenient place.</p>
            <div className="rhc-services__actions">
              <a className="rhc-services__button rhc-services__button--white" href={`#${gridHeadingId}`}>Explore Services<ArrowRight size={19} aria-hidden="true" /></a>
              <Link className="rhc-services__button rhc-services__button--outline" to="/contact">Contact Us</Link>
            </div>
          </div>
          <span className="rhc-services__hero-badge"><span aria-hidden="true"><House size={21} /></span>Care around you</span>
          <Plus className="rhc-services__hero-cross rhc-services__hero-cross--one" size={37} aria-hidden="true" />
          <Plus className="rhc-services__hero-cross rhc-services__hero-cross--two" size={24} aria-hidden="true" />
        </div>
      </header>

      <div className="rhc-services__container">
        <section className="rhc-services__intro" aria-label="What we offer" data-service-reveal>
          <div className="rhc-services__intro-copy">
            <Eyebrow>WHAT WE OFFER</Eyebrow>
            <h2>Complete Care.<br /><span>One Trusted Platform.</span></h2>
            <p>Healthcare options that fit your needs,<br className="rhc-services__desktop-break" /> your routine and your life.</p>
          </div>
          <ul className="rhc-services__highlights">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title}><span aria-hidden="true"><Icon size={30} strokeWidth={1.6} /></span><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ul>
        </section>

        <section className="rhc-services__collection" aria-labelledby={gridHeadingId}>
          <div className="rhc-services__collection-heading" data-service-reveal>
            <Eyebrow>FIND YOUR CARE</Eyebrow>
            <h2 id={gridHeadingId} tabIndex={-1}>Explore Our Healthcare Services</h2>
            <p className="rhc-services__section-note">A thoughtful next step for every care need.</p>
          </div>
          <ul className="rhc-services__grid">
            {services.map((service, index) => (
              <li key={service.id} className={`rhc-services__item rhc-services__item--${service.id}`} data-service-reveal style={{ "--service-delay": `${(index % 3) * 65}ms` }}>
                <HealthcareServiceCard service={service} onReadMore={openDetails} dialogId={dialogId} />
              </li>
            ))}
          </ul>
        </section>

        <aside className="rhc-services__contact-strip" data-service-reveal>
          <span className="rhc-services__contact-icon" aria-hidden="true"><HeartPulse size={37} strokeWidth={1.5} /></span>
          <div><h3>Not sure where to start?</h3><p>Let’s explore your options and find the right next step together.</p></div>
          <Link to="/contact" className="rhc-services__contact-link"><span>Talk to our team</span><ArrowRight size={18} aria-hidden="true" /></Link>
        </aside>

        <section className="rhc-services__online" aria-label="Online consultation" data-service-reveal>
          <div className="rhc-services__online-visual">
            <img src={telehealthImage} alt="Illustration of a doctor consultation on a laptop at home" loading="lazy" decoding="async" width="1200" height="675" />
            <span className="rhc-services__online-badge"><Video size={20} aria-hidden="true" />A conversation, closer to home</span>
          </div>
          <div className="rhc-services__online-copy">
            <Eyebrow>ONLINE CONSULTATION</Eyebrow>
            <h2>Healthcare From<br />Wherever <span>You Are.</span></h2>
            <p>Explore remote care options that fit into your day.</p>
            <ul className="rhc-services__checklist">
              {["Discuss your concerns from home", "Ask about available consultation times", "Understand your next steps"].map((point) => <li key={point}><Check size={13} strokeWidth={3} aria-hidden="true" /><span>{point}</span></li>)}
            </ul>
            <Link to="/online-consultation" className="rhc-services__button rhc-services__button--blue">Explore Online Care<ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="rhc-services__why" aria-label="Why Royal Health Care" data-service-reveal>
          <div className="rhc-services__why-heading">
            <Eyebrow>WHY ROYAL HEALTH CARE</Eyebrow>
            <h2>Care That Fits<br /><span>Your Life.</span></h2>
            <HeartPulse className="rhc-services__why-heart" size={160} strokeWidth={0.9} aria-hidden="true" />
          </div>
          <ul className="rhc-services__reasons">
            {reasons.map(({ icon: Icon, title, text }) => <li key={title}><Icon size={24} strokeWidth={1.6} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></li>)}
          </ul>
        </section>

        <section className="rhc-services__process" aria-label="How it works" data-service-reveal>
          <Eyebrow>A SIMPLE START</Eyebrow>
          <h2>How It Works</h2>
          <ol className="rhc-services__steps">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title}><span className="rhc-services__step-icon" aria-hidden="true"><Icon size={28} strokeWidth={1.6} /></span><div><span className="rhc-services__step-number" aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{text}</p></div></li>
            ))}
          </ol>
        </section>

        <aside className="rhc-services__final-cta" data-service-reveal>
          <div><h2>Ready To Take the Next Step<br /><span>in Your Healthcare Journey?</span></h2><p>Explore services and connect with the care option that fits your needs.</p></div>
          <div className="rhc-services__actions">
            <Link className="rhc-services__button rhc-services__button--white" to="/contact"><CalendarCheck size={19} aria-hidden="true" />Book an Appointment<ArrowRight size={18} aria-hidden="true" /></Link>
            <Link className="rhc-services__button rhc-services__button--outline" to="/contact">Contact Us</Link>
          </div>
          <Plus className="rhc-services__cta-cross" size={44} aria-hidden="true" />
        </aside>
      </div>

      <dialog
        ref={dialogRef}
        id={dialogId}
        className="rhc-services__dialog"
        aria-labelledby={dialogTitleId}
        aria-describedby={selectedService ? dialogDescriptionId : undefined}
        onCancel={(event) => { event.preventDefault(); closeDetails(); }}
        onClick={(event) => { if (event.target === event.currentTarget) closeDetails(); }}
      >
        {selectedService && (
          <div className="rhc-services__dialog-inner">
            <div className="rhc-services__dialog-toolbar"><span>ROYAL HEALTH CARE</span><button type="button" onClick={closeDetails} aria-label="Close service details"><X size={22} aria-hidden="true" /></button></div>
            <div className="rhc-services__dialog-body">
              <span className="rhc-services__dialog-icon" aria-hidden="true"><SelectedIcon size={36} strokeWidth={1.5} /></span>
              <p className="rhc-services__dialog-eyebrow">CARE BUILT AROUND YOU</p>
              <h2 id={dialogTitleId}>{selectedService.title}</h2>
              <p id={dialogDescriptionId} className="rhc-services__dialog-description">{selectedService.details}</p>
              <ul className="rhc-services__dialog-points">{selectedService.points.map((point) => <li key={point}><Check size={17} strokeWidth={2} aria-hidden="true" /><span>{point}</span></li>)}</ul>
              <Link to="/contact" className="rhc-services__dialog-link" onClick={closeDetails}><span>Enquire about {selectedService.title}</span><ArrowRight size={19} aria-hidden="true" /></Link>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

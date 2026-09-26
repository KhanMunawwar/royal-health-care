import { Link } from "react-router-dom";
import "./HomeCare.css";

const imageBase = "/images/home-care";

const services = [
  {
    title: "Doctor Home Visit",
    description: "Consult a doctor in the comfort of your home.",
    image: "doctor-home-visit.png",
    icon: "stethoscope",
  },
  {
    title: "Nurse Visit",
    description: "Professional nursing support for your care needs.",
    image: "nurse-visit.png",
    icon: "nurse",
  },
  {
    title: "Injection",
    description: "At-home assistance with prescribed injections.",
    image: "injection.png",
    icon: "syringe",
  },
  {
    title: "Dressing",
    description: "Wound dressing support as advised by your clinician.",
    image: "dressing.png",
    icon: "bandage",
  },
  {
    title: "Elder Care",
    description: "Thoughtful support for everyday comfort and care.",
    image: "elder-care.png",
    icon: "person",
  },
  {
    title: "Post Hospital Care",
    description: "Support as you recover and settle back at home.",
    image: "post-hospital-care.png",
    icon: "bed",
  },
];
function Icon({ name, size = 27, className = "" }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M3.8 12h4l1.6-3 3 6 1.7-3h6" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2H3Zm14-14a3 3 0 0 1 0 6m2 8v-2a6 6 0 0 0-3-5.2" /></>,
    stethoscope: <><path d="M5 3v8a5 5 0 0 0 10 0V3M3 3h4m6 0h4M10 16v1a5 5 0 0 0 10 0v-3" /><circle cx="20" cy="12" r="2" /></>,
    nurse: <><path d="M7 3h10l-1 5H8L7 3Zm5 5v4m-5 9h10a2 2 0 0 0 2-2 7 7 0 0 0-14 0 2 2 0 0 0 2 2Z" /><path d="M10 5h4" /></>,
    syringe: <><path d="m4 20 7-7m2-2 7-7m-9 5 4 4m2-10 4 4M3 21l3-1-2-2-1 3Zm5-7 2 2" /></>,
    bandage: <><rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-45 12 12)" /><path d="m9 10 5 5m-4 0 5-5" /></>,
    person: <><circle cx="12" cy="7" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2H5Zm3-8 4 2 4-2" /></>,
    bed: <><path d="M3 20V5m18 15V9M3 15h18v4H3v-4Zm2-5h5a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Zm7 2h6a3 3 0 0 1 3 3h-9v-3Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5" /></>,
    chat: <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-3.5-.7L3 21l1.7-5.6a8.5 8.5 0 1 1 16.3-3.9Z" /><path d="M8 11h8m-8 4h5" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
    phone: <><path d="M5 3h4l2 5-2 2a15 15 0 0 0 5 5l2-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" /></>,
  };
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Eyebrow({ children }) {
  return <p className="hc-eyebrow"><span aria-hidden="true" />{children}</p>;
}

export default function HomeCare() {
  const phone = import.meta.env.VITE_CONTACT_PHONE?.replace(/[^\d+]/g, "");
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "");

  return (
    <main className="home-care">
      <section className="hc-hero" aria-labelledby="hc-title">
        <div className="hc-hero-photo" aria-hidden="true" />
        <div className="hc-container hc-hero-inner">
          <nav className="hc-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Home Care</span></nav>
          <div className="hc-hero-copy">
            <Eyebrow>Care at your doorstep</Eyebrow>
            <h1 id="hc-title">Home Care<br /><span>Services</span></h1>
            <p>Expert healthcare support at your doorstep for comfort, recovery, and peace of mind.</p>
            <div className="hc-actions">
              <a className="hc-button hc-button-white" href="#services">Explore Home Care <Icon name="arrow" size={18} /></a>
              <Link className="hc-button hc-button-outline" to="/contact">Contact Us</Link>
            </div>
          </div>
          <div className="hc-hero-note"><Icon name="home" size={21} />Care in the comfort of home</div>
        </div>
      </section>

      <section className="hc-intro hc-container" aria-label="About home care">
        <div>
          <Eyebrow>Home care, made personal</Eyebrow>
          <h2>Professional Care.<br /><span>Familiar Surroundings.</span></h2>
          <p>Explore healthcare support at home, shaped around your care needs and everyday comfort.</p>
        </div>
        <div className="hc-benefits">
          {[
            ["home", "Home Visits", "Doctor and nursing support."],
            ["heart", "Recovery Support", "Help after a hospital stay."],
            ["users", "Everyday Care", "Thoughtful support at home."],
          ].map(([icon, title, description]) => (
            <div className="hc-benefit" key={title}><span className="hc-round-icon"><Icon name={icon} /></span><strong>{title}</strong><p>{description}</p></div>
          ))}
        </div>
      </section>

      <section className="hc-services hc-container" id="services" aria-labelledby="hc-services-title">
        <div className="hc-section-heading"><Eyebrow>Explore home care</Eyebrow><h2 id="hc-services-title">The Right Care, Right at Home.</h2><p>Find the service that fits your needs.</p></div>
        <div className="hc-service-grid">
          {services.map((service) => (
            <article className="hc-service-card" key={service.title} style={{ "--hc-card-image": `url("${imageBase}/${service.image}")` }}>
              <span className="hc-card-icon"><Icon name={service.icon} /></span>
              <div className="hc-card-content"><h3>{service.title}</h3><p>{service.description}</p><Link to={`/contact?service=${encodeURIComponent(service.title)}`} aria-label={`Enquire about ${service.title}`}>Explore Service <Icon name="arrow" size={17} /></Link></div>
            </article>
          ))}
        </div>
        <div className="hc-help-strip"><span className="hc-help-icon"><Icon name="heart" size={34} /></span><div><strong>Not sure which service you need?</strong><p>Talk to our team about your home care needs.</p></div><Link className="hc-button hc-button-white" to="/contact">Get in Touch <Icon name="arrow" size={17} /></Link></div>
      </section>

      <section className="hc-feature hc-container" aria-labelledby="hc-feature-title">
        <div className="hc-feature-image" role="img" aria-label="Nurse supporting an older person at home" />
        <div className="hc-feature-copy"><Eyebrow>Care that comes to you</Eyebrow><h2 id="hc-feature-title">Comfort at Home.<br /><span>Support Along the Way.</span></h2><p>Discuss the home care options that suit your needs and routine.</p><ul><li><Icon name="check" />Doctor and nurse visits</li><li><Icon name="check" />Everyday care and recovery support</li><li><Icon name="check" />Care in familiar surroundings</li></ul><Link className="hc-button hc-button-primary" to="/contact">Discuss Your Care <Icon name="arrow" size={18} /></Link></div>
      </section>

      <section className="hc-values hc-container" aria-labelledby="hc-values-title">
        <div><Eyebrow>Why Royal Health Care</Eyebrow><h2 id="hc-values-title">Care That Fits<br /><span>Your Life.</span></h2></div>
        <div className="hc-value-list">
          {[
            ["home", "Familiar Surroundings", "Receive support where you feel comfortable."],
            ["person", "Personal Care Needs", "Talk through the assistance you require."],
            ["calendar", "Home Visit Options", "Explore doctor and nursing visits."],
            ["heart", "Continued Support", "Plan the next steps in your care."],
          ].map(([icon, title, description]) => <div className="hc-value" key={title}><Icon name={icon} size={23} /><strong>{title}</strong><span>{description}</span></div>)}
        </div>
      </section>

      <section className="hc-steps hc-container" aria-labelledby="hc-steps-title"><Eyebrow>How it works</Eyebrow><h2 id="hc-steps-title">Arrange Care in a Few Simple Steps</h2><div className="hc-step-grid">
        {[
          ["stethoscope", "01", "Choose a Service", "Explore our home care services."],
          ["chat", "02", "Contact Our Team", "Get in touch to discuss your needs."],
          ["calendar", "03", "Arrange Your Visit", "We'll plan a suitable time for your home visit."],
          ["home", "04", "Receive Care at Home", "Get the support you need, at home."],
        ].map(([icon, number, title, description]) => <div className="hc-step" key={number}><span className="hc-step-icon"><Icon name={icon} /></span><div><b>{number}</b><strong>{title}</strong><p>{description}</p></div></div>)}
      </div></section>

      <section className="hc-bottom-cta hc-container" aria-labelledby="hc-cta-title"><div><h2 id="hc-cta-title">Book Trusted <span>Home Care Today</span></h2><p>Tell us what you need. Contact our team to discuss services and arrange a home visit.</p></div><div className="hc-cta-actions">{whatsapp ? <a className="hc-button hc-button-white" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello, I would like to enquire about Royal Health Care home care services.")}`} target="_blank" rel="noopener noreferrer">WhatsApp Now <Icon name="arrow" size={18} /></a> : <Link className="hc-button hc-button-white" to="/contact">Contact Our Team <Icon name="arrow" size={18} /></Link>}{phone ? <a className="hc-button hc-button-outline" href={`tel:${phone}`}><Icon name="phone" size={19} /> Call Now</a> : <Link className="hc-button hc-button-outline" to="/contact"><Icon name="phone" size={19} /> Request a Call</Link>}<small>Enquire about availability</small></div></section>
    </main>
  );
}

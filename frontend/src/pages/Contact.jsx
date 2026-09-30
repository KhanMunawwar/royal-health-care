import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import contactHero from "../assets/images/contact-hero.png";
import {
  CONTACT_SERVICES,
  normalizeContactPayload,
  submitContactRequest,
  validateContactForm,
} from "../services/contactServices.js";
import "./Contact.css";

// Add VERIFIED business details here once. Empty values deliberately disable
// call/email/WhatsApp actions instead of linking to a fake or personal contact.
const CONTACT = {
  phone: "", // Example format only: +91 followed by 10 digits
  whatsapp: "", // Official WhatsApp Business number, with country code
  email: "", // Official business inbox
  address: "", // Full verified street address
  area: "Bhusawal, Maharashtra",
  mapQuery: "Bhusawal, Maharashtra, India",
  verifiedLocation: false, // Change only after setting the exact mapQuery/address
  hours: [
    { day: "Monday – Saturday", time: "To be confirmed" },
    { day: "Sunday", time: "To be confirmed" },
  ],
};

// Local SVG icons: no additional icon package is needed.
const ICONS = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  message: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      <path d="M8 11h.01M12 11h.01M16 11h.01" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </>
  ),
  chevron: <path d="m8 10 4 4 4-4" />,
  plus: <path d="M12 5v14M5 12h14" />,
  shield: (
    <>
      <path d="m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7l8-4Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 3v4m10-4v4M3 11h18m-12 5 2 2 4-4" />
    </>
  ),
  lightning: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
  heart: (
    <>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3 12h5l2-4 3 8 2-4h6" />
    </>
  ),
  headset: (
    <>
      <path d="M3 14v-3a9 9 0 0 1 18 0v6a4 4 0 0 1-4 4h-3" />
      <rect x="2" y="11" width="4" height="7" rx="2" />
      <rect x="18" y="11" width="4" height="7" rx="2" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M4 3v6a5 5 0 0 0 10 0V3M3 3h3m6 0h3M9 14v2a5 5 0 0 0 10 0v-2" />
      <circle cx="19" cy="11" r="3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6m0-10h.01" />
    </>
  ),
  whatsapp: (
    <>
      <path
        d="M20.3 3.7A11.6 11.6 0 0 0 2 17.7L.4 23.6l6.1-1.6A11.6 11.6 0 0 0 20.3 3.7ZM12 21a9.4 9.4 0 0 1-4.8-1.3l-.4-.2-3.6.9 1-3.5-.2-.4A9.6 9.6 0 1 1 12 21Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M8.2 6.7c-.3-.7-.6-.7-.9-.7H6.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.3 3.5 5.6 4.8.8.3 1.4.5 1.8.6.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4l-2.2-1.1c-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8 8 0 0 1-2.6-1.6 9.7 9.7 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2.1-.4 0-.6l-.9-2.2Z"
        transform="translate(2 1) scale(.8)"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
};

function Icon({ name, className = "", ...props }) {
  return (
    <svg
      className={`rhc-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {ICONS[name] || ICONS.message}
    </svg>
  );
}

function Action({
  href,
  children,
  className = "",
  external = false,
  unavailable = "Official business contact will be added soon.",
}) {
  if (!href)
    return (
      <button type="button" className={className} disabled title={unavailable}>
        {children}
      </button>
    );
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function SectionTitle({ label, title, description, centered = false }) {
  return (
    <div className={`rhc-section-title${centered ? " rhc-center" : ""}`}>
      <span className="rhc-eyebrow">
        <span />
        {label}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function FormField({ id, label, icon, error, children, wide = false }) {
  return (
    <div
      className={`rhc-field${wide ? " rhc-field-wide" : ""}${error ? " rhc-field-invalid" : ""}`}
    >
      <label htmlFor={id}>
        {label}{" "}
        <span className="rhc-required" aria-hidden="true">
          *
        </span>
      </label>
      <div className="rhc-input-wrap">
        <Icon name={icon} />
        {children}
      </div>
      {error && (
        <span className="rhc-field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};
const FIELD_ORDER = Object.keys(EMPTY_FORM);

function ContactForm() {
  const prefix = useId();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  const pendingRef = useRef(false);
  const controllerRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, []);

  function update(event) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    setResult(null);
    if (touched[name])
      setErrors((previous) => ({
        ...previous,
        [name]: validateContactForm(next)[name],
      }));
  }

  function blur(event) {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
    setErrors((previous) => ({
      ...previous,
      [name]: validateContactForm(values)[name],
    }));
  }

  function fieldProps(name) {
    return {
      id: `${prefix}-${name}`,
      name,
      value: values[name],
      onChange: update,
      onBlur: blur,
      required: true,
      disabled: busy,
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `${prefix}-${name}-error` : undefined,
    };
  }

  async function submit(event) {
    event.preventDefault();
    if (pendingRef.current) return;
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELD_ORDER.map((name) => [name, true])));
    setResult(null);
    const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      formRef.current?.elements.namedItem(firstInvalid)?.focus();
      setResult({
        mode: "error",
        message: "Please check the highlighted fields below.",
      });
      return;
    }
    pendingRef.current = true;
    setBusy(true);
    controllerRef.current = new AbortController();
    try {
      const response = await submitContactRequest(
        {
          ...normalizeContactPayload(values),
          source: "contact-page",
          submittedAt: new Date().toISOString(),
        },
        { signal: controllerRef.current.signal },
      );
      if (!mountedRef.current) return;
      setResult(response);
      // The demo response is never delivered, so preserve the user's entries.
      if (response.delivered === true) {
        setValues(EMPTY_FORM);
        setTouched({});
        setErrors({});
      }
    } catch (error) {
      if (error.name !== "AbortError" && mountedRef.current)
        setResult({
          mode: "error",
          message:
            "Your message could not be sent. Your entries have been kept. Please try again later.",
        });
    } finally {
      pendingRef.current = false;
      if (mountedRef.current) setBusy(false);
    }
  }

  return (
    <div className="rhc-form-card">
      <SectionTitle
        label="SEND US A MESSAGE"
        title="How Can We Help You?"
        description="Tell us what you need. Let’s make your next step easier."
      />
      <div className="rhc-demo-note">
        <Icon name="info" />
        <span>
          <strong>Preview mode.</strong> Messages are not sent or saved yet.
          Please use sample details.
        </span>
      </div>
      <form
        ref={formRef}
        className="rhc-form"
        onSubmit={submit}
        noValidate
        aria-label="Contact Royal Health Care"
        aria-busy={busy}
      >
        <p className="rhc-required-note">All fields marked * are required.</p>
        <div className="rhc-form-grid">
          <FormField
            id={`${prefix}-fullName`}
            label="Full Name"
            icon="user"
            error={errors.fullName}
          >
            <input
              {...fieldProps("fullName")}
              type="text"
              autoComplete="name"
              maxLength={100}
              placeholder="Your full name"
            />
          </FormField>
          <FormField
            id={`${prefix}-phone`}
            label="Phone Number"
            icon="phone"
            error={errors.phone}
          >
            <input
              {...fieldProps("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={24}
              placeholder="+91 XXXXX XXXXX"
            />
          </FormField>
          <FormField
            id={`${prefix}-email`}
            label="Email Address"
            icon="mail"
            error={errors.email}
          >
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder="you@example.com"
            />
          </FormField>
          <FormField
            id={`${prefix}-service`}
            label="Select Service"
            icon="stethoscope"
            error={errors.service}
          >
            <select {...fieldProps("service")}>
              <option value="">Choose a service</option>
              {CONTACT_SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <Icon name="chevron" className="rhc-select-arrow" />
          </FormField>
          <FormField
            id={`${prefix}-message`}
            label="Message"
            icon="message"
            error={errors.message}
            wide
          >
            <textarea
              {...fieldProps("message")}
              rows={5}
              maxLength={2000}
              placeholder="Tell us about the service you’re looking for…"
            />
          </FormField>
        </div>
        <div className="rhc-message-help">
          <span>
            Please don’t include medical records or sensitive health
            information.
          </span>
          <span>{values.message.length}/2000</span>
        </div>
        <div className="rhc-form-status" aria-live="polite" aria-atomic="true">
          {result && (
            <p className={`rhc-status rhc-status-${result.mode}`}>
              {result.message}
            </p>
          )}
        </div>
        <button
          className="rhc-button rhc-button-primary rhc-submit"
          type="submit"
          disabled={busy}
        >
          {busy ? (
            <>
              <span className="rhc-spinner" />
              Checking details…
            </>
          ) : (
            <>
              Send Message <Icon name="arrow" />
            </>
          )}
        </button>
        <p className="rhc-privacy">
          <Icon name="shield" />
          Demo only · Your details remain in this page.
        </p>
      </form>
    </div>
  );
}

const FAQS = [
  {
    icon: "message",
    question: "How quickly will your team contact me?",
    answer:
      "Contact requests will be reviewed during confirmed business hours once the enquiry system is live. This frontend preview does not send messages or arrange callbacks.",
  },
  {
    icon: "whatsapp",
    question: "Can I book a home visit through WhatsApp?",
    answer:
      "Once the official WhatsApp Business number is added, you can ask our team about home visits. A visit is only confirmed after the team checks availability and agrees the details with you.",
  },
  {
    icon: "pin",
    question: "Which areas do your home care services cover?",
    answer:
      "Please confirm service availability for your locality with the team. The map currently shows the Bhusawal area only; it does not confirm an exact clinic address or coverage boundary.",
  },
  {
    icon: "phone",
    question: "Can I contact you for an urgent healthcare requirement?",
    answer:
      "This contact form is not an emergency service and is not monitored continuously. In an emergency, contact local emergency services or go to the nearest emergency department. Do not wait for a reply here.",
  },
];

function ContactFaq() {
  const [open, setOpen] = useState(null);
  const prefix = useId();
  return (
    <section className="rhc-faq-section" aria-label="Contact questions">
      <SectionTitle label="NEED HELP?" title="Common Contact Questions" />
      <div className="rhc-faq-grid">
        {FAQS.map((item, index) => (
          <article
            key={item.question}
            className={`rhc-faq${open === index ? " rhc-faq-open" : ""}`}
          >
            <h3>
              <button
                id={`${prefix}-question-${index}`}
                type="button"
                aria-expanded={open === index}
                aria-controls={`${prefix}-answer-${index}`}
                onClick={() => setOpen(open === index ? null : index)}
              >
                <Icon name={item.icon} />
                <span>{item.question}</span>
                <Icon name="plus" className="rhc-faq-plus" />
              </button>
            </h3>
            <div
              id={`${prefix}-answer-${index}`}
              role="region"
              aria-labelledby={`${prefix}-question-${index}`}
              aria-hidden={open !== index}
              className="rhc-faq-answer"
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactMap({ mapsHref }) {
  const [loaded, setLoaded] = useState(false);
  const frameUrl = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&z=13&output=embed`;
  return (
    <section className="rhc-map-section" aria-label="Our location">
      <SectionTitle
        label="FIND US"
        title="Visit Royal Health Care."
        description={
          CONTACT.verifiedLocation
            ? "Find our address and plan your visit."
            : "Bhusawal area preview. Exact centre address will be confirmed."
        }
      />
      <div className="rhc-map">
        {loaded ? (
          <iframe
            src={frameUrl}
            title={
              CONTACT.verifiedLocation
                ? "Royal Health Care location on Google Maps"
                : "Bhusawal area on Google Maps — not a verified clinic pin"
            }
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="rhc-map-placeholder">
            <span className="rhc-map-big-pin">
              <Icon name="pin" />
            </span>
            <strong>A little closer to better care.</strong>
            <p>
              Load Google Maps to explore the{" "}
              {CONTACT.verifiedLocation ? "location" : "Bhusawal area"}.
            </p>
            <button
              type="button"
              className="rhc-button rhc-button-primary"
              onClick={() => setLoaded(true)}
            >
              Load Google Map <Icon name="arrow" />
            </button>
            <small>Loading the map connects to Google.</small>
          </div>
        )}
        <div className="rhc-map-card">
          <span className="rhc-icon-box">
            <Icon name="pin" />
          </span>
          <div>
            <strong>
              {CONTACT.verifiedLocation ? "Royal Health Care" : "Bhusawal area"}
            </strong>
            <p>
              {CONTACT.verifiedLocation
                ? CONTACT.address
                : "Exact centre location pending"}
            </p>
            <Action href={mapsHref} external className="rhc-text-link">
              {CONTACT.verifiedLocation
                ? "Get Directions"
                : "Explore on Google Maps"}
              <Icon name="arrow" />
            </Action>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  const formSectionRef = useRef(null);
  const phoneHref = CONTACT.phone
    ? `tel:${CONTACT.phone.replace(/[\s()-]/g, "")}`
    : "";
  const whatsappHref = CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`
    : "";
  const emailHref = CONTACT.email ? `mailto:${CONTACT.email}` : "";
  const mapsHref = `https://www.google.com/maps/${CONTACT.verifiedLocation ? "dir/?api=1&destination=" : "search/?api=1&query="}${encodeURIComponent(CONTACT.mapQuery)}`;
  const channels = [
    {
      icon: "phone",
      title: "Call Us",
      description: "Speak with our healthcare support team.",
      value: CONTACT.phone || "Official number to be added",
      action: "Call Now",
      href: phoneHref,
    },
    {
      icon: "whatsapp",
      title: "WhatsApp Us",
      description: "Ask about services and home care visits.",
      value: CONTACT.whatsapp || "Business number to be added",
      action: "Chat on WhatsApp",
      href: whatsappHref,
      external: true,
    },
    {
      icon: "mail",
      title: "Email Us",
      description: "Send your questions to our official inbox.",
      value: CONTACT.email || "Official email to be added",
      action: "Send Email",
      href: emailHref,
    },
    {
      icon: "pin",
      title: "Visit Us",
      description: "Find the area and plan your next visit.",
      value: CONTACT.area,
      action: CONTACT.verifiedLocation ? "Get Directions" : "View Area Map",
      href: mapsHref,
      external: true,
    },
  ];
  function focusForm() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    formSectionRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    formSectionRef.current
      ?.querySelector("input")
      ?.focus({ preventScroll: true });
  }
  return (
    <main className="rhc-contact-page">
      <section
        className="rhc-contact-hero"
        aria-labelledby="rhc-contact-heading"
      >
        <img
          className="rhc-hero-image"
          src={contactHero}
          alt="Healthcare representative at a bright reception, speaking on the phone and welcoming a visitor"
          fetchPriority="high"
        />
        <div className="rhc-hero-inner rhc-container">
          <nav className="rhc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <div className="rhc-hero-copy">
            <span className="rhc-eyebrow">
              <span />
              GET IN TOUCH
            </span>
            <h1 id="rhc-contact-heading">
              Let’s Talk About
              <br />
              <span>Your Care.</span>
            </h1>
            <p>
              Have questions about our healthcare services?
              <br className="rhc-desktop-break" /> We’re here to help you find
              the right care.
            </p>
            <div className="rhc-hero-actions">
              <button
                type="button"
                className="rhc-button rhc-button-white"
                onClick={focusForm}
              >
                Contact Our Team <Icon name="arrow" />
              </button>
              <Action
                href={phoneHref}
                className="rhc-button rhc-button-outline"
              >
                <Icon name="phone" />
                Call Us Now
              </Action>
            </div>
            <div className="rhc-hero-caption">
              <Icon name="heart" />A conversation is a good place to start.
            </div>
          </div>
          <div className="rhc-support-badge">
            <span>
              <Icon name="headset" />
            </span>
            <div>
              <strong>Here when you need us</strong>
              <small>Let’s find your next step, together.</small>
            </div>
          </div>
        </div>
      </section>

      <div className="rhc-container rhc-page-body">
        <section
          className="rhc-channels-section"
          aria-label="Ways to get in touch"
        >
          <SectionTitle
            centered
            label="CONTACT ROYAL HEALTH CARE"
            title="Choose the Easiest Way to Reach Us."
            description="A question, a little guidance, or your next visit. Let’s talk."
          />
          <div className="rhc-channel-grid">
            {channels.map((channel) => (
              <article
                className={`rhc-channel-card rhc-channel-${channel.icon}`}
                key={channel.title}
              >
                <span className="rhc-icon-box">
                  <Icon name={channel.icon} />
                </span>
                <h3>{channel.title}</h3>
                <p>{channel.description}</p>
                <span className="rhc-channel-value">{channel.value}</span>
                <Action
                  href={channel.href}
                  external={channel.external}
                  className="rhc-text-link"
                >
                  {channel.action}
                  <Icon name="arrow" />
                </Action>
              </article>
            ))}
          </div>
        </section>

        <section
          className="rhc-contact-grid"
          ref={formSectionRef}
          aria-label="Contact form and business information"
        >
          <ContactForm />
          <aside className="rhc-info-panel">
            <div className="rhc-info-heading">
              <span className="rhc-eyebrow">
                <span />A LITTLE GUIDANCE
              </span>
              <h2>We’re Here to Help.</h2>
              <p>
                Questions about a service? Need help planning a visit? Start a
                conversation with our team.
              </p>
            </div>
            <div className="rhc-info-list">
              {channels.map((channel) => (
                <div className="rhc-info-row" key={channel.title}>
                  <span className={`rhc-icon-box rhc-info-${channel.icon}`}>
                    <Icon name={channel.icon} />
                  </span>
                  <div>
                    <strong>
                      {
                        {
                          phone: "Phone",
                          whatsapp: "WhatsApp",
                          mail: "Email",
                          pin: "Address",
                        }[channel.icon]
                      }
                    </strong>
                    <p>
                      {channel.icon === "pin"
                        ? CONTACT.address ||
                          `${CONTACT.area} · Full address to be added`
                        : channel.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rhc-hours">
              <div className="rhc-hours-heading">
                <Icon name="clock" />
                <h3>Working Hours</h3>
                <span aria-hidden="true">+</span>
              </div>
              <dl>
                {CONTACT.hours.map((item) => (
                  <div key={item.day}>
                    <dt>{item.day}</dt>
                    <dd>{item.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="rhc-hours-note">
                Please confirm business hours before visiting.
              </p>
            </div>
            <p className="rhc-emergency-note">
              <Icon name="info" />
              Not an emergency service. Please don’t wait for a form response in
              an emergency.
            </p>
          </aside>
        </section>

        <ContactMap mapsHref={mapsHref} />

        <section className="rhc-care-section" aria-label="Our approach">
          <div className="rhc-care-copy">
            <span className="rhc-eyebrow">
              <span />
              CARE BEGINS HERE
            </span>
            <h2>
              Care Starts With
              <br />a <span>Conversation.</span>
            </h2>
            <Icon name="heart" className="rhc-care-heart" />
          </div>
          <div className="rhc-benefits">
            {[
              {
                icon: "lightning",
                title: "A Clear Next Step",
                text: "Find guidance on the service that suits your needs.",
              },
              {
                icon: "user",
                title: "Personal Assistance",
                text: "Talk through your questions with our care team.",
              },
              {
                icon: "calendar",
                title: "Easier Appointments",
                text: "Ask about availability and plan a convenient visit.",
              },
            ].map((item) => (
              <div className="rhc-benefit" key={item.title}>
                <Icon name={item.icon} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ContactFaq />

        <section className="rhc-bottom-cta" aria-label="Get in touch">
          <div>
            <span className="rhc-eyebrow">
              <span />
              LET’S CONNECT
            </span>
            <h2>
              Need Healthcare Support?
              <br />
              <span>We’re Just a Message Away.</span>
            </h2>
            <p>Reach out to discuss your healthcare needs.</p>
          </div>
          <div className="rhc-cta-actions">
            <div>
              <Action
                href={whatsappHref}
                external
                className="rhc-button rhc-button-white"
              >
                <Icon name="whatsapp" />
                WhatsApp Now
              </Action>
              <Action
                href={phoneHref}
                className="rhc-button rhc-button-outline"
              >
                <Icon name="phone" />
                Call Now
              </Action>
            </div>
            <small>
              {phoneHref || whatsappHref
                ? "We look forward to hearing from you."
                : "Official contact channels will be added soon."}
            </small>
          </div>
        </section>
      </div>
    </main>
  );
}

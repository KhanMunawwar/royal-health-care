// Frontend preview only — no messages are sent or saved.

export const CONTACT_SERVICES = [
  "Doctor Home Visit",
  "Nurse Visit",
  "Injection Service",
  "Dressing Service",
  "Physiotherapy",
  "Elderly Care",
  "Online Consultation",
  "Other",
];

export function normalizeContactPayload(values) {
  return {
    fullName: String(values.fullName ?? "").trim(),

    phone: String(values.phone ?? "")
      .trim()
      .replace(/[\s()-]/g, "")
      .replace(/^\+91/, ""),

    email: String(values.email ?? "").trim(),
    service: String(values.service ?? "").trim(),
    message: String(values.message ?? "").trim(),
  };
}

export function validateContactForm(values) {
  const data = normalizeContactPayload(values);
  const errors = {};

  if (!data.fullName) {
    errors.fullName = "Please enter your full name.";
  } else if (data.fullName.length < 2 || data.fullName.length > 100) {
    errors.fullName = "Please use between 2 and 100 characters.";
  }

  if (!/^[6-9]\d{9}$/.test(data.phone)) {
    errors.phone =
      "Enter a 10-digit Indian mobile number (optional +91).";
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!CONTACT_SERVICES.includes(data.service)) {
    errors.service = "Please choose a service.";
  }

  if (!data.message) {
    errors.message = "Please tell us how we can help.";
  } else if (data.message.length < 10 || data.message.length > 2000) {
    errors.message = "Please use between 10 and 2,000 characters.";
  }

  return errors;
}

export async function submitContactRequest(payload, { signal } = {}) {
  const errors = validateContactForm(payload);

  if (Object.keys(errors).length > 0) {
    throw new Error("Please check your form details.");
  }

  if (signal?.aborted) {
    throw new DOMException("Request cancelled", "AbortError");
  }

  // TODO: Connect your own backend API here later.
  // Return delivered: true only after the server confirms acceptance.

  await new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException("Request cancelled", "AbortError"));
    };

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, 500);

    signal?.addEventListener("abort", abort, { once: true });
  });

  return {
    delivered: false,
    mode: "demo",
    message:
      "Preview check complete. Your details were checked, but no message was sent or saved. Your entries are still here.",
  };
}
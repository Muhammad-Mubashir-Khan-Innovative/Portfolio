import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import SectionTitle from "./SectionTitle";

const initialForm = { name: "", email: "", rating: 0, message: "" };

// Placeholder submit handler — replace with a real API call when a backend is available.
async function submitFeedback(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.info("Feedback submitted (placeholder):", payload);
      resolve({ ok: true });
    }, 600);
  });
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.rating) errors.rating = "Please select a rating.";
  if (!form.message.trim()) errors.message = "Please share your feedback.";

  return errors;
}

export default function Feedback() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState("idle");

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleRating = (value) => {
    setForm((f) => ({ ...f, rating: value }));
    if (errors.rating) setErrors((er) => ({ ...er, rating: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    const result = await submitFeedback(form);

    if (result.ok) {
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 4500);
    } else {
      setStatus("idle");
    }
  };

  return (
    <section id="feedback" className="scroll-mt-20 bg-ink py-24 sm:py-32">
      <div className="section-container max-w-3xl">
        <SectionTitle
          eyebrow="Your Voice"
          title="What Do You Think?"
          subtitle="Your feedback helps us continue improving the experience for every customer."
          light
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-sm border border-white/10 bg-charcoal/60 p-6 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
                role="status"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent-light">
                  <CheckCircle2 size={32} />
                </span>
                <h3 className="text-xl font-bold text-offwhite">
                  Thank you for your feedback!
                </h3>
                <p className="max-w-sm text-sm text-mist">
                  We genuinely appreciate you taking the time to help us
                  improve.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="feedback-name"
                      className="text-xs font-semibold uppercase tracking-wide text-mist"
                    >
                      Name
                    </label>
                    <input
                      id="feedback-name"
                      type="text"
                      value={form.name}
                      onChange={handleChange("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "feedback-name-error" : undefined}
                      className={`rounded-sm border bg-ink/60 px-4 py-3 text-sm text-offwhite placeholder:text-steel focus:outline-none focus:ring-2 focus:ring-accent-light/60 ${
                        errors.name ? "border-accent-light" : "border-white/15"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p id="feedback-name-error" className="text-xs text-accent-light">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="feedback-email"
                      className="text-xs font-semibold uppercase tracking-wide text-mist"
                    >
                      Email
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "feedback-email-error" : undefined}
                      className={`rounded-sm border bg-ink/60 px-4 py-3 text-sm text-offwhite placeholder:text-steel focus:outline-none focus:ring-2 focus:ring-accent-light/60 ${
                        errors.email ? "border-accent-light" : "border-white/15"
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id="feedback-email-error" className="text-xs text-accent-light">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <fieldset className="flex flex-col gap-2">
                  <legend className="text-xs font-semibold uppercase tracking-wide text-mist">
                    Rating
                  </legend>
                  <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRating(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        aria-label={`Rate ${value} out of 5 stars`}
                        aria-pressed={form.rating === value}
                        className="p-1 text-accent-light transition-transform hover:scale-110"
                      >
                        <Star
                          size={26}
                          fill={(hoverRating || form.rating) >= value ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-xs text-accent-light">{errors.rating}</p>
                  )}
                </fieldset>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="feedback-message"
                    className="text-xs font-semibold uppercase tracking-wide text-mist"
                  >
                    Feedback / Message
                  </label>
                  <textarea
                    id="feedback-message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "feedback-message-error" : undefined}
                    className={`resize-none rounded-sm border bg-ink/60 px-4 py-3 text-sm text-offwhite placeholder:text-steel focus:outline-none focus:ring-2 focus:ring-accent-light/60 ${
                      errors.message ? "border-accent-light" : "border-white/15"
                    }`}
                    placeholder="Tell us about your experience..."
                  />
                  {errors.message && (
                    <p id="feedback-message-error" className="text-xs text-accent-light">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary mt-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Submitting..." : "Submit Feedback"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

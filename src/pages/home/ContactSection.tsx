import { useState, useRef, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { CONTACT_CONFIG } from "@/config/contact";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm = { name: "", email: "", message: "", service: "" };

const services = [
  "Video Editing",
  "Color Grading",
  "Motion Graphics",
  "Cinematic Reels",
  "Thumbnail Design",
  "Full Channel Management",
];

// const contactInfo = [
//   {
//     icon: Mail,
//     label: "Email us",
//     value: "hello@contentagency.com",
//   },
//   {
//     icon: Phone,
//     label: "Call us",
//     value: "+1 (555) 000-0000",
//   },
//   {
//     icon: MapPin,
//     label: "Located in",
//     value: "Remote — Worldwide",
//   },
// ];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!CONTACT_CONFIG.accessKey) {
      setStatus("error");
      setErrorMessage("Contact form is not configured yet.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CONTACT_CONFIG.accessKey,
          subject: `New Inquiry — ${form.service || "General"}`,
          from_name: form.name,
          email: form.email,
          message: `Service: ${form.service}\n\n${form.message}`,
          botcheck: "",
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message ?? "Something went wrong.");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const accentColor = "oklch(0.55 0.15 208.93)";
  const bgAccent = "oklch(85.273% 0.13885 208.93)";

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="relative w-full  bg-white py-24 px-6"
    >
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
        style={{ background: bgAccent }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: bgAccent }}
      />

      {/* Section header */}
      <div className="text-center mb-16 relative z-10">
        <span
          className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{ background: `${bgAccent}55`, color: accentColor }}
        >
          Get in Touch
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Ready to{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${accentColor}, oklch(0.7 0.13 208.93))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Grow Together?
          </span>
        </h2>
        <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto font-light">
          Tell us about your project and let's turn your vision into content that converts.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="max-w-xl mx-auto relative z-10">
        <div className="contact-right">
          <div
            className="rounded-3xl border p-8"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: `${bgAccent}40` }}
                >
                  <CheckCircle2 size={28} style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">You're in!</h3>
                <p className="text-sm text-gray-500 font-light max-w-xs">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setForm(initialForm);
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                  className="mt-8 px-8 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, oklch(0.7 0.13 208.93))` }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      disabled={status === "submitting"}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl text-sm border outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                      style={{
                        borderColor: `${bgAccent}60`,
                        background: `${bgAccent}10`,
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = `${bgAccent}60`)}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      disabled={status === "submitting"}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl text-sm border outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
                      style={{
                        borderColor: `${bgAccent}60`,
                        background: `${bgAccent}10`,
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = `${bgAccent}60`)}
                    />
                  </div>
                </div>

                {/* Service picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Service you need
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, service: p.service === s ? "" : s }))}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                          form.service === s ? "text-white border-transparent" : "text-gray-500"
                        )}
                        style={
                          form.service === s
                            ? { background: accentColor, borderColor: accentColor }
                            : { borderColor: `${bgAccent}80`, background: "transparent" }
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project…"
                    value={form.message}
                    disabled={status === "submitting"}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl text-sm border outline-none transition-all resize-none placeholder:text-gray-300 disabled:opacity-50"
                    style={{
                      borderColor: `${bgAccent}60`,
                      background: `${bgAccent}10`,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${bgAccent}60`)}
                  />
                </div>

                {status === "error" && errorMessage && (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-light text-red-600">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group w-full py-4 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, oklch(0.7 0.13 208.93))`,
                  }}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

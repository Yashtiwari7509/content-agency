import { useState, useRef, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { CONTACT_CONFIG } from "@/config/contact";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm = { name: "", email: "", message: "", service: "" };

const services = ["Video Editing", "Color Grading", "Motion Graphics", "Cinematic Reels", "Thumbnail Design", "Full Channel Management"];

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
    <section ref={sectionRef} id="contact-section" className="relative w-full  py-24 px-6">

      {/* Section header */}
      <div className="relative z-10">
        <SectionHeader
          label="Get in Touch"
          title="Ready to"
          gradientWord="Grow Together!"
          description="Tell us about your project and let’s turn your vision into content that converts."
        />
      </div>

      {/* Two-column layout */}
      <div className="max-w-xl mx-auto relative z-10">
        <div className="contact-right">
          <div className="rounded-3xl border p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: `${bgAccent}40` }}>
                  <CheckCircle2 size={28} style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">You're in!</h3>
                <p className="text-sm text-gray-500 font-light max-w-xs">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                  className="mt-8 px-8 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, oklch(0.7 0.13 208.93))` }}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name" className="uppercase tracking-wider text-xs text-gray-600">
                      Name
                    </Label>
                    <Input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      disabled={status === "submitting"}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="bg-slate-50"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email" className="uppercase tracking-wider text-xs text-gray-600">
                      Email
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      disabled={status === "submitting"}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="bg-slate-50"
                    />
                  </div>
                </div>

                {/* Service picker */}
                <div className="space-y-1.5">
                  <Label className="uppercase tracking-wider text-xs text-gray-600">Service you need</Label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {services.map((s) => (
                      <Button
                        key={s}
                        type="button"
                        variant={form.service === s ? "default" : "outline"}
                        size="sm"
                        className={cn("rounded-full px-3 py-1.5 text-xs font-medium", form.service !== s && "text-gray-500")}
                        onClick={() => setForm((p) => ({ ...p, service: p.service === s ? "" : s }))}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact-message" className="uppercase tracking-wider text-xs text-gray-600">
                    Message
                  </Label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell us about your project…"
                    value={form.message}
                    disabled={status === "submitting"}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="min-h-[120px] w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm outline-none transition-all resize-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {status === "error" && errorMessage && (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-light text-red-600">{errorMessage}</p>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-full py-4 text-sm font-semibold flex items-center justify-center gap-2"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

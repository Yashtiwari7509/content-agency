import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTACT_CONFIG } from "@/config/contact";
import { useContact } from "./ContactContext";

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export function ContactModal() {
  const { isOpen, closeContact } = useContact();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContact();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeContact]);

  useEffect(() => {
    if (!isOpen) {
      const timer = window.setTimeout(() => {
        setForm(initialForm);
        setStatus("idle");
        setErrorMessage("");
      }, 300);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (status !== "submitting") closeContact();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!CONTACT_CONFIG.accessKey) {
      setStatus("error");
      setErrorMessage("Contact form is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file.");
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
          subject: "New Book a Call Request",
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <button
        type="button"
        aria-label="Close contact form"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0 duration-300"
        onClick={handleClose}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-2xl backdrop-blur-3xl",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300 sm:slide-in-from-bottom-0"
        )}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[oklch(85.273%_0.13885_208.93)] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 size-40 rounded-full bg-[oklch(85.273%_0.13885_208.93)] opacity-30 blur-3xl" />

        <div className="relative max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <button
            type="button"
            onClick={handleClose}
            disabled={status === "submitting"}
            className="absolute right-4 top-4 rounded-full border border-neutral-200 p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>

          {status === "success" ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CheckCircle2 className="mb-4 size-12 text-[oklch(0.55_0.15_208.93)]" />
              <h2 id="contact-modal-title" className="mb-2 text-2xl font-light text-neutral-800">
                Message sent
              </h2>
              <p className="mb-8 max-w-xs text-sm font-light text-neutral-500">
                Thanks for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-light text-white transition-colors hover:bg-neutral-700"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 pr-10">
                <h2 id="contact-modal-title" className="text-2xl font-light text-neutral-800 sm:text-3xl">
                  Book a call
                </h2>
                <p className="mt-2 text-sm font-light text-neutral-500">
                  Tell us a bit about your project and we&apos;ll be in touch.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="font-light text-neutral-600">
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    disabled={status === "submitting"}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="h-11 rounded-full border-neutral-200 bg-white/80 font-light placeholder:font-light focus-visible:ring-[oklch(0.708_0.12_208.93)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="font-light text-neutral-600">
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    disabled={status === "submitting"}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="h-11 rounded-full border-neutral-200 bg-white/80 font-light placeholder:font-light focus-visible:ring-[oklch(0.708_0.12_208.93)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="font-light text-neutral-600">
                    Message
                  </Label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="What can we help you with?"
                    value={form.message}
                    disabled={status === "submitting"}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="flex min-h-[120px] w-full resize-none rounded-2xl border border-neutral-200 bg-white/80 px-4 py-3 text-sm font-light ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.708_0.12_208.93)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {status === "error" && errorMessage && (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-light text-red-600">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="relative mt-2 w-full overflow-hidden rounded-full bg-neutral-900 py-3.5 text-sm font-light text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send message"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

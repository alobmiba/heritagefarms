"use client";

import { useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    const fd = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", { method: "POST", body: fd });
    setOk(res.ok);
    setLoading(false);
    if (res.ok) e.currentTarget.reset();
  }

  const input = "w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A7817]";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white shadow-md p-6 space-y-4" aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="text-xl font-semibold text-[#00312D]">Send us a Message</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className={input} name="name" placeholder="Full name" required aria-label="Full name" />
        <input className={input} type="email" name="email" placeholder="Email address" required aria-label="Email address" />
        <input className={input} name="phone" placeholder="Phone number" aria-label="Phone number" />
        <input className={input} name="subject" placeholder="Subject" aria-label="Subject" />
      </div>

      <textarea className={input} name="message" rows={5} placeholder="Tell us about your inquiry…" required aria-label="Message" />

      <button
        type="submit"
        disabled={loading}
        className="rounded-full px-6 py-3 bg-[#BFF106] text-[#00312D] font-semibold hover:brightness-95 disabled:opacity-70"
      >
        {loading ? "Sending…" : "Send Message"}
      </button>

      {ok === true && <p className="text-sm text-green-700">Thanks! We'll be in touch.</p>}
      {ok === false && <p className="text-sm text-red-700">Sorry—something went wrong. Please try again.</p>}
    </form>
  );
}

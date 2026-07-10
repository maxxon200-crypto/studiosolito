"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";

/*
  A deliberately simple, dependency-free contact form. With no backend in this
  build, submitting composes a pre-filled email via a mailto: link — the note
  under the form says so plainly, so the control does exactly what it says.
  Swap the onSubmit for a real endpoint when one exists.
*/
export default function ContactForm({ dict }: { dict: Dict }) {
  const f = dict.contact.form;
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${dict.contact.title} — ${values.name || site.shortName}`;
    const body = [
      `${f.name}: ${values.name}`,
      `${f.email}: ${values.email}`,
      `${f.phone}: ${values.phone}`,
      "",
      `${f.message}:`,
      values.message,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full border-b border-ink/25 bg-transparent py-3 text-[1.05rem] text-ink " +
    "placeholder:text-stone focus:border-ink focus:outline-none " +
    "transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-ink/85">{f.name}</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className={`mt-2 ${field}`}
          />
        </label>
        <label className="block">
          <span className="eyebrow text-ink/85">{f.email}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className={`mt-2 ${field}`}
          />
        </label>
      </div>

      <label className="block">
        <span className="eyebrow text-ink/85">{f.phone}</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
          className={`mt-2 ${field}`}
        />
      </label>

      <label className="block">
        <span className="eyebrow text-ink/85">{f.message}</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={f.messagePlaceholder}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          className={`mt-2 resize-none ${field}`}
        />
      </label>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-ink self-start">
          {f.submit}
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-stone">{f.note}</p>
      </div>
    </form>
  );
}

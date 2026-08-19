'use client';

import { useState, type FormEvent } from 'react';
import { siteInfo } from '@/lib/data';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(state: FormState): FormErrors {
    const next: FormErrors = {};
    if (!state.name.trim()) next.name = 'Name is required.';
    if (!state.email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_RE.test(state.email)) next.email = 'Enter a valid email address.';
    if (!state.message.trim()) next.message = 'Message is required.';
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setSubmitted(false);
      return;
    }

    const subject = encodeURIComponent(`Business Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\n\n${form.message}`
    );
    window.location.href = `mailto:${siteInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const inputClass =
    'w-full bg-transparent border-b border-cream/30 focus:border-rose outline-none py-3 text-cream placeholder:text-cream/40 transition-colors';

  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-gold mb-4">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Business Inquiries</h2>
          <p className="text-cream/70 leading-relaxed mb-10">
            Interested in becoming a distributor, partner, or simply want to learn more? Send us
            a message and our team will be in touch.
          </p>

          <div className="space-y-4 text-cream/80">
            <p><span className="text-gold">Email:</span> {siteInfo.email}</p>
            <p><span className="text-gold">Phone:</span> {siteInfo.phone}</p>
            <p><span className="text-gold">Address:</span> {siteInfo.address}</p>
          </div>

          <div className="flex gap-6 mt-8">
            {siteInfo.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-wider text-cream/70 hover:text-rose transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="bg-cream/5 p-8 md:p-10 border border-cream/10">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm uppercase tracking-wider text-cream/60 mb-2">Name</label>
            <input
              id="name"
              type="text"
              className={inputClass}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="text-rose text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm uppercase tracking-wider text-cream/60 mb-2">Email</label>
            <input
              id="email"
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <p id="email-error" className="text-rose text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm uppercase tracking-wider text-cream/60 mb-2">Phone (optional)</label>
            <input id="phone" type="tel" className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-sm uppercase tracking-wider text-cream/60 mb-2">Message</label>
            <textarea
              id="message"
              rows={4}
              className={inputClass}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && <p id="message-error" className="text-rose text-sm mt-1">{errors.message}</p>}
          </div>

          <button type="submit" className="w-full py-4 bg-rose text-cream uppercase tracking-wider font-medium hover:bg-rose/90 transition-colors">
            Send Inquiry
          </button>

          {submitted && (
            <p className="text-gold text-sm mt-4 text-center">Opening your email client to send this inquiry…</p>
          )}
        </form>
      </div>
    </section>
  );
}
